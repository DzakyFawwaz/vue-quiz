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
              {{ indexQuestion + 1 }}
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
              <div class="optionBox">
                <button
                  v-for="(option, index) in nowOption"
                  :key="index"
                  :id="'button' + option.id"
                  :class="{
                    customButton: true,
                    buttonDisabled: !statusQuestion,
                    col: true,
                  }"
                  v-on:click="chooseAnswer(option.id)"
                >
                  {{ huruf[index].toUpperCase() }}
                </button>
                <!-- <button
                  id="button0"
                  :class="{
                    customButton: true,
                    buttonDisabled: !statusQuestion,
                    col: true,
                  }"
                  v-on:click="chooseAnswer(0)"
                >
                  A
                </button>
                <div
                  id="button1"
                  :class="{
                    customButton: true,
                    buttonDisabled: !statusQuestion,
                    col: true,
                  }"
                  v-on:click="chooseAnswer(1)"
                >
                  B
                </div>
                <div
                  id="button2"
                  :class="{
                    customButton: true,
                    buttonDisabled: !statusQuestion,
                    col: true,
                  }"
                  v-on:click="chooseAnswer(2)"
                >
                  C
                </div>
                <div
                  id="button3"
                  :class="{
                    customButton: true,
                    buttonDisabled: !statusQuestion,
                    col: true,
                  }"
                  v-on:click="chooseAnswer(3)"
                >
                  D
                </div>
                <div
                  id="button4"
                  :class="{
                    customButton: true,
                    buttonDisabled: !statusQuestion,
                    col: true,
                  }"
                  v-on:click="chooseAnswer(4)"
                >
                  E
                </div> -->

                <br />
              </div>
            </div>
            <div class="d-flex justify-content-between" style="display: none">
              <div class="moveBtn" v-on:click="prevQuestion()">
                <i class="fas fa-angle-left mr-3"></i><span>Sebelumnya</span>
              </div>
              <div class="moveBtn" v-on:click="nextQuestion()">
                <span>Selanjutnya</span><i class="ml-3 fas fa-angle-right"></i>
              </div>
            </div>
          </div>
          <div :class="{ rekapNilai: true, 'd-none': !isHidden }">
            <RekapKecerdasanComponent
              :code="test_code"
              :questions="questionContainer"
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
                  v-for="(iq, index) in questionsID"
                  :key="index"
                  :id="warna + index"
                  style="border-radius: 10px; overflow: hidden"
                  :class="{ warna: true, border: true }"
                  v-on:click="moveQuestionByQuestionID(iq, index)"
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
              <div style="display: flex; flex-direction: column">
                <button
                  v-if="testfinished"
                  type="button"
                  class="btn text-white w-100 mb-2"
                  style="background-color: green; color: white; width: 100%"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop2"
                >
                  <span>Selesai Test</span>
                </button>
                <button
                  v-if="!testfinished"
                  v-on:click="lihatJawabanSaya"
                  type="button"
                  class="btn text-white w-100"
                  style="background-color: #8d191c; color: white; width: 100%"
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
    <!-- Selesai Test Modal -->
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
              Pastikan anda sudah menjawab semua soal, selanjutnya kami akan
              memproses jawaban anda.
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

    <!-- ===== -->
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
      token: this.cookies.get("X-GAN-TOKEN"),
      test_code: this.cookies.get("test_code"),
      access_code: this.cookies.get("access_code"),
      warna: "warna",
      huruf: ["a", "b", "c", "d", "e"],
      countDown: 5,
      examID: "",
      indexQuestion: 0,
      nowQuestion: "",
      nowQuestionID: "",
      nowOption: [],
      answer: [],
      statusQuestion: false,
      isDisabled: true,
      hour: "",
      minute: "",
      second: "",
      isHidden: false,
      questionsID: [],
      questionContainer: [],
      parsedQuestionContainer: [],
      statusExam: 1,
    };
  },
  created() {
    this.getExamId();
  },
  computed: {
    testfinished() {
      if (this.answer.length == this.questionsID.length) {
        return true;
      }
    },
  },
  methods: {
    async getExamId() {
      localStorage.questionContainer = "";
      await axios
        .get(
          "/banksoal/psikotest/get-psikotest-data?test_code=" +
            this.test_code +
            "&access_code=" +
            this.access_code,
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          console.log("GET EXAM: ", res);
          if (res.data.status == 2) {
            const {
              idQuestions,
              currentQuestion,
              oldAnswer,
              latestQuestion,
              psikotest,
            } = res.data.data;
            this.statusExam = res.data.status;
            console.log("STATUS IS DONE");
            this.answer = JSON.parse(oldAnswer);
            // this.nowQuestionID = currentQuestion;
            // this.questionsID = idQuestions;
            // this.examID = psikotest.exam[0].id;
            // console.log("ANSWER IF STATUS IS 2: ", this.answer);
            // console.log("THIS NOW QUESTION: ", this.nowQuestionID);
            // this.getQuestionByID();
            // return;
          }
          const { psikotest } = res.data.data;
          this.examID = psikotest.exam[0].id;
          this.questionsID = res.data.data.idQuestion
            ? res.data.data.idQuestion
            : res.data.data.idQuestions;
          let time = psikotest.exam[0].total_duration;
          time = time.split(":");
          this.hour = time[0];
          this.minute = time[1];
          this.second = time[2];
          console.log("TIME: ", this.hour, this.minute, this.second);
          this.shuffle(this.questionsID);
          console.log(this.answer);

          localStorage.allQuestionsID = JSON.stringify(this.questionsID);
          this.getQuestionByID();
        })
        .then(() => {
          // this.counterDownTimer();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getQuestionByID() {
      this.statusQuestion = false;
      await axios
        .get("/banksoal/question/" + this.questionsID[this.indexQuestion], {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          console.log("GET QUESTION BY ID :", res);
          const { option, question, id } = res.data.question;
          const randomOptions = res.data.option;
          this.nowQuestion = question;
          this.nowQuestionID = id;
          this.nowOption = randomOptions;
          const temp = {
            id: id,
            questionNumber: this.indexQuestion,
            question: res.data.question,
            randomOptions: randomOptions,
            isDone: false,
            isEdited: false,
          };

          // Cek jika question sudah ada di local storage, jika belum, tambahkan.
          // Jika sudah, tidak usah ditambahkan

          const addQuestionToLocalStorage = () => {
            if (localStorage.questionContainer) {
              let pq = JSON.parse(localStorage.questionContainer);
              this.questionContainer = pq.map((q) => q);
              this.questionContainer.push(temp);
              console.log(
                "QUESTION CONTAINER ON SUBMIT: ",
                this.questionContainer
              );
              localStorage.questionContainer = JSON.stringify(
                this.questionContainer
              );
            } else {
              this.questionContainer.push(temp);
              localStorage.questionContainer = JSON.stringify(
                this.questionContainer
              );
            }
          };

          if (localStorage.questionContainer) {
            const parsedQuestionContainer = JSON.parse(
              localStorage.questionContainer
            );
            const questionContainerID = parsedQuestionContainer.map(
              (q) => q.question.id
            );

            if (!questionContainerID.includes(id)) {
              addQuestionToLocalStorage();
            }
          } else {
            addQuestionToLocalStorage();
          }

          this.showQuestionByID(
            this.indexQuestion,
            this.nowQuestion,
            this.nowOption,
            this.huruf,
            this.nowQuestionID
          );
        })
        .catch((err) => console.log(err));
    },
    async showQuestionByID(
      number,
      question,
      option,
      optionIndex,
      nowQuestionID
    ) {
      try {
        // Menambahkan background kepada button option
        // jika sudah pernah dijawab sebelumnya
        console.log("ANSWER CONTINER: ", this.answer);
        console.log("QUESTION CONTAINER: ", this.questionContainer);
        // setTimeout(() => {
        //   this.questionContainer.map((q) => {
        //     if (nowQuestionID == q.id) {
        //       if (q.isDone) {
        //         console.log($(`#button${q.answer}`)[0]);
        //         $(`#button${q.answer}`)
        //           .addClass("isChecked")
        //           .siblings()
        //           .removeClass("isChecked");
        //         console.log("ITS DONE");
        //       } else {
        //         console.log("ITS NOT DONE");
        //         $(`.customButton`).removeClass("isChecked");
        //       }
        //     }
        //   });
        // }, 10);

        setTimeout(() => {
          this.answer.map((a, index) => {
            if (this.statusExam == 2) {
              let d = document.getElementById("warna" + index);
              console.log("ITS D: ", d);
              d.classList += " active";
            }

            if (a.question_id == nowQuestionID) {
              const indx = [0, 1, 2, 3, 4];
              indx.map((i) => {
                const c = document.getElementsByClassName(`customButton`)[i];
                c.classList.remove("isChecked");
              });

              const e = document.getElementById(`button${a.option_id}`);

              e.classList += " isChecked";

              // $(`#button${parseInt(a.answerID)}`)[0]
              //   .addClass("isChecked")
              //   .siblings()
              //   .removeClass("isChecked");
            } else {
              $(`#button${parseInt(a.answerID)}`).removeClass("isChecked");
            }
          });
        }, 10);

        // ========= //

        $("#currentq" + this.indexQuestion).addClass("currentq");
        let qstNow = question;
        let optNow = option;
        let huruf = optionIndex;
        $("#dashTimer").css("display", "none");
        this.statusQuestion = true;
        this.isDisabled = false;
        $("#timeID").show();
        $("#questionField").html("");
        $(document).ready(function () {
          $("#questionField").append(
            `<h5 class="d-flex flex-direction-row">` +
              `<p class='mr-2'>` +
              (number + 1) +
              `. ` +
              `</p>` +
              `<div style="display: flex; flex-direction: column;">` +
              qstNow +
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
      } catch (err) {
        console.log(err);
      }
    },
    chooseAnswer: async function (event) {
      console.log("INDEX QUEStion AFTER ANSWERED", this.indexQuestion);

      this.questionIndicator();
      $("#currentq" + this.indexQuestion).addClass("currentq");

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
      console.log(this.nowOption);
      let temp = {
        exam_id: this.examID[0],
        question_id: this.nowQuestionID,
        answer: event,
        answerID: event,
        time: dateTime,
      };

      let ketemu = 0;
      let parseQuestionContainer = JSON.parse(localStorage.questionContainer);
      let questionContainer = parseQuestionContainer.map((q) => q);
      let questionContainerID = parseQuestionContainer.map((q) => q.id);
      let newQuestionContainer = [];
      this.answer.forEach((answer) => {
        if (answer.question_id == this.nowQuestionID) {
          ketemu += 1;
          answer.option_id = this.nowOption[event].id;
          answer.answer = event;
          answer.time = dateTime;
          answer.answerID = event;
          console.log("UPDATE ANSWER: ", this.answer);

          newQuestionContainer = questionContainer;
          let nowQuestion =
            newQuestionContainer[
              questionContainerID.indexOf(this.nowQuestionID)
            ];
          nowQuestion.isEdited = true;
          nowQuestion.answer = event;
          newQuestionContainer[
            questionContainerID.indexOf(this.nowQuestionID)
          ] = nowQuestion;
          localStorage.questionContainer = JSON.stringify(newQuestionContainer);
          console.log(
            "NEW QUESTION CONTAINER: ",
            newQuestionContainer,
            "OLD QUESTION CONTAINER: ",
            this.questionContainer
          );
        }
      });
      if (ketemu == 0) {
        this.answer.push(temp);
        newQuestionContainer = questionContainer;
        let nowQuestion =
          newQuestionContainer[questionContainerID.indexOf(this.nowQuestionID)];
        nowQuestion.isDone = true;
        nowQuestion.answer = event;
        nowQuestion.nowQuestionID = this.nowQuestionID;
        // newQuestionContainer[this.indexQuestion - 1] = nowQuestion;
        newQuestionContainer[questionContainerID.indexOf(this.nowQuestionID)] =
          nowQuestion;
        localStorage.questionContainer = JSON.stringify(newQuestionContainer);
        console.log(
          "SUBMIT ANSWER: ",
          this.nowQuestionID,
          this.questionContainer
        );
      }

      if (this.indexQuestion < this.questionsID.length - 1) {
        this.indexQuestion += 1;
        $(".cq").removeClass("currentq");
        this.changeQuestion();
      } else {
        this.isHidden = !this.isHidden;
      }
    },
    selesaiTest() {
      console.log(this.answer);
      axios
        .post(
          "/banksoal/psikotest/intelligence/send-answer-intelligence",
          {
            test_code: this.test_code,
            data: JSON.stringify(this.answer),
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    },
    changeQuestion(selectedQuestionID) {
      // Ganti question bedasarkan question ID, bukan index question

      const parsedQuestionContainer = JSON.parse(
        localStorage.questionContainer
      );
      const question = parsedQuestionContainer.map((q) => q.question.id);
      if (question.includes(selectedQuestionID)) {
        // Ambil question per ID dari LocalStorage
        console.log("GET QUESTION FROM LOCAL STORAGE");
        parsedQuestionContainer.map((q) => {
          if (q.question.id == selectedQuestionID) {
            this.nowQuestion = q.question.question;
            this.nowOption = q.randomOptions;
            this.nowQuestionID = selectedQuestionID;
            this.showQuestionByID(
              this.indexQuestion,
              this.nowQuestion,
              this.nowOption,
              this.huruf,
              this.nowQuestionID
            );
          }
        });
      } else {
        // Ambil question per ID dari API
        console.log("GET QUESTION FROM API");
        setTimeout(() => {
          this.answer.map((a) => {
            if (a.question_id == q.question.id) {
              $(`#button${a.answerID}`).removeClass("isChecked");
            }
          });
        }, 10);
        this.getQuestionByID();
      }
    },
    // Pindah soal bedasarkan index question (1, 2, 3, 4, ...)
    moveQuestionByIndexQuestion: async function (questionIndex) {
      try {
        this.isHidden
          ? (this.isHidden = false)
          : (this.isHidden = this.isHidden);
        $(".test-button").removeClass("active");
        $(".cq").removeClass("currentq");
        this.indexQuestion = questionIndex;
        $("#currentq" + this.indexQuestion).addClass("currentq");
        this.changeQuestion(this.questionsID[this.indexQuestion]);
      } catch (error) {
        console.log(error);
      }
    },
    // Pindah soal bedasarkan question ID (501, 502, 503, ...)
    // Dipicu pada saat user memilih soal pada Box Soal
    moveQuestionByQuestionID: async function (
      selectedQuestionID,
      questionNumber
    ) {
      try {
        if (this.isHidden) {
          setTimeout(() => {
            const element = document.getElementById(
              `questionNumber${questionNumber}`
            );
            element.scrollIntoView();
          });
        } else {
          $(".test-button").removeClass("active");
          $(".cq").removeClass("currentq");
          this.indexQuestion = this.questionsID.indexOf(selectedQuestionID); // Set indexQuestion bedasarkan questionID dari localstorage yang di cek bedasarkan selected ID dari Box Soal
          $("#currentq" + this.indexQuestion).addClass("currentq");
          this.changeQuestion(selectedQuestionID);
        }
      } catch (error) {
        console.log(error);
      }
    },
    prevQuestion() {
      if (this.indexQuestion > 0) {
        this.moveQuestionByIndexQuestion((this.indexQuestion -= 1));
      }
    },
    nextQuestion() {
      if (this.indexQuestion < this.questionsID.length - 1) {
        this.moveQuestionByIndexQuestion((this.indexQuestion += 1));
      } else {
        this.isHidden = !this.isHidden;
      }
    },
    counterDownTimer() {
      console.log("SECOND", this.second);
      if (parseInt(this.second) <= 0) {
        setTimeout(() => {
          this.changeQuestion();
          this.second = 59;
          this.minute -= 1;
          this.counter();
          // this.start();
        }, 1000);
      }
      if (parseInt(this.second) > 0) {
        if (this.indexExam == 11 || this.indexQuestion >= 49) {
          return;
        } else {
          setTimeout(() => {
            this.second -= 1;
            this.counterDownTimer();
          }, 1000);
        }
      }
    },
    counter() {
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
        setTimeout(() => {
          this.second -= 1;
          if (this.second < 10) {
            this.second = ("000" + this.second).slice(-2);
          }
          this.counter();
        }, 1000);
      }
    },
    checkIfFlagged() {
      const e = $("#flag" + this.indexQuestion).hasClass("flag");
      console.log(e);
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
      $("#flag" + this.indexQuestion).removeClass("flag");
    },
    questionIndicator() {
      document.getElementById("warna" + this.indexQuestion).className +=
        " active";
    },
    lihatJawabanSaya() {
      this.isHidden = !this.isHidden;
    },
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    backToDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped lang="scss">
.buttonDisabled {
  pointer-events: none;
  opacity: 0.7;
}

.optionBox {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 10px;
}

.customButton {
  text-align: center;
  width: 100%;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 5px;
  color: #8d191c;
}

.moveBtn {
  background-color: #8d191c;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
}

.moveBtn:hover {
  cursor: pointer;
  background-color: #5c0000;
}

.customButton:active {
  background-color: #8d191c;
  color: #fff;
}

.customButton:hover {
  cursor: pointer;
}

.isChecked {
  background-color: #8d191c;
  color: #fff;
}

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
