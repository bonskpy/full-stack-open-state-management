import {
    useAnecdoteActions,
    useAnecdotes,
    useNotificationActions,
} from "../store";

const AnecdotesList = () => {
    const anecdotes = useAnecdotes();
    const { vote, remove } = useAnecdoteActions();
    const { notify } = useNotificationActions();

    const handleVote = (anecdote) => {
        vote(anecdote.id);
        notify(`you voted '${anecdote.content}'`);
    };

    const handleDelete = (anecdote) => {
        remove(anecdote.id);
        notify(`Deleting '${anecdote.content}'`);
    };

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() => handleVote(anecdote)}
                        >
                            vote
                        </button>
                        {anecdote.votes === 0
                            ? (
                                <button onClick={() => handleDelete(anecdote)}>
                                    delete
                                </button>
                            )
                            : null}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdotesList;
