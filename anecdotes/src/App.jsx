import { useEffect } from "react";
import { useAnecdoteActions } from "./store";
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdotesList from "./components/AnecdotesList";
import Filter from "./components/Filter";

const App = () => {
  const {init} = useAnecdoteActions();

  useEffect( () => {
    init()
  }, [init])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  );
};

export default App;
