/* eslint-disable no-undef */
import React, { useContext } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { NotificationContext } from './reducer/NotificationContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './services/anecdotes';

const App = () => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));
  const anecdotes = result.data;
  const { notificationState, dispatch } = useContext(NotificationContext);

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  if (result.isLoading) {
    return <div>landing page...</div>;
  } else if (result.isError) {
    <div>
      Servicio de anécdotas no disponible por problemas en el servidor.
    </div>;
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: 'SHOW_NOTIFICATION', payload: `Anecdota "${anecdote.content}" es votada` });
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' });
    }, 5000);
  };
  const handleCreateAnecdote = () => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: 'Nueva anécdota creada' });
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' });
    }, 5000);
  };

  const handleCreateErrorNotification = (errorMessage) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: errorMessage });
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' });
    }, 5000);
  };
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm onCreateAnecdote={handleCreateAnecdote} handleCreateError={handleCreateErrorNotification} />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
