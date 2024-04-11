import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdotes } from '../services/anecdotes';

const AnecdoteForm = ({ onCreateAnecdote, handleCreateError }) => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdotes) => {
      queryClient.invalidateQueries(['anecdotes']);
      onCreateAnecdote();
    },
    onError: (error) => {
      handleCreateError(error.message);
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
