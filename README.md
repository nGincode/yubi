# Laravel X Inertia X Reactjs X TailwindCss

Dipergunakan untuk test kerja pada perusahan PT. Yubi Technology. aplikasi ini dibuat sendiri dari hasil experiment.

# Instalation

## Required

1. PHP
2. Node Js Latest
3. Base url (hanya dapat berjalan pada baseurl misal http://yubi atau http://localhost:8000 tidak bisa di http://yubi.com/folder/app)

## Create Database

1. Buat Database dengan nama apapun misal "myapp"
2. Edit env data sesuai config dan nama database anda

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=myapp
DB_USERNAME=root
DB_PASSWORD=

3. Migrate database dengan memasukan printah
   php artisan migrate:fresh --seed

4. pada --seed untuk memasukan dummy data seperti akun super admin

## Run App

1. php artisan serve
2. buka browser di http://localhost:8000
   info : npm run dev (development) jika anda ingin mengubah atau jika telah selesai di ubah npm run build
