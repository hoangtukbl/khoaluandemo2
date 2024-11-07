const crypto = require('crypto');
const fs = require('fs');

// Hàm tạo cặp khóa và lưu vào file
function generateAndSaveKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  // Lưu khóa công khai vào file publicKey.pem
  fs.writeFileSync('publicKey.pem', publicKey);

  // Lưu khóa bí mật vào file privateKey.pem
  fs.writeFileSync('privateKey.pem', privateKey);

  console.log('Cặp khóa đã được tạo và lưu vào publicKey.pem và privateKey.pem');
}

generateAndSaveKeyPair();
