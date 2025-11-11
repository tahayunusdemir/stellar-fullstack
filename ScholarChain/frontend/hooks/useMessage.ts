'use client';

import { useState, useCallback } from 'react';

export interface Message {
  type: 'success' | 'error';
  text: string;
}

/**
 * Custom hook for managing success/error messages
 * Provides clean API for showing and clearing messages
 */
export function useMessage() {
  const [message, setMessage] = useState<Message | null>(null);

  const showSuccess = useCallback((text: string) => {
    setMessage({ type: 'success', text });
  }, []);

  const showError = useCallback((text: string) => {
    setMessage({ type: 'error', text });
  }, []);

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return {
    message,
    showSuccess,
    showError,
    clearMessage,
  };
}

