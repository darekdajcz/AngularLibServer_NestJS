import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://darekbiszkopt:Uzi2115@cluster0.nnjxdsq.mongodb.net/?retryWrites=true&w=majority')
  ],
  controllers: [],
  providers: []
})
export class DatabaseModule {
}
