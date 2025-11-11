'use client'

import styled from 'styled-components'

// Wallet Badge - Shows wallet info
export const WalletBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  border: 2px solid ${({ theme }) => theme.colors.border.toString()};
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`

// Wallet Label
export const WalletLabel = styled.div`
  font-size: ${({ theme }) => theme.designTokens.fontSize.sm};
  color: ${({ theme }) => theme.colors.secondary.toString()};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

// Wallet Address - Monospace for addresses
export const WalletAddress = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.designTokens.fontSize.sm};
  color: ${({ theme }) => theme.colors.foreground.toString()};
  word-break: break-all;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.toString()};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.toString()};
`

