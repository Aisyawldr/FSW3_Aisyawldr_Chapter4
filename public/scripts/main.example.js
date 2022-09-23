//Kode Program untuk Membaca Parameter
const urlSearchParams = new URLSearchParams(window.location.search);
const parameters = Object.fromEntries(urlSearchParams.entries());

console.log('Memanggil Parameter');
console.log(parameters);

//Kode Program penggunaan DOM di dalam class
console.log('Membuat App() baru');
const app = new App();

app.init().then(console.log('App berhasil di Install'));
