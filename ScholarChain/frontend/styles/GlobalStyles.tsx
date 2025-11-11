'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  html, body {
    height: 100%;
    height: 100dvh;
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: ${({ theme }) => theme.colors.background.toString()};
    color: ${({ theme }) => theme.colors.foreground.toString()};
    transition: background-color 0.2s ease, color 0.2s ease;
    line-height: 1.6;
  }
  
  div, section, article, aside, header, footer, nav, main {
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }
  
  h1, h2, h3, h4, h5, h6, p, span, a, label {
    transition: color 0.2s ease;
  }
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
    background-color: ${({ theme }) => theme.colors.surface.toString()};
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
      color: ${({ theme }) => theme.colors.primary.toString()};
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
    outline: 2px solid ${({ theme }) => theme.colors.primary.toString()};
    outline-offset: 2px;
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary.toString()};
    color: white;
  }

  /* Scrollbar - modern style */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface.toString()};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.toString()};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.secondary.toString()};
    }
  }

  .container {
    max-width: ${({ theme }) => theme.grid.maxWidth};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 0 ${({ theme }) => theme.spacing.xl};
    }
    
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      padding: 0 ${({ theme }) => theme.spacing['2xl']};
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(${({ theme }) => theme.grid.columns}, 1fr);
    gap: ${({ theme }) => theme.grid.gap};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-template-columns: 1fr;
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

  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: ${({ theme }) => theme.colors.primary.toString()};
    color: white;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    text-decoration: none;
    z-index: 1000;
    border-radius: ${({ theme }) => theme.border.radius.md};
    font-weight: 600;
    transition: top ${({ theme }) => theme.transition.fast};
    
    &:focus {
      top: ${({ theme }) => theme.spacing.sm};
    }
  }

  body.modal-open {
    overflow: hidden;
    padding-right: var(--scrollbar-width, 0);
  }

  .will-change {
    will-change: transform, opacity;
  }
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .truncate {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

export default GlobalStyles
