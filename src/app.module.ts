import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinModule } from './pin/pin.module';
import { PinGraphqlModule } from './pinGraphql/pinGraphql.module';

@Module({
    imports: [PinModule, PinGraphqlModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
