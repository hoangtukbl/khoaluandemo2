// Fetch public key từ server
async function getPublicKey() {
    const response = await fetch('http://localhost:3000/auth/public-key');
    const data = await response.json();
    return data.publicKey;
}

// Mã hóa dữ liệu bằng public key
function encryptData(publicKey, data) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(data);
}

// Xử lý sự kiện submit form
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Lấy public key và mã hóa thông tin đăng nhập
    const publicKey = await getPublicKey();
    const encryptedUsername = encryptData(publicKey, username);
    const encryptedPassword = encryptData(publicKey, password);

    // Gửi dữ liệu mã hóa đến server
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: encryptedUsername, password: encryptedPassword }),
    });

    const result = await response.json();
    if (result.success) {
        alert('Login successful');
    } else {
        alert('Invalid login credentials');
    }
});
