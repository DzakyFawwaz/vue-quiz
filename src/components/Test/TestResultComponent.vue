<template>
  <section class="dashboard-container">
    <div class="header mb-5">
      <h1 style="color: #8d191c">Hasil Test</h1>
    </div>
    <div v-if="dataIsReady">
      <!-- Kecepatan -->
      <div class="d-flex justify-content-between align-items">
        <h2>Kecepatan</h2>
        <div class="h4 d-flex flex-row">
          Rata-rata :
          <span
            v-if="examData.accKecepatan"
            :class="{
              isUp: statusKecepatan,
              isDown: !statusKecepatan,
              'ml-2': true,
            }"
          >
            {{ examData.accKecepatan }}
            <i v-if="statusKecepatan" class="fas fa-caret-up"></i>
            <i v-else class="fas fa-caret-down"></i>
          </span>
          <span v-else></span>
        </div>
      </div>
      <div>
        <div v-if="examData.kecepatan.length > 0" class="chart">
          <LineChartComponent
            :examData="examData.kecepatan"
            :examLabel="examLabel.kecepatan"
            :labels="labels"
          />
        </div>
        <div v-else>Loading</div>
      </div>
      <!-- Ketepatan -->
      <div class="mb-5"></div>
      <div class="d-flex justify-content-between align-items">
        <h2>Ketepatan</h2>
        <span class="h4">
          Rata-Rata:
          <span
            v-if="examData.accKetepatan"
            :class="{
              isUp: statusKetepatan,
              isDown: !statusKetepatan,
              'ml-2': true,
            }"
          >
            {{ examData.accKetepatan }}
            <i v-if="statusKetepatan" class="fas fa-caret-up"></i>
            <i v-else class="fas fa-caret-down"></i>
          </span>
          <span v-else></span>
        </span>
      </div>
      <div>
        <div v-if="examData.ketepatan.length > 0" class="chart">
          <LineChartComponent
            :examData="examData.ketepatan"
            :examLabel="examLabel.ketepatan"
            :labels="labels"
          />
        </div>
        <div v-else>Loading</div>
      </div>
      <div class="mb-5"></div>
      <!-- Ketahanan -->
      <div class="d-flex justify-content-between align-items">
        <h2>Ketahanan</h2>
        <span class="h4 d-flex align-items">
          Rata-rata :
          <span
            v-if="examData.accKetahanan"
            :class="{
              isDown: !statusKetahanan,
              isUp: statusKetahanan,
              'ml-2': true,
            }"
          >
            {{ examData.accKetahanan }}
            <i v-if="statusKetahanan" class="fas fa-caret-up"></i>
            <i v-else class="fas fa-caret-down"></i>
          </span>
          <span v-else></span>
        </span>
      </div>
      <div>
        <div v-if="examData.ketahanan.length > 0" class="chart">
          <KetahananChart
            :examData="examData.ketahanan"
            :examLabel="examLabel.ketahanan"
            :labels="[
              '0',
              '1 ke 2',
              '2 ke 3',
              '3 ke 4',
              '4 ke 5',
              '5 ke 6',
              '6 ke 7',
              '7 ke 8',
              '8 ke 9',
              '9 ke 10',
            ]"
          />
        </div>
        <div v-else>Loading</div>
      </div>
    </div>
    <div v-else style="display: flex; justify-content: center">
      <PulseLoader color="#8d191c" />
    </div>
  </section>
</template>

<script>
import LineChartComponent from "./ChartComponent.vue";
import KetahananChart from "./KetahananChart.vue";
import { useCookies } from "vue3-cookies";
import axios from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const { cookies } = useCookies();
export default {
  setup() {
    return {
      cookies,
    };
  },
  components: {
    PulseLoader,
    LineChartComponent,
    KetahananChart,
  },
  data() {
    return {
      examData: {
        kecepatanLabels: [
          "Kolom 1",
          "Kolom 2",
          "Kolom 3",
          "Kolom 4",
          "Kolom 5",
          "Kolom 6",
          "Kolom 7",
          "Kolom 8",
          "Kolom 9",
          "Kolom 10",
        ],
        ketahananLabels: [
          "kolom 1-2",
          "kolom 2-3",
          "kolom 3-4",
          "kolom 4-5",
          "kolom 5-6",
          "kolom 7-8",
          "kolom 8-9",
          "kolom 9-10",
        ],
        kecepatan: [],
        ketepatan: [],
        ketahanan: [],
        accKecepatan: "",
        accKetepatan: "",
        accKetahanan: "",
      },
      examLabel: {
        kecepatan: "Soal Berhasil Terjawab",
        ketepatan: "Jawaban yang benar",
        ketahanan: "Tingkat Konsistensi",
      },
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      statusKetahanan: true,
      statusKecepatan: true,
      statusKetepatan: true,
      dataIsReady: false,
    };
  },
  mounted() {
    this.getGrade();
  },
  created() {
    this.getGrade();
  },
  methods: {
    async getGrade() {
      let testCode = this.cookies.get("test_code");
      let accessCode = this.cookies.get("access_code");
      let token = this.cookies.get("X-GAN-TOKEN");
      var data = await axios.get(
        "/banksoal/psikotest/precision/get-grade-precision?test_code=" +
          testCode +
          "&access_code=" +
          accessCode,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    //   console.log("get grade: ");
    //   console.log(data);
      if (data.data.data.data) {
        this.dataIsReady = true;
      } else {
        this.dataIsReady = false;
      }

      this.examData.accKecepatan = await data.data.data.data.speedAccumulated;
      this.examData.accKetepatan = await data.data.data.data
        .accuracyAccumulated;
      this.examData.accKetahanan = await data.data.data.data
        .enduranceAccumulated;
      this.examData.kecepatan = await data.data.data.data.speeds;
      this.examData.ketepatan = await data.data.data.data.accuracies;
      this.examData.ketahanan = await data.data.data.data.endurances;
      this.examData.ketahanan.unshift(0);
      // console.log("this.examData.ketahanan: ");
      // console.log(this.examData.ketahanan);
      this.examData.accKecepatan = this.examData.accKecepatan.toString();
      this.examData.accKetepatan = this.examData.accKetepatan.toString();
      this.examData.accKetahanan = this.examData.accKetahanan.toString();

      if (this.examData.accKecepatan.indexOf("-") == 0) {
        this.statusKecepatan = false;
        this.examData.accKecepatan = this.examData.accKecepatan.substring(1);
      } else {
        this.statusKecepatan = true;
      }

      if (this.examData.accKetepatan.indexOf("-") == 0) {
        this.statusKetepatan = false;
        this.examData.accKetepatan = this.examData.accKetepatan.substring(1);
      } else {
        this.statusKetepatan = true;
      }

      if (this.examData.accKetahanan.indexOf("-") == 0) {
        this.statusKetahanan = false;
        this.examData.accKetahanan = this.examData.accKetahanan.substring(1);
      } else {
        this.statusKetahanan = true;
      }
    },
  },
};
</script>

<style>
.chart {
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.rata {
  display: flex;
  align-items: center;
}

.isUp {
  color: green;
}

.isDown {
  color: red;
}
</style>
