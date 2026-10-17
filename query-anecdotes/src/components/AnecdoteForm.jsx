import { useAnecdotes } from "../hooks";
import { useContext } from "react";
import NotificationContext from "../context";

const AnecdoteForm = () => {
  const { addNew } = useAnecdotes();
  const { setMessage } = useContext(NotificationContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    addNew(content);
    setMessage(`anecdote: '${content}' created`);
    setTimeout(() => setMessage(""), 5000);
    event.target.reset();
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
