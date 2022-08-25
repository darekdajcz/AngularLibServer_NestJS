import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { MovieService } from '../services/movie.service';
import { CreateMovieModel } from '../dto/movie.dto';

// localhost:3000/movies
@Controller('/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {
  }

  @Get('/')
  async getAllMovies(@Res() res) {
    console.log('Response...')
    try {
      const data = await this.movieService.listOfMovies(res);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Get('/:movie-id')
  async getAllMovieById(@Res() res, @Param('movie-id') movieId: string) {
    return await this.movieService.getMovie(movieId);
  }

  @Post('/')
  async createMovie(@Res() res: Response, @Body() movie: CreateMovieModel) {
    try {
      const data = await this.movieService.createMovie(movie);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Put('')
  async updateMovieById(@Res() res: Response, @Body() movieParam: Partial<CreateMovieModel>, @Query('movieId') movieId: string) {
    const data = this.movieService.updateMovie(movieId, movieParam);
    res.status(HttpStatus.OK).json(data);
  }

  @Delete('/')
  async deleteMovieById(@Query('movieId') movieId: string) {
    return await this.movieService.removeMovie(movieId);
  }
}
