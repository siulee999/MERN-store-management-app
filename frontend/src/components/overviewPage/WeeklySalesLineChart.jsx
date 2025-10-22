import { Line } from "react-chartjs-2";
import { weeklySalesData } from "../../data/mockDashboardData";

const WeeklySalesLineChart = ({ className }) => {
  const data = {
    labels: weeklySalesData.map(week => week.month),
    datasets: [{
      label: 'Weekly Sales',
      data: weeklySalesData.map(week => week.sales),
      fill: true,
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgb(147, 51, 234, 0.2)',
      tension: 0.3
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Sales Growth',
        font: { size: 18 }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#ccc',
        titleFont: {
          weight: 'bold',
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        displayColors: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            return `$${(value/ 1000000).toFixed(1)}M`
          }
        }
      },
      x: {
        type: 'time',
        time: {
          unit: 'week',
          displayFormats: {
            week: 'MMM d'
          }
        }
      }
    }
  };

  return (
    <div className={`dashboard-card relative h-[250px] lg:h-full ${className}`} >
      <Line data={data} options={options} />
    </div >
  )
}

export default WeeklySalesLineChart