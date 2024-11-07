const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware để phân tích dữ liệu JSON
app.use(bodyParser.json());

// Hàm đọc khóa bí mật từ file (dùng sau nếu muốn giải mã)
function getPrivateKey() {
  return fs.readFileSync('privateKey.pem', 'utf8');
}

// API đăng nhập nhận dữ liệu đã mã hóa từ client
app.post('/login', (req, res) => {
  const { encryptedUsername, encryptedPassword } = req.body;

  console.log("Encrypted Username:", encryptedUsername);
  console.log("Encrypted Password:", encryptedPassword);

  // Nếu cần giải mã, có thể thêm phần giải mã bằng khóa bí mật ở đây
  res.json({ message: 'Dữ liệu mã hóa đã nhận được thành công!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.static(__dirname));
