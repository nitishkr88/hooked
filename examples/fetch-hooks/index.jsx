import React from 'react'
import ReactDOM from 'react-dom'

import { FetchProvider } from 'hooked'
import App from './components/App'

ReactDOM.render(
  <FetchProvider base="https://swapi.co/api/">
    <App />
  </FetchProvider>,
  document.getElementById('root')
)
