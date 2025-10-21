'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { mintReward, getTotalDistributed } from '@/lib/stellar';
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

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.gold});
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  color: white;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatSubtext = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
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

const FormGroup = styled.div`
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
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${({ theme }) => theme.fonts.body};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const CategoryCard = styled.div<{ $color: string }>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ $color }) => $color}15;
  border: 2px solid ${({ $color }) => $color}40;
  border-radius: ${({ theme }) => theme.border.radius.lg};
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $color }) => $color};
    box-shadow: 0 8px 16px ${({ $color }) => $color}30;
  }
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CategoryLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CategoryDesc = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default function TeacherPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('wallet') || '';

  const [studentAddress, setStudentAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Katılım');
  const [totalDistributed, setTotalDistributed] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = ['Katılım', 'Ödev', 'Sınav', 'Proje'];

  useEffect(() => {
    if (!walletAddress) {
      router.push('/');
      return;
    }
    loadTotalDistributed();
  }, [walletAddress]);

  const loadTotalDistributed = async () => {
    try {
      const total = await getTotalDistributed();
      setTotalDistributed(total);
    } catch (error) {
      console.error('Failed to load total:', error);
    }
  };

  const handleMintReward = async () => {
    if (!studentAddress.trim()) {
      setMessage({ type: 'error', text: 'Öğrenci adresi gerekli' });
      return;
    }

    const tokenAmount = parseInt(amount);
    if (!tokenAmount || tokenAmount <= 0) {
      setMessage({ type: 'error', text: 'Geçerli bir miktar girin' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const newBalance = await mintReward(walletAddress, studentAddress, tokenAmount);
      
      await loadTotalDistributed();
      
      setStudentAddress('');
      setAmount('');
      setCategory('Katılım');
      
      setMessage({
        type: 'success',
        text: `✅ ${tokenAmount} token başarıyla dağıtıldı! Öğrencinin yeni bakiyesi: ${newBalance}`,
      });
      
      console.log('Reward distributed successfully:', {
        student: studentAddress,
        amount: tokenAmount,
        category,
        newBalance,
      });
    } catch (error) {
      console.error('Mint failed:', error);
      setMessage({ type: 'error', text: 'Token dağıtımı başarısız oldu' });
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
          <span>👨‍🏫</span>
          Öğretmen Paneli
        </Title>
      </Header>

      <Content>
        <WalletBadge>
          <WalletLabel>Bağlı Cüzdan (Öğretmen)</WalletLabel>
          <WalletAddress>
            {walletAddress.slice(0, 16)}...{walletAddress.slice(-16)}
          </WalletAddress>
        </WalletBadge>

        <StatCard
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <StatLabel>Toplam Dağıtılan Token</StatLabel>
          <StatValue>{totalDistributed}</StatValue>
          <StatSubtext>Tüm Öğrencilere Dağıtılan</StatSubtext>
        </StatCard>

        <Section>
          <SectionTitle>🎁 Öğrenci Ödüllendir</SectionTitle>
          
          <FormGroup>
            <InputLabel htmlFor="student-address">Öğrenci Wallet Adresi</InputLabel>
            <Input
              id="student-address"
              type="text"
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
              placeholder="G... ile başlayan Stellar adresi"
              disabled={loading}
            />
            <InputHint>
              Örnek: GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            </InputHint>
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="token-amount">Token Miktarı</InputLabel>
            <Input
              id="token-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Örn: 10"
              min="1"
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="category">Ödül Kategorisi</InputLabel>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <InputHint>
              Not: Kategori sadece UI&apos;da gösterilir, contract&apos;a gönderilmez
            </InputHint>
          </FormGroup>

          <Button
            onClick={handleMintReward}
            disabled={loading || !studentAddress || !amount}
            fullWidth
            size="lg"
          >
            {loading ? '⏳ İşlem Yapılıyor...' : '✨ Ödüllendir'}
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
              <strong>⚠️ Dikkat:</strong> Token dağıtımı blockchain üzerinde gerçekleşir ve 
              geri alınamaz. Öğrenci adresini kontrol ettiğinizden emin olun.
            </CardText>
          </Card>
        </Section>

        <Section>
          <SectionTitle>📈 Ödül Kategorileri</SectionTitle>
          <CategoryGrid>
            <CategoryCard $color="#10B981">
              <CategoryIcon>📚</CategoryIcon>
              <CategoryLabel>Katılım</CategoryLabel>
              <CategoryDesc>Ders katılımı</CategoryDesc>
            </CategoryCard>
            
            <CategoryCard $color="#3B82F6">
              <CategoryIcon>📝</CategoryIcon>
              <CategoryLabel>Ödev</CategoryLabel>
              <CategoryDesc>Ödev tamamlama</CategoryDesc>
            </CategoryCard>
            
            <CategoryCard $color="#8B5CF6">
              <CategoryIcon>🎯</CategoryIcon>
              <CategoryLabel>Sınav</CategoryLabel>
              <CategoryDesc>Sınav başarısı</CategoryDesc>
            </CategoryCard>
            
            <CategoryCard $color="#F59E0B">
              <CategoryIcon>🚀</CategoryIcon>
              <CategoryLabel>Proje</CategoryLabel>
              <CategoryDesc>Proje teslimi</CategoryDesc>
            </CategoryCard>
          </CategoryGrid>
        </Section>
      </Content>
    </Container>
  );
}
