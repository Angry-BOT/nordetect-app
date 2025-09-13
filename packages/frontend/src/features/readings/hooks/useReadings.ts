import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { readingsApi } from '../services/readingsApi';
import { Reading, CreateReadingDto, ReadingQueryParams } from '@/shared/types/reading.types';

// Query keys
export const QUERY_KEYS = {
  readings: ['readings'] as const,
  readingsWithParams: (params: ReadingQueryParams) => ['readings', params] as const,
  latestReadings: ['readings', 'latest'] as const,
  stats: ['readings', 'stats'] as const,
  health: ['health'] as const,
};

// Hook for fetching all readings
export const useReadings = (params?: ReadingQueryParams) => {
  return useQuery({
    queryKey: params ? QUERY_KEYS.readingsWithParams(params) : QUERY_KEYS.readings,
    queryFn: () => readingsApi.getReadings(params),
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  });
};

// Hook for fetching latest readings by device
export const useLatestReadings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.latestReadings,
    queryFn: readingsApi.getLatestReadings,
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  });
};

// Hook for fetching statistics
export const useStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stats,
    queryFn: readingsApi.getStats,
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Hook for creating a new reading
export const useCreateReading = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reading: CreateReadingDto) => readingsApi.createReading(reading),
    onSuccess: (newReading: Reading) => {
      // Invalidate and refetch readings queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.readings });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.latestReadings });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stats });

      // Optimistically update latest readings if this is a new device reading
      queryClient.setQueryData<Reading[]>(QUERY_KEYS.latestReadings, (oldData) => {
        if (!oldData) return [newReading];
        
        const existingIndex = oldData.findIndex(r => r.deviceId === newReading.deviceId);
        
        if (existingIndex >= 0) {
          // Update existing device reading
          const updated = [...oldData];
          updated[existingIndex] = newReading;
          return updated;
        } else {
          // Add new device reading
          return [...oldData, newReading];
        }
      });
    },
    onError: (error) => {
      // this endpoint should not throw an error, hence adding only console error
      console.error('Failed to create reading:', error);
    },
  });
};

// Hook for health check
export const useHealthCheck = () => {
  return useQuery({
    queryKey: QUERY_KEYS.health,
    queryFn: readingsApi.healthCheck,
    staleTime: 60 * 1000, // 1 minute
    retry: 3,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};
