<template>
  <section id="StartKecermatanPage">
    <div id="waktuPengerjaanLandscape">
      <span style="font-size: 10px"> Waktu: </span>
      <span id="dashTimer">
        <h1>--</h1>
      </span>
      <span id="timeID" class="fw-bold mb-2">
        <p>0{{ countDown }}</p>
      </span>
    </div>
    <div class="container py-5">
      <div class="row" style="position: relative">
        <div class="col-12 col-md-8">
          <form @submit.prevent="kecermatan">
            <div id="kecermatan"></div>
          </form>
          <div class="p-3 border rounded subtitle-badge fw-bold mb-3">
            Soal Test Kecermatan <br />
            Exam : {{ indexExam }} <br />
            Soal Ke :
            {{ indexQuestion == 50 ? "Mengambil Soal" : indexQuestion + 1 }}
          </div>
          <div id="waktuPengerjaan" class="p-3 border mb-3 rounded text-center">
            <div id="timePengerjaan">Waktu Pengerjaan</div>
            <span id="dashTimer">
              <h1>--</h1>
            </span>
            <span id="timeID" class="fw-bold mb-2">
              <h3>0{{ countDown }}</h3>
            </span>
          </div>
          <div class="d-flex flex-column mb-5">
            <div
              v-if="statusQuestion"
              class="question w-75 d-flex justify-content-center flex-column"
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
                class="btn test-button col w-25 mx-2"
              >
                <span> A </span>
              </button>
              <br />
              <button
                :disabled="isDisabled"
                v-on:click="chooseAnswer('1')"
                class="btn test-button col w-25 mx-2"
              >
                <span> B </span>
              </button>
              <br />
              <button
                :disabled="isDisabled"
                v-on:click="chooseAnswer('2')"
                class="btn test-button col w-25 mx-2"
              >
                <span> C </span>
              </button>
              <br />
              <button
                :disabled="isDisabled"
                v-on:click="chooseAnswer('3')"
                class="btn test-button col w-25 mx-2"
              >
                <span> D </span>
              </button>
              <br />
              <button
                :disabled="isDisabled"
                v-on:click="chooseAnswer('4')"
                class="btn test-button col w-25 mx-2"
              >
                <span> E </span>
              </button>
              <br />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="qind">
            <div class="mb-3 modal-btn">
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
                          Close
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
                          Keluar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
              <div style="display: flex; flex-direction: column">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style="width: 100% !important; flex: 1"
                  class="btn custom-button mpa-button text-white w-100 mb-3"
                >
                  Kembali ke Dashboard
                </button>
                <span style="color: gray; font-size: 12px; text-align: flex-end"
                  >Jika terjadi masalah pada test, kembali ke dashboard dan
                  masukan ulang kode</span
                >
              </div>
            </div>
            <div class="p-3 border rounded-md panel-question">
              <h4 class="mpa-h4-headline fw-bold">Soal</h4>
              <div id="box" class="box">
                <div
                  v-for="(iq, index) in totalSoal"
                  :key="iq.id"
                  :id="warna + index"
                  :class="{ warna: true }"
                >
                  <div
                    :class="{
                      qbox: true,
                      border: true,
                      rounded: true,
                      'text-center': true,
                      'p-2': true,
                    }"
                    height="48"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "TestKecermatan",
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
      warna: "warna",
      kecermatans: [],
      countDown: 5,
      exam: "",
      questions: "",
      indexExam: -1,
      indexQuestion: -1,
      nowQuestion: "",
      answer: [],
      fiftyAnswer: [],
      totalSoal: 0,
      questionColor: "#c4c4c4",
      statusQuestion: false,
      isDisabled: true,
    };
  },

  created() {
    this.questions = "";
    this.getData();
    this.questionIndicator();
    // this.counterDownTimer();
  },
  methods: {
    getData() {
      this.exam = this.cookies.get("list-exam");
      this.exam = this.exam.split(",");
      this.exam.unshift(0);
      const lastExm = this.cookies.get("last-exam");
      if (lastExm) {
        this.indexExam = this.exam.indexOf(lastExm) - 1;
      } else {
        this.cookies.remove("last-exam");
      }
      this.getQuestion();
      // this.counterDownTimer
    },

    // get question
    async showQuestion() {
      try {
        $("#dashTimer").css("display", "none");
        this.statusQuestion = true;
        this.isDisabled = false;
        $("#timeID").show();
        $("#questionField").html("");
        $("#questionField").append(this.questions[this.indexQuestion].question);
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

    // Push Jawaban
    async sendAnswer() {
      let testCode = this.cookies.get("test_code");
      let accessCode = this.cookies.get("access_code");
      let token = this.cookies.get("X-GAN-TOKEN");

      let dataAnswer = JSON.stringify(this.answer);

      await axios
        .post(
          "/banksoal/psikotest/precision/send-answer-precision",
          {
            test_code: testCode,
            access_code: accessCode,
            data: dataAnswer,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          // console.log("send answer: ");
          // console.log(res);
          this.answer.splice(0, this.answer.length);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    // ganti exam
    async changeExam() {
      this.sendAnswer();
      this.statusQuestion = true;
      this.indexQuestion = 0;
      this.resetIndicator();
      this.resetTimer();
      this.getQuestion();
      if (this.indexExam == 11) {
        this.$router.push("/selesai");
      }
      if (this.indexExam > 0) {
        this.isDisabled = false;
      }
      localStorage.listJawaban = JSON.stringify(this.answer);
      this.cookies.set("list-jawaban", JSON.stringify(this.answer));
    },

    // timer countdown
    counterDownTimer() {
      if (this.countDown == 0) {
        setTimeout(() => {
          this.changeExam();
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

    resetTimer() {
      this.countDown = 60;
    },

    async getQuestion() {
      this.indexExam = this.indexExam + 1;

      let token = this.cookies.get("X-GAN-TOKEN");
      await axios
        .get(
          "/banksoal/psikotest/precision/get-fifty-questions?idExam=" +
            this.exam[this.indexExam],
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log("question");
          console.log(res);
          this.totalSoal = res.data.length;
          this.questions = res.data;
          this.showQuestion();
          this.counterDownTimer();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    resetIndicator() {
      $(".warna").removeClass("active");
      $(".warna").removeClass("currentq");
    },

    questionIndicator() {
      setTimeout(() => {
        const ebyid = document.getElementById("warna" + this.indexQuestion);
        try {
          if (ebyid.id) {
            if (ebyid.id == "warna" + this.indexQuestion) {
              document.getElementById("warna" + this.indexQuestion).className +=
                " active";
              $("#warna0").addClass("currentq");
              $("#warna" + this.indexQuestion)
                .addClass("currentq")
                .siblings()
                .removeClass("currentq");
            }
          }
        } catch (error) {
          return;
        }
      });
    },

    chooseAnswer: async function (event) {
      this.questionIndicator();

      if (event) {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var dateTime = date + " " + time;

        let temp = {
          exam_id: this.exam[this.indexExam],
          question_id: this.questions[this.indexQuestion].id,
          answer: event,
          time: dateTime,
        };
        this.answer.push(temp);
        console.log(this.answer);
        this.indexQuestion = parseInt(this.indexQuestion) + 1;
        this.isDisabled = true;
        this.showQuestion();

        if (this.indexQuestion >= 50) {
          this.statusQuestion = false;
          this.isDisabled = true;
          const token = this.cookies.get("X-GAN-TOKEN");
          await axios
            .get(
              "/banksoal/psikotest/precision/get-fifty-questions?idExam=" +
                this.exam[this.indexExam],
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then(() => {
              this.changeExam();
            });
          return;
        }
      }
    },

    backToDashboard() {
      this.$router.push("/");
    },
  },
  // storage: {
  //   keys: ["questions"],
  //   // value:[this.questions],
  //   namespace: "myLocal",
  // },
};
</script>

<style scoped lang="scss">
.refresh-btn {
  background-color: blue !important;
}

#waktuPengerjaanLandscape {
  display: none;
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

.active,
#warna0 {
  background-color: rgba($color: #8d191c, $alpha: 0.2);
  color: #8d191c;
}

.currentq {
  background-color: #ffc41f;
  color: black;
}

.test-button {
  background-color: transparent;
  border: 1px solid #bbb;
  border-radius: 3px;
  color: #8d191c;
  transition: 0.2s ease-in-out;
}

.test-button:active {
  transition: none;
  background-color: #8d191c;
  color: #fff;
}

#box {
  // background-color: blue;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  gap: 5;
}

.custom-control-input {
  width: 20px !important;
  height: 20px !important;
  padding: 10px;
}

#questionField {
  width: 100% !important;
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

@media only screen and (max-width: 600px) {
  #StartKecermatanPage {
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

  // #waktuPengerjaan {
  // position: absolute !important;
  // top: 0;
  // left: 0 ;
  // }
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
    width: 10%;
    max-width: 10%;
    text-align: center;
    padding: 10px;
    border-bottom-right-radius: 3px;
    opacity: 0.4;
  }

  #timeId {
    height: fit-content;
  }

  #waktuPengerjaanLandscape > #timeID > p {
    font-size: 14px;
    margin: 0;
  }
}
</style>
