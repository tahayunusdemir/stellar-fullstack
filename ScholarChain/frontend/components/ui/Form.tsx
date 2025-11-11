'use client'

import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border.toString()};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  color: ${({ theme }) => theme.colors.foreground.toString()};
  font-size: 1rem;
  font-family: inherit;
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.toString()};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.alpha(0.1)};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary.alpha(0.5)};
  }
`

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border.toString()};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  color: ${({ theme }) => theme.colors.foreground.toString()};
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.toString()};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.alpha(0.1)};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const InputLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.designTokens.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground.toString()};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const InputHint = styled.div`
  font-size: ${({ theme }) => theme.designTokens.fontSize.sm};
  color: ${({ theme }) => theme.colors.secondary.toString()};
  margin-top: ${({ theme }) => theme.spacing.sm};
  line-height: 1.4;
`

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`
