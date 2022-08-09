<template>
  <section id="StartKecerdasan">
    <div id="waktuPengerjaanLandscape">
      <span style="font-size: 10px"> Waktu: </span>
      <span id="dashTimer">
        <h1>--</h1>
      </span>
      <span id="timeID" class="fw-bold mb-2">
        <h3>
          <strong>{{ hour }}</strong
          >:<strong>{{ minute }}</strong
          >:<strong>{{ second }}</strong>
        </h3>
      </span>
    </div>
    <div class="container py-5">
      <div class="row" style="position: relative">
        <div class="col-12 col-md-8">
          <div :class="{ soalContainer: true, 'd-none': isHidden }">
            <form @submit.prevent="kecermatan">
              <div id="kecermatan"></div>
            </form>
            <div class="p-3 border rounded subtitle-badge fw-bold mb-3">
              Soal Test Kecerdasan <br />
              <!-- Exam : {{ indexExam }} <br /> -->
              Soal Ke :
              {{ indexQuestion == 50 ? "Mengambil Soal" : indexQuestion + 1 }}
            </div>
            <div
              id="waktuPengerjaan"
              class="p-3 border mb-3 rounded text-center"
            >
              <div id="timePengerjaan">Waktu Pengerjaan</div>
              <span id="timeID" class="fw-bold mb-2">
                <h3>
                  <strong>{{ hour }}</strong
                  >:<strong>{{ minute }}</strong
                  >:<strong>{{ second }}</strong>
                </h3>
              </span>
            </div>
            <div class="d-flex flex-column mb-4" style="display: none">
              <div
                v-if="statusQuestion"
                class="question mb-3 w-75 d-flex justify-content-center flex-column"
                id="questionField"
              ></div>
              <div v-else class="loading-state">
                <div class="loading-state-bg"></div>
                <PulseLoader color="#8d191c" style="margin: 0 auto" />
                <p>Mengambil Soal</p>
              </div>
              <div class="row">
                <button
                  :disabled="isDisabled"
                  v-on:click="chooseAnswer('0')"
                  id="btnAnswer0"
                  class="btn test-button col w-25 mx-2"
                >
                  <span> A </span>
                </button>
                <br />
                <button
                  :disabled="isDisabled"
                  v-on:click="chooseAnswer('1')"
                  id="btnAnswer1"
                  class="btn test-button col w-25 mx-2"
                >
                  <span> B </span>
                </button>
                <br />
                <button
                  :disabled="isDisabled"
                  v-on:click="chooseAnswer('2')"
                  id="btnAnswer2"
                  class="btn test-button col w-25 mx-2"
                >
                  <span> C </span>
                </button>
                <br />
                <button
                  :disabled="isDisabled"
                  v-on:click="chooseAnswer('3')"
                  id="btnAnswer3"
                  class="btn test-button col w-25 mx-2"
                >
                  <span> D </span>
                </button>
                <br />
                <button
                  :disabled="isDisabled"
                  v-on:click="chooseAnswer('4')"
                  id="btnAnswer4"
                  class="btn test-button col w-25 mx-2"
                >
                  <span> E </span>
                </button>
                <br />
              </div>
            </div>
            <div class="d-flex justify-content-between" style="display: none">
              <span
                class="btn btn-outline-secondary btn-lg border"
                v-on:click="prevQuestion()"
                ><i class="fas fa-angle-left"></i
              ></span>
              <span
                class="btn btn-outline-secondary btn-lg border"
                v-on:click="nextQuestion()"
                ><i class="fas fa-angle-right"></i
              ></span>
            </div>
          </div>
          <div :class="{ rekapNilai: true, 'd-none': !isHidden }">
            <RekapKecerdasanComponent
              :code="test_code"
              :questions="questions"
              :answers="answer"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-4"
          style="position: sticky; height: fit-content; top: 48px; right: 0"
        >
          <div class="qind">
            <div class="p-3 border rounded-md panel-question">
              <h4 class="mpa-h4-headline fw-bold">Soal</h4>
              <div id="box" class="box">
                <div
                  v-for="(iq, index) in totalSoal"
                  :key="iq.id"
                  :id="warna + index"
                  style="border-radius: 10px; overflow: hidden"
                  :class="{ warna: true, border: true }"
                  v-on:click="moveQuestion(index)"
                >
                  <div
                    :class="{
                      'h-100': true,
                      rounded: true,
                      'text-center': true,
                      // 'p-2': true,
                    }"
                  >
                    <div :id="'flag' + index" class="">
                      <div :id="'currentq' + index" class="cq p-2 h-100">
                        {{ index + 1 }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span
                v-if="checkIfFlaggedText()"
                class="btn my-2"
                style="color: #ffff; background-color: #8d191c"
                v-on:click="checkIfFlagged()"
                >Hapus Tanda</span
              >
              <span
                v-else
                class="btn rounded my-2"
                style="color: #ffff; background-color: #ffc41f"
                v-on:click="checkIfFlagged()"
              >
                Tandai Soal
              </span>
            </div>
            <div class="my-3 modal-btn">
              <div>
                <div
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Yakin ingin kembali ke Dashboard?
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        Progress test anda akan disimpan. Anda akan tetap lanjut
                        mengerjakan test dari test terakhir anda keluar
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Batalkan
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary text-white"
                          style="
                            background-color: #8d191c !important;
                            border: none !important;
                          "
                          v-on:click="backToDashboard"
                          data-bs-dismiss="modal"
                        >
                          Kembali ke Dashboard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Selesai Modal -->
              <div>
                <div
                  class="modal fade"
                  id="staticBackdrop2"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Selesaikan test ini?
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        Pastikan anda sudah menjawab semua soal, selanjutnya
                        kami akan memproses jawaban anda.
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Batalkan
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary text-white"
                          style="
                            background-color: #8d191c !important;
                            border: none !important;
                          "
                          v-on:click="selesaiTest"
                          data-bs-dismiss="modal"
                        >
                          Selesai Test
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: column">
                <button
                  v-if="testfinished"
                  v-on:click="lihatJawabanSaya"
                  type="button"
                  class="btn text-white w-100 mb-2"
                  style="background-color: green; color: white; width: 100%"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop2"
                >
                  <span>Selesai Test</span>
                </button>
                <button
                  v-on:click="lihatJawabanSaya"
                  type="button"
                  class="btn text-white w-100"
                  style="background-color: #8d191c; color: white; width: 100%"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop2"
                >
                  <span v-if="isHidden"> Kembali ke Soal </span>
                  <span v-else> Lihat Jawaban Saya </span>
                </button>

                <span
                  class="my-2"
                  style="color: gray; font-size: 12px; text-align: flex-end"
                  >Jika terjadi masalah pada test, kembali ke dashboard dan
                  masukan ulang kode</span
                >
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style="
                    width: 100% !important;
                    flex: 1;
                    border: 1px solid #8d191c;
                    color: #8d191c;
                    background: transparent;
                  "
                  class="btn w-100 mb-2"
                >
                  Kembali ke Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RekapKecerdasanComponent from "../fitur/RekapKecerdasanComponent.vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "TestKecerdasan",
  components: {
    PulseLoader,
    RekapKecerdasanComponent,
  },
  setup() {
    const { cookies } = useCookies();
    return {
      cookies,
    };
  },
  data() {
    return {
      test_code: this.cookies.get("test_code"),
      access_code: this.cookies.get("access_code"),
      warna: "warna",
      huruf: ["a", "b", "c", "d", "e"],
      kecermatans: [],
      countDown: 5,
      exam: "",
      questions: "",
      indexQuestion: -1,
      nowQuestion: "",
      nowOption: [],
      answer: [],
      fiftyAnswer: [],
      totalSoal: 0,
      statusQuestion: false,
      isDisabled: true,
      hour: "",
      minute: "",
      second: "",
      isHidden: false,
      isEditing: false,
    };
  },

  created() {
    this.getQuestions();
    this.countDownSendAnswer();
    this.counterDownTimer();
    window.onbeforeunload = function (e) {
      e.preventDefault();
      return "you can not refresh the page";
    };
    // this.start();
  },
  computed: {
    testfinished() {
      if (this.answer.length == this.totalSoal) {
        return true;
      }
    },
  },
  methods: {
    start() {
      // console.log(this.questions);
      if (this.answer != null) {
        // console.log(this.questions);
        for (let idn = 0; idn < this.totalSoal; idn++) {
          this.answer.forEach((answer) => {
            if (this.questions[idn].id == answer.question_id) {
              // document.getElementById("warna" + idn).className += " active";
            }
          });
        }
      }
    },
    backToDashboard() {
      this.$router.push("/");
    },

    async getQuestions() {
      let token = this.cookies.get("X-GAN-TOKEN");
      await axios
        .get(
          "/banksoal/psikotest/get-psikotest-data?test_code=" +
            this.test_code +
            "&access_code=" +
            this.access_code,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log("Get Psikotest Data: ", res);
          this.exam = res.data.data.psikotest.exam[0].id;
          let time = res.data.data.psikotest.exam[0].total_duration;
          time = time.split(":");
          this.hour = time[0];
          this.minute = time[1];
          this.second = time[2];
          // console.log(JSON.parse(res.data.data.oldAnswer))
          if (res.data.status == 2) {
            this.answer = JSON.parse(res.data.data.oldAnswer);
          }
        });

      console.log("This Exam: ", this.exam);

      // if (localStorage.kecerdasanQuestion) {
      //   this.questions = localStorage.kecerdasanQuestion
      //   this.totalSoal = this.questions.length;
      // } else {
      await axios
        .get("/banksoal/exam/" + this.exam + "?random=true", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log("Get Per Soal: ", res);
          console.log(res.data.exam.question);
          console.log(res.data.exam.question.map((q) => q.id));
          const data = JSON.stringify(res.data.exam.questions);
          localStorage.kecerdasanQuestion = data;
          this.cookies.set("KECERDASAN-QUESTION", data);
          this.questions = res.data.questions;
          this.totalSoal = this.questions.length;
        });
      // }
    },
    countDownSendAnswer() {
      let token = this.cookies.get("X-GAN-TOKEN");
      if (this.answer != null) {
        setTimeout(() => {
          axios
            .post(
              "/banksoal/psikotest/intelligence/send-answer-intelligence",
              {
                test_code: this.cookies.get("test_code"),
                data: JSON.stringify(this.answer),
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((res) => {
              console.log(res);
            });
          this.countDownSendAnswer();
        }, 1000 * 60 * 10);
      }
    },
    prevQuestion() {
      if (this.indexQuestion > 0) {
        this.moveQuestion((this.indexQuestion -= 1));
      }
    },
    nextQuestion() {
      if (this.indexQuestion < this.totalSoal - 1) {
        this.moveQuestion((this.indexQuestion += 1));
      } else {
        this.isHidden = !this.isHidden;
      }
    },
    counterDownTimer() {
      if (this.countDown == 0) {
        setTimeout(() => {
          this.changeQuestion();
          this.second = 59;
          this.minute -= 1;
          this.start();
          this.counter();
        }, 1000);
      }
      if (this.countDown > 0) {
        if (this.indexExam == 11 || this.indexQuestion >= 49) {
          return;
        } else {
          setTimeout(() => {
            this.countDown -= 1;
            this.counterDownTimer();
          }, 1000);
        }
      }
    },
    counter() {
      // console.log(parseInt("01"))
      if (this.second == 0) {
        this.second = 59;

        this.minute -= 1;
        if (this.minute < 10) {
          this.minute = ("000" + this.minute).slice(-2);
        }

        if (this.minute < 0) {
          this.minute = 59;
          this.hour = parseInt(this.hour);
          this.hour -= 1;
          if (this.hour < 10) {
            this.hour = ("000" + this.hour).slice(-2);
          }
        }
      }

      if (this.second > 0) {
        // if (parseInt(this.second) < 10) {
        //     this.second = parseInt(this.second)
        // }
        setTimeout(() => {
          this.second -= 1;
          if (this.second < 10) {
            this.second = ("000" + this.second).slice(-2);
          }
          this.counter();
        }, 1000);
      }
    },
    lihatJawabanSaya() {
      this.isHidden = !this.isHidden;
    },
    moveQuestion: async function (event) {
      try {
        this.isHidden
          ? (this.isHidden = false)
          : (this.isHidden = this.isHidden);
        $(".test-button").removeClass("active");

        $(".cq").removeClass("currentq");
        this.indexQuestion = event;
        this.nowQuestion = this.questions[this.indexQuestion];
        this.nowOption = this.questions[this.indexQuestion].options;

        // check variables
        // console.log("nowQ: ", this.nowQuestion);
        // console.log("nowOpt: ", this.nowOption)

        if (this.answer != undefined) {
          this.answer.forEach((elem) => {
            // console.log(elem.question_id)
            if (elem.question_id == this.nowQuestion.id) {
              Object.keys(this.nowOption).forEach((opt) => {
                if (this.nowOption[opt].id == elem.answer) {
                  $("#btnAnswer" + opt).addClass("active");
                  // console.log("#btnAnswer"+opt)
                }
              });
            }
          });
        }
        this.showQuestion(
          this.indexQuestion + 1,
          this.nowQuestion,
          this.nowOption,
          this.huruf
        );
      } catch (error) {
        // console.log(error);
        return;
      }
    },

    checkIfFlagged() {
      // const e = document.getElementById("warna")
      const e = $("#flag" + this.indexQuestion).hasClass("flag");
      // console.log(e);
      if (e) {
        this.unflagQuestion();
      } else {
        this.flagQuestion();
      }
    },

    checkIfFlaggedText() {
      const e = $("#flag" + this.indexQuestion).hasClass("flag");
      if (e) {
        return true;
      } else false;
    },

    flagQuestion() {
      $("#flag" + this.indexQuestion).addClass("flag");
    },

    unflagQuestion() {
      // const e = $("#warna" + this.indexQuestion).hasClass("active");
      // if (e) {
      //   $("#warna" + this.indexQuestion).removeClass("active");
      //   $("#warna" + this.indexQuestion).addClass("flag");
      // }
      $("#flag" + this.indexQuestion).removeClass("flag");
    },

    changeQuestion() {
      try {
        if (
          this.answer.length == this.totalSoal &&
          this.indexQuestion >= this.totalSoal - 1
        ) {
          this.isHidden = !this.isHidden;
        }
        this.indexQuestion = this.indexQuestion + 1;
        $(".test-button").removeClass("active");

        $(".cq").removeClass("currentq");
        this.nowQuestion = this.questions[this.indexQuestion];
        this.nowOption = this.questions[this.indexQuestion].options;
        if (this.answer != undefined) {
          this.answer.forEach((elem) => {
            // console.log(elem.question_id)
            if (elem.question_id == this.nowQuestion.id) {
              Object.keys(this.nowOption).forEach((opt) => {
                if (this.nowOption[opt].id == elem.answer) {
                  $("#btnAnswer" + opt).addClass("active");
                  // console.log("#btnAnswer"+opt)
                }
              });
            }
          });
        }
        this.showQuestion(
          this.indexQuestion + 1,
          this.nowQuestion,
          this.nowOption,
          this.huruf
        );
      } catch (error) {
        // console.log(error);
        return;
      }
    },

    questionIndicator() {
      // console.log('questions: ');
      // console.log(this.questions[this.indexQuestion])
      // console.log('answers: ');
      // console.log(this.answer)
      // if()
      document.getElementById("warna" + this.indexQuestion).className +=
        " active";
    },

    showQuestion(number, question, option, hurufg) {
      try {
        // console.log(this.globalVar)
        $("#currentq" + this.indexQuestion).addClass("currentq");
        let qstNow = question;
        let optNow = option;
        let huruf = hurufg;
        $("#dashTimer").css("display", "none");
        this.statusQuestion = true;
        this.isDisabled = false;
        $("#timeID").show();
        $("#questionField").html("");
        $(document).ready(function () {
          $("#questionField").append(
            `<h5 class="d-flex flex-direction-row">` +
              `<p class='mr-2'>` +
              number +
              `. ` +
              `</p>` +
              `<div style="display: flex; flex-direction: column;">` +
              qstNow.question +
              `</div>` +
              `</h5>`
          );
          $("#questionField div table").addClass("w-100");

          Object.keys(optNow).forEach((key) => {
            $("#questionField").append(
              `<div class="d-flex flex-direction-row"><strong class="me-2">` +
                huruf[key].toUpperCase() +
                `.</strong><span>` +
                optNow[key].option_text +
                `</span></div>`
            );
          });
        });

        $("table").addClass("w-100");
        $("table").css("height", "50px");
        $("table").css("margin", "0");
        $("td").removeClass("p-5");
        $("td").addClass("p-1");
      } catch (error) {
        // console.log(error);
        return;
      }
    },

    chooseAnswer: async function (event) {
      // alert(event);
      this.questionIndicator();
      let token = this.cookies.get("X-GAN-TOKEN");
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      let temp = {
        exam_id: this.exam,
        question_id: this.nowQuestion.id,
        answer: this.nowOption[event].id,
        answerID: event,
        time: dateTime,
      };

      // console.log("event: ", event);
      // console.log("nowqId: ", this.nowQuestion.id);

      let ketemu = 0;
      this.answer.forEach((answer) => {
        if (answer.question_id == this.nowQuestion.id) {
          // console.log("Update Jawaban");
          ketemu += 1;
          answer.option_id = this.nowOption[event].id;
          answer.answer = this.nowOption[event].id;
          answer.time = dateTime;
          answer.answerID = event;
          // console.log(answer);
        }
      });
      if (ketemu == 0) {
        // console.log("add Jawaban");
        this.answer.push(temp);
      }

      // console.log("answer: ", this.answer);
      // this.countDownSendAnswer();

      this.changeQuestion();
    },
  },
};
</script>

<style scoped lang="scss">
table {
  width: 100%;
}
.refresh-btn {
  background-color: blue !important;
}

#waktuPengerjaanLandscape {
  display: none;
}

.flag {
  background-color: #ffc41f !important;
  color: white;
}

.loading-state {
  display: flex;
  justify-content: center;
  height: 180px;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
}

.loading-state-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  opacity: 0.5;
  z-index: 10;
}

.active {
  background-color: #fad4d4 !important;
  color: #8d191c;
}

.currentq {
  // background-color: #ffc41f !important;
  background-color: #8d191c !important;
  color: white;
}

.test-button {
  background-color: transparent;
  border: 1px solid #bbb;
  border-radius: 3px;
  color: #8d191c;
  transition: 0.2s ease-in-out;
}

.test-button.active {
  transition: none;
  background-color: #8d191c !important;
  color: #fff;
}

.test-button:active {
  transition: none;
  background-color: #8d191c;
  color: #fff;
}

.warna {
  background-color: white;
}
.warna:hover {
  cursor: pointer;
}

#box {
  box-sizing: border-box;
  display: inline-flex;
  flex-wrap: wrap;
}

#box > div {
  margin: 2px;
  width: 48px;
  height: 48px;
}
.custom-control-input {
  width: 20px !important;
  height: 20px !important;
  padding: 10px;
}

#questionField {
  width: 100% !important;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.mpa-btn-primary {
  border: 1px solid #bbb !important;
  border-radius: 3px !important;
  background-color: transparent !important;
  color: #8d191c !important;
  width: 100% !important;
}

.mpa-btn-primary:hover {
  background-color: #8d191c !important;
  color: #fff !important;
}

.mpa-btn-primary:focus {
}

#customButton {
  border: 1px solid gray;
  padding: 10px;
}

#timePengerjaan {
  font-size: x-large;
  font-weight: 700;
}

#timeID {
  font-size: x-large;
  color: #8d191c;
  font-weight: 800 !important;
}

#tableChoiceAnswer {
  margin-top: 40px;
}

#RadioA {
  width: 20px !important;
  height: 10px !important;
  border-radius: 100% !important;
  background: #5c0000 !important;
}

#classChoiceGan {
  margin-left: 30px;
}

#btnNextPrev {
  margin-top: 30px;
}

#buttonPrevues {
  width: 50px;
  height: 50px;
  border: 2px solid #8d191c;
  background: #8d191c;
  color: white;
  margin-right: 10px;
}

#buttonNext {
  width: 50px;
  height: 50px;
  border: 2px solid #8d191c;
  background: #8d191c;
  color: white;
}

.next {
  background-color: white;
  color: #8d191c;
  border: 2px solid grey;
  margin-left: 10px;
}

#illustrationStart {
  width: 255px;
}

.text-gan {
  color: white;
}

#buttonPaymentId {
  width: 410px !important;
  margin-right: 105px;
  text-decoration-line: none;
}

.panel-question {
  background-color: #eeeeee;
  border-radius: 8px;
}

.subtitle-badge {
  background-color: #fad4d4;
  color: #5c0000;
  border: 1px solid #8d191c;
}

.rekapbox {
  gap: 10px;
}

@media only screen and (max-width: 600px) {
  #StartKecerdasan {
    margin-top: -70px;
  }

  #buttonPaymentId {
    width: 170px !important;
    margin-right: 65px;
    text-decoration-line: none;
    margin-top: 20px;
    margin-bottom: 100px;
  }

  #buttonPrevues {
    width: 50px;
    height: 50px;
    border: 2px solid #8d191c;
    background: #8d191c;
    color: white;
    margin-right: 90px;
  }

  #buttonNext {
    width: 50px;
    height: 50px;
    border: 2px solid #8d191c;
    background: #8d191c;
    color: white;
    margin-left: 100px;
  }

  .qind {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 770px) {
  .qind {
    flex-direction: column-reverse;
  }

  .modal-btn {
    margin-top: 20px;
  }
}

@media screen and (max-width: 767px) and (orientation: landscape) {
  #waktuPengerjaan {
    display: none;
  }

  #waktuPengerjaanLandscape {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    border: 1px solid #bbb;
    background-color: #eeeeee;
    width: 15%;
    max-width: 12%;
    text-align: center;
    padding: 5px;
    border-bottom-right-radius: 3px;
    opacity: 0.4;
  }

  #timeId {
    height: fit-content;
  }

  #waktuPengerjaanLandscape > #timeID > h3 {
    font-size: 14px;
    margin: 0;
  }
}
</style>
