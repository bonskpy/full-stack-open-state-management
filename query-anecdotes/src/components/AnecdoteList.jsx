import useAnecdotes from "../hooks/anecdotes";
import useNotify from "../hooks/notification";

const AnecdoteList = () => {
    const { anecdotes, updateVotes } = useAnecdotes();
    const { setMessage } = useNotify();

    const update = (anecdoteToUpdate) => {
        updateVotes(anecdoteToUpdate);
        setMessage(`anecdote '${anecdoteToUpdate.content}' voted`);
        setTimeout(() => setMessage(""), 5000);
    };

    return (
        anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => update(anecdote)}>vote</button>
                </div>
            </div>
        ))
    );
};

export default AnecdoteList;
