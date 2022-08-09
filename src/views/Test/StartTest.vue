<template>
    <StartKecermatanComponent />
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import StartKecermatanComponent from "../../components/Test/StartTestComponent.vue";
export default {
  name: "StartKecermatan",
  components: {
    StartKecermatanComponent,
    Sidebar,
  },
  data() {
    return {
      text: "Ini adalah sebuah text",
    };
  },
  props: {
    exam_code: {
      type: String,
    },
  },
};
</script>
