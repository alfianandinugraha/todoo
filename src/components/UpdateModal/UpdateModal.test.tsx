import { render } from '@testing-library/react'
import React from 'react'
import { Todo } from 'Types'
import UpdateModal from '.'

const todo: Todo = {
  id: '5',
  content: 'Eat food',
}

describe('UpdateModal test dom', () => {
  it('show UpdatModal on DOM', () => {
    const closeModal = jest.fn()
    const { getByTestId } = render(
      <UpdateModal isShow closeModal={closeModal} todo={todo} />
    )
    expect(getByTestId('update-modal')).toBeInTheDocument()
  })

  it('UpdateModal not show', () => {
    const closeModal = jest.fn()
    const { queryByTestId } = render(
      <UpdateModal isShow={false} closeModal={closeModal} todo={todo} />
    )
    expect(queryByTestId('update-modal')).not.toBeInTheDocument()
  })
})
