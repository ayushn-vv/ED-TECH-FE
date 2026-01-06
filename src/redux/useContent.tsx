/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import apiConnect from './apiConnect';

// ----------------------
// Types
// ----------------------
export interface ContentBody {
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

export interface UpdateContentBody extends Partial<ContentBody> {}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ----------------------
// CREATE CONTENT
// ----------------------
export const useCreateContent = () => {
  return useMutation<ApiResponse, AxiosError, ContentBody>({
    mutationFn: async (body) => {
      const res = await apiConnect.post<ApiResponse>('/content', body);
      return res.data;
    },
    onSuccess: (data) => {
      console.log('Content created:', data);
    },
    onError: (error) => {
      console.log('CREATE CONTENT ERROR →', error.response?.data);
    },
  });
};

// ----------------------
// UPDATE CONTENT
// ----------------------
export const useUpdateContent = () => {
  return useMutation<
    ApiResponse,
    AxiosError,
    { id: number; body: UpdateContentBody }
  >({
    mutationFn: async ({ id, body }) => {
      const res = await apiConnect.put<ApiResponse>(`/content/${id}`, body);
      return res.data;
    },
    onSuccess: (data) => {
      console.log('Content updated:', data);
    },
    onError: (error) => {
      console.log('UPDATE CONTENT ERROR →', error.response?.data);
    },
  });
};

// ----------------------
// CONTENT TYPES
// ----------------------
export interface Content {
  id: number;
  title: string;
  duration?: number;
}

export interface ContentTopic {
  contentId: number;
  title: string;
  description: string;
}

export interface ContentApiResponse {
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
  data: Content[];
}

export interface GetContentParams {
  page?: number;
  limit?: number;
  search?: string;
}

// ----------------------
// GET ALL CONTENT
// ----------------------
export const useGetContent = ({
  page = 1,
  limit = 10,
  search = '',
}: GetContentParams) => {
  return useQuery<ContentApiResponse, AxiosError>({
    queryKey: ['content', page, limit, search],
    queryFn: async () => {
      const res = await apiConnect.get<ContentApiResponse>('/content', {
        params: { page, limit, search },
      });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
};

// ----------------------
// DELETE CONTENT
// ----------------------
export const useDeleteContent = () => {
  return useMutation<ApiResponse, AxiosError, number>({
    mutationFn: async (id) => {
      const res = await apiConnect.delete<ApiResponse>(`/content/${id}`);
      return res.data;
    },
    onSuccess: (data) => console.log('Content deleted:', data),
    onError: (error) =>
      console.log('DELETE CONTENT ERROR →', error.response?.data),
  });
};

// ----------------------
// GET CONTENT BY ID
// ----------------------
export const useGetContentById = (id: number) => {
  return useQuery<ApiResponse<Content>, AxiosError>({
    queryKey: ['content', id],
    queryFn: async () => {
      console.log('Fetching content by ID:', id);
      const res = await apiConnect.get<ApiResponse<Content>>(`/content/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
