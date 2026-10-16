import { getAnectodes } from "./services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addAnectode } from "./services";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anectodes"],
    queryFn: getAnectodes,
  });

  const addAnecdoteMutation = useMutation({
    mutationFn: addAnectode,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anectodes"]);
      queryClient.setQueryData(
        ["anectodes"],
        anecdotes.concat(newAnecdote),
      );
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addNew: (content) => addAnecdoteMutation.mutate(content),
  };
};
