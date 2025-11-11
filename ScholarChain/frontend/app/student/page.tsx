'use client';

import { useState, useEffect } from 'react';
import { getBalance, spendTokens, getTotalDistributed } from '@/lib/stellar';
import { Card, CardText } from '@/components/Card';
import { Button } from '@/components/Button';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useWalletValidation } from '@/hooks/useWalletValidation';
import { useMessage } from '@/hooks/useMessage';
import { ACHIEVEMENT_CATEGORIES } from '@/constants';
import { 
  SectionTitle,
  Input,
  InputLabel,
  InputHint,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatSubtext,
  Alert,
  Section,
  CardGrid,
  HoverCard,
  CardLabel,
} from '@/components/ui';

export default function StudentDashboard() {
  const walletAddress = useWalletValidation();
  const { message, showSuccess, showError, clearMessage } = useMessage();

  const [balance, setBalance] = useState<number>(0);
  const [totalDistributed, setTotalDistributed] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [setupRequired, setSetupRequired] = useState(false);

  useEffect(() => {
    if (!walletAddress) return;
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
      setSetupRequired(false);
    } catch (error: any) {
      console.error('Failed to load data:', error);
      
      if (error.message && error.message.includes('Contract ID')) {
        setSetupRequired(true);
      } else {
        showError('Failed to load data. Please try again later.');
      }
    }
  };

  const handleSpend = async () => {
    const amount = parseInt(spendAmount);
    
    if (!amount || amount <= 0) {
      showError('Enter a valid amount');
      return;
    }

    if (amount > balance) {
      showError('Insufficient balance');
      return;
    }

    setLoading(true);
    clearMessage();

    try {
      const newBalance = await spendTokens(walletAddress, walletAddress, amount);
      setBalance(newBalance);
      setSpendAmount('');
      showSuccess(`✅ ${amount} tokens successfully spent!`);
    } catch (error: any) {
      console.error('Spend failed:', error);
      
      if (error.message && error.message.includes('Contract ID')) {
        showError(error.message);
      } else if (error.message && error.message.includes('User declined')) {
        showError('❌ Transaction cancelled by user');
      } else {
        showError('Token spending failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Student Dashboard"
      icon="👨‍🎓"
      walletAddress={walletAddress}
      setupRequired={setupRequired}
    >
      <StatsGrid>
        <StatCard
          $gradient
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatLabel $light>My Token Balance</StatLabel>
          <StatValue $light>{balance}</StatValue>
          <StatSubtext $light>Scholar Tokens You Own</StatSubtext>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatLabel>Network Activity</StatLabel>
          <StatValue>{totalDistributed}</StatValue>
          <StatSubtext>Total Tokens in System</StatSubtext>
        </StatCard>
      </StatsGrid>

      <Section>
        <SectionTitle>Spend Tokens</SectionTitle>
        
        <InputLabel htmlFor="spend-amount">Spending Amount</InputLabel>
        <Input
          id="spend-amount"
          type="number"
          value={spendAmount}
          onChange={(e) => setSpendAmount(e.target.value)}
          placeholder="e.g: 10"
          min="1"
          max={balance}
          disabled={loading}
        />
        <InputHint>Available balance: {balance} tokens</InputHint>

        <Button
          onClick={handleSpend}
          disabled={loading || !spendAmount || parseInt(spendAmount) <= 0}
          fullWidth
          size="lg"
          style={{ marginTop: '1.5rem' }}
        >
          {loading ? 'Processing...' : 'Spend Tokens'}
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
            <strong>Tip:</strong> You can use your tokens at campus cafeteria, stationery, 
            and events.
          </CardText>
        </Card>
      </Section>

      <Section>
        <SectionTitle>My Achievements</SectionTitle>
        <CardGrid>
          {ACHIEVEMENT_CATEGORIES.map((category) => (
            <HoverCard key={category}>
              <CardLabel>{category}</CardLabel>
            </HoverCard>
          ))}
        </CardGrid>
      </Section>
    </DashboardLayout>
  );
}
