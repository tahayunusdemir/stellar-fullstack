'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.toString()} 0%,
    ${({ theme }) => theme.colors.surface.toString()} 100%
  );
`

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  text-align: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`

const Title = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.foreground.toString()};
  text-shadow: 0 2px 10px ${({ theme }) => theme.colors.primary.alpha(0.2)};
  will-change: transform, opacity;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.primary.toString()},
      ${({ theme }) => theme.colors.gold.toString()},
      transparent
    );
    border-radius: 2px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 80%;
    }
  }
`

const Subtitle = styled(motion.p)`
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: ${({ theme }) => theme.colors.secondary.toString()};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.75;
  will-change: transform, opacity;
`

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  border: 2px solid ${({ theme }) => theme.colors.border.toString()};
  border-radius: ${({ theme }) => theme.border.radius.xl};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.toString()};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: all 0.2s ease;
`

const BackgroundGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.primary.alpha(0.2)} 0%,
    transparent 70%
  );
  filter: blur(60px);
  pointer-events: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 400px;
    height: 400px;
  }
`

interface HeroProps {
  children: React.ReactNode
}

export function Hero({ children }: HeroProps) {
  return (
    <HeroSection>
      <BackgroundGlow />
      <HeroContent>{children}</HeroContent>
    </HeroSection>
  )
}

Hero.Title = Title
Hero.Title.defaultProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

Hero.Subtitle = Subtitle
Hero.Subtitle.defaultProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.1 },
}

Hero.Badge = Badge
Hero.Badge.defaultProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}
