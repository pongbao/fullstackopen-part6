import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "react-query";

import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { updateVotes } from "../requests";

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

  const updateVotesMutation = useMutation(updateVotes, {
    onSuccess: (updatedAnecdote) => {
      dispatch(increaseVote(updatedAnecdote.id));
      dispatch(setNotification(`you voted "${updatedAnecdote.content}"`, 10));
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
