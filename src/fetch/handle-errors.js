export default function handleErrors(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(
    response.statusText || `Request failed with status code ${response.status}`
  )
  error.response = response
  throw error
}
