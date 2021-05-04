import { render } from '@testing-library/react'
import React from 'react'
import App from './App'

describe('Render app on dom', () => {
  it('check title', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('app-title')).toBeInTheDocument()
  })

  it('check form', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('app-input')).toBeInTheDocument()
    expect(getByTestId('app-button-add-todo')).toBeInTheDocument()
  })
})
