import { useFeedbackAdder } from "../store"

const Buttons = () => {
  const addFeedback = useFeedbackAdder()

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => addFeedback('good')}>good</button>
      <button onClick={() => addFeedback('neutral')}>neutral</button>
      <button onClick={() => addFeedback('bad')}>bad</button>
    </div>
  )
}

export default Buttons
