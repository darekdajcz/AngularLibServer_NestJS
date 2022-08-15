import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../../app.service';
import { MovieService } from './services/movie.service';
import { MovieController } from './controller/movie.controller';
import { MovieSchema } from './schema/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])
  ],
  controllers: [MovieController],
  providers: [MovieService, AppService]
})
export class MovieModule {
}