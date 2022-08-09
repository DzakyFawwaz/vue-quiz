<template>
  <section class="dashboard-container">
    <div class="header mb-5">
      <h1 style="color: #8d191c">Hasil Test Kecerdasan</h1>
    </div>
    <div class="result-container mb-5">
      <div class="score-container">
        <div style="padding: 20px">
          <h4 style="margin: 0">Score</h4>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto 0;
            padding-top: 20px;
          "
        >
          <circle-progress
            :percent="60.7"
            :fill-color="'#8d191c'"
            :show-percent="true"
            class="circular"
          />
        </div>
      </div>
      <div class="detail-answer-container">
        <div class="answered-question-container">
          <h3 style="font-size: 50px">15/20</h3>
          <p>Total Soal</p>
        </div>
        <div class="answered-question-container">
          <h3 style="font-size: 50px">15/20</h3>
          <p>Total Soal Dijawab</p>
        </div>
        <div class="answered-question-container">
          <h3 style="font-size: 50px">15/20</h3>
          <p>Total Jawaban Benar</p>
        </div>
        <div class="answered-question-container">
          <h3 style="font-size: 50px">15/20</h3>
          <p>Total Jawaban Salah</p>
        </div>
      </div>
    </div>
    <div>
      <RekapKecerdasanComponent :code="test_code" :questions="questions" />
      <div style="display: flex; justify-content: end">
        <div class="moveBtn" v-on:click="nextQuestion()">
          <span>Selanjutnya</span><i class="ml-3 fas fa-angle-right"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import RekapKecerdasanComponent from "../fitur/RekapKecerdasanComponent.vue";
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return {
      cookies,
    };
  },
  components: { CircleProgress, RekapKecerdasanComponent },
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  created() {
    this.getKecerdasan();
  },
  data() {
    return {
      questionStart: 0,
      questionEnd: 5,
      test_code: this.cookies.get("test_code"),
      questions: [],
      rawData: [],
    };
  },

  methods: {
    getKecerdasan() {
      this.rawData = JSON.parse(localStorage.questionContainer);
      this.questions = this.rawData.slice(this.questionStart, this.questionEnd);
      console.log(this.questions);
    },
    nextQuestion() {
      const trimStart = this.questionStart + 5; // limit question from
      const trimEnd = trimStart + 5; // limit question until
      this.questions = this.rawData.slice(trimStart, trimEnd);
      console.log(trimStart);
      console.log(this.questions);
      window.scrollTo(top);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
hr {
  margin: 0 !important;
  padding: 0;
  width: 100%;
}
.score-container,
.answered-question-container {
  justify-content: center;
  border-radius: 15px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  gap: 20px;
  text-align: center;
}

.score-container {
  gap: 50px !important;
  padding: 0 !important;
}

.answered-question-container h3 {
  color: #8d191c;
}

.detail-answer-container {
  width: 100%;
  gap: 30px;
  display: grid;
  grid-template-columns: repeat(2, auto);
}

.result-container {
  gap: 30px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: start;
  width: 100%;
}

.answer-container {
  width: fit-content;
}

.circular {
  /* align-items: center; */
  margin: 0 auto;
  /* height: 100% !important; */
  /* padding: 20px; */
  font-size: 35px;
  color: #8d191c;
  font-weight: bold;
}

.moveBtn {
  text-align: left;
  width: fit-content;
  background-color: #8d191c;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
}

.moveBtn:hover {
  cursor: pointer;
}
</style>
