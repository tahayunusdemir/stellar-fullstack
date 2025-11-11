'use client';

import { useState, useEffect, useCallback } from 'react';

interface ContractDataState<T> {
  data: T;
  loading: boolean;
  error: string | null;
  setupRequired: boolean;
  refresh: () => Promise<void>;
}

/**
 * Custom hook for loading contract data with error handling
 * Automatically handles setup requirements and contract errors
 */
export function useContractData<T>(
  fetchFn: () => Promise<T>,
  initialData: T,
  dependencies: any[] = []
): ContractDataState<T> {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupRequired, setSetupRequired] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn();
      setData(result);
      setSetupRequired(false);
    } catch (err: any) {
      console.error('Contract data load error:', err);
      
      if (err.message && err.message.includes('Contract ID')) {
        setSetupRequired(true);
      } else {
        setError(err.message || 'Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    loadData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    setupRequired,
    refresh: loadData,
  };
}

