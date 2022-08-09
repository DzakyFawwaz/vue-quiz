<template>
  <section class="dashboard-container">
    <div class="header">
      <h1>Test {{ title }}</h1>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="input-kode-container">
      <form
        @submit.prevent="submitKode"
        class="d-flex flex-direction-row w-100 input-kode-sub-kontainer"
      >
        <input
          placeholder="Masukkan Test Kode"
          v-model="exam_code"
          class="form-control form-control-lg mr-2 mb-2"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        <input
          placeholder="Masukkan Akses Kode"
          v-model="access_code"
          class="form-control form-control-lg mr-2 mb-2"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        <!-- <input
          required
          v-model="exam_code"
          class="form-control mr-2"
          placeholder="Masukkan Kode"
        /> -->
        <button
          type="button"
          v-on:click="submitKode"
          class="btn-kode-submit btn-lg btn-block mb-2"
        >
          Submit Kode
        </button>

        <!-- <button v-on:click="submitKode" class="btn-kode-submit">Submit</button> -->
      </form>
    </div>
  </section>
</template>

<script>
import { useCookies } from "vue3-cookies";
export default {
  setup() {
    // this.code = $route.param.exam_code
    const { cookies } = useCookies();
    return {
      cookies,
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      exam_code: "",
      access_code: "",
      // prps: this.$props
    };
  },
  methods: {
    submitKode() {
      // console.log(this.$props.title);
      this.cookies.set("test_code", this.exam_code);
      this.cookies.set("access_code", this.access_code);
      this.$router.push({
        name: "CheckCode",
        params: { exam_code: this.exam_code, access_code: this.access_code },
      });
    },
  },
};
</script>

<style>
.dashboard-container {
  padding: 40px;
}

.input-kode-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  width: 100%;
}
/* 
.input-kode-sub-kontainer {
    display: flex;
    flex-direction: row;
  } */

@media (max-width: 600px) {
  .input-kode-sub-kontainer {
    display: flex;
    flex-direction: column !important;
  }

  input {
    margin-bottom: 10px;
  }
}
</style>
