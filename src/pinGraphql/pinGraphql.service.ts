/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import config from '../config/keys';
import * as fs from 'fs';

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(config.ApiKey, config.ApiSecret);

@Injectable()
export class PinGraphqlService {
    async getAuth(): Promise<any> {
        try {
            const res = await pinata.testAuthentication();
            return res;
        } catch (e) {
            return e;
        }
    }

    async pinImage(file: fs.PathLike): Promise<any> {
        const readableStreamForFile = fs.createReadStream(file);
        try {
            const res = await pinata.pinFileToIPFS(readableStreamForFile);
            return res;
        } catch (e) {
            return e;
        }
    }
}
