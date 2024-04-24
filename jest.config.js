 
const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y archivos .env en tu entorno de prueba
  dir: './',
});

// Agrega cualquier configuración personalizada que necesites pasar a Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/firebase/(.*)$': '<rootDir>/firebase/$1',
  },
  testEnvironment: 'jsdom', // Establece el entorno de prueba como jsdom
};

// Combinar la configuración predeterminada de Next.js con la configuración personalizada de Jest
const mergedConfig = createJestConfig(customJestConfig);

// Exportar la configuración combinada
module.exports = mergedConfig;