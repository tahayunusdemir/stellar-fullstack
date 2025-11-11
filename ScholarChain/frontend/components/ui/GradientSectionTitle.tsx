'use client';

import styled from 'styled-components';
import { SectionTitle } from './Typography';

/**
 * Section Title with gradient underline for hero/landing pages
 */
export const GradientSectionTitle = styled(SectionTitle)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.primary.toString()},
      ${({ theme }) => theme.colors.gold.toString()},
      transparent
    );
    border-radius: 2px;
  }
`;

