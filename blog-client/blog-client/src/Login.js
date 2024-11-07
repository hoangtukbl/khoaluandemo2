// src/Login.js
import React, { useState } from 'react';
import JSEncrypt from 'jsencrypt';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Hàm lấy public key từ server
    async function getPublicKey() {
        const response = await fetch('http://localhost:3000/auth/public-key');
        const data = await response.json();
        return data.publicKey;
    }

    // Hàm mã hóa dữ liệu
    async function encryptData(publicKey, data) {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        return encrypt.encrypt(data);
    }

    // Xử lý khi submit form đăng nhập
    async function handleSubmit(event) {
        event.preventDefault();

        // Lấy public key từ server
        const publicKey = await getPublicKey();

        // Mã hóa username và password
        const encryptedUsername = await encryptData(publicKey, username);
        const encryptedPassword = await encryptData(publicKey, password);

        // Gửi dữ liệu mã hóa lên server để xác thực
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: encryptedUsername,
                password: encryptedPassword,
            }),
        });

        const result = await response.json();
        if (result.success) {
            alert('Login successful');
            // Chuyển hướng hoặc thực hiện các bước tiếp theo sau khi đăng nhập thành công
        } else {
            alert('Invalid login credentials');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
