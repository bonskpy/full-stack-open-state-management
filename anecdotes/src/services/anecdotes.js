const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }
  const response = await fetch(baseUrl, options)

  if(!response.ok){
    throw Error('Failed to fetch data')
  }

  return await response.json()
}
