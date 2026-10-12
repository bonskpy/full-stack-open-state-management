const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw Error("Failed to fetch data");
  }

  return await response.json();
};

export const createOne = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };
  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw Error("Failed to create");
  }

  return await response.json();
};

export const updateOne = async (id, content) => {
  const anecdoteUrl = `${baseUrl}/${id}`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  };

  const response = await fetch(anecdoteUrl, options);

  if (!response.ok) {
    throw Error("Failed to update");
  }

  return await response.json();
};

export const deleteOne = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(anecdoteUrl, options);

  return await response.json();
};
