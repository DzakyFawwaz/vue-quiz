<template>
  <section>
    <nav>
      <img src="../../assets/mpa-logo.png" style="width: auto; height: 40px" />
      <h2 class="ml-3" style="color: #8d191c">Test Kepribadian</h2>
    </nav>
    <br /><br />
    <div>
      <div
        v-for="(k, questionId) in temp"
        :key="questionId"
        :class="{
          'question-container': true,
          'current-question': currentQuestion == k.id - 1,
        }"
      >
        <h4 style="text-align: center">{{ k.question }}</h4>
        <br />
        <br />
        <div class="answer-container">
          <p style="font-weight: bold; font-size: 20px; color: #8d191c">
            Tidak Setuju
          </p>
          <div class="answer-subcontainer" :id="'question' + (k.id - 1)">
            <li
              v-for="(answer, answerId) in k.answer"
              :key="answerId"
              v-on:click="onClickAnswer(answerId, k.id - 1)"
              :id="'answer' + answerId"
              :class="{
                'agree-answer': answerId >= 3,
                'disagree-answer': answerId <= 1,
                'neutral-answer': answerId == 2,
              }"
            >
              <!-- {{ answer.answer_id }} -->
            </li>
          </div>
          <p style="font-weight: bold; font-size: 20px; color: #1e711e">
            Setuju
          </p>
        </div>
        <br />
        <hr />
        <br />
        <br />
      </div>
      <div v-if="isDisabled" style="text-align: center">
        <button
          v-on:click="submitAnswer"
          :disabled="isDisabled"
          class="btn custom-btn"
          style="font-size: 14px !important"
        >
          Jawab Semua Pertanyaan Terlebih Dahulu
        </button>
      </div>
      <div v-else style="text-align: center">
        <button
          v-on:click="submitAnswer"
          :disabled="isDisabled"
          class="btn custom-btn"
        >
          Selanjutnya <i class="fas fa-arrow-right ml-2" />
        </button>
      </div>
    </div>
    <br />
    <br />
  </section>
</template>

<script>
import kepribadianjson from "../../../kepribadian.json";

export default {
  setup() {},
  data() {
    return {
      kepribadian: [],
      temp: [],
      currentQuestion: 0,
      questionStart: 0,
      questionEnd: 5,
      allActiveClass: "active-agree active-disagree active-neutral",
      isDisabled: true,
      answerBox: [],
    };
  },
  created() {
    this.getKepribadian();
  },
  methods: {
    getKepribadian() {
      kepribadianjson.map((i) => {
        i.answer.splice(3, 0, i.answer[0]);
        i.answer.shift();
      });

      this.kepribadian = kepribadianjson;
      this.temp = this.kepribadian.slice(this.questionStart, this.questionEnd);
    },
    onClickAnswer: function (answerId, questionId) {
      const answerElement = "#question" + questionId + " #answer" + answerId;
      const answerClass = document.querySelector(
        "#question" + questionId + " #answer" + answerId
      ).className;
      const allActiveClass = "active-agree active-disagree active-neutral";

      switch (answerClass) {
        case "disagree-answer":
          $(answerElement)
            .addClass("active-disagree")
            .siblings()
            .removeClass(allActiveClass);
          break;
        case "agree-answer":
          $(answerElement)
            .addClass("active-agree")
            .siblings()
            .removeClass(allActiveClass);
          break;
        case "neutral-answer":
          $(answerElement)
            .addClass("active-neutral")
            .siblings()
            .removeClass(allActiveClass);
          break;

        default:
          break;
      }

      const schema = {
        question_id: questionId,
        answer_id: answerId,
      };

      this.answerBox.push(schema);

      if (this.currentQuestion == questionId) {
        const x = $(window).scrollTop();
        $(window).scrollTop(x + 250);
        this.currentQuestion += 1;
      }

      this.questionStart = this.currentQuestion;
      if (this.temp[this.temp.length - 1].id == this.currentQuestion) {
        this.isDisabled = false;
      }
    },
    submitAnswer() {
      console.log(this.answerBox);
      if (
        this.currentQuestion == this.kepribadian[this.kepribadian.length - 1].id
      ) {
        this.$router.push("/dashboard")
      }

      const trimStart = this.questionStart; // limit question from
      const trimEnd = trimStart + 5; // limit question until
      this.temp = this.kepribadian.slice(trimStart, trimEnd);
      $(".active-agree").removeClass(this.allActiveClass);
      $(".active-neutral").removeClass(this.allActiveClass);
      $(".active-disagree").removeClass(this.allActiveClass);
      window.scrollTo(top);
      this.isDisabled = true;
    },
  },
};
</script>

<style>
:root {
  --box: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  --agree: linear-gradient(to bottom right, #15a412, #1be017);
  --disagree: linear-gradient(to bottom right, #8d191c, #e5464a);
  --neutral: linear-gradient(to bottom right, gray, #aaa4a4);
}

hr {
  border: 0;
  clear: both;
  display: block;
  width: 96%;
  background-color: gray;
  height: 1px;
}

.custom-btn {
  justify-content: center;
  align-items: center;
  padding: 20px 40px !important;
  font-size: 20px !important;
  color: #fff !important;
  background-color: #8d191c !important;
  border-radius: 100px !important;
  width: 300px;
  text-align: center;
  justify-content: center;
}

.custom-btn:hover {
  opacity: 0.9;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

/* h2 {
  font-family: "Times New Roman", Times, serif !important;
} */

nav {
  display: flex;
  padding: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
}

/* .container {
  display: flex;
  flex-direction: column;
  z-index: 1;
  justify-content: center;
  align-items: center;
} */

.question-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 70%;
  margin: 0 auto;
  opacity: 0.2;
}

.current-question {
  opacity: 1 !important;
}

.answer-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.answer-container p {
  min-width: 100px;
}
.answer-container p:first-child {
  text-align: end;
}

.answer-subcontainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
}

/* AGREE */
.agree-answer {
  width: 50px;
  height: 50px;
  border: 3px solid #1e711e;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
}
.active-agree {
  border: none;
  background-image: var(--agree);
}

.agree-answer:hover {
  box-shadow: var(--box);
  border: none;
  background-image: var(--agree);
  cursor: pointer;
}

/* NEUTRAL */
.neutral-answer {
  width: 40px;
  height: 40px;
  border: 3px solid gray;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
}
.neutral-answer:hover {
  box-shadow: var(--box);
  border: none;
  background-image: var(--neutral);
  cursor: pointer;
}
.active-neutral {
  border: none;
  background-image: var(--neutral);
}

/* DISAGREE */
.disagree-answer {
  width: 50px;
  height: 50px;
  border: 3px solid #8d191c;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
}

.disagree-answer:hover {
  box-shadow: var(--box);
  border: none;
  background-image: var(--disagree);
  cursor: pointer;
}

.active-disagree {
  border: none;
  background-image: var(--disagree);
}

@media (max-width: 900px) {
  .answer-container p {
    display: none;
  }
}
</style>
