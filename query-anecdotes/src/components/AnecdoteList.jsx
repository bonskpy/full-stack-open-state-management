import { useAnecdotes } from "../hooks";
import NotificationContext from "../context";
import { useContext } from "react";

const AnecdoteList = () => {
    const { anecdotes, updateVotes } = useAnecdotes();
    const { setMessage } = useContext(NotificationContext);

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
