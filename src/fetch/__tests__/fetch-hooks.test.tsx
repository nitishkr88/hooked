import 'isomorphic-fetch'
import React from 'react'
import nock from 'nock'
import {
  render,
  cleanup,
  waitForElement
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import useFetch from 'fetch/use-fetch'
import FetchProvider from 'fetch/context'

describe('useFetch hook', () => {
  // Mute console.error -> https://github.com/kentcdodds/react-testing-library/issues/281
  // tslint:disable:no-console
  const originalConsoleError = console.error
  beforeEach(() => {
    console.error = jest.fn
  })
  afterEach(() => {
    console.error = originalConsoleError
    cleanup()
    nock.cleanAll()
  })

  describe('basic usage', () => {
    it('should have a loading state on mount', () => {
      nock('https://my-api.fake')
        .get('/')
        .reply(200, { there: 'you go!!' })

      const MyAwesomeComponent = () => {
        const { data, loading } = useFetch<{ there: string }>('/')

        return loading ? (
          <div data-testid="loading">Loading…</div>
        ) : (
          <div data-testid="data">{data && data.body.there}</div>
        )
      }

      const { getByTestId } = render(
        <FetchProvider base="https://my-api.fake/">
          <MyAwesomeComponent />
        </FetchProvider>
      )

      expect(getByTestId('loading')).toHaveTextContent('Loading')
    })

    it('should return data after loading', async () => {
      nock('https://my-api.fake')
        .get('/')
        .reply(200, { there: 'you go!!' })

      const MyAwesomeComponent = () => {
        const { data, loading } = useFetch<{ there: string }>('/')

        return loading ? (
          <div data-testid="loading">Loading…</div>
        ) : (
          <div data-testid="data">{data && data.body.there}</div>
        )
      }

      const { getByTestId } = render(
        <FetchProvider base="https://my-api.fake/">
          <MyAwesomeComponent />
        </FetchProvider>
      )

      await waitForElement(() => getByTestId('data'))
      expect(getByTestId('data')).toHaveTextContent('you go!!')
    })
  })

  describe('with error', () => {
    it('should set the error object', async () => {
      nock('https://my-api.fake')
        .get('/')
        .reply(401, { message: 'Something went wrong!' })

      const MyAwesomeComponent = () => {
        const { data, loading, error } = useFetch<{ there: string }>('/')

        if (error) {
          return <div data-testid="error">{error.message}</div>
        }
        return loading ? (
          <div data-testid="loading">Loading…</div>
        ) : (
          <div data-testid="data">{data && data.body.there}</div>
        )
      }

      const { getByTestId } = render(
        <FetchProvider base="https://my-api.fake/">
          <MyAwesomeComponent />
        </FetchProvider>
      )
      await waitForElement(() => getByTestId('error'))

      expect(getByTestId('error')).toHaveTextContent(
        'Failed to fetch: 401 Unauthorized'
      )
    })
  })
})
