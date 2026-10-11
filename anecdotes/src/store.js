import { create } from "zustand";
import { normalizeText } from "./utils";
import { getAll } from "./services/anecdotes";

const descendingOrder = (a, b) => b.votes - a.votes;

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filterText: null,
  actions: {
    init: async () => {
      const anecdotes = await getAll()
      set(() => ({anecdotes}))
    },
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
    setFilter: (content) => {
      set(() => ({ filterText: content }));
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filterText);

  if (filter) {
    return anecdotes.filter((anecdote) => {
      const content = normalizeText(anecdote.content);
      const filterValue = normalizeText(filter);
      return content.includes(filterValue);
    });
  }

  return anecdotes;
};
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
