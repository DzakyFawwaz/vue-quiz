<template>
    <section id="StartKecermatanPage" style="height: 100vh">
        <div class="container py-5 w-100 d-flex justify-content-center">
            <div class="w-75 row py-2 text-center d-flex flex-column align-items-center">
                <div id="subContainerStart">
                    <figure id="illustrationStart">
                        <img id="imageStart" src="../../assets/img/logo-gan.png" alt="" class="img-fit-cover" />
                    </figure>
                    <div id="subContainerStartTitle">
                        <h1 id="titleStart">Selamat Datang Para Pejuang</h1>
                        <h2 id="subtitleStart">Test Kecermatan Garuda Abdi Negara</h2>
                    </div>
                    <!-- <br /> -->
                </div>
                <br />
                <span id="descStart" v-html="description">
                </span>
                <br />
                <!-- Button trigger modal -->
                <div id="buttonWrapper">
                    <button type="button" class="btn mpa-btn-primary custom-button text-white" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop" v-on:click="modalIsOpen">
                        Baca Intruksi Test
                    </button>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">
                                    Intruksi Test
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <!-- image -->
                                <!-- <div class="instruksi-img" src="" /> -->
                                <div style="width: 100%" v-html="instruction"></div>
                                <br />
                                <br />
                                <p>
                                    Klik tombol Mulai Test untuk memulai Test Kecermatan dan
                                    selamat mengerjakan
                                </p>
                            </div>
                            <div class="modal-footer">
                                <div style="
                    flex: 1;
                    font-size: 14px;
                    align-item: center;
                    margin: 0;
                  " v-if="countdown > 0">
                                    <p style="text-align: start">
                                        Tombol akan dapat di klik dalam {{ countdown }} detik
                                    </p>
                                </div>
                                <p v-else style="flex: 1; text-align: start">
                                    Silahkan Mulai Test
                                </p>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button :disabled="isDelayed" type="button" data-bs-dismiss="modal"
                                    v-on:click="nextStep" class="btn custom-button mpa-btn-primary text-white">
                                    Mulai Test
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
    import {
        useCookies
    } from "vue3-cookies";
    import axios from "axios";

    export default {
        name: "StartKecermatan",

        data() {
            return {
                listExam: "",
                questions: "",
                indexExam: 0,
                indexQuestion: 0,
                isDelayed: true,
                countdown: 5,
                code: "",
                questions: "",
                test_code: this.cookies.get("test_code"),
                access_code: this.cookies.get("access_code"),
                description: "...",
                instruction: "",
                categoryTest: 1,
            };
        },
        setup() {
            const {
                cookies
            } = useCookies();
            return {
                cookies,
            };
        },
        created() {
            this.countdown = 5;
            this.fetch();
        },

        computed: {
            delayButton() {
                if (this.countdown > 0) {
                    return this.isDelayed;
                }
                if (this.countdown == 0) {
                    this.isDelayed = false;
                    return this.isDelayed;
                }
            },
        },

        methods: {
            async fetch() {
                let token = this.cookies.get("X-GAN-TOKEN");
                await axios
                    .get(
                        "/banksoal/psikotest/get-psikotest-data?test_code=" +
                        this.test_code +
                        "&access_code=" +
                        this.access_code, {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    )
                    .then((res) => {
                        //   console.log("res: ");
                        // console.log(res.data.data.idQuestions);
                        this.categoryTest = res.data.data.psikotest.cat_test_id
                        this.description = res.data.data.psikotest.description;
                        this.instruction = res.data.data.psikotest.instruction;
                        this.listExam = res.data.data.psikotest.exam[0].id;
                        // console.log(this.questions);
                    });
            },
            modalIsOpen() {
                // console.log("modal is onpen");
                // console.log(this.countdown);
                if (this.countdown > 0) {
                    setTimeout(() => {
                        this.countdown -= 1;
                        this.modalIsOpen();
                    }, 1000);
                }
                if (this.countdown == 0) {
                    this.isDelayed = false;
                    return this.isDelayed;
                }
            },
            async nextStep() {
                try {
                    switch (this.categoryTest) {
                        case 1:
                            this.$router.push("/test-kecermatan");
                            break;

                        case 2:
                            this.$router.push("/test-kecerdasan");
                            break;

                        case 3:
                            this.$router.push("/test-kepribadian");
                            break;
                    
                        default:
                            this.$router.push("/test-kecermatan");
                            break;
                    }
                } catch (error) {}
            },
            // async get()
        },
        // storage: {
        //     keys: ["questions"],
        //     value:[this.questions],
        //     namespace: "my-namespace",
        // },
    };
</script>

<style scoped>
    #StartKecermatanPage {
        display: flex;
        /* justify-content: center; */
        align-items: center;
    }

    .modal-body {
        text-align: start !important;
    }

    .text-gan {
        font-size: 70px !important;
    }

    .instruksi-img {
        object-fit: cover;
        background-size: contain;
        background-image: url("../../assets/instruksi.png");
        max-width: 100%;
        min-height: 600px;
    }

    .custom-button {
        width: fit-content !important;
        padding: 10px 20px 10px 20px !important;
        border-radius: 5px;
        background-color: #8d191c !important;
    }

    .custom-button:hover {
        background-color: #711416 !important;
        color: #f8f8ff;
    }

    #nextTestID {
        text-decoration-line: none;
        font-size: medium !important;
    }

    #illustrationStart {
        width: 30%;
    }

    .text-gan {
        color: #833030;
    }

    #ButtonNextTest {
        text-decoration-line: none;
    }

    @media only screen and (max-width: 600px) {
        #ButtonNextTest {
            width: 250px !important;
            text-decoration-line: none;
        }

        .text-gan {
            font-size: 50px !important;
        }
    }

    #illustrationStart,
    #imageStart {
        width: auto;
        height: 200px;
    }

    #titleStart {
        font-size: 60px;
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
            font-size: 30px;
        }

        #subtitleStart {
            font-size: 20px;
        }
    }

    @media screen and (max-width: 844px) and (orientation: landscape) {

        #illustrationStart,
        #imageStart {
            width: auto;
            height: 70px;
        }

        #titleStart {
            font-size: 30px;
        }

        #subtitleStart {
            font-size: 20px;
        }

        #subContainerStart {
            display: flex;
            flex-direction: row;
        }

        #subContainerStartTitle {
            margin-left: 20px;
            text-align: start;
        }

        #descStart {
            text-align: start;
        }

        #buttonWrapper {
            text-align: end;
        }
    }
</style>