import React from 'react'
import { ButtonGroup, ListGroup, Button } from 'react-bootstrap'
import { Todo } from 'Types'

interface TodoItemProps {
  todo: Todo
}

const TodoItem = ({ todo }: TodoItemProps): React.ReactElement => (
  <ListGroup.Item className="d-flex align-items-center">
    <main data-testid="todo-body">{todo.content}</main>
    <ButtonGroup className="ml-auto">
      <Button variant="danger">Delete</Button>
    </ButtonGroup>
  </ListGroup.Item>
)

export default TodoItem
