import React, { useState } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { Todo } from 'Types'
import UpdateModal from '@/components/UpdateModal'

interface TodoItemProps {
  todo: Todo
  deleteTodo?: (id: string) => void
  updateTodo?: (todo: Todo) => void
}

const TodoItem = ({
  todo,
  deleteTodo,
  updateTodo,
}: TodoItemProps): React.ReactElement => {
  const [isUpdateModalShow, setIsUpdateModalShow] = useState(false)
  const deleteTodoHandler = () => {
    if (deleteTodo) {
      deleteTodo(todo.id)
    }
  }
  const showUpdateModal = () => {
    setIsUpdateModalShow(true)
  }

  const closeModalHandler = () => {
    setIsUpdateModalShow(false)
  }

  const newTodoHandler = (newTodo: Todo) => {
    if (updateTodo) {
      updateTodo(newTodo)
    }
  }

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
          onClick={showUpdateModal}
        >
          Update
        </Button>
      </ButtonGroup>
      <UpdateModal
        isShow={isUpdateModalShow}
        closeModal={closeModalHandler}
        todo={todo}
        newTodo={newTodoHandler}
      />
    </div>
  )
}

TodoItem.defaultProps = {
  deleteTodo: () => {},
  updateTodo: () => {},
}

export default TodoItem
