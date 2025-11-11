'use client';

import { useState, useEffect } from 'react';
import { mintReward, getTotalDistributed } from '@/lib/stellar';
import { Card, CardText } from '@/components/Card';
import { Button } from '@/components/Button';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useWalletValidation } from '@/hooks/useWalletValidation';
import { useMessage } from '@/hooks/useMessage';
import { ACHIEVEMENT_CATEGORIES, CATEGORY_COLORS, CATEGORY_DESCRIPTIONS } from '@/constants';
import { 
  SectionTitle,
  Input,
  Select,
  InputLabel,
  InputHint,
  FormGroup,
  StatCard,
  StatLabel,
  StatValue,
  StatSubtext,
  Alert,
  Section,
  CardGrid,
  ColoredHoverCard,
  CardLabel,
  CardDescription,
} from '@/components/ui';

export default function TeacherPanel() {
  const walletAddress = useWalletValidation();
  const { message, showSuccess, showError, clearMessage } = useMessage();

  const [studentAddress, setStudentAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Participation');
  const [totalDistributed, setTotalDistributed] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [setupRequired, setSetupRequired] = useState(false);

  useEffect(() => {
    if (!walletAddress) return;
    loadTotalDistributed();
  }, [walletAddress]);

  const loadTotalDistributed = async () => {
    try {
      const total = await getTotalDistributed();
      setTotalDistributed(total);
      setSetupRequired(false);
    } catch (error: any) {
      console.error('Failed to load total:', error);
      
      if (error.message && error.message.includes('Contract ID')) {
        setSetupRequired(true);
      }
    }
  };

  const handleMintReward = async () => {
    if (!studentAddress.trim()) {
      showError('Student address required');
      return;
    }

    const tokenAmount = parseInt(amount);
    if (!tokenAmount || tokenAmount <= 0) {
      showError('Enter a valid amount');
      return;
    }

    setLoading(true);
    clearMessage();

    try {
      const newBalance = await mintReward(walletAddress, studentAddress, tokenAmount);
      
      await loadTotalDistributed();
      
      setStudentAddress('');
      setAmount('');
      setCategory('Participation');
      
      showSuccess(
        `✅ ${tokenAmount} tokens successfully distributed! Student's new balance: ${newBalance}`
      );
    } catch (error: any) {
      console.error('Mint failed:', error);
      
      if (error.message && error.message.includes('Contract ID')) {
        showError(error.message);
      } else if (error.message && error.message.includes('Invalid wallet address')) {
        showError('❌ Invalid wallet address format. Please enter a valid Stellar address.');
      } else if (error.message && error.message.includes('User declined')) {
        showError('❌ Transaction cancelled by user');
      } else if (error.message && error.message.includes('not accessible')) {
        showError(error.message);
      } else {
        showError('Token distribution failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Teacher Panel"
      icon="👨‍🏫"
      walletAddress={walletAddress}
      setupRequired={setupRequired}
      walletLabel="Connected Wallet (Teacher)"
    >
      <StatCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <StatLabel>Total Tokens Distributed</StatLabel>
        <StatValue>{totalDistributed}</StatValue>
        <StatSubtext>Distributed to All Students</StatSubtext>
      </StatCard>

      <Section>
        <SectionTitle>Reward Student</SectionTitle>
        
        <FormGroup>
          <InputLabel htmlFor="student-address">Student Wallet Address</InputLabel>
          <Input
            id="student-address"
            type="text"
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
            placeholder="Stellar address starting with G..."
            disabled={loading}
          />
          <InputHint>
            Example: GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
          </InputHint>
        </FormGroup>

        <FormGroup>
          <InputLabel htmlFor="token-amount">Token Amount</InputLabel>
          <Input
            id="token-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g: 10"
            min="1"
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <InputLabel htmlFor="category">Reward Category</InputLabel>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            {ACHIEVEMENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
          <InputHint>
            Note: Category is only shown in UI, not sent to contract
          </InputHint>
        </FormGroup>

        <Button
          onClick={handleMintReward}
          disabled={loading || !studentAddress || !amount}
          fullWidth
          size="lg"
        >
          {loading ? 'Processing...' : 'Reward'}
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
            <strong>⚠️ Warning:</strong> Token distribution occurs on the blockchain and 
            cannot be reversed. Make sure you check the student address.
          </CardText>
        </Card>
      </Section>

      <Section>
        <SectionTitle>Reward Categories</SectionTitle>
        <CardGrid>
          {ACHIEVEMENT_CATEGORIES.map((cat) => (
            <ColoredHoverCard key={cat} $color={CATEGORY_COLORS[cat]}>
              <CardLabel>{cat}</CardLabel>
              <CardDescription>{CATEGORY_DESCRIPTIONS[cat]}</CardDescription>
            </ColoredHoverCard>
          ))}
        </CardGrid>
      </Section>
    </DashboardLayout>
  );
}
