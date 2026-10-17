import useAnecdotes from "../hooks/anecdotes";
import useNotification from "../hooks/notification";

const AnecdoteForm = () => {
  const { addNew } = useAnecdotes();
  const { setMessage } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    if (!content) return;
    try {
      addNew(content);
      setMessage(`anecdote: '${content}' created`);
    } catch (err) {
      setMessage(`error: ${err.message}`);
    } finally {
      event.target.reset();
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input minLength={5} name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
