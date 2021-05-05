import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Todo } from 'Types'
import TodoItem from '.'

describe('check todo on dom', () => {
  it('show todo body', () => {
    const todo: Todo = {
      id: Math.random().toString(),
      content: 'Eat food',
    }

    const { getByTestId } = render(<TodoItem todo={todo} />)
    expect(getByTestId('todo-body').innerHTML).toBe('Eat food')
  })
})

describe('check if props called', () => {
  it('delete button called', () => {
    const deleteTodo = jest.fn()
    const todo: Todo = {
      id: '5',
      content: 'Eat food',
    }
    const { getByTestId } = render(
      <TodoItem todo={todo} deleteTodo={deleteTodo} />
    )
    fireEvent.click(getByTestId('delete-todo'))
    expect(deleteTodo).toBeCalledTimes(1)
    expect(deleteTodo.mock.calls[0][0]).toBe('5')
  })

  it('function delete not called if it is not pass', () => {
    const deleteTodo = jest.fn()
    const todo: Todo = {
      id: '5',
      content: 'Eat food',
    }
    render(<TodoItem todo={todo} deleteTodo={deleteTodo} />)
    expect(deleteTodo).toBeCalledTimes(0)
  })
})
