import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.addNote.value;
    const votes = '0';
    event.target.addNote.value = '';
    dispatch(createNote(content, votes));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="addNote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
