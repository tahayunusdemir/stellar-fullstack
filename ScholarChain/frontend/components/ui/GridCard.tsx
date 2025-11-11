'use client';

import styled from 'styled-components';

/**
 * Reusable grid layouts for cards
 */

// Base grid for cards (achievements, categories, etc.)
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

// Generic hover card
export const HoverCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  border: 1px solid ${({ theme }) => theme.colors.border.toString()};
  border-radius: ${({ theme }) => theme.border.radius.lg};
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary.toString()};
  }
`;

// Colored hover card (for categories)
export const ColoredHoverCard = styled.div<{ $color: string }>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ $color }) => $color}15;
  border: 2px solid ${({ $color }) => $color}40;
  border-radius: ${({ theme }) => theme.border.radius.lg};
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $color }) => $color};
    box-shadow: 0 8px 16px ${({ $color }) => $color}30;
  }
`;

// Card icon
export const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// Card label
export const CardLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground.toString()};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// Card description
export const CardDescription = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary.toString()};
`;

