'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  isConnected,
  requestAccess,
  getPublicKey,
} from '@stellar/freighter-api'
import { Button } from './Button'
import { Card, CardText } from './Card'

const ConnectedCard = styled(Card)`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.success};
`;

const ConnectedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const ConnectedInfo = styled.div`
  flex: 1;
  min-width: 200px;
`;

const ConnectedLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ConnectedAddress = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  word-break: break-all;
`;

const WarningCard = styled(Card)`
  background: ${({ theme }) => theme.colors.gold}15;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  text-align: center;
`;

const WarningTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.125rem;
`;

const ErrorText = styled(motion.div)`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.error}15;
  border-radius: ${({ theme }) => theme.border.radius.md};
  font-weight: 500;
`;

interface WalletConnectProps {
  onConnect: (publicKey: string) => void;
  onDisconnect: () => void;
}

export default function WalletConnect({
  onConnect,
  onDisconnect,
}: WalletConnectProps) {
  const [publicKey, setPublicKey] = useState<string>('');
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkFreighterInstalled();
  }, []);

  const checkFreighterInstalled = async () => {
    try {
      const installed = await isConnected();
      setIsFreighterInstalled(installed);
      
      // If Freighter is installed, check if already connected
      if (installed) {
        try {
          const publicKey = await getPublicKey();
          if (publicKey) {
            setPublicKey(publicKey);
            onConnect(publicKey);
          }
        } catch (err) {
          // User hasn't connected yet, which is fine
        }
      }
    } catch (err) {
      console.error('Error checking Freighter:', err);
      setIsFreighterInstalled(false);
    } finally {
      setChecking(false);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await requestAccess();

      // Handle different response formats
      let address = '';
      let accessError = '';

      if (typeof response === 'string') {
        address = response;
      } else if (response && typeof response === 'object') {
        address = response.address || response.publicKey || '';
        accessError = response.error || '';
      }

      if (accessError) {
        setError(accessError);
        setLoading(false);
        return;
      }

      if (address) {
        setPublicKey(address);
        onConnect(address);
      } else {
        setError('Cüzdan adresine erişilemedi');
      }
    } catch (err: any) {
      setError(err?.message || 'Cüzdan bağlantısı başarısız oldu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setPublicKey('');
    setError('');
    onDisconnect();
  };

  if (checking) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'inline-block', fontSize: '2rem' }}
          >
            ⚡
          </motion.div>
          <CardText style={{ marginTop: '1rem' }}>
            Freighter kontrol ediliyor...
          </CardText>
        </div>
      </Card>
    );
  }

  if (!isFreighterInstalled) {
    return (
      <WarningCard>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦊</div>
        <WarningTitle>Freighter Wallet Bulunamadı</WarningTitle>
        <CardText style={{ marginBottom: '1.5rem' }}>
          Devam etmek için Freighter Wallet eklentisini yüklemeniz gerekiyor.
        </CardText>
        <Button
          as="a"
          href="https://www.freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
        >
          Freighter Wallet Yükle
        </Button>
      </WarningCard>
    );
  }

  if (publicKey) {
    return (
      <ConnectedCard
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <ConnectedHeader>
          <ConnectedInfo>
            <ConnectedLabel>
              <span>✅</span> Cüzdan Bağlandı
            </ConnectedLabel>
            <ConnectedAddress>
              {publicKey.slice(0, 12)}...{publicKey.slice(-12)}
            </ConnectedAddress>
          </ConnectedInfo>
          <Button
            onClick={disconnectWallet}
            variant="outline"
            size="sm"
          >
            Bağlantıyı Kes
          </Button>
        </ConnectedHeader>
      </ConnectedCard>
    );
  }

  return (
    <div>
      <Button
        onClick={connectWallet}
        disabled={loading}
        fullWidth
        size="lg"
      >
        {loading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block' }}
            >
              ⚡
            </motion.span>
            Bağlanıyor...
          </>
        ) : (
          <>
            🦊 Freighter ile Bağlan
          </>
        )}
      </Button>
      
      {error && (
        <ErrorText
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {error}
        </ErrorText>
      )}
    </div>
  );
}
