import { useAnecdotes } from "../hooks";

const AnecdoteList = () => {
    const { anecdotes, updateVotes } = useAnecdotes();

    return (
        anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => updateVotes(anecdote)}>vote</button>
                </div>
            </div>
        ))
    );
};

export default AnecdoteList;
