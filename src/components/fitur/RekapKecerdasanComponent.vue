<template>
  <div class="w-100 rekapContainer">
    <h1>Rekap Jawaban</h1>
    <h5>Psikotest Kecerdasan {{ code }}</h5>
    <div class="mt-5">
      <!-- <div v-if="questions.length < 2">
        <h4>Anda belum menjawab soal</h4>
        {{ questions }}
      </div> -->
      <div
        class="my-2"
        v-for="question in questions.sort(function (a, b) {
          return a.questionNumber - b.questionNumber;
        })"
        :key="question.id"
      >
        <div class="jawabanBox">
          <div class="d-flex flex-direction-row">
            <h5 :id="'questionNumber' + question.questionNumber" class="mr-2">
              {{ question.questionNumber + 1 }}.
            </h5>
            <div>
              <h5 v-html="question.question.question" />
              <div class="my-4">
                <div
                  class="h6"
                  v-for="(option, optionIndex) in question.randomOptions"
                  :key="option.id"
                >
                  <div class="d-flex flex-direction-row">
                    {{ huruf[optionIndex].toUpperCase() }}.
                    <span class="ml-1" v-html="option.option_text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fw-bold d-flex flex-direction-row">
            <p class="mr-2">Jawaban Kamu:</p>
            <div v-for="option in question.question.option" :key="option.id">
              <div v-for="answer in answers" :key="answer.id">
                <div class="fw-bold" v-if="answer.answer == option.id">
                  <div
                    class="d-flex flex-direction-row"
                    style="color: #8d191c; margin: 0"
                  >
                    {{ huruf[answer.answerID].toUpperCase() }}.
                    <span class="ml-1" v-html="option.option_text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RekapKecerdasanComponent",
  data() {
    return {
      number: [],
      huruf: ["a", "b", "c", "d", "e"],
    };
  },
  props: {
    code: String,
    answers: Array,
    questions: Array,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      setTimeout(() => {
        const questionContainer = JSON.parse(localStorage.allQuestionsID);
        this.number = questionContainer;
        console.log("REKAP", this.questions);
      }, 1000);
    },
  },
};
</script>

<style>
.rekapContainer {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.rekapBox {
  margin-top: 40px;
  display: grid;
  height: fit-content;
  grid-gap: 2px;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 90px);
  grid-auto-flow: column;
}

.jawabanBox {
  padding: 30px;
  border: 1px solid #eeee;
  border-radius: 10px;
}
</style>
