import { Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { MovieInterface } from '../interface/movie.interface';
import { CreateMovieModel } from '../dto/movie.dto';


@Injectable()
export class MovieService {

  constructor(@InjectModel('Movie') private readonly movieModel: Model<MovieInterface>) {
  }

  async listOfMovies(@Res() res: Response): Promise<MovieInterface[]> {
    return await this.movieModel.find();
  }

  async createMovie(movieModel: CreateMovieModel): Promise<MovieInterface> {
    const newMovie = await new this.movieModel(movieModel);
    return newMovie.save();
  }

  async updateMovie(id: string, body: Partial<CreateMovieModel>): Promise<MovieInterface> {
    try {
      return await this.movieModel.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeMovie(movieId: string): Promise<MovieInterface[]> {
    try {
      return await this.movieModel.findByIdAndRemove(movieId);
    } catch (error) {
      throw new InternalServerErrorException("error");
    }
  }

  async getMovie(movieId: string): Promise<MovieInterface> {
    const movie = await this.movieModel.findById(movieId);
    if (!movie) {
      throw new NotFoundException('cant find movie');
    }
    return movie;
  }

}