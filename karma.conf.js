// karma.conf.js
// Configuración de Karma para ejecutar pruebas de Jasmine sobre componentes React.
// Karma no entiende JSX por sí solo, así que usamos webpack + babel para traducir
// el código antes de enviarlo al navegador.
const webpack = require('webpack');

// Babel de Create React App necesita saber en qué "modo" está
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

module.exports = function (config) {
  config.set({
    // Jasmine escribe las pruebas; webpack prepara el código
    frameworks: ['jasmine', 'webpack'],

    // Archivos de prueba (todos los que terminan en .spec.js dentro de /test)
    files: [{ pattern: 'test/**/*.spec.js', watched: false }],

    // Antes de ejecutarlos, cada archivo de prueba pasa por webpack
    preprocessors: {
      'test/**/*.spec.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            // Traduce JSX y JavaScript moderno con el mismo Babel de Create React App
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['babel-preset-react-app', { runtime: 'automatic' }]],
                // istanbul "marca" el código de src/ para medir la cobertura
                plugins: [['istanbul', { include: ['src/**/*.js'] }]],
              },
            },
          },
          // Los CSS no se necesitan en las pruebas: se cargan como texto y se ignoran
          { test: /\.css$/, type: 'asset/source' },
          { test: /\.(png|jpe?g|gif|svg)$/, type: 'asset/inline' },
        ],
      },
      plugins: [
        // Variable que Create React App define normalmente
        new webpack.DefinePlugin({
          'process.env.PUBLIC_URL': JSON.stringify(''),
        }),
      ],
    },

    // progress: muestra el avance; coverage: genera el informe de cobertura
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },  // informe visual (abrir index.html)
        { type: 'text' },                  // tabla en la terminal
        { type: 'text-summary' },          // resumen en la terminal
      ],
    },

    // Navegador donde se ejecutan las pruebas (sin ventana visible)
    browsers: ['ChromeHeadless'],

    // Ejecuta las pruebas una vez y termina
    singleRun: true,
  });
};