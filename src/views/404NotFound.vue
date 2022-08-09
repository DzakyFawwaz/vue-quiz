<template>
  <div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <p class="notfound">404</p>
          <div class="mb-4 lead">
            Halaman yang anda akses tidak dapat ditemukan.
          </div>
          <router-link to="/dashboard" class="btn btn-link"
            >Back to Home</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* * {
  color: #fff;
} */

.notfound {
  background: -webkit-linear-gradient(#ea5d62, #8d191c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  padding: 0;
  /* height: 250px; */
  font-size: 200px;
  /* max-height: 150px; */
}
.page-wrap {
  background-color: rgb(237, 237, 237);
  /* background-image: linear-gradient(to bottom left, #a41d21, #590206); */
}
.page-wrap {
  min-height: 100vh;
}
</style>
