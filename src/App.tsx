import React, { ReactElement, useState } from 'react'
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap'

const App = (): ReactElement => {
  const [inputTodo, setInputTodo] = useState('')
  const [errorInputTodo, setErrorInputTodo] = useState('')

  const inputTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setErrorInputTodo(!newValue ? 'Please fill todo' : '')
    setInputTodo(newValue)
  }

  return (
    <Container style={{ maxWidth: '500px' }} className="mt-5">
      <Row>
        <Col>
          <h1 data-testid="app-title">Todoo</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex align-items-baseline">
          <InputGroup hasValidation>
            <FormControl
              data-testid="app-input"
              value={inputTodo}
              onChange={inputTodoHandler}
              required
              isInvalid={!!errorInputTodo}
            />
            {errorInputTodo && (
              <FormControl.Feedback
                type="invalid"
                data-testid="app-input-error"
              >
                {errorInputTodo}
              </FormControl.Feedback>
            )}
          </InputGroup>
          <Button
            variant="primary"
            style={{ width: '30%' }}
            data-testid="app-button-add-todo"
          >
            Add Todo
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default App
