import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQuery } from "@tanstack/react-query";

const App = () => {
  const getAnectodes = async () => {
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    };
    const baseUrl = "http://localhost:3001/anecdotes";
    const response = await fetch(baseUrl, options);
    if (!response.ok) {
      throw Error("Failed to fetch anecdotes.");
    }

    return await response.json();
  };

  const result = useQuery({
    queryKey: ["anectodes"],
    queryFn: getAnectodes,
  });

  if (result.isPending) {
    return <div>Fetching data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service unavialable due to problems in server</div>;
  }

  const handleVote = (anecdote) => {
    console.log("vote:", anecdote.id);
  };

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
