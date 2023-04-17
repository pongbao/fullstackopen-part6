import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createAnecdote = async (object) => {
  const response = await axios.post(baseUrl, object);
  return response.data;
};

export const updateVotes = async (id) => {
  const response = await axios.get(baseUrl);
  const anecdoteToUpdate = response.data.find((a) => a.id === id);
  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  };
  await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return anecdoteToUpdate;
};
