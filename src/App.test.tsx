import { fireEvent, render } from '@testing-library/react'
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

describe('form add todo', () => {
  it('show error message', () => {
    const { getByTestId } = render(<App />)
    fireEvent.change(getByTestId('app-input'), {
      target: {
        value: 'Buy milk',
      },
    })
    fireEvent.change(getByTestId('app-input'), {
      target: {
        value: '',
      },
    })

    expect(getByTestId('app-input-error').innerHTML).toBe('Please fill todo')
  })

  it('remove error message', () => {
    const { getByTestId, queryByTestId } = render(<App />)
    fireEvent.change(getByTestId('app-input'), {
      target: {
        value: 'Buy milk',
      },
    })
    fireEvent.change(getByTestId('app-input'), {
      target: {
        value: '',
      },
    })
    fireEvent.change(getByTestId('app-input'), {
      target: {
        value: 'Buy meat',
      },
    })

    expect(queryByTestId('app-input-error')).not.toBeInTheDocument()
  })
})
