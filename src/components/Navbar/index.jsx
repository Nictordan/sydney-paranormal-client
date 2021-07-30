import React from 'react'

import { navLinks } from '../../data/navLinks'

export const Navbar = () => {
  return (
    <nav>
      <ul>
        {navLinks.map(({ label, route }, index) => (
          <li key={index}>
            <a href={route}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}