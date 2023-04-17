import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    increaseVote(state, action) {
      const id = action.payload;
      console.log(id);
      const anecdoteToChange = state.find((a) => a.id === id);
      console.log(anecdoteToChange);
      anecdoteToChange.votes += 1;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { increaseVote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(id);
    dispatch(increaseVote(updatedAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
