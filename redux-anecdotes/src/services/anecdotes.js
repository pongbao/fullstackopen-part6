import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVotes = async (id) => {
  const response = await axios.get(baseUrl);
  const anecdoteToUpdate = response.data.find((a) => a.id === id);
  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  };
  await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return anecdoteToUpdate;
};

const anecdoteService = { getAll, createNew, updateVotes };
export default anecdoteService;
