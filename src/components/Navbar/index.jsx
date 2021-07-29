import React from 'react'

const navLinks = [
  {
    label: 'Home',
    value: '/'
  },
  {
    label: 'Sign Up',
    value: '/sign-up'
  }
]

export const Navbar = () => {
  return (
    <nav>
      <ul>
        {navLinks.map(({ label, value }, index) => (
          <li key={index}>
            <a href={value}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}