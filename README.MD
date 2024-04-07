# About This Projects

Tugas anda kali ini adalah membuat sebuah backend aplikasi pengajuan izin, yang memiliki spesifikasi sebagai berikut:

- Terdapat 3 level pengguna: Admin, Verifikator dan pengguna biasa.
- Ijin yang diajukan berfomat free text judul, isi, dan detail yang mengajukan ijin
- Buat table database sesuikan kebutuhan aplikasi dengan relasi antar tabel.
- Buat endpoint-endpoint API untuk kebutuhan berikut:
  - Login dan Logout sesuai level penggunanya
  - Mendaftar sebagai pengguna baru
  - Admin:
    - Melihat semua user
    - Menambahkan/mendaftarkan user verifikator
    - Mengubah status user biasa menjadi verifikator
    - Melihat izin yang diajukan
    - Reset Password user
  - Verifikator
    - Memverifikasi pendaftaran pengguna
    - Melakukan ACC / Penolakan terhadap pengajuan izin, disertai komentar
  - User Biasa
    - Mendaftar
    - Mengajukan izin (Cuti, Libur Sakit, dll)
    - Melihat daftar izin yang pernah diajukan
    - Mengubah/update detail izin yang diajukan
    - Melihat status pengajuan izinnya
    - Membatalkan pengajuan izin
    - Menghapus pengjuan izin
    - Update password
  - Pastikan data dikirim dan diterima dalam format JSON
- Implementasikan fungsi validasi untuk memastikan data yang dimasukkan sesuai
- Perhatikan akses ke masing-masing endpoint sesuai autentikasi yang dimiliki

## How to run this project

1. Run Migration

```
sequelize db:migrate
```

2. Register Default User and Admin

3. Create Database name "express_db" in MySQL

4. Run Seeder for Permissions

```
sequelize db:seed:all
```

5. Run Project

```
npm run start
```
