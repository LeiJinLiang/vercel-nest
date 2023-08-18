import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';
import cors from 'cors'; // <-- 导入cors

const server = express();

// 启用CORS
server.use(cors());

const startNestApplication = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  return app.init();
};

startNestApplication(server);

export default server;
