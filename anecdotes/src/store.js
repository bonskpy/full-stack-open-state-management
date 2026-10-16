import { create } from "zustand";
import { normalizeText } from "./utils";
import { createOne, deleteOne, getAll, updateOne } from "./services/anecdotes";

const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    notify: (content) => {
      set(() => ({ notification: content }));
      setTimeout(() => {
        set(() => ({ notification: "" }));
      }, 5000);
    },
  },
}));

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filterText: null,
  actions: {
    remove: async (id) => {
      deleteOne(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdotes) => anecdotes.id !== id),
      }));
    },
    init: async () => {
      const anecdotes = await getAll();
      set(() => ({ anecdotes }));
    },
    vote: async (id) => {
      const anecdoteToUpdate = get().anecdotes.find((a) => a.id === id);
      const updated = await updateOne(id, {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      });

      set((state) => ({
        anecdotes: [...state.anecdotes].map(
          (anecdote) => anecdote.id === id ? updated : anecdote,
        ),
      }));
    },
    add: async (anecdote) => {
      const created = await createOne(anecdote);
      set((state) => ({
        anecdotes: state.anecdotes.concat(created),
      }));
    },
    setFilter: (content) => {
      set(() => ({ filterText: content }));
    },
  },
}));

/**
 * Exposed parts of the store
 */

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filterText);

  const filterValue = filter ? normalizeText(filter) : "";
  const visibleAnecdotes = anecdotes.filter((anecdote) =>
    normalizeText(anecdote.content).includes(filterValue)
  );

  return visibleAnecdotes.toSorted((a, b) => Number(b.votes) - Number(a.votes));
};

export const useAnecdoteActions = () => {
  return useAnecdoteStore((state) => state.actions);
};

export const useNotification = () => {
  return useNotificationStore((state) => state.notification);
};

export const useNotificationActions = () => {
  return useNotificationStore((state) => state.actions);
};
