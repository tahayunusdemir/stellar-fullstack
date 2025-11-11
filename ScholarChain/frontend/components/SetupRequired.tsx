'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from './Card';

const SetupContainer = styled(Card)`
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground.toString()};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Message = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.secondary.toString()};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const StepsList = styled.ol`
  text-align: left;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  max-width: 600px;
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

const Step = styled.li`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.foreground.toString()};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.8;
  
  strong {
    color: ${({ theme }) => theme.colors.primary.toString()};
  }
  
  code {
    background: ${({ theme }) => theme.colors.surface.toString()};
    padding: 0.25rem 0.5rem;
    border-radius: ${({ theme }) => theme.border.radius.sm};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.primary.toString()};
  }
`;

const InfoBox = styled.div`
  background: ${({ theme }) => `${theme.colors.primary.toString()}10`};
  border: 1px solid ${({ theme }) => `${theme.colors.primary.toString()}40`};
  border-radius: ${({ theme }) => theme.border.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: left;
`;

const InfoTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.toString()};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const InfoText = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary.toString()};
  line-height: 1.6;
`;

interface SetupRequiredProps {
  errorMessage?: string;
}

export function SetupRequired({ errorMessage }: SetupRequiredProps) {
  return (
    <SetupContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Smart Contract Setup Required</Title>
      <Message>
        To use the application, you need to deploy and configure your smart contract first.
      </Message>

      <StepsList>
        <Step>
          <strong>Build the Smart Contract:</strong>
          <br />
          <code>cd ScholarChain/contracts/scholar_chain</code>
          <br />
          <code>cargo build --target wasm32-unknown-unknown --release</code>
        </Step>
        
        <Step>
          <strong>Deploy to Testnet:</strong>
          <br />
          <code>stellar contract deploy --wasm target/wasm32-unknown-unknown/release/scholar_chain.wasm --network testnet</code>
        </Step>
        
        <Step>
          <strong>Copy the Contract ID:</strong>
          <br />
          Note down the 56-character ID starting with <code>C...</code> that you receive after deployment.
        </Step>
        
        <Step>
          <strong>Edit .env.local File:</strong>
          <br />
          Open <code>ScholarChain/frontend/.env.local</code> file and:
          <br />
          Paste your ID in the <code>NEXT_PUBLIC_CONTRACT_ID=YOUR_CONTRACT_ID</code> line.
        </Step>
        
        <Step>
          <strong>Restart Development Server:</strong>
          <br />
          Stop with <code>Ctrl+C</code> in terminal, then start again with <code>npm run dev</code>.
        </Step>
      </StepsList>

      <InfoBox>
        <InfoTitle>
          <span>Need Help?</span>
        </InfoTitle>
        <InfoText>
          For detailed setup instructions, see <strong>DEPLOYMENT_GUIDE.md</strong>.
          <br />
          To transact on Stellar Testnet, get free XLM tokens from 
          <a href="https://laboratory.stellar.org/#account-creator?network=test" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {' '}Friendbot
          </a>.
        </InfoText>
      </InfoBox>
    </SetupContainer>
  );
}

