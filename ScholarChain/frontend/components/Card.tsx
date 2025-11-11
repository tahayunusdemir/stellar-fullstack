'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

interface CardProps {
  hover?: boolean
  gradient?: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const StyledCard = styled(motion.div)<{ $hover?: boolean; $gradient?: boolean }>`
  background-color: ${({ theme, $gradient }) => 
    $gradient ? 'transparent' : theme.colors.surface.toString()};
  background-image: ${({ theme, $gradient }) => 
    $gradient ? `linear-gradient(135deg, ${theme.colors.primary.toString()}, ${theme.colors.gold.toString()})` : 'none'};
  border: 2px solid ${({ theme, $gradient }) => 
    $gradient ? 'transparent' : theme.colors.border.toString()};
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: all 0.2s ease;
  position: relative;
  
  ${({ $gradient }) => $gradient && `
    color: white;
    
    h1, h2, h3, h4, h5, h6, p, span {
      color: white !important;
    }
  `}
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: ${({ $gradient }) => 
      $gradient 
        ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2)' 
        : 'inset 0 1px 0 0 rgba(0, 0, 0, 0.03)'};
    pointer-events: none;
  }
  
  ${({ $hover, theme, $gradient }) => $hover && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadow.xl};
      border-color: ${$gradient ? 'transparent' : theme.colors.primary.alpha(0.5)};
    }
    
    &:active {
      transform: translateY(-2px);
    }
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

export function Card({ hover = false, gradient = false, children, className, style }: CardProps) {
  return (
    <StyledCard
      $hover={hover}
      $gradient={gradient}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </StyledCard>
  )
}

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.foreground.toString()};
  line-height: 1.3;
  letter-spacing: -0.01em;
`

export const CardText = styled.p`
  color: ${({ theme }) => theme.colors.secondary.toString()};
  line-height: 1.75;
  margin: 0;
  font-size: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.9375rem;
  }
`
