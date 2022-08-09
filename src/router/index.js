import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login.vue";
import ResetPassword from "../views/ResetPassword.vue";
import StartKecermatan from "../views/Test/StartTest.vue";
import TestKecermatan from "../views/Kecermatan/TestKecermatan.vue";
import TestKecerdasan from "../views/Kecerdasan/TestKecerdasan.vue";
import ResultTestKecerdasan from "../views/Kecerdasan/ResultTestKecerdasan.vue";
import FinishKecermatan from "../views/Test/FinishTest.vue";
import Dashboard from "../views/Dashboard.vue";
import TestNotFound from "../views/Test/TestNotFound.vue";
import TestDetail from "../views/Test/TestDetail.vue";
import TestCheckView from "../views/Test/TestCheck.vue";
import TestResult from "../views/Test/TestResult.vue";
import NotFound from "../views/404NotFound.vue";
import Kepribadian from "../views/Kepribadian/Kepribadian.vue";
import TestHistory from "../views/Test/TestHistory.vue";
import DetailTestHistory from "../views/Test/DetailTestHistory.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/kecerdasan",
    name: "Kecerdasan",
    component: TestDetail,
    props: true,
  },
  {
    path: "/dashboard/kepribadian",
    name: "Kepribadian",
    component: TestDetail,
    props: true,
  },
  {
    path: "/dashboard/kecermatan",
    name: "Kecermatan",
    component: TestDetail,
    props: true,
  },
  {
    path: "/dashboard/kecermatan/start",
    name: "StartKecermatan",
    component: StartKecermatan,
    props: true,
  },
  {
    path: "/test-kecermatan",
    name: "TestKecermatan",
    component: TestKecermatan,
  },
  {
    path: "/test-kecerdasan",
    name: "TestKecerdasan",
    component: TestKecerdasan,
  },
  {
    path: "/test-kepribadian",
    name: "TestKepribadian",
    component: Kepribadian,
  },
  {
    path: "/reset",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/selesai",
    name: "SelesaiTest",
    component: FinishKecermatan,
  },
  {
    path: "/test-not-found",
    name: "TestNotFound",
    component: TestNotFound,
  },
  {
    path: "/check-code",
    name: "CheckCode",
    component: TestCheckView,
    props: true,
  },
  {
    path: "/test-result",
    name: "TestResult",
    component: TestResult,
    props: true,
  },
  {
    path: "/kecerdasan-test-result",
    name: "TestResult",
    component: ResultTestKecerdasan,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: NotFound,
  },
];

// add history
const router = new createRouter({
  mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
