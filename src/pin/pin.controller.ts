import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { PinService } from './pin.service';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { FormDataTestDto } from './dto/formDataTestDto';

@Controller('pin')
export class PinController {
    constructor(private readonly pinService: PinService) {}
    @Get()
    async getAuth(@Res() res: Response) {
        const resp = await this.pinService.getAuth();
        return res.status(200).json({
            data: {
                resp,
            },
        });
    }

    @Post()
    @FormDataRequest({ storage: FileSystemStoredFile })
    async pinImage(@Res() res: Response, @Body() body: FormDataTestDto) {
        const { path } = body.image;
        const resp = await this.pinService.pinImage(path);
        return res.status(201).json({
            data: resp,
        });
    }
}
