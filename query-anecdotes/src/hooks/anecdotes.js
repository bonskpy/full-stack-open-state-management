import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addAnecdote, getAnecdotes, updateAnecdote } from "../services";
import useNotify from "./notification";

const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useNotify();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const addAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.concat(newAnecdote),
      );
      setMessage(`anecdote: '${newAnecdote.content}' created`);
      setTimeout(() => setMessage(""), 5000);
    },
    onError: (error) => {
      setMessage(`${error.message}`);
      setTimeout(() => setMessage(""), 5000);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updated.id ? updated : anecdote
      );
      queryClient.setQueryData(["anecdotes"], updatedAnecdotes);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addNew: (content) => addAnecdoteMutation.mutate(content),
    updateVotes: (anecdote) =>
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
};

export default useAnecdotes;
