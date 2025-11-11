'use client'

import { useTheme } from '@/styles/ThemeProvider'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  border: 1px solid ${({ theme }) => theme.colors.border.toString()};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  z-index: 100;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  box-shadow: ${({ theme }) => theme.shadow.md};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.span
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? '☀️' : '🌙'}
      </motion.span>
    </ToggleButton>
  )
}

