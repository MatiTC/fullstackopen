import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormularioNewBlog from './FormularioNewBlog';
import userEvent from '@testing-library/user-event';

test('exercises 5.16', async () => {
  const handleNewBlogSubmit = jest.fn();
  const handleChangeNewBlog = jest.fn();
  const newBlog = jest.fn();
  const user = userEvent.setup();

  render(
    <FormularioNewBlog
      handleNewBlogSubmit={handleNewBlogSubmit}
      handleChangeNewBlog={handleChangeNewBlog}
      newBlog={newBlog}
    />
  );

  const inputTitulo = screen.getByPlaceholderText('Titulo');
  const inputAutor = screen.getByPlaceholderText('Autor');
  const inputUrl = screen.getByPlaceholderText('Url');
  const inputLikes = screen.getByPlaceholderText('MeGusta');
  const botonCrear = screen.getByText('Crear');

  // Simula la entrada de texto en los campos del formulario
  await user.type(inputTitulo, 'Nuevo blog');
  await user.type(inputAutor, 'Autor del nuevo blog');
  await user.type(inputUrl, 'http://example.com');
  await user.type(inputLikes, '10');

  // Simula la presentación del formulario
  await user.click(botonCrear);
  // Verifica que handleNewBlogSubmit se haya llamado una vez
  expect(handleNewBlogSubmit).toHaveBeenCalledTimes(1);
  // Verifica que el estado del componente se haya actualizado correctamente
  expect(handleNewBlogSubmit.mock.calls[0][0]).toBe({
    title: 'Nuevo blog',
    author: 'Autor del nuevo blog',
    url: 'http://example.com',
    likes: '10',
  });
});
