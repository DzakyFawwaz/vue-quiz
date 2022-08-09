<template>
  <section class="dashboard-container">
    <div class="header">
      <div style="display: flex; flex-direction: column">
        <h1>Halo {{ nama ? nama : "User" }}</h1>

        <div class="custom-badge mb-3">
          <span style="font-size: 12px">{{ origin }}</span>
        </div>
      </div>
      <div class="input-kode-container">
        <span class="mr-4" style="text-align: end">Sudah Punya kode exam?</span>
        <form
          @submit.prevent="submitKode"
          class="d-flex flex-direction-row input-kode-sub-container"
        >
          <input
            required
            v-model="exam_code"
            class="form-control mr-2"
            placeholder="Masukkan Test Kode"
          />
          <input
            required
            v-model="access_code"
            class="form-control mr-2"
            placeholder="Masukkan Akses Kode"
          />
          <button class="btn-kode-submit">Submit</button>
        </form>
      </div>
    </div>
    <br />
    <br />

    <div class="dashboard-body">
      <div class="card-item mb-4" v-on:click="goToTest('Kecerdasan')">
        <img
          class="card-img"
          alt="Kecerdasan"
          src="https://media.istockphoto.com/photos/artificial-intelligence-concept-picture-id1322017289?b=1&k=20&m=1322017289&s=170667a&w=0&h=6h9-avf0Zuv1JUaanl9OLSLaNiM-iZI5L6IAHgbsm3I="
        />
        <div class="layer">
          <div class="card-item-sub-container">
            <h2>Kecerdasan</h2>
            <p class="card-desc">
              Latih Kecerdasanmu di Tes Kecerdasan Garuda Abdi Negara. Kerjakan
              soal dan raih poin tertinggi.
            </p>
          </div>
        </div>
      </div>
      <div class="card-item mb-4" v-on:click="goToTest('Kepribadian')">
        <img
          class="card-img"
          alt="Kepribadian"
          src="https://media.istockphoto.com/photos/puzzle-eyes-concept-picture-id1358155840?b=1&k=20&m=1358155840&s=170667a&w=0&h=2hzKJLJqvjFIdDDcYBZh_hWeQQsSYnQCwR2JqgqS2Rg="
        />
        <div class="layer">
          <div class="card-item-sub-container">
            <h2>Kepribadian</h2>
            <p class="card-desc">
              Ingin tahu kepribadian dirimu? Ayo ikut tes kepribadian Garuda
              Abdi Negara. Selesaikan tes kepribadian untuk mengetahui apa
              kepribadianmu
            </p>
          </div>
        </div>
      </div>
      <div class="card-item mb-4" v-on:click="goToTest('Kecermatan')">
        <img
          class="card-img"
          alt="Sikap Kerja"
          src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        />
        <div class="layer">
          <div class="card-item-sub-container">
            <h2>Sikap Kerja</h2>
            <p class="card-desc">
              <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              quibusdam? Unde facere ipsum natus, sequi quis hic quidem cum
              velit autem, necessitatibus quas. Sed sapiente eum fugit et itaque
              dignissimos. -->
              Bersiap dalam mengasah sikap kerja, kamu akan ditest dengan 10
              exam yang berisikan 50 soal setiap exam.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useCookies } from "vue3-cookies";
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      exam_code: "",
      access_code: "",
      nama: this.cookies.get("name"),
      origin: this.cookies.get("origin"),
      modalShow: false,
    };
  },
  setup() {
    // this.code = $route.param.exam_code
    const { cookies } = useCookies();
    return {
      cookies,
    };
  },
  methods: {
    showModal() {
      this.modalShow = true;
      // console.log(this.modalShow);
    },
    startKecermatan() {
      this.$router.push({
        name: "KecermatanDetail",
        params: {
          exam_code: this.exam_code,
        },
      });
    },
    goToTest: function (path) {
      this.$router.push({ name: path, params: { title: path } });
    },
    startKecermatan() {
      this.$router.push({
        name: "KecermatanDetail",
        params: {
          exam_code: this.exam_code,
        },
      });
    },
    submitKode() {
      this.cookies.set("test_code", this.exam_code);
      this.cookies.set("access_code", this.access_code);

      this.$router.push({
        name: "CheckCode",
        params: {
          exam_code: this.exam_code,
          access_code: this.access_code,
        },
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  transition: ease-in-out 0.1s;
}

.dashboard-container {
  padding: 40px;
}

.header {
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.custom-badge {
  padding: 3px 10px;
  background-color: #8d191c;
  color: #fff;
  border-radius: 100px;
  width: fit-content;
}

.dashboard-body {
  gap: 20px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  justify-content: center;
}
.input-kode-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  flex: 1;
}

@media (max-width: 600px) {
  h1 {
    font-size: 26px !important;
  }

  .input-kode-sub-container {
    display: flex;
    flex-direction: column !important;
  }

  .form-control,
  .btn-kode-submit {
    margin-bottom: 10px;
  }
}

@media (max-width: 950px) {
  .header {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .input-kode-container {
    display: block !important;
    /* flex-direction: column; */
    /* gap: 0; */
  }

  .input-kode-container form {
    margin-top: 20px;
  }

  .dashboard-body {
    display: flex;
    flex-direction: column;
  }
}

.card-img {
  object-fit: cover;
  height: 100%;
}

.btn-kode-submit {
  border: none;
  padding: 10px;
  font-size: 14px;
  background-color: darkred;
  color: #fff;
  border-radius: 5px;
}

.card-item {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: auto;
  height: 200px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.card-item:hover {
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.layer:hover {
  background-color: rgba(141, 25, 28, 0.6);
}

.card-item-sub-container {
  position: relative;
  padding: 20px;
  z-index: 20;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: flex-end;
}

.card-desc {
  color: #fff;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  margin: 0;
}

.layer {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  background-image: linear-gradient(
    to right,
    rgba(141, 25, 28, 0.6),
    transparent
  );
}
</style>
