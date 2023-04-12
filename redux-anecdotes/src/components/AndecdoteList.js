import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdote.sort((a, b) => b.votes - a.votes);
    }
    const filteredAnecdotes = state.anecdote.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
