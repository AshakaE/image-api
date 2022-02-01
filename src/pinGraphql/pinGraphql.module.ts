import { Module } from '@nestjs/common';
import { PinGraphqlResolver } from './pinGraphql.resolver';
import { PinGraphqlService } from './pinGraphql.service';

@Module({
    providers: [PinGraphqlResolver, PinGraphqlService],
})
export class PinGraphqlModule {}
