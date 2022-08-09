<template>
  <ResetPasswordComponent />
</template>

<script>
// @ is an alias to /src

import ResetPasswordComponent from "../components/ResetPasswordComponent.vue";

export default {
  name: "ResetPassword",
  components: {
    ResetPasswordComponent,
  },
  data() {
    return {
      text: "Ini adalah sebuah text",
    };
  },
};
</script>
