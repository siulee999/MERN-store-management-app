import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  TimeScale,
  Filler,
  BarController, BarElement,
  LineController, LineElement, PointElement,
  ArcElement, DoughnutController,
} from 'chart.js';
import 'chartjs-adapter-date-fns';


ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;
ChartJS.defaults.font.family = "Roboto", "sans-serif";
ChartJS.defaults.font.size = 14;
ChartJS.defaults.color = "#000000";


const centerTextPlugin = {
  id: 'centerText',
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
    ctx.save();

    const x = width / 2 + left;
    const y = height / 2 + top;

    ctx.font = 'bold 20px Roboto, sans-serif'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black'; 

    ctx.fillText(pluginOptions.text || '', x, y); 
    ctx.restore();
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
  TimeScale,
  BarController, BarElement,
  LineController, LineElement, PointElement,
  ArcElement, DoughnutController, centerTextPlugin
);


