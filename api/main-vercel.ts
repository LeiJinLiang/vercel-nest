import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());

let app;

const startNestApplication = async (expressInstance) => {
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  await nestApp.init();
};

startNestApplication(server);

export default (req, res) => {
  if (!app) {
    startNestApplication(server)
      .then(() => server(req, res))
      .catch((err) => console.error(err));
  } else {
    server(req, res);
  }
};
