import '@testing-library/jest-dom'   // 👈 ADD THIS
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders heading', () => {
  render(<App />)
  expect(screen.getByText('Get started')).toBeInTheDocument()
})