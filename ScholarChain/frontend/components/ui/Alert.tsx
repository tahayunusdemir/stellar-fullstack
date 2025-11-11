'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

// Alert component for success/error messages
export const Alert = styled(motion.div)<{ $type: 'success' | 'error' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.border.radius.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme, $type }) =>
    $type === 'success' 
      ? `${theme.colors.success.toString()}15` 
      : `${theme.colors.error.toString()}15`
  };
  border: 2px solid ${({ theme, $type }) =>
    $type === 'success' 
      ? theme.colors.success.toString() 
      : theme.colors.error.toString()
  };
  color: ${({ theme, $type }) =>
    $type === 'success' 
      ? theme.colors.success.toString() 
      : theme.colors.error.toString()
  };
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &::before {
    content: ${({ $type }) => $type === 'success' ? '"✓"' : '"✕"'};
    font-size: 1.25rem;
  }
`

// Default animation props
Alert.defaultProps = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
}

