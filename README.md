# Laravel X Inertia X Reactjs X TailwindCss

Dipergunakan untuk test kerja pada perusahan PT. Yubi Technology. aplikasi ini dibuat sendiri dari hasil experiment kerja WFH.
aplikasi di buat dalam bentuk monolith, namun RESTAPI dapat di pergunakan ke external melalui route /api dengan menggunkan JWT.
aplikasi dapat mengirimkan email yang telah di sertakan setting SMTP melalui server VPS sendiri untuk melakukan test email pada file env yang dipergunakan untuk register dan forgot password.

# Instalation

## Required

1. PHP (WAMPP/XAMPP)

```bash
#open terminal
php -v
#maka akan muncul versi php
```

2. Node Js Latest

```bash
#open terminal
node -v && npm -v
#maka akan muncul versi nodejs & npm
```

3. Database mysql/mariadb

## Download Aplikasi

1. Siapkan folder untuk aplikasi
2. Buka terminal di folder tersebut dan masukan printah

```bash
git clone https://github.com/nGincode/yubi.git
```

3. lalu masuk ke folder aplikasi dengan di terminal

```bash
cd /yubi
```

4. aplikasi berhasil didownload

## Create Database

1. Buat Database dengan nama apapun misal "myapp"
2. Edit .env data sesuai config dan nama database anda

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=myapp
DB_USERNAME=root
DB_PASSWORD=
```

3. Migrate database dengan memasukan printah

```bash
php artisan migrate:fresh --seed
```

4. pada --seed untuk memasukan dummy data seperti akun super admin

## Run App

1. pastikan anda berada di dalam folder app. ketikan perinta di terminal

```bash
php artisan serve
```

2. buka browser di http://localhost:8000
   info : npm run dev (development) jika anda ingin mengubah atau jika telah selesai di ubah npm run build untuk file js

# Penggunaan Aplikasi

1. Pastikan aplikasi berjalan seperti berikut :
   ![home](public/tutorial/home.png)

## Login

1. Klik login pada pojok kanan atas
   ![home](public/tutorial/home.png)
2. Masukan email : superadmin@gmail.com dan Password : superadmin
   ![login](public/tutorial/login.png)
3. Anda berhasil login sebagai admin yang nantinya akan di gunakan untuk control permission akses
   ![dashboard](public/tutorial/dashboard.png)
4. untuk logout kilik pada username: superadmin pojok kiri atas di bawah logo yubi

## Register

1. Klik register pada pojok kanan atas
   ![home](public/tutorial/home.png)
2. isi data dengan benar termasuk email aktif
   ![register](public/tutorial/register.png)
3. setelah submit akan mendapatkan tampilan seperti ini :
   ![verfemail](public/tutorial/verfemail.png)
4. maka anda dapat cek email anda. jika terdapat pengetikan email salah maka dapat isi kolom change your email
5. maka akan ada pesan di kontak masuk email seperti ini:
   ![email](public/tutorial/email.png)
6. maka klik verivy email address
7. lalu anda berhasil membuat akun
   ![dasboardnoizin](public/tutorial/dasboardnoizin.png)
8. disini anda tidak memiliki izin akses aplikasi maka menunggu pihak admin untuk membuat izin anda.

## Membuat Grups Permission (izin akses)

1. login akun yang memiliki akses group seperti email : superadmin@gmail.com dan Password : superadmin
2. lalu pergi ke menu account -> group
   ![group](public/tutorial/group.png)
3. setelah itu, isi data izin seperti contoh berikut :
   ![tambahgroup](public/tutorial/tambahgroup.png)
4. disitu terdapat username yang belum memiliki akses, dan pada data display memungkinkan fungsi untuk menampilkan data secara private, division, store atau keseluruhan
5. setelah disimpan, maka terdapat menu baru sesuai izin yg dipilih, dan bisa melakukan sesai yg di pilih
   ![dashcont](public/tutorial/dashcont.png)
6. lalu pemilik akun disuruh untuk melangkapi data contact
   ![contact](public/tutorial/contact.png)
7. setelah disimpan maka akun berhasil di buat dengan sempurna
   ![success](public/tutorial/success.png)

## Store

Store merupakan nama perusahaan

## Users

Anda dapat membuat akun tanpa melalui proses verif email
