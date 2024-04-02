import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ButtonLike from './ButtonLike';
import blogService from '../services/blogs';

jest.mock('../services/blogs');

describe('ButtonLike Component', () => {
  test('llama al controlador de eventos dos veces cuando se hace clic dos veces en el botón', async () => {
    const mockUpdateBlog = jest.fn();
    blogService.updateLike.mockResolvedValueOnce();
    const { getByText } = render(
      <ButtonLike blog={{ likes: 0 }} updateBlog={mockUpdateBlog} />
    );
    const likeButton = getByText('Like');
    userEvent.click(likeButton);
    userEvent.click(likeButton);
    await waitFor(() => {
      expect(mockUpdateBlog).toHaveBeenCalledTimes(2);
    });
  });
});
