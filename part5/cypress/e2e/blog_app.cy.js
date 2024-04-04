describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:5173');
  });
  it('Se muestra el formulario de inicio de sesión', function () {
    cy.contains('Log in to application');
  });
});

describe('Login', function () {
  it('tiene éxito con las credenciales correctas', function () {
    cy.visit('http://localhost:5173');
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();

    cy.contains('Inicio sesión mluukkai');
  });

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
