import { useEffect } from "react";
import { useAnecdoteActions } from "./store";
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdotesList from "./components/AnecdotesList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const { init } = useAnecdoteActions();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <Filter />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  );
};

export default App;
