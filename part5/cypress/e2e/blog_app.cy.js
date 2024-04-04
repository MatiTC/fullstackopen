describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    const userDos = {
      name: 'Mati Kasu',
      username: 'Kasukasu',
      password: 'salainen',
    };

    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', userDos);

    cy.visit('http://localhost:5173');
  });
  it('Se muestra el formulario de inicio de sesión', function () {
    cy.contains('Log in to application');
  });
});

describe('Login in ', function () {
  it('tiene éxito con las credenciales correctas', function () {
    cy.visit('http://localhost:5173');
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();

    cy.contains('Inicio sesión mluukkai');
  });
});

describe('Login fail', function () {
  it('falla con credenciales incorrectas', function () {
    cy.visit('http://localhost:5173');
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });
});

describe('Cuando el usuario se encuentra registrado', function () {
  beforeEach(function () {
    cy.login({ username: 'mluukkai', password: 'salainen' });
    cy.blogs({
      title: 'Blog de prueba 0',
      author: 'Autor de prueba 0',
      url: 'www.prueba0.com',
      likes: 1,
    });
  });
  it('exercies 5.16-22', function () {
    cy.get('#buttonTogglabeOne').click();
    cy.get('#title').type('testCypress');
    cy.get('#author').type('Cypress');
    cy.get('#url').type('www.testCypress.com');
    cy.get('#likes').type('10');
    cy.get('#buttonNewBlog').click();

    cy.contains('Se agrego un nuevo blog con éxito by mluukkai');
    cy.contains('testCypress');
    cy.contains('Detalles').click();
    cy.get('#likeButton').click();
    cy.contains('2');
    cy.contains('Eliminar').click();
    cy.get('#buttonCerrarS').click();
    cy.get('#username').type('Kasukasu');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();
    // eslint-disable-next-line no-undef
  });
});
