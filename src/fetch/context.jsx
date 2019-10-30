import React from 'react'

export const FetchContext = React.createContext({
  base: '',
  requestOptions: {}
})

const FetchProvider = ({ children, ...rest }) => (
  <FetchContext.Provider value={{ requestOptions: {}, ...rest }}>
    {children}
  </FetchContext.Provider>
)

export default FetchProvider
