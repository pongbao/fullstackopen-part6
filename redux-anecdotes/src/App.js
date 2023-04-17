import { useDispatch } from "react-redux";
import { useQuery } from "react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AndecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import { setAnecdotes } from "./reducers/anecdoteReducer";
import { getAnecdotes } from "./requests";

const App = () => {
  const dispatch = useDispatch();

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const anecdotes = result.data;
  dispatch(setAnecdotes(anecdotes));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to server problems</div>;
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
