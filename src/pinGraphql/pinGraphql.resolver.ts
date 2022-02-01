import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PinGraphql } from './models/pinGraphql';
import { PinGraphqlService } from './pinGraphql.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import * as fs from 'fs/promises';

@Resolver(() => PinGraphql)
export class PinGraphqlResolver {
    constructor(private readonly pinGraphqlService: PinGraphqlService) {}

    @Query(() => PinGraphql)
    async getAuth(): Promise<any> {
        return await this.pinGraphqlService.getAuth();
    }

    @Mutation(() => PinGraphql, { name: 'imageToPin' })
    async addImage(
        @Args({ name: 'image', type: () => GraphQLUpload })
        image: FileUpload,
    ): Promise<FileUpload> {
        const { createReadStream, filename } = await image;
        const destinationPath = `./uploads/${filename}`;
        return await new Promise((res, rej) =>
            createReadStream()
                .pipe(createWriteStream(destinationPath))
                .on('error', rej)
                .on('finish', async () => {
                    const result = await this.pinGraphqlService.pinImage(
                        destinationPath,
                    );
                    await fs.unlink(destinationPath);
                    res(result);
                }),
        );
    }
}
