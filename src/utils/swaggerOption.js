import swaggerJSDoc from 'swagger-jsdoc';
import swaggerSchemas from './swaggerSchemas.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'Документація API системи управління нотатками',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: swaggerSchemas,
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // шлях до твоїх роутерів з JSDoc
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
