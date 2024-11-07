import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './app.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // API lấy public key
    @Get('public-key')
    getPublicKey(@Res() res: Response) {
        const publicKey = fs.readFileSync('publicKey.pem', 'utf8');
        res.send({ publicKey });
    }

    // API xử lý đăng nhập
    @Post('login')
    login(@Body() body, @Res() res: Response) {
        const { username, password } = body;
        const isValidUser = this.authService.validateUser(username, password);

        if (isValidUser) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false });
        }
    }
}
