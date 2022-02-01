import { Test, TestingModule } from '@nestjs/testing';
import { PinGraphqlResolver } from './pinGraphql.resolver';
import { PinGraphqlService } from './pinGraphql.service';

import { getMockRes } from '@jest-mock/express';
import { createWriteStream, WriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { mocked } from 'jest-mock';
import * as fs from 'fs/promises';

jest.mock('fs');

describe('PinGraphqlResolver', () => {
    let pinGraphqlResolver: PinGraphqlResolver;
    let pinGraphqlService: PinGraphqlService;
    fs.copyFile(
        `${process.cwd()}/test/essentials.png`,
        `${process.cwd()}/uploads/essentials.png`,
    );

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PinGraphqlResolver, PinGraphqlService],
        }).compile();

        pinGraphqlResolver = module.get<PinGraphqlResolver>(PinGraphqlResolver);
        pinGraphqlService = module.get<PinGraphqlService>(PinGraphqlService);
    });

    it('should be defined', () => {
        expect(pinGraphqlResolver).toBeDefined();
    });

    it('should return an true if user is properly authenticated', async () => {
        const res = {
            data: {
                getAuth: {
                    authenticated: true,
                },
            },
        };
        const result: any = {
            data: {
                getAuth: {
                    authenticated: true,
                },
            },
        };

        jest.spyOn(pinGraphqlService, 'getAuth').mockImplementation(
            () => result,
        );

        expect(await pinGraphqlResolver.getAuth()).toStrictEqual(res);
    });

    it('should return a IpfsHash', async () => {
        const mockWriteStream = {
            on: jest.fn().mockImplementation(function (this, event, handler) {
                if (event === 'finish') {
                    handler();
                }
                return this;
            }),
        };
        const mockReadStream = {
            pipe: jest.fn().mockReturnValueOnce(mockWriteStream),
        };

        const image: FileUpload = {
            filename: 'essentials.png',
            mimetype: 'image/png',
            encoding: '7bit',
            createReadStream: jest.fn().mockReturnValueOnce(mockReadStream),
        };

        mocked(createWriteStream).mockReturnValueOnce(
            mockWriteStream as unknown as WriteStream,
        );
        const { res } = getMockRes<any>({
            data: {
                IpfsHash: 'QmX1Jm7radTCqZ8qdXnotjzTHJwZiqZArrqe5QjTU9Bw65',
                PinSize: 5583,
                Timestamp: '2022-01-28T21:28:14.936Z',
                isDuplicate: true,
            },
        });
        const result: any = getMockRes({
            data: {
                IpfsHash: 'QmX1Jm7radTCqZ8qdXnotjzTHJwZiqZArrqe5QjTU9Bw65',
                PinSize: 5583,
                Timestamp: '2022-01-28T21:28:14.936Z',
                isDuplicate: true,
            },
        });

        jest.spyOn(pinGraphqlService, 'pinImage').mockImplementation(
            () => result,
        );

        expect(await pinGraphqlResolver.addImage(image)).toHaveProperty(
            'res.data',
        );
        expect(res.data).toHaveProperty('IpfsHash');
    });
});
