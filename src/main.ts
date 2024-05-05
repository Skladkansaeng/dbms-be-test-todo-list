import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFile, writeFile } from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    await readFile('db.json');
  } catch ({ errno }) {
    if (errno === -2)
      writeFile('db.json', JSON.stringify({ todoList: [] }), 'utf-8');
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Todo list')
    .setDescription('The todo API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
