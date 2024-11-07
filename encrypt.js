const crypto = require('crypto');
const fs = require('fs');

// Hàm đọc khóa công khai từ file
function getPublicKey() {
  return fs.readFileSync('publicKey.pem', 'utf8');
}

// Hàm mã hóa dữ liệu với khóa công khai
function encryptData(publicKey, data) {
  const encryptedData = crypto.publicEncrypt(
    publicKey,
    Buffer.from(data)
  );
  return encryptedData.toString('base64');
}

// Ví dụ mã hóa username và password
const publicKey = getPublicKey();
const username = "exampleUser";
const password = "securePassword123";

const encryptedUsername = encryptData(publicKey, username);
const encryptedPassword = encryptData(publicKey, password);

console.log("Encrypted Username:", encryptedUsername);
console.log("Encrypted Password:", encryptedPassword);
