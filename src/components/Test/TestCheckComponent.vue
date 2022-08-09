<template>
    <section id="StartKecermatanPage" style="height: 100vh; overflow: hidden">
        <div class="container">
            <div class="row text-center d-flex flex-column justify-content-center align-items-center">
                <figure id="illustrationStart">
                    <img id="imageStart" src="asset/img/logo-gan.png" alt="" class="img-fit-cover" />
                </figure>
                <br />
                <h1 id="titleStart">Harap Tunggu</h1>
                <h2 id="subTitleStart">Kode Test Anda Sedang Kami Periksa</h2>
                <br />
                <span>Persiapkan diri anda untuk memulai test kecermatan</span>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from "axios";
    import {
        useCookies
    } from "vue3-cookies";
    import jsonString from "../../../index.json";

    export default {
        created() {
            this.checkCode();
        },
        setup() {
            // this.code = $route.param.exam_code
            const {
                cookies
            } = useCookies();
            return {
                cookies,
            };
        },
        data() {
            return {
                listExam: "",
                questions: "",
                indexExam: 0,
                indexQuestion: 0,
            };
        },
        methods: {
            async checkCode() {
                let token = this.cookies.get("X-GAN-TOKEN");
                await axios
                    .get(
                        "/banksoal/psikotest/get-psikotest-data?test_code=" +
                        this.$route.params.exam_code +
                        "&access_code=" +
                        this.$route.params.access_code, {
                            headers: {
                                Authorization: "Bearer " + token,
                                // "Access-Control-Allow-Origin": "*",
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res);
                        switch (res.data.message) {
                            case "Access Code is wrong":
                                return this.$router.push({
                                    name: "TestNotFound",
                                    params: {
                                        message: "Akses Kode Anda Salah",
                                    },
                                });
                            case "psikotest not found":
                                return this.$router.push({
                                    name: "TestNotFound",
                                    params: {
                                        message: "Test Kode Anda Salah",
                                    },
                                });
                            case "access code has been taken.":
                                return this.$router.push({
                                    name: "TestNotFound",
                                    params: {
                                        message: "Akses Kode Sudah Pernah Dipakai",
                                    },
                                });
                            case "test is overdue.":
                                return this.$router.push({
                                    name: "TestNotFound",
                                    params: {
                                        message: "Test Yang Anda Akses Belum Aktif",
                                    },
                                });
                            default:
                                if (res.status == 200) {
                                    // console.log(res.data.success);
                                    this.cookies.set("list-exam", res.data.data.idExam);
                                    if (res.data.data.latestExam) {
                                        this.cookies.set("last-exam", res.data.data.latestExam);
                                    }
                                    return this.$router.push({
                                        name: "StartKecermatan",
                                        params: {
                                            exam_code: this.$route.params.exam_code,
                                        },
                                    });
                                } else {
                                    // console.log("gaada data");
                                    return this.$router.push({
                                        name: "TestNotFound",
                                        params: {
                                            message: "Test Tidak Ditemukan"
                                        },
                                    });
                                }
                        }
                    })
                    .catch((err) => {
                        switch (err.message) {
                            case "Request failed with status code 401":
                                return this.$router.push({
                                    name: "TestNotFound",
                                    params: {
                                        message: "401 - Akses Code atau Test Kode yang anda masukkan salah",
                                    },
                                });
                            case "Request failed with status code 500":
                                return this.$router.push({
                                    name: "TestNotFound",
                                    params: {
                                        message: "500 - Mohon Maaf, Server Kami Sedang Dalam Perbaikan",
                                    },
                                });
                            default:
                                break;
                        }
                    });
            },
        },
    };
</script>

<style scoped>
    #illustrationStart,
    #imageStart {
        width: auto;
        height: 200px;
    }

    #titleStart {
        font-size: 60px !important;
        color: #8d191c;
    }

    #StartKecermatanPage {
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 600px) {

        #illustrationStart,
        #imageStart {
            width: auto;
            height: 200px;
            margin-bottom: 20px;
        }

        #titleStart {
            font-size: 50px;
        }

        #subtitleStart {
            font-size: 20px;
        }
    }

    @media screen and (max-width: 400px) {

        #illustrationStart,
        #imageStart {
            width: auto;
            height: 120px;
        }

        #titleStart {
            font-size: 40px !important;
        }
    }

    @media screen and (max-width: 1000px) and (orientation: landscape) {

        #illustrationStart,
        #imageStart {
            width: auto;
            height: 120px;
        }

        #titleStart {
            font-size: 50px !important;
        }

        #subtitleStart {
            font-size: 30px;
        }
    }
</style>