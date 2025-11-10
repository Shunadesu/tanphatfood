import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'primary-outline' | 'secondary'
  children: ReactNode
}

interface ButtonLinkProps extends LinkProps {
  variant?: 'primary' | 'primary-outline' | 'secondary'
  children: ReactNode
  className?: string
}

// Button Component
export const Button = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const variantClass = {
    primary: 'button-primary',
    'primary-outline': 'button-primary-outline',
    secondary: 'button-secondary',
  }[variant]

  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ButtonLink Component (for Next.js Link)
export const ButtonLink = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonLinkProps) => {
  const variantClass = {
    primary: 'button-primary',
    'primary-outline': 'button-primary-outline',
    secondary: 'button-secondary',
  }[variant]

  return (
    <Link className={`${variantClass} ${className}`} {...props}>
      {children}
    </Link>
  )
}

export default Button









