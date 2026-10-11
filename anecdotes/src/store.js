import { create } from "zustand";
import { anecdotesAtStart, asObject } from "./utils";

const descendingOrder = (a, b) => b.votes - a.votes;

const useAnecdoteStore = create((set) => ({
  anecdotes: anecdotesAtStart.map(asObject),
  filter: null,
  actions: {
    vote: (id) => {
      set((state) => {
        return {
          anecdotes: state.anecdotes.map(
            (anecdote) =>
              anecdote.id === id
                ? { ...anecdote, votes: anecdote.votes + 1 }
                : anecdote,
          ).toSorted(descendingOrder),
        };
      });
    },
    add: (anecdote) => {
      set((state) => ({
        anecdotes: state.anecdotes.concat(anecdote).toSorted(descendingOrder),
      }));
    },
    setFilter: (filterValue) => {
      set(() => ({filter: filterValue}))
    }
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  if (filter){
     return anecdotes.filter( (anecdote) => anecdote.content.includes(filter))
  }

  return anecdotes
};
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
