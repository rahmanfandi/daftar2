const express = require('express');
const bodyParser = require('body-parser');

const app = express();


//

const port = 4010;

app.use(express.json());
app.use(express.static('public'));

//app.listen(port,()=>{console.log('tes')})




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Nama harus diisi' });
    }

    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Email tidak valid' });
    }

    if (!password || password.length < 8) {
        return res.status(400).json({ error: 'Kata Sandi harus memiliki minimal 8 karakter' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Konfirmasi Kata Sandi tidak cocok' });
    }

    // Proses pendaftaran jika semua valid
    return res.status(200).json({ message: 'Pendaftaran berhasil!' });
});

function isValidEmail(email) {
    // Implementasi validasi email
    return true; // Sementara selalu valid
}

module.exports = app;
