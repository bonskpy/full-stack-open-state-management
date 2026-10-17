const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const options = {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  };
  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    throw Error("Failed to fetch anecdotes.");
  }
  return await response.json();
};

export const addAnecdote = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };
  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    const message = await response.json();
    throw Error(message.error);
  }
  return await response.json();
};

export const updateAnecdote = async (anecdote) => {
  const anecdoteUrl = `${baseUrl}/${anecdote.id}`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };
  const response = await fetch(anecdoteUrl, options);

  if (!response.ok) {
    throw Error("Failed to update the anecdote.");
  }
  return await response.json();
};
