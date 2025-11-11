'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Custom hook for wallet validation and redirect
 * Ensures user has a valid wallet address or redirects to home
 */
export function useWalletValidation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('wallet') || '';

  useEffect(() => {
    if (!walletAddress) {
      router.push('/');
    }
  }, [walletAddress, router]);

  return walletAddress;
}

