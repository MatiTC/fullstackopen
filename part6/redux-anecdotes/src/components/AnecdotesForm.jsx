import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.addNote.value;
    dispatch(addAnecdote(content));
    event.target.addNote.value = '';
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="addNote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
