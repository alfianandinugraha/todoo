import React, { useState } from 'react'
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap'
import { Todo } from 'Types'

interface UpdateModalProps {
  todo: Todo
  isShow: boolean
  closeModal: (status: boolean) => void
  newTodo?: (todo: Todo) => void
}

const UpdateModal = ({
  todo,
  isShow,
  closeModal,
  newTodo,
}: UpdateModalProps): React.ReactElement => {
  const [inputTodo, setInputTodo] = useState(todo.content)
  const [isInputError, setIsInputError] = useState(false)
  const closeModalHandler = () => closeModal(false)

  const saveTodoHandler = () => {
    if (!newTodo) return

    if (!inputTodo) {
      setIsInputError(!inputTodo)
      return
    }

    closeModal(false)
    newTodo({ ...todo, content: inputTodo })
  }

  const inputTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setIsInputError(!newValue)
    setInputTodo(newValue)
  }

  return (
    <Modal show={isShow} onHide={closeModalHandler} data-testid="update-modal">
      <Modal.Header closeButton>
        <Modal.Title>Update Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <FormControl
            type="text"
            value={inputTodo}
            data-testid="update-todo-content"
            onChange={inputTodoHandler}
          />
          {isInputError && (
            <FormControl.Feedback
              type="invalid"
              data-testid="update-todo-error"
            >
              Please fill todo
            </FormControl.Feedback>
          )}
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          data-testid="close-modal"
          onClick={closeModalHandler}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={saveTodoHandler}
          data-testid="save-update"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

UpdateModal.defaultProps = {
  newTodo: () => {},
}

export default UpdateModal
