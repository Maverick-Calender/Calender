import React from 'react'

export default function List({ children }) {
    return (
      <ul className="divide-y divide-gray-200">
        {children}
      </ul>
    )
  }
  