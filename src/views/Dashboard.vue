<template>
  <Sidebar>
    <DashboardComponent />
  </Sidebar>
</template>

<script>
import { useCookies } from "vue3-cookies";
import DashboardComponent from "../components/DashboardComponent.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  setup() {
    const { cookies } = useCookies();
    return {
      cookies,
    };
  },
  name: "Dashboard",
  components: {
    DashboardComponent,
    Sidebar,
  },
  mounted() {
    this.checkToken();
  },
  data() {
    return {
      text: "Ini adalah sebuah text",
    };
  },
  methods: {
    checkToken() {
      if (this.cookies.get("X-GAN-TOKEN") == null) {
        this.$router.push("/");
      }
      this.deleteCookie("list-exam");
      this.deleteCookie("last-exam");
      this.deleteCookie("test_code");
      this.deleteCookie("access_code");
      this.cookies.remove("list-exam");
      this.cookies.remove("test_code");
      this.cookies.remove("access_code");
    },
    deleteCookie(c_name) {
      document.cookie =
        c_name +
        "=" +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.yourdomain.com;path=/";
      document.cookie =
        c_name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT ;";
    },
  },
};
</script>
