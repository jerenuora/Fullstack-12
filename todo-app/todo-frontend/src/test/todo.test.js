import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from '../Todos/Todo'

test('renders content', () => {
  const todo = {
    text: 'Tän pitäis näkyä ',
    done: true
  }

  const onClickDelete = () => {
    return null
}
const onClickComplete = () => {
    return null
}

  render(<Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />)

  const element = screen.getByText('Tän pitäis näkyä')
  expect(element).toBeDefined()
})
