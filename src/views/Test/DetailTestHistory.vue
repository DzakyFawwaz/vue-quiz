<template>
  <Sidebar>
    <DetailTestHistoryComponent />
  </Sidebar>
</template>

<script>
import DetailTestHistoryComponent from "../../components/Test/DetailTestHistoryComponent.vue";
import Sidebar from "../../components/Sidebar.vue";

export default {
  components: {
    Sidebar,
    DetailTestHistoryComponent,
  },
  setup() {},
};
</script>
