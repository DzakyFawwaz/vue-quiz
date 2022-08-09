<template>
  <section id="StartKecermatanPage">
    <div class="container py-4">
      <div
        class="row text-center d-flex flex-column justify-content-center align-items-center"
        style="height: fit-content"
      >
        <figure id="illustrationStart">
          <img
            id="imageStart"
            src="asset/img/logo-gan.png"
            alt=""
            class="img-fit-cover"
          />
        </figure>
        <br />
        <h1>{{ message }}</h1>
        <div
          class="d-block"
          v-if="message == 'Akses Kode Sudah Pernah Dipakai'"
        >
          <div class="mb-5">
            Anda akan otomatis pindah ke halaman Test Result dalam
            <b>{{ countdown }}</b>
          </div>
          <button
            type="button"
            class="btn mpa-btn-primary text-white text-uppercase mr-0 mb-2 mr-md-5"
            v-on:click="backButton"
          >
            Kembali Ke Dashboard
          </button>
          <button
            type="button"
            class="btn mpa-btn-primary text-white text-uppercase mb-2"
            v-on:click="this.$router.push({ name: 'TestResult' })"
          >
            Lihat Result Sekarang
          </button>
        </div>
        <div v-else>
          <div class="mb-4 mb-md-3">
            Ketuk tombol untuk kembali ke halaman Dashboard
          </div>
          <button
            type="button"
            class="btn mpa-btn-primary text-white text-uppercase"
            v-on:click="backButton"
          >
            Kembali Ke Dashboard
          </button>
        </div>
        <!-- Button trigger modal -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: "Akses Kode Tidak Ditemukan",
      countdown: 5,
      timer: setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else if (this.countdown == 0) {
          clearInterval(this.timer);
          this.$router.push("/test-result");
        } else {
          return;
        }
      }, 1000),
    };
  },
  created() {
    this.process();
    this.count();
  },
  methods: {
    backButton() {
      clearInterval(this.timer);
      this.$router.push("/dashboard");
    },
    count() {
      if (this.message == "Akses Kode Sudah Pernah Dipakai") {
        this.timer;
      } else {
        clearInterval(this.timer);
        return;
      }
    },
    process() {
      if (this.$route.params.message) {
        this.message = this.$route.params.message;
      }
    },
  },
};
</script>

<style scoped>
#StartKecermatanPage {
  display: flex;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

#illustrationStart,
#imageStart {
  width: auto;
  height: 200px;
}

#titleStart {
  font-size: 60px;
  color: #8d191c;
}

@media screen and (max-width: 600px) {
  #illustrationStart,
  #imageStart {
    width: auto;
    height: 200px;
    margin-bottom: 20px;
  }

  #titleStart {
    font-size: 30px;
  }
  #subtitleStart {
    font-size: 20px;
  }
}

@media screen and (max-width: 1000px) and (orientation: landscape) {
  #illustrationStart,
  #imageStart {
    width: auto;
    height: 120px;
  }

  #titleStart {
    font-size: 30px;
  }
  #subtitleStart {
    font-size: 20px;
  }

  #subContainerStart {
    display: flex;
    flex-direction: row;
  }

  #subContainerStartTitle {
    margin-left: 20px;
    text-align: start;
  }

  span {
    text-align: start;
  }

  #buttonWrapper {
    text-align: end;
  }
}
</style>
