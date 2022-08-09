<template>
    <LoginComponent />
</template>

<script>
// @ is an alias to /src
import LoginComponent from '../components/LoginComponent.vue'
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "LoginPage",
  components: {
    LoginComponent,
    Sidebar,
  },
  data() {
    return {
      text: "Ini adalah sebuah text",
    };
  },
};
</script>
