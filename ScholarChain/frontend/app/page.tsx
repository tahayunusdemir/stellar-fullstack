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
import { Grid, SectionSubtitle, GradientSectionTitle } from '@/components/ui';

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const RoleCard = styled(motion.div)<{ $selected?: boolean }>`
  background: ${({ theme, $selected }) => 
    $selected 
      ? `linear-gradient(135deg, ${theme.colors.primary.toString()}, ${theme.colors.gold.toString()})`
      : theme.colors.surface.toString()
  };
  border: 2px solid ${({ theme, $selected }) => 
    $selected ? 'transparent' : theme.colors.border.toString()
  };
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadow.xl};
    border-color: ${({ theme, $selected }) => 
      $selected ? 'transparent' : theme.colors.primary.toString()
    };
  }
  
  &:active {
    transform: translateY(-4px);
  }
`;

const RoleIcon = styled.div<{ $selected?: boolean }>`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: transform 0.2s ease;
  filter: ${({ $selected }) => $selected ? 'drop-shadow(0 2px 8px rgba(255,255,255,0.3))' : 'none'};
  
  ${RoleCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const RoleTitle = styled.h3<{ $selected?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, $selected }) => $selected ? 'white' : theme.colors.foreground.toString()};
  letter-spacing: -0.01em;
`;

const RoleDescription = styled.p<{ $selected?: boolean }>`
  color: ${({ theme, $selected }) => 
    $selected ? 'rgba(255,255,255,0.95)' : theme.colors.secondary.toString()
  };
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
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  border-top: 1px solid ${({ theme }) => theme.colors.border.toString()};
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

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  border-top: 1px solid ${({ theme }) => theme.colors.border.toString()};
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.secondary.toString()};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PoweredBy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StellarLogo = styled.img`
  height: 32px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const PoweredByText = styled.span`
  color: ${({ theme }) => theme.colors.secondary.toString()};
  font-size: 0.875rem;
  font-weight: 500;
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
              ScholarChain
            </Hero.Title>
            
            <Hero.Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Blockchain-based student reward platform. Record academic achievements 
              transparently and immutably.
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
                <RoleTitle>Student Login</RoleTitle>
                <RoleDescription>
                  View your token balance and spend your rewards
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
                <RoleTitle>Teacher Login</RoleTitle>
                <RoleDescription>
                  Distribute token rewards to successful students
                </RoleDescription>
              </RoleCard>
            </Grid>
          </Hero>

          <FeatureSection>
            <GradientSectionTitle>Why ScholarChain?</GradientSectionTitle>
            <SectionSubtitle>
              Transparency and motivation in education through blockchain technology
            </SectionSubtitle>
            
            <FeatureGrid>
              <FeatureCard>
                <CardTitle>Secure</CardTitle>
                <CardText>
                  Secure and transparent records on Stellar blockchain
                </CardText>
              </FeatureCard>

              <FeatureCard>
                <CardTitle>Fast</CardTitle>
                <CardText>
                  Instant transaction confirmation with Soroban smart contracts
                </CardText>
              </FeatureCard>

              <FeatureCard>
                <CardTitle>Transparent</CardTitle>
                <CardText>
                  All reward records stored immutably on the blockchain
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
            ← Back
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
              {selectedRole === 'student' ? 'Student' : 'Teacher'} Login
            </Hero.Title>
            
            <Hero.Subtitle>
              Connect with Freighter Wallet to continue
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
                <strong>Note:</strong> Remember to use Freighter Wallet in <strong>Testnet</strong> mode.
              </CardText>
            </Card>
          </WalletSection>
        </Hero>
      )}
      
      <Footer>
        <FooterContent>
          <FooterText>
            © 2025 ScholarChain. Blockchain-based student reward platform.
          </FooterText>
          <PoweredBy>
            <PoweredByText>Powered by</PoweredByText>
            <a href="https://stellar.org" target="_blank" rel="noopener noreferrer">
              <StellarLogo 
                src="/stellar-logo.svg" 
                alt="Stellar" 
              />
            </a>
          </PoweredBy>
        </FooterContent>
      </Footer>
    </Container>
  );
}
