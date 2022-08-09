<template>
  <Sidebar>
    <TestKepribadianComponent />
  </Sidebar>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import TestKepribadianComponent from "../../components/Kepribadian/TestKepribadianComponent.vue";
export default {
  name: "Kepribadian",
  components: {
    TestKepribadianComponent,
    Sidebar,
  },
};
</script>
