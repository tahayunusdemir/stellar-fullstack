'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '@/components/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SetupRequired } from '@/components/SetupRequired';
import {
  Container,
  Header,
  Title,
  Content,
  WalletBadge,
  WalletLabel,
  WalletAddress,
} from '@/components/ui';

interface DashboardLayoutProps {
  title: string;
  icon: string;
  walletAddress: string;
  setupRequired?: boolean;
  children: ReactNode;
  walletLabel?: string;
}

/**
 * Reusable layout for dashboard pages (Student & Teacher)
 * Provides consistent header, navigation, and setup handling
 */
export function DashboardLayout({
  title,
  icon,
  walletAddress,
  setupRequired = false,
  children,
  walletLabel = 'Connected Wallet',
}: DashboardLayoutProps) {
  const router = useRouter();

  if (setupRequired) {
    return (
      <Container>
        <ThemeToggle />
        
        <Header>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/')}
            style={{ marginBottom: '1.5rem' }}
          >
            ← Home
          </Button>
          
          <Title>
            <span>{icon}</span>
            {title}
          </Title>
        </Header>

        <Content>
          <SetupRequired />
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <ThemeToggle />
      
      <Header>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push('/')}
          style={{ marginBottom: '1.5rem' }}
        >
          ← Home
        </Button>
        
        <Title>
          <span>{icon}</span>
          {title}
        </Title>
      </Header>

      <Content>
        <WalletBadge>
          <WalletLabel>{walletLabel}</WalletLabel>
          <WalletAddress>
            {walletAddress.slice(0, 16)}...{walletAddress.slice(-16)}
          </WalletAddress>
        </WalletBadge>

        {children}
      </Content>
    </Container>
  );
}

