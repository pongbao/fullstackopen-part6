import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "react-query";

import { increaseVote } from "../reducers/anecdoteReducer";
import { updateVotes } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdote.map((a) => a).sort((a, b) => b.votes - a.votes);
    }
    const filteredAnecdotes = state.anecdote.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

  const updateVotesMutation = useMutation(updateVotes, {
    onSuccess: (updatedAnecdote) => {
      dispatch(increaseVote(updatedAnecdote.id));
      notificationDispatch({
        type: "VOTE_ANECDOTE",
        payload: updatedAnecdote.content,
      });
      setTimeout(
        () => notificationDispatch({ type: "REMOVE_NOTIFICATION" }),
        10000
      );
    },
  });

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => updateVotesMutation.mutate(anecdote.id)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
