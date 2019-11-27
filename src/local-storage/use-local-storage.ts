import { useState, Dispatch, SetStateAction, useEffect } from 'react'

function tryParse(value: any) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

function deleteFromStorage(key: string) {
  localStorage.removeItem(key)
}

const useLocalStorage = <T = string>(
  key: string,
  initialValue?: T
): [T, Dispatch<SetStateAction<T>>, Dispatch<void>] => {
  const [localState, setLocalState] = useState<T>(
    tryParse(localStorage.getItem(key))
  )

  useEffect(() => {
    if (initialValue) setValue(initialValue)
  }, [])

  const setValue = (value: SetStateAction<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(localState) : value
      localStorage.setItem(
        key,
        typeof valueToStore === 'object'
          ? JSON.stringify(valueToStore)
          : `${valueToStore}`
      )
      setLocalState(valueToStore)
    } catch (err) {
      throw err
    }
  }

  return [localState, setValue, () => deleteFromStorage(key)]
}

export default useLocalStorage
