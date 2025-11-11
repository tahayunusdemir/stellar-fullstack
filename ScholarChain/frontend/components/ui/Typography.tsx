'use client'

import styled from 'styled-components'

// Page Title
export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.foreground.toString()};
  line-height: 1.2;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

// Section Title
export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.designTokens.fontSize['2xl']};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.foreground.toString()};
  line-height: 1.3;
  letter-spacing: -0.01em;
`

// Section Subtitle (for home page)
export const SectionSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary.toString()};
  font-size: ${({ theme }) => theme.designTokens.fontSize.lg};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  line-height: 1.6;
`

