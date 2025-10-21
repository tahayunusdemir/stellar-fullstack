'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

interface CardProps {
  hover?: boolean
  gradient?: boolean
  children: React.ReactNode
  className?: string
}

const StyledCard = styled(motion.div)<{ $hover?: boolean; $gradient?: boolean }>`
  background-color: ${({ theme, $gradient }) => 
    $gradient ? 'transparent' : theme.colors.background};
  background-image: ${({ theme, $gradient }) => 
    $gradient ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.gold})` : 'none'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: all ${({ theme }) => theme.transition.normal};
  
  ${({ $hover }) => $hover && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${({ theme }: any) => theme.shadow.xl};
    }
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

export function Card({ hover = false, gradient = false, children, className }: CardProps) {
  return (
    <StyledCard
      $hover={hover}
      $gradient={gradient}
      className={className}
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
  color: ${({ theme }) => theme.colors.foreground};
`

export const CardText = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.75;
  margin: 0;
`

