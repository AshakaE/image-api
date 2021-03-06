import { Injectable, NestMiddleware } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';

@Injectable()
export class PinGraphqlMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 1 })(
            req,
            res,
            next,
        );
    }
}
