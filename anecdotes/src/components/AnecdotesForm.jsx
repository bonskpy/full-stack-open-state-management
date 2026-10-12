import { useAnecdoteActions, useNotificationActions } from "../store";

const AnecdotesForm = () => {
    const { add } = useAnecdoteActions();
    const { notify } = useNotificationActions();

    const addAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        add(content);
        notify(`New note created: '${content}'`);
        e.target.reset();
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input
                        name="anecdote"
                        type="text"
                        required
                        data-testid="new"
                    />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default AnecdotesForm;
