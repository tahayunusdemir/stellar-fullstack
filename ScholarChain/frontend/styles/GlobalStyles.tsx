'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Font smoothing - Stellar style */
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  /* Dynamic viewport height - Stellar pattern */
  html, body {
    height: 100%;
    height: 100dvh;
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    transition: background-color ${({ theme }) => theme.transition.normal}, 
                color ${({ theme }) => theme.transition.normal};
    line-height: 1.6;
  }

  /* Typography - Stellar inspired */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading}, serif;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: -0.01em;
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    margin: 0;
    line-height: 1.75;
  }

  /* Code blocks */
  code, pre {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.9em;
  }

  pre {
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.border.radius.md};
    overflow-x: auto;
  }

  /* Links */
  a {
    color: inherit;
    text-decoration: none;
    transition: color ${({ theme }) => theme.transition.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    transition: all ${({ theme }) => theme.transition.fast};
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Lists */
  ul, ol {
    list-style: none;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  /* Focus visible - accessibility */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  /* Scrollbar - modern style */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
  }

  /* Utilities */
  .container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 0 ${({ theme }) => theme.spacing.xl};
    }
    
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      padding: 0 ${({ theme }) => theme.spacing['2xl']};
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`

export default GlobalStyles

