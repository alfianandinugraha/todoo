import React from 'react'
import { ButtonGroup, ListGroup, Button } from 'react-bootstrap'
import { Todo } from 'Types'

interface TodoItemProps {
  todo: Todo
  deleteTodo?: (id: string) => void
}

const TodoItem = ({ todo, deleteTodo }: TodoItemProps): React.ReactElement => {
  const deleteTodoHandler = () => deleteTodo && deleteTodo(todo.id)

  return (
    <ListGroup.Item
      className="d-flex align-items-center"
      data-testid="todo-item"
    >
      <main data-testid="todo-body">{todo.content}</main>
      <ButtonGroup className="ml-auto">
        <Button
          variant="danger"
          data-testid="delete-todo"
          onClick={deleteTodoHandler}
        >
          Delete
        </Button>
      </ButtonGroup>
    </ListGroup.Item>
  )
}

TodoItem.defaultProps = {
  deleteTodo: () => {},
}

export default TodoItem
