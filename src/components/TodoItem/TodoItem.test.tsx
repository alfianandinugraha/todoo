import { render } from '@testing-library/react'
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
