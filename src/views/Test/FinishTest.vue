<template>
  <section id="FinishKecermatanPage">
    <div class="container w-100 d-flex justify-content-center">
      <div
        class="w-75 row text-center d-flex flex-column align-items-center"
      >
        <figure id="illustrationStart">
          <img src="asset/img/logo-gan.png" alt="" id="imageStart" />
        </figure>
        <br />
        <br />
        <h1 id="titleStart">
          Selamat Kamu Telah Menyelesaikan Test
        </h1>
        <p>
          Jawaban anda sedang kami proses, anda dapat melihat hasil test anda
          segera.
        </p>
        <br />
        <button
          :disabled="isLoading"
          v-on:click="LihatHasil"
          class="btn mpa-btn-primary custom-button text-white"
        >
          <div v-if="isLoading">
            <PulseLoader color="#8d191c" size="14px" />
          </div>
          <div v-else>Lihat Hasil Test</div>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
#illustrationStart {
  width: 30%;
  // height: 400px;
}
.text-gan {
  color: #833030;
}
</style>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "FinishKecermatan",
  components: {
    PulseLoader,
  },
  setup() {
    const { cookies } = useCookies();
    return {
      cookies,
    };
  },
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    this.processExam();
  },
  methods: {
    processExam() {
      let testCode = this.cookies.get("test_code");
      let accessCode = this.cookies.get("access_code");
      let token = this.cookies.get("X-GAN-TOKEN");

      setTimeout(async () => {
        await axios
          .get(
            "/banksoal/psikotest/precision/process-grade-precision?test_code=" +
              testCode +
              "&access_code=" +
              accessCode,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            this.isLoading = false;
            // console.log("data after processed: ");
            // console.log(res);
          });
      }, 5000);
    },
    LihatHasil() {
      this.$router.push("/test-result");
    },
  },
};
</script>

<style scoped>
#illustrationStart,
#imageStart {
  width: auto;
  height: 200px;
}

#FinishKecermatanPage {
  height: 100vh;
  display: flex;
  align-items: center;
}

#titleStart {
  font-size: 60px !important;
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
    font-size: 40px !important;
  }
  #subtitleStart {
    font-size: 20px !important;
  }
}


@media screen and (max-width: 1000px) and (orientation: landscape) {
  #illustrationStart,
  #imageStart {
    width: auto;
    height: 120px;
  }

  #titleStart {
    font-size: 30px !important;
  }
  #subtitleStart {
    font-size: 20px !important;
  }

  
}
</style>
