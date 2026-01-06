import axios from 'axios';
import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';

type UpdatePayload = {
  id: string | number;
  [key: string]: unknown;
};

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // update your base URL
});

// Attach token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const useCRUD = <T = unknown,>(key: string, url: string, options?: UseQueryOptions<T>) => {
  // GET — Fetch data
  const query = useQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const res = await API.get(url);
      return res.data;
    },
    ...options,
  });

  // POST
  const create = useMutation({
    mutationFn: async (body: unknown) => {
      const res = await API.post(url, body);
      return res.data;
    },
  });

  // PUT

  const update = useMutation({
    mutationFn: async ({ id, ...body }: UpdatePayload) => {
      const res = await API.put(`${url}/${id}`, body);
      return res.data;
    },
  });

  // DELETE
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const res = await API.delete(`${url}/${id}`);
      return res.data;
    },
  });

  return { ...query, create, update, remove };
};
