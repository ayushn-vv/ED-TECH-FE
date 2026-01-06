/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import apiConnect from './apiConnect';

// ----------------------
// Types
// ----------------------
export interface CourseBody {
  title: string;
  description?: string;
  category: string;
  tags?: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  price?: number;
  isFree?: boolean;
  thumbnail?: string;
  status?: 'draft' | 'published' | 'unpublished';
  duration?: number;
  instructorId: number;
}

export interface UpdateCourseBody extends Partial<CourseBody> {}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ----------------------
// CREATE COURSE
// ----------------------
export const useCreateCourse = () => {
  return useMutation<ApiResponse, AxiosError, CourseBody>({
    mutationFn: async (body) => {
      const res = await apiConnect.post<ApiResponse>('/courses', body);
      return res.data;
    },

    onSuccess: (data) => {
      console.log('Course created:', data);
    },

    onError: (error) => {
      console.log('CREATE COURSE ERROR →', error.response?.data);
    },
  });
};

// ----------------------
// UPDATE COURSE
// ----------------------
export const useUpdateCourse = () => {
  return useMutation<ApiResponse, AxiosError, { id: number; body: UpdateCourseBody }>({
    mutationFn: async ({ id, body }) => {
      const res = await apiConnect.put<ApiResponse>(`/courses/${id}`, body);
      return res.data;
    },

    onSuccess: (data) => {
      console.log('Course updated:', data);
    },

    onError: (error) => {
      console.log('UPDATE COURSE ERROR →', error.response?.data);
    },
  });
};

// ----------------------
// GET ALL COURSES (WITH SEARCH + PAGINATION)
// Types
// ----------------------
export interface CourseColumn {
  field: string;
  headerName: string;
  width?: number;
}

export interface Course {
  id: number;
  title: string;
  duration: string;
}
export interface   CourseTopic {
    courseid:number;
    title: string;
    description: string;  

}
export interface CoursesApiResponse {
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
  data: Course[];
}

export interface GetCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
}

// ----------------------
// GET COURSES
// ----------------------
export const useGetCourses = ({ page = 1, limit = 10, search = '' }: GetCoursesParams) => {
  return useQuery<CoursesApiResponse, AxiosError>({
    queryKey: ['courses', page, limit, search],
    queryFn: async () => {
      const res = await apiConnect.get<CoursesApiResponse>('/courses', {
        params: { page, limit, search },
      });
      return res.data;
    },

    // ⭐ NEW way in React Query v5
    placeholderData: (prev) => prev,
  });
};
export const useDeleteCourse = () => {
  return useMutation<ApiResponse, AxiosError, number>({
    mutationFn: async (id) => {
      const res = await apiConnect.delete<ApiResponse>(`/courses/${id}`);
      return res.data;
    },
    onSuccess: (data) => console.log('Course deleted:', data),
    onError: (error) => console.log('DELETE COURSE ERROR →', error.response?.data),
  });
};
// ----------------------
// GET COURSE BY ID
// ----------------------
export const useGetCourseById = (id: number) => {
  return useQuery<ApiResponse<Course>, AxiosError>({
    queryKey: ['course', id],
    queryFn: async () => {
      console.log('Fetching course by ID:', id);
      const res = await apiConnect.get<ApiResponse<Course>>(`/courses/${id}`);
      return res.data;
    },
    enabled: !!id, // only run if ID exists
  });
};
// ----------------------
// GET COURSE 
// ----------------------
export const useGetCourseTopics = () => {
  return useQuery<ApiResponse<CourseTopic>, AxiosError>({
    queryKey: ["course-topics"],
    queryFn: async () => {
      const res = await apiConnect.get<ApiResponse<CourseTopic>>(
        "/course/topics"
      );
      return res.data;
    },
  });
};
