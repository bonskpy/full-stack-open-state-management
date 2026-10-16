const baseUrl = "http://localhost:3001/anecdotes";

export const getAnectodes = async () => {
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

export const addAnectode = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };
  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    throw Error("Failed to add the anecdote.");
  }
  return await response.json();
};
