import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import React from 'react'
import App from './App'

const setInputValue = (value: string) => ({
  target: {
    value,
  },
})

beforeEach(() => {
  document.body.innerHTML = ''
})

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

  it('remove input after click button add todo', () => {
    const { getByTestId } = render(<App />)
    fireEvent.change(getByTestId('app-input'), {
      target: {
        value: 'Buy milk',
      },
    })
    fireEvent.click(getByTestId('app-button-add-todo'))

    expect((getByTestId('app-input') as HTMLInputElement).value).toBe('')
  })

  it('Show error when input is empty after click button add todo', () => {
    const { getByTestId } = render(<App />)
    fireEvent.click(getByTestId('app-button-add-todo'))

    expect(getByTestId('app-input-error').innerHTML).toBe('Please fill todo')
  })
})

describe('App handle todo item', () => {
  it('Show todo body', () => {
    const { getByTestId } = render(<App />)
    fireEvent.change(getByTestId('app-input'), {
      target: {
        value: 'Buy milk',
      },
    })
    fireEvent.click(getByTestId('app-button-add-todo'))
    expect(getByTestId('todo-body').innerHTML).toBe('Buy milk')
  })

  it('todo not show if input is empty', () => {
    const { getByTestId, queryByTestId } = render(<App />)
    fireEvent.click(getByTestId('app-button-add-todo'))
    expect(queryByTestId('todo-body')).not.toBeInTheDocument()
  })

  it('todo not found if not input before', () => {
    const { queryByTestId } = render(<App />)
    expect(queryByTestId('todo-item')).not.toBeInTheDocument()
  })

  it('delete todo from dom', () => {
    const { getByTestId, queryByTestId } = render(<App />)
    fireEvent.change(getByTestId('app-input'), setInputValue('buy egg'))
    fireEvent.click(getByTestId('app-button-add-todo'))
    fireEvent.click(getByTestId('delete-todo'))
    expect(queryByTestId('todo-item')).not.toBeInTheDocument()
  })
})

describe('Handle modal UpdateModal', () => {
  it('show modal', () => {
    const { getByTestId, queryByTestId } = render(<App />)

    expect(queryByTestId('update-modal')).not.toBeInTheDocument()

    fireEvent.change(getByTestId('app-input'), setInputValue('buy egg'))
    fireEvent.click(getByTestId('app-button-add-todo'))
    fireEvent.click(getByTestId('update-todo'))

    expect(queryByTestId('update-modal')).toBeInTheDocument()
  })

  it('toggle modal', async () => {
    const { getByTestId, queryByTestId } = render(<App />)

    expect(queryByTestId('update-modal')).not.toBeInTheDocument()

    fireEvent.change(getByTestId('app-input'), setInputValue('buy egg'))
    fireEvent.click(getByTestId('app-button-add-todo'))
    fireEvent.click(getByTestId('update-todo'))

    expect(queryByTestId('update-modal')).toBeInTheDocument()

    fireEvent.click(getByTestId('close-modal'))
    await waitForElementToBeRemoved(queryByTestId('update-modal'))
    expect(queryByTestId('update-modal')).not.toBeInTheDocument()
  })

  it('input value from props', async () => {
    const { getByTestId, queryByTestId, getAllByTestId } = render(<App />)

    expect(queryByTestId('update-modal')).not.toBeInTheDocument()

    fireEvent.change(getByTestId('app-input'), setInputValue('buy egg'))
    fireEvent.click(getByTestId('app-button-add-todo'))
    fireEvent.change(getByTestId('app-input'), setInputValue('buy fruit'))
    fireEvent.click(getByTestId('app-button-add-todo'))
    fireEvent.click(getAllByTestId('update-todo')[0])

    expect((getByTestId('update-todo-content') as HTMLInputElement).value).toBe(
      'buy fruit'
    )
  })

  it('update todo from modal', async () => {
    const { getByTestId, queryByTestId, getByText } = render(<App />)

    expect(queryByTestId('update-modal')).not.toBeInTheDocument()

    fireEvent.change(getByTestId('app-input'), setInputValue('buy egg'))
    fireEvent.click(getByTestId('app-button-add-todo'))
    fireEvent.click(getByTestId('update-todo'))
    fireEvent.change(getByTestId('update-todo-content'), setInputValue('drink'))
    fireEvent.click(getByTestId('save-update'))
    await waitForElementToBeRemoved(getByTestId('update-modal'))

    expect(getByText('drink')).toBeInTheDocument()
  })
})
