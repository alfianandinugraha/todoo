import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Todo } from 'Types'

interface UpdateModalProps {
  todo: Todo
  isShow: boolean
  closeModal: (status: boolean) => void
}

const UpdateModal = ({
  todo,
  isShow,
  closeModal,
}: UpdateModalProps): React.ReactElement => {
  const closeModalHandler = () => closeModal(false)

  return (
    <Modal show={isShow} onHide={closeModalHandler} data-testid="update-modal">
      <Modal.Header closeButton>
        <Modal.Title>Update Todo</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateModal
