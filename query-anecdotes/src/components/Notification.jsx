import { useContext } from "react";
import NotificationContext from "../context";

const Notification = () => {
  const { message } = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (message) {
    return (
      <div data-testid="notification" style={style}>
        {message}
      </div>
    );
  }

  return null;
};

export default Notification;

/**
 * The notification should tell the user when a new anecdote is created or an anecdote is voted on.
 */
