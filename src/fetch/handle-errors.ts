export default function handleErrors(response: Response) {
  if (
    response &&
    response.status &&
    response.status >= 200 &&
    response.status < 300
  ) {
    return response
  }

  let error: Error & { response?: Response }

  error = new Error(
    response.statusText || `Request failed with status code ${response.status}`
  )
  error.response = response
  throw error
}
