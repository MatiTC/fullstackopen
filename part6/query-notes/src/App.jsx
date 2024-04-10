import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, createAnecdotes } from './services/reques';

const App = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const votes = 0;
    const newAnecdote = { content: content, votes: votes };
    console.log(content, votes);
    newAnecdoteMutation.mutate(newAnecdote);
  };
  const toggleImportance = (anecdote) => {
    console.log('toggle importance of', anecdote.id);
  };
  return (
    <div>
      <h2>Anecdotes app</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id} onClick={() => toggleImportance(anecdote)}>
          {anecdote.content}
          <strong> {anecdote.important ? 'important' : ''}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
