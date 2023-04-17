import { useDispatch } from "react-redux";
import { useMutation } from "react-query";

import { appendAnecdote } from "../reducers/anecdoteReducer";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      dispatch(appendAnecdote(newAnecdote));
      notificationDispatch({
        type: "ADD_ANECDOTE",
        payload: newAnecdote.content,
      });
      setTimeout(
        () => notificationDispatch({ type: "REMOVE_NOTIFICATION" }),
        10000
      );
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
