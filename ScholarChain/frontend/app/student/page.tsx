'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getBalance, spendTokens, getTotalDistributed } from '@/lib/stellar';
import { Card, CardTitle, CardText } from '@/components/Card';
import { Button } from '@/components/Button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
`;

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WalletBadge = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const WalletLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
`;

const WalletAddress = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  word-break: break-all;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)<{ $gradient?: boolean }>`
  background: ${({ theme, $gradient }) =>
    $gradient
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.gold})`
      : theme.colors.background
  };
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StatLabel = styled.div<{ $light?: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme, $light }) => $light ? 'rgba(255,255,255,0.9)' : theme.colors.secondary};
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
`;

const StatValue = styled.div<{ $light?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: ${({ theme, $light }) => $light ? 'white' : theme.colors.foreground};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatSubtext = styled.div<{ $light?: boolean }>`
  font-size: 0.875rem;
  color: ${({ theme, $light }) => $light ? 'rgba(255,255,255,0.8)' : theme.colors.secondary};
`;

const Section = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1rem;
  font-family: inherit;
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const InputHint = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Alert = styled(motion.div)<{ $type: 'success' | 'error' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.border.radius.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme, $type }) =>
    $type === 'success' ? theme.colors.success : theme.colors.error}15;
  border: 1px solid ${({ theme, $type }) =>
    $type === 'success' ? theme.colors.success : theme.colors.error};
  color: ${({ theme, $type }) =>
    $type === 'success' ? theme.colors.success : theme.colors.error};
  font-weight: 500;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const AchievementCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.lg};
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AchievementIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const AchievementLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default function StudentDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('wallet') || '';

  const [balance, setBalance] = useState<number>(0);
  const [totalDistributed, setTotalDistributed] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!walletAddress) {
      router.push('/');
      return;
    }
    loadData();
  }, [walletAddress]);

  const loadData = async () => {
    try {
      const [balanceData, totalData] = await Promise.all([
        getBalance(walletAddress),
        getTotalDistributed(),
      ]);
      setBalance(balanceData);
      setTotalDistributed(totalData);
    } catch (error) {
      console.error('Failed to load data:', error);
      setMessage({ type: 'error', text: 'Veriler yüklenemedi' });
    }
  };

  const handleSpend = async () => {
    const amount = parseInt(spendAmount);
    
    if (!amount || amount <= 0) {
      setMessage({ type: 'error', text: 'Geçerli bir miktar girin' });
      return;
    }

    if (amount > balance) {
      setMessage({ type: 'error', text: 'Yetersiz bakiye' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const newBalance = await spendTokens(walletAddress, walletAddress, amount);
      setBalance(newBalance);
      setSpendAmount('');
      setMessage({ type: 'success', text: `✅ ${amount} token başarıyla harcandı!` });
    } catch (error) {
      console.error('Spend failed:', error);
      setMessage({ type: 'error', text: 'Token harcama başarısız oldu' });
    } finally {
      setLoading(false);
    }
  };

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
          ← Ana Sayfa
        </Button>
        
        <Title>
          <span>👨‍🎓</span>
          Öğrenci Dashboard
        </Title>
      </Header>

      <Content>
        <WalletBadge>
          <WalletLabel>Bağlı Cüzdan</WalletLabel>
          <WalletAddress>
            {walletAddress.slice(0, 16)}...{walletAddress.slice(-16)}
          </WalletAddress>
        </WalletBadge>

        <StatsGrid>
          <StatCard
            $gradient
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StatHeader>
              <StatLabel $light>Token Bakiyem</StatLabel>
              <StatIcon>💰</StatIcon>
            </StatHeader>
            <StatValue $light>{balance}</StatValue>
            <StatSubtext $light>Scholar Tokens</StatSubtext>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <StatHeader>
              <StatLabel>Toplam Dağıtılan</StatLabel>
              <StatIcon>📊</StatIcon>
            </StatHeader>
            <StatValue>{totalDistributed}</StatValue>
            <StatSubtext>Tüm Öğrencilere</StatSubtext>
          </StatCard>
        </StatsGrid>

        <Section>
          <SectionTitle>💸 Token Harca</SectionTitle>
          
          <InputLabel htmlFor="spend-amount">Harcama Miktarı</InputLabel>
          <Input
            id="spend-amount"
            type="number"
            value={spendAmount}
            onChange={(e) => setSpendAmount(e.target.value)}
            placeholder="Örn: 10"
            min="1"
            max={balance}
            disabled={loading}
          />
          <InputHint>Mevcut bakiye: {balance} token</InputHint>

          <Button
            onClick={handleSpend}
            disabled={loading || !spendAmount || parseInt(spendAmount) <= 0}
            fullWidth
            size="lg"
            style={{ marginTop: '1.5rem' }}
          >
            {loading ? '⏳ İşlem Yapılıyor...' : '✨ Token Harca'}
          </Button>

          {message && (
            <Alert
              $type={message.type}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {message.text}
            </Alert>
          )}

          <Card style={{ marginTop: '1.5rem', backgroundColor: 'transparent' }}>
            <CardText style={{ fontSize: '0.875rem' }}>
              <strong>💡 İpucu:</strong> Tokenlarınızı kampüs içinde kantin, kırtasiye ve 
              etkinliklerde kullanabilirsiniz.
            </CardText>
          </Card>
        </Section>

        <Section>
          <SectionTitle>🏆 Başarılarım</SectionTitle>
          <AchievementsGrid>
            <AchievementCard>
              <AchievementIcon>📚</AchievementIcon>
              <AchievementLabel>Katılım</AchievementLabel>
            </AchievementCard>
            <AchievementCard>
              <AchievementIcon>📝</AchievementIcon>
              <AchievementLabel>Ödev</AchievementLabel>
            </AchievementCard>
            <AchievementCard>
              <AchievementIcon>🎯</AchievementIcon>
              <AchievementLabel>Sınav</AchievementLabel>
            </AchievementCard>
            <AchievementCard>
              <AchievementIcon>🚀</AchievementIcon>
              <AchievementLabel>Proje</AchievementLabel>
            </AchievementCard>
          </AchievementsGrid>
        </Section>
      </Content>
    </Container>
  );
}
