const request = require('supertest');
const app = require('./app');

describe('Pengujian Halaman Registrasi', () => {
    it('harus mengembalikan kesalahan jika nama tidak diisi', async () => {
        const res = await request(app)
            .post('/register')
            .send({ email: 'test@example.com', password: 'password', confirmPassword: 'password' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual('Nama harus diisi');
    });

    it('harus mengembalikan kesalahan jika email tidak valid', async () => {
        const res = await request(app)
            .post('/register')
            .send({ name: 'John Doe', email: 'email_tidak_valid', password: 'password', confirmPassword: 'password' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual('Email tidak valid');
    });

    it('harus mengembalikan kesalahan jika kata sandi terlalu pendek', async () => {
        const res = await request(app)
            .post('/register')
            .send({ name: 'John Doe', email: 'test@example.com', password: 'pass', confirmPassword: 'pass' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual('Kata Sandi harus memiliki minimal 8 karakter');
    });

    it('harus mengembalikan kesalahan jika konfirmasi kata sandi tidak cocok', async () => {
        const res = await request(app)
            .post('/register')
            .send({ name: 'John Doe', email: 'test@example.com', password: 'password', confirmPassword: 'password123' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual('Konfirmasi Kata Sandi tidak cocok');
    });

    it('harus mengembalikan pesan sukses jika semua data valid', async () => {
        const res = await request(app)
            .post('/register')
            .send({ name: 'John Doe', email: 'test@example.com', password: 'password', confirmPassword: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Pendaftaran berhasil!');
    });
});
