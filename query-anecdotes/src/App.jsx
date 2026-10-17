import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import { useAnecdotes } from "./hooks";
import { NotificationContextProvider } from "./context";

const App = () => {
  const { isPending, isError } = useAnecdotes();

  if (isPending) {
    return <div>Fetching data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContextProvider>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </NotificationContextProvider>
    </div>
  );
};

export default App;

// TODO: move notification reset to context
