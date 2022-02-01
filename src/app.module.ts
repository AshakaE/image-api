import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinGraphqlMiddleware } from './pin-graphql.middleware';
import { PinMiddleware } from './pin.middleware';
import { PinModule } from './pin/pin.module';
import { PinGraphqlModule } from './pinGraphql/pinGraphql.module';

@Module({
    imports: [
        PinModule,
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        PinGraphqlModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PinMiddleware).forRoutes('pin');
        consumer.apply(PinGraphqlMiddleware).forRoutes('graphql');
    }
}
