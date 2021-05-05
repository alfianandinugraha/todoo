import React, { ReactElement, useState } from 'react'
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { Todo } from 'Types'
import TodoItem from './components/TodoItem'

const App = (): ReactElement => {
  const [inputTodo, setInputTodo] = useState('')
  const [errorInputTodo, setErrorInputTodo] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  const inputTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setErrorInputTodo(!newValue ? 'Please fill todo' : '')
    setInputTodo(newValue)
  }

  const addTodoHandler = () => {
    setErrorInputTodo(!inputTodo ? 'Please fill todo' : '')
    setInputTodo('')

    if (inputTodo)
      setTodos([{ id: Math.random().toString(), content: inputTodo }, ...todos])
  }

  const deleteTodoHandler = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const updateTodoHandler = (newTodo: Todo) => {
    const newTodos = todos.map((todo) =>
      todo.id === newTodo.id ? newTodo : todo
    )
    setTodos(newTodos)
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
            onClick={addTodoHandler}
          >
            Add Todo
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <ListGroup>
            {todos.map((todo) => (
              <ListGroup.Item key={todo.id}>
                <TodoItem
                  todo={todo}
                  deleteTodo={deleteTodoHandler}
                  updateTodo={updateTodoHandler}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default App
