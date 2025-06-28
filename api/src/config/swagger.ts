// src/config/swagger.ts
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, RequestHandler } from 'express';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance Analytics API',
      version: '1.0.0',
      description:
        'JWT-secured backend powering the Financial Analytics Dashboard challenge',
    },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'], // JSDoc scan paths
};

const swaggerSpec = swaggerJSDoc(options);

/** Mount swagger-ui and raw JSON spec on the given Express app */
export const setupSwagger = (app: Express): void => {
  // interactive UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // raw JSON (Postman import)
  const sendSpec: RequestHandler = (_req, res) => {
    res.json(swaggerSpec);
  };
  app.get('/api-docs-json', sendSpec);
};
