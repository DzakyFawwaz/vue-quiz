<template>
  <Sidebar>
    <TestResultComponent />
  </Sidebar>
</template>

<script>
import TestResultComponent from "../../components/Test/TestResultComponent.vue";
import Sidebar from '@/components/Sidebar.vue'
export default {
  setup() {},
  components: {
    TestResultComponent,
    Sidebar,
  },
};
</script>
