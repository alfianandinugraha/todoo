import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { Todo } from 'Types'

interface TodoItemProps {
  todo: Todo
  deleteTodo?: (id: string) => void
  updateTodo?: (id: string) => void
}

const TodoItem = ({
  todo,
  deleteTodo,
  updateTodo,
}: TodoItemProps): React.ReactElement => {
  const deleteTodoHandler = () => deleteTodo && deleteTodo(todo.id)
  const updateTodoHandler = () => updateTodo && updateTodo(todo.id)

  return (
    <div className="d-flex align-items-center" data-testid="todo-item">
      <main data-testid="todo-body">{todo.content}</main>
      <ButtonGroup className="ml-auto">
        <Button
          variant="outline-danger"
          data-testid="delete-todo"
          onClick={deleteTodoHandler}
        >
          Delete
        </Button>
        <Button
          variant="outline-primary"
          data-testid="update-todo"
          onClick={updateTodoHandler}
        >
          Update
        </Button>
      </ButtonGroup>
    </div>
  )
}

TodoItem.defaultProps = {
  deleteTodo: () => {},
  updateTodo: () => {},
}

export default TodoItem
