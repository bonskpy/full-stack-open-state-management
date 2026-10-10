import { useAnecdoteActions } from "../store";
import { asObject } from "../utils";

const AnecdotesForm = () => {

    const { add } = useAnecdoteActions()

    const addAnecdote = (e) => {
        e.preventDefault();
        const newAnecdote = asObject(e.target.anecdote.value)
        add(newAnecdote)
        e.target.reset();
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" type="text" required data-testid="new" />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default AnecdotesForm;
