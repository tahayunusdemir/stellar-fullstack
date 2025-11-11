'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

// Stat Card - Gradient background for important stats
export const StatCard = styled(motion.div)<{ $gradient?: boolean }>`
  background: ${({ theme, $gradient }) =>
    $gradient
      ? `linear-gradient(135deg, ${theme.colors.primary.toString()}, ${theme.colors.gold.toString()})`
      : theme.colors.surface.toString()
  };
  border: ${({ $gradient }) => $gradient ? 'none' : '2px solid'};
  border-color: ${({ theme }) => theme.colors.border.toString()};
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  color: ${({ $gradient }) => $gradient ? 'white' : 'inherit'};
  transition: all 0.2s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`

// Stats Grid
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

// Stat Header
export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// Stat Icon
export const StatIcon = styled.div`
  font-size: 2.5rem;
`

// Stat Label
export const StatLabel = styled.div<{ $light?: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme, $light }) => 
    $light ? 'rgba(255,255,255,0.9)' : theme.colors.secondary.toString()
  };
`

// Stat Value
export const StatValue = styled.div<{ $light?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: ${({ theme, $light }) => 
    $light ? 'white' : theme.colors.foreground.toString()
  };
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

// Stat Subtext
export const StatSubtext = styled.div<{ $light?: boolean }>`
  font-size: ${({ theme }) => theme.designTokens.fontSize.sm};
  color: ${({ theme, $light }) => 
    $light ? 'rgba(255,255,255,0.8)' : theme.colors.secondary.toString()
  };
`

