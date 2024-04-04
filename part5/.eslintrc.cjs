module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    indent: ['error', 2], // Indentation de 2 espacios
    quotes: ['error', 'single'], // Utilizar comillas simples para cadenas de texto
    semi: ['error', 'always'], // Requiere que los puntos y coma se coloquen al final de cada declaración
    eqeqeq: 'error', // Requiere el uso estricto del operador de igualdad (===) y desalienta el uso de la comparación débil (==)
    'no-trailing-spaces': 'error', // No debe haber espacios en blanco al final de las líneas de código
    'object-curly-spacing': ['error', 'always'], // Espacios dentro de llaves en objetos
    'array-bracket-spacing': ['error', 'never'], // Espacios dentro de los arrays
    'no-multiple-empty-lines': ['error', { max: 1 }], // Controlar el número máximo de líneas en blanco consecutivas permitidas en el código
    'no-console': 0, // Permitir el uso de la consola
    'react/react-in-jsx-scope': 'off', // No es obligatorio importar React en archivos JSX
    'react/prop-types': 0, // No es obligatorio definir propTypes para los componentes de React
    'no-unused-vars': 0, // Se permiten variables no utilizadas
    'jest/no-identical-title': 'off',
    //"linebreak-style": ["error", "unix"],
  },
};

/*
always: siempre se debe de cumplir la regla
Never: la regla nunca debe de aplicarse
single: comillas simple
*/
