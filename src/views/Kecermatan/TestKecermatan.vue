<template>
  <TestKecermatanComponent />
</template>

<script>

// @ is an alias to /src
import TestKecermatanComponent from "../../components/Kecermatan/TestKecermatanComponent.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "TestKecermatan",
  components: {
    TestKecermatanComponent,
    Sidebar,
  },
  data() {
    return {
      text: "Ini adalah sebuah text",
    };
  },
};
</script>
