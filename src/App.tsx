import React, { ReactElement } from 'react'
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap'

const App = (): ReactElement => (
  <Container style={{ maxWidth: '500px' }} className="mt-5">
    <Row>
      <Col>
        <h1 data-testid="app-title">Todoo</h1>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col className="d-flex">
        <FormControl data-testid="app-input" />
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

export default App
