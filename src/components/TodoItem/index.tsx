import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Todo } from 'Types'

interface TodoItemProps {
  todo: Todo
}

const TodoItem = ({ todo }: TodoItemProps): React.ReactElement => (
  <ListGroup.Item>
    <main data-testid="todo-body">{todo.content}</main>
  </ListGroup.Item>
)

export default TodoItem
