<script>
import { useCookies } from "vue3-cookies";
import { defineComponent, h, PropType } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)


const { cookies } = useCookies();

export default defineComponent({
  name: "LineChart",
  components: {
    Line,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
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
    const chartData = {
      labels: props.labels,
      datasets: [
        {
          label: props.examLabel,
          backgroundColor: "#8d191c",
          data: props.examData,
        },
      ],
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      
      scales: {
        y: {
         
          grid: {
            drawBorder: false,
            color: function (context) {
              if (context.tick.value == 0) {
                return "#8d191c";
              }
            },
          },
        },
      },
    };

    return () =>
      h(Line, {
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
