'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'fullWidth', 'loading', 'icon', 'iconPosition'].includes(prop),
})<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.border.radius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};
  border: none;
  white-space: nowrap;
  position: relative;
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.toString()};
    outline-offset: 2px;
  }  
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
  
  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.surface.toString()};
          color: ${theme.colors.foreground.toString()};
          border: 2px solid ${theme.colors.border.toString()};
          box-shadow: ${theme.shadow.sm};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.border.toString()};
            border-color: ${theme.colors.foreground.alpha(0.3)};
            box-shadow: ${theme.shadow.md};
          }
        `
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary.toString()};
          border: 2px solid ${theme.colors.primary.toString()};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary.toString()};
            color: white;
            box-shadow: ${theme.shadow.md};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary.alpha(0.9)};
          }
        `
      default:
        return `
          background: linear-gradient(135deg, ${theme.colors.primary.toString()}, ${theme.colors.gold.toString()});
          color: white;
          border: none;
          box-shadow: ${theme.shadow.md};
          font-weight: 600;
          
          &:hover:not(:disabled) {
            box-shadow: ${theme.shadow.lg};
            transform: translateY(-2px);
            filter: brightness(1.05);
          }
          
          &:active:not(:disabled) {
            transform: translateY(-1px);
            filter: brightness(0.95);
          }
        `
    }
  }}
  
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  
  ${({ loading }) => loading && `
    pointer-events: none;
    opacity: 0.7;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:hover:not(:disabled):not([aria-disabled="true"]) {
    transition: all ${({ theme }) => theme.transition.fast};
  }
`

Button.defaultProps = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
}
