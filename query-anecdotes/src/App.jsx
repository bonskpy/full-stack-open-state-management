import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks";

const App = () => {
  const { anecdotes, isPending, isError } = useAnecdotes();

  const handleVote = (anecdote) => {
    console.log("vote:", anecdote.id);
  };

  if (isPending) {
    return <div>Fetching data...</div>;
  }

  if (isError) {
    return <div>anecdote service unavailable due to problem in server...</div>;
  }

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
