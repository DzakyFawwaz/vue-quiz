<template>
    <!-- <link rel="stylesheet" href="htps://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <section>
        <div class="container-fluid m-0 p-0 overflow-hidden d-none d-md-block text-left" id="resetBar">
            <div class="row m-0 p-0">
                <div class="col-6  p-0">
                    <figure class="w-100 overflow-hidden" style="height: 100vh; overflow:hidden;">
                        <img src="img/frame127.jpg" class="w-100 h-100" alt="">
                    </figure>
                </div>
                <div class="col-6 text-left">
                    <div class="w-100" id="formInput">
                        <figure id="logoMPA" class="w-100 d-flex justify-content-center">
                            <img src="asset/img/logo-gan.png">
                        </figure>
                        <div>
                            <h2 class="mpa-h2-headline text-left" id="resetPWA">Reset Password</h2>
                            <label class="mpa-main-regular" id="infoMPA">Masukan Email untuk mereset password kamu, link
                                akan di kirimkan melalui email, dan kamu bisa melakukan reset password</label>
                        </div>
                        <form>
                            <div class="mb-3">
                                <label class="mpa-main-bold py-2" id="emailMPA">Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" placeholder="Masukan Email">



                                <div class="field has-addons">
                                    <div class="control is-expanded">
                                        <input v-if="showPassword" type="text" class="input" v-model="password" />
                                        <input v-else type="password" class="input" v-model="password">
                                    </div>
                                    <!-- <div class="control">
                                        <button class="button" @click="toggleShow"><span class="icon is-small is-right">
                                                <i class="fas"
                                                    :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                                            </span>
                                        </button>
                                    </div> -->
                                </div>
                                <!-- <div v-if="!passwordHidden">
                                    <label>
                                        <span class="strong-label">{{ fieldLabel }}</span>
                                        <input type="text" class="password-field form-control d-inline"
                                            v-model="passwordText" />
                                        <span class="display-eye fa fa-eye-slash" @click="hidePassword"></span>
                                    </label>
                                </div> -->
                            </div>
                            <button class="btn mpa-btn-primary" id="batenKirim">Kirim</button>
                        </form>
                        <router-link to="http://localhost:8080/login" style="color:#8D191C;font-weight:bold"
                            id="kembaliLoginID">Kembali
                            Login</router-link>
                    </div>
                </div>
            </div>
        </div>



        <!-- MOBILE RESPONSIVE -->
        <div class="col-12 d-block d-md-none text-left" id="mobileReset">
            <div>
                <figure id="logoMPA" class=" w-100 d-flex justify-content-center">
                    <img src="asset/img/logo-gan.png">
                </figure>
                <div>
                    <h2 class="mpa-h2-headline text-left">Reset Password</h2>
                    <label class="mpa-main-regular">Masukan Email untuk mereset password kamu, link
                        akan di kirimkan melalui email, dan kamu bisa melakukan reset password</label>
                </div>
                <form>
                    <div class="mb-3">
                        <label class="mpa-main-bold" id="emailMPA">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Masukan Email">
                    </div>
                    <div class="tow">
                        <input class="active" type="password" id="pass2">
                        <div class="group2">
                            <i id="icon" class="fa fa-eye-slash"></i>
                        </div>
                    </div>

                    <button class="btn mpa-btn-primary" id="batenKirim">Kirim</button>
                </form>
                <router-link to="http://localhost:8080/login" style="color:#8D191C;font-weight:bold"
                    id="kembaliLoginID">Kembali Login
                </router-link>
            </div>
        </div>
    </section>
</template>
<script>
    // export default {
    //     name: "ResetPassword",
    //     data() {
    //         return {
    //             state: false
    //         }
    //     },
    //     methods: {
    //         togel() {
    //             if (!state) {
    //                 var password = document.getElementById("password").
    //                 password.setAttribute("type", "password");
    //                 document.getElementById("eye").style.color = '#7a797e';
    //                 this.state = false;
    //             } else {
    //                 var password = document.getElementById("password").
    //                 password.setAttribute("type", "text");
    //                 document.getElementById("eye").style.color = '#5887ef';
    //                 this.state = true;
    //             }
    //             console.log(this.state)
    //         }
    //     }
    // }
    export default {
        name: "ResetPassword",
        props: {
            passwordText: {
                default: "",
                type: String
            },
            fieldLabel: {
                default: "",
                type: String
            }
        },
        data() {
            return {
                default: false,
                type: Boolean
            }
        },
        methods: {
            hidePassword() {
                this.passwordHidden = true;
            },
            showPassword() {
                this.passwordHidden = false;
            }
        }
    };
</script>
<style lang="scss">
    #kembaliLoginID {
        text-decoration-line: none;
    }

    #spanFAEYE {
        position: absolute;
        right: 15px;
        transform: translate(0, -50%);
        top: 70%;
        cursor: pointer;
    }

    .fa {
        font-size: 20px;
        color: #7a797e;
        position: relative;
        margin-top: -300px !important;
    }

    #eyeFlash00 {
        position: relative;
        // margin-top: -800px !important;
        margin-bottom: 655px;
        margin-left: -190px;
    }

    input {
        box-sizing: border-box;
        width: 100%;
        font-size: 18px;
        border: none;
        padding: 10px 10px;
        border-radius: 3px;
        letter-spacing: 0, 5px;
        // box-shadow: 0 5px 30px rgba(22,89,233,0.4);
    }

    ::placeholder {
        color: #9a9a9a;
        font-weight: 400;
    }
</style>