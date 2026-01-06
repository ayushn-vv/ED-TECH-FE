/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiConnect from "./apiConnect";

/* =======================
   COMMON TYPES
======================= */

export interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
}

/* =======================
   ENROLLMENT TYPES
======================= */

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: "enrolled" | "completed" | "cancelled";
  progress: number;
  createdAt: string;
  updatedAt: string;

  User?: {
    id: number;
    name: string;
    email: string;
  };

  Course?: {
    id: number;
    title: string;
  };
}

/* =======================
   ENROLL COURSE
======================= */

export interface EnrollCourseBody {
  courseId: number;
}

export const useEnrollCourse = () => {
  return useMutation<ApiResponse, AxiosError, EnrollCourseBody>({
    mutationFn: async (body) => {
      const res = await apiConnect.post<ApiResponse>(
        "/enrollments",
        body
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Enrollment successful:", data);
    },
    onError: (error) => {
      console.log("ENROLL COURSE ERROR →", error.response?.data);
    },
  });
};

/* =======================
   UPDATE ENROLLMENT PROGRESS
======================= */

export interface UpdateProgressBody {
  courseId: number;
  progress: number;
}

export const useUpdateEnrollmentProgress = () => {
  return useMutation<ApiResponse, AxiosError, UpdateProgressBody>({
    mutationFn: async (body) => {
      const res = await apiConnect.put<ApiResponse>(
        "/enrollments",
        body
      );
      return res.data;
    },
    onSuccess: () => {
      console.log("Progress updated successfully");
    },
    onError: (error) => {
      console.log("UPDATE PROGRESS ERROR →", error.response?.data);
    },
  });
};

/* =======================
   GET MY ENROLLMENTS (USER SIDE)
======================= */

export const useGetMyEnrollments = (userId: number) => {
  return useQuery<ApiResponse<Enrollment[]>, AxiosError>({
    queryKey: ["my-enrollments", userId],
    queryFn: async () => {
      const res = await apiConnect.get<ApiResponse<Enrollment[]>>(
        `/enrollments/${userId}`
      );
      return res.data;
    },
    enabled: !!userId,
  });
};

/* =======================
   GET ALL COURSES WITH ENROLLMENT COUNT
======================= */

export interface CourseEnrollmentCount {
  id: number;
  title: string;
  category: string;
  status: string;
  totalEnrollments: number;
}

export const useGetCoursesEnrollmentCount = () => {
  return useQuery<CourseEnrollmentCount[], AxiosError>({
    queryKey: ["courses-enrollment-count"],
    queryFn: async () => {
      const res = await apiConnect.get<CourseEnrollmentCount[]>(
        "/enrollments"
      );
      return res.data;
    },
  });
};


/* =======================
   ADMIN: GET ALL ENROLLMENTS
   (Pagination + Search)
======================= */

export interface AdminEnrollmentsResponse {
  data: Enrollment[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}

export interface AdminEnrollmentParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useGetAllEnrollmentsAdmin = ({
  page = 1,
  limit = 10,
  search = "",
}: AdminEnrollmentParams) => {
  return useQuery<AdminEnrollmentsResponse, AxiosError>({
    queryKey: ["admin-enrollments", page, limit, search],
    queryFn: async () => {
      const res = await apiConnect.get<AdminEnrollmentsResponse>(
        "/enrollments/admin",
        {
          params: { page, limit, search },
        }
      );
      return res.data;
    },

    // ✅ React Query v5 replacement for keepPreviousData
    placeholderData: (prev) => prev,
  });
};
