<template>
  <Sidebar>
    <TestHistoryComponent />
  </Sidebar>
</template>

<script>
import TestHistoryComponent from "../../components/Test/TestHistoryComponent.vue";
import Sidebar from "../../components/Sidebar.vue";
export default {
  setup() {},
  components: {
    Sidebar,
    TestHistoryComponent,
  },
};
</script>
