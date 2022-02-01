import { Module } from '@nestjs/common';
import { PinService } from './pin.service';

import { PinController } from './pin.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        NestjsFormDataModule,
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    controllers: [PinController],
    providers: [PinService],
})
export class PinModule {}
