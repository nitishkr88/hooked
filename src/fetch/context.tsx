import React from 'react'

export interface FetchProviderProps {
  base: string
  requestOptions?: (() => Partial<RequestInit>) | Partial<RequestInit>
}

export const FetchContext = React.createContext<Required<FetchProviderProps>>({
  base: '',
  requestOptions: {}
})

const FetchProvider: React.FC<FetchProviderProps> = ({ children, ...rest }) => (
  <FetchContext.Provider value={{ requestOptions: {}, ...rest }}>
    {children}
  </FetchContext.Provider>
)

export default FetchProvider
