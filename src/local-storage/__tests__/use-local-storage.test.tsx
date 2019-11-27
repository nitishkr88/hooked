import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import useLocalStorage from 'local-storage/use-local-storage'

describe('useLocalStorage hook', () => {
  it('should return/save initial value supplied', () => {
    const MyAwesomeComponent = () => {
      const [name] = useLocalStorage<string>('name', 'marley')

      return <div data-testid="value">{name}</div>
    }

    const { getByTestId } = render(<MyAwesomeComponent />)

    expect(getByTestId('value')).toHaveTextContent('marley')
    expect(localStorage.getItem('name')).toBe('marley')
  })

  it('should set and return new value', () => {
    const MyAwesomeComponent = () => {
      const [name, setName] = useLocalStorage<string>('name', 'marley')
      const handleChange = e => setName(e.target.value)
      return (
        <input
          type="text"
          aria-label="name-input"
          value={name}
          onChange={handleChange}
        />
      )
    }

    const { getByLabelText } = render(<MyAwesomeComponent />)
    const input = getByLabelText('name-input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'bob' } })
    expect(input.value).toBe('bob')
  })

  it('should allow setter to be a function, similar to useState', () => {
    const MyAwesomeComponent = () => {
      const [count, setCount] = useLocalStorage<string>('count', '0')

      const incr = () => setCount(c => String(parseInt(c) + 1))
      const decr = () => setCount(c => String(parseInt(c) - 1))

      return (
        <>
          <div data-testid="count">{count}</div>
          <button onClick={incr}>+</button>
          <button onClick={decr}>-</button>
        </>
      )
    }

    const { getByTestId, getByText } = render(<MyAwesomeComponent />)
    expect(getByTestId('count')).toHaveTextContent('0')

    const incrButton = getByText('+')
    const decrButton = getByText('-')

    fireEvent.click(incrButton)
    expect(getByTestId('count')).toHaveTextContent('1')

    fireEvent.click(decrButton)
    expect(getByTestId('count')).toHaveTextContent('0')
  })

  it('should update the localStorage', () => {
    const MyAwesomeComponent = () => {
      const [name, setName] = useLocalStorage('name')
      const handleChange = e => setName(e.target.value)
      return (
        <input
          type="text"
          aria-label="name-input"
          value={name}
          onChange={handleChange}
        />
      )
    }

    const { getByLabelText } = render(<MyAwesomeComponent />)
    const input = getByLabelText('name-input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'bob' } })
    expect(localStorage.getItem('name')).toBe('bob')
  })
})
