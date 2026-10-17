import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks";
// import { createContext } from "react";

const App = () => {
  const { isPending, isError } = useAnecdotes();

  // const NotificationContext = createContext("");

  if (isPending) {
    return <div>Fetching data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    </div>
  );
};

export default App;
