'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Button = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['fullWidth'].includes(prop),
})<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.border.radius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  border: none;
  white-space: nowrap;
  
  /* Size variants */
  ${({ size = 'md', theme }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: 0.875rem;
        `
      case 'lg':
        return `
          padding: ${theme.spacing.md} ${theme.spacing['2xl']};
          font-size: 1.125rem;
        `
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: 1rem;
        `
    }
  }}
  
  /* Color variants */
  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.surface};
          color: ${theme.colors.foreground};
          border: 1px solid ${theme.colors.border};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.border};
          }
        `
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            color: white;
          }
        `
      default:
        return `
          background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.gold});
          color: white;
          box-shadow: ${theme.shadow.md};
          
          &:hover:not(:disabled) {
            box-shadow: ${theme.shadow.lg};
            transform: translateY(-2px);
          }
        `
    }
  }}
  
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`

Button.defaultProps = {
  whileTap: { scale: 0.98 },
}

