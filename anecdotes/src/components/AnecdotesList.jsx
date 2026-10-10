import { useAnecdoteActions, useAnecdotes } from "../store";

const AnecdotesList = () => {
    const anecdotes = useAnecdotes();
    const actions = useAnecdoteActions();

    const vote = (id) => {
        actions.vote(id);
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdotesList;
