import express from 'express';

import databaseConnection from './database/mongoDB';

import routes from './routes/index';

import cors from 'cors';

const app = express();

app.use(cors({ origin: 'https://listadetarefas-luiz2k.vercel.app' }));

app.use(express.json());

databaseConnection();

app.use(routes);

export default app;
