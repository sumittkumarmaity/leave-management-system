import express from 'express';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/requestLogger.middleware';
import { securityMiddleware } from './middleware/security.middleware';
import { routes } from './routes';

const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/docs/swagger.json'), 'utf8'));

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(securityMiddleware);
app.use(requestLogger);
app.use(morgan('combined'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);

app.use(errorHandler);

