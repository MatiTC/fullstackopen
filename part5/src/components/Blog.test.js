import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import '../components/style/blog.css';

describe('Blog Component', () => {
  test('renders content', async () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 10,
      user: {
        name: 'testing',
      },
    };

    const { container } = render(<Blog blog={blog} />);

    const element = screen.getByText('test title');
    expect(element).toBeDefined();
    const elementAuthor = screen.getByText('test author');
    expect(elementAuthor).toBeDefined();
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: block');
  });
});
