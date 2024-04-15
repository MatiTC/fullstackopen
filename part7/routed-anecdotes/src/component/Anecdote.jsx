import React from 'react';

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <h1>{anecdote.content}</h1>
      <p>Votos: {anecdote.votes}</p>
      <p>Anécdota app for: {anecdote.author}</p>
      <p>para mas información en:{anecdote.info}</p>
    </>
  );
};

export default Anecdote;
