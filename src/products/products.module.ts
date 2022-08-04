import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './product.service';
import { LoggerMiddleware } from './middleware/logger-middleware';

@Module({
  controllers: [ProductsController],
  providers: [ProductService]
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .exclude({
          path: 'products',
          method: RequestMethod.GET
        }
      )
      .forRoutes(
        ProductsController
      );
  }

}
