'use client'

import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.toString()} 0%,
    ${({ theme }) => theme.colors.surface.toString()} 100%
  );
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

export const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
`

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  border: 2px solid ${({ theme }) => theme.colors.border.toString()};
  border-radius: ${({ theme }) => theme.border.radius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: all 0.2s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

