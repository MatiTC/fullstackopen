import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';
import userEvent from '@testing-library/user-event';
import ButtonLike from './ButtonLike.jsx';

describe('Togglable Component', () => {
  let container;

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 10,
    user: {
      name: 'testing',
    },
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className='testDiv'>
          <p className="blogUrl">Url: {blog.url}</p>
          <p className="blogLikes">
            Likes: {blog.likes}{' '}
            <ButtonLike blog={blog} updateBlog={mockHandler} />
          </p>
          <p className="blogUser">{blog.user.name}</p>
        </div>
      </Togglable>
    ).container;
  });
  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.testDiv');
    expect(div).not.toHaveStyle('display: none');
  });
});
