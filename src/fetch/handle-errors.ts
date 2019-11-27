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
    `Failed to fetch: ${response.status} ${response.statusText}`
  )
  error.response = response
  throw error
}
