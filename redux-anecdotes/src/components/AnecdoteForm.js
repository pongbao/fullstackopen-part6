import { useDispatch } from "react-redux";
import { useMutation } from "react-query";

import { appendAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      dispatch(appendAnecdote(newAnecdote));
      dispatch(setNotification(`you added "${newAnecdote.content}"`, 10));
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
