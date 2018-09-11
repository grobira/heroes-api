import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  
  app.connectMicroservice({
    transport: Transport.TCP,
    options:{
      port: 3002
    }
  });

  app.use(morgan('combined'));
  app.enableCors();

  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}
bootstrap();
