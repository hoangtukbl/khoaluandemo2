import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class AuthService {
    private readonly privateKey = fs.readFileSync('privateKey.pem', 'utf8');
    private readonly users = [
        { username: 'exampleUser', password: 'encryptedPassword1' } // Cập nhật với mật khẩu mã hóa sẵn
    ];

    // Giải mã dữ liệu với private key
    decryptData(encryptedData: string): string {
        const decryptedData = crypto.privateDecrypt(
            {
                key: this.privateKey,
                passphrase: '', // nếu private key có passphrase
            },
            Buffer.from(encryptedData, 'base64')
        );
        return decryptedData.toString('utf8');
    }

    // Kiểm tra tính hợp lệ của người dùng
    validateUser(encryptedUsername: string, encryptedPassword: string): boolean {
        const username = this.decryptData(encryptedUsername);
        const password = this.decryptData(encryptedPassword);

        return this.users.some(user => user.username === username && user.password === password);
    }
}
