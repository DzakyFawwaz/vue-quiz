<script>
import { defineComponent, h, PropType } from "vue";
import { useCookies } from "vue3-cookies";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const { cookies } = useCookies();

export default defineComponent({
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    examData: {
      type: Array,
      default: () => [],
    },
    examLabel: {
      type: String,
      default: "Answered Question",
    },
    labels: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      listExam: cookies.get("list-exam"),
    };
  },
  setup(props) {
    const listExams = cookies.get("list-exam");
    // console.log(Array(listExams.split("").join("'st Exam ")));
    const chartData = {
      labels: props.labels,
      datasets: [
        {
          label: props.examLabel,
          backgroundColor: "#f87979",
          data: props.examData,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 50,
         
        },
      },
    };

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
</script>
