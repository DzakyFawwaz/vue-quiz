<template>
  <Sidebar>
    <!-- <TestKepribadianComponent /> -->
    <KecermatanDetailComponent :title="$route.params.title" />
  </Sidebar>
</template>

<script>
import TestKepribadianComponent from '../../components/Kepribadian/TestKepribadianComponent.vue'
import KecermatanDetailComponent from "../../components/Test/TestDetailComponent.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "KecermatanDetail",
  components: {
    KecermatanDetailComponent,
    TestKepribadianComponent,
    Sidebar,
  },
};
</script>
