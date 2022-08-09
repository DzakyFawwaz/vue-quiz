<template>
  <TestKecerdasanComponent3 />
  <!-- <RekapKecerdasanComponent /> -->
</template>

<script>
// @ is an alias to /src
import RekapKecerdasanComponent from '../../components/fitur/RekapKecerdasanComponent.vue';
import TestKecerdasanComponent from '../../components/Kecerdasan/TestKecerdasanComponent.vue'
import TestKecerdasanComponent2 from '../../components/Kecerdasan/TestKecerdasanComponent2.vue'
import TestKecerdasanComponent3 from '../../components/Kecerdasan/TestKecerdasanComponent3.vue'
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "TestKecerdasan",
  components: {
    // TestKecermatanComponent,
    // RekapKecerdasanComponent,
    TestKecerdasanComponent,
    TestKecerdasanComponent2,
    TestKecerdasanComponent3,
    Sidebar,
  },
  data() {
    return {
      text: "Ini adalah sebuah text",
    };
  },
};
</script>
