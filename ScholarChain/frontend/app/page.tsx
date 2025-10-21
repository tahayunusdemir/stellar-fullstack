'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { Card, CardTitle, CardText } from '@/components/Card';
import { Button } from '@/components/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import WalletConnect from '@/components/WalletConnect';

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const RoleCard = styled(motion.div)<{ $selected?: boolean }>`
  background: ${({ theme, $selected }) => 
    $selected 
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.gold})`
      : theme.colors.background
  };
  border: 2px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};
  text-align: center;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadow.xl};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RoleIcon = styled.div<{ $selected?: boolean }>`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: transform ${({ theme }) => theme.transition.normal};
  
  ${RoleCard}:hover & {
    transform: scale(1.1);
  }
`;

const RoleTitle = styled.h3<{ $selected?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ $selected }) => $selected ? 'white' : 'inherit'};
`;

const RoleDescription = styled.p<{ $selected?: boolean }>`
  color: ${({ theme, $selected }) => $selected ? 'rgba(255,255,255,0.9)' : theme.colors.secondary};
  font-size: 1rem;
  line-height: 1.6;
`;

const WalletSection = styled(motion.div)`
  max-width: 500px;
  margin: ${({ theme }) => theme.spacing['3xl']} auto 0;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const BackButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeatureSection = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const FeatureGrid = styled(Grid)`
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const FeatureCard = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.foreground},
    ${({ theme }) => theme.colors.primary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
`;

export default function Home() {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  const handleConnect = (key: string) => {
    setPublicKey(key);
    
    if (selectedRole === 'student') {
      router.push(`/student?wallet=${key}`);
    } else if (selectedRole === 'teacher') {
      router.push(`/teacher?wallet=${key}`);
    }
  };

  const handleDisconnect = () => {
    setPublicKey('');
    setSelectedRole(null);
  };

  const selectRole = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
  };

  return (
    <Container>
      <ThemeToggle />
      
      {!selectedRole ? (
        <>
          <Hero>
            <Hero.Badge
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              ⚡ Powered by Stellar Soroban
            </Hero.Badge>
            
            <Hero.Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              🎓 ScholarChain
            </Hero.Title>
            
            <Hero.Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Blockchain tabanlı öğrenci ödül platformu. Akademik başarıları 
              şeffaf ve değiştirilemez bir şekilde kaydedin.
            </Hero.Subtitle>

            <Grid>
              <RoleCard
                onClick={() => selectRole('student')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RoleIcon>👨‍🎓</RoleIcon>
                <RoleTitle>Öğrenci Girişi</RoleTitle>
                <RoleDescription>
                  Token bakiyenizi görüntüleyin ve ödüllerinizi harcayın
                </RoleDescription>
              </RoleCard>

              <RoleCard
                onClick={() => selectRole('teacher')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RoleIcon>👨‍🏫</RoleIcon>
                <RoleTitle>Öğretmen Girişi</RoleTitle>
                <RoleDescription>
                  Başarılı öğrencilere token ödülleri dağıtın
                </RoleDescription>
              </RoleCard>
            </Grid>
          </Hero>

          <FeatureSection>
            <SectionTitle>Neden ScholarChain?</SectionTitle>
            <SectionSubtitle>
              Blockchain teknolojisi ile eğitimde şeffaflık ve motivasyon
            </SectionSubtitle>
            
            <FeatureGrid>
              <FeatureCard>
                <FeatureIcon>🔐</FeatureIcon>
                <CardTitle>Güvenli</CardTitle>
                <CardText>
                  Stellar blockchain üzerinde güvenli ve şeffaf kayıtlar
                </CardText>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>⚡</FeatureIcon>
                <CardTitle>Hızlı</CardTitle>
                <CardText>
                  Soroban smart contract'ları ile anında işlem onayı
                </CardText>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>🎯</FeatureIcon>
                <CardTitle>Şeffaf</CardTitle>
                <CardText>
                  Tüm ödül kayıtları blockchain'de değiştirilemez şekilde saklanır
                </CardText>
              </FeatureCard>
            </FeatureGrid>
          </FeatureSection>
        </>
      ) : (
        <Hero>
          <BackButton
            variant="secondary"
            size="sm"
            onClick={() => setSelectedRole(null)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ← Geri
          </BackButton>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
              {selectedRole === 'student' ? '👨‍🎓' : '👨‍🏫'}
            </div>
            
            <Hero.Title>
              {selectedRole === 'student' ? 'Öğrenci' : 'Öğretmen'} Girişi
            </Hero.Title>
            
            <Hero.Subtitle>
              Devam etmek için Freighter Wallet ile bağlanın
            </Hero.Subtitle>
          </motion.div>

          <WalletSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <WalletConnect
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
            
            <Card style={{ marginTop: '2rem', textAlign: 'left' }}>
              <CardText style={{ fontSize: '0.875rem' }}>
                <strong>ℹ️ Not:</strong> Freighter Wallet&apos;ı <strong>Testnet</strong> modunda 
                kullanmayı unutmayın.
              </CardText>
            </Card>
          </WalletSection>
        </Hero>
      )}
    </Container>
  );
}
