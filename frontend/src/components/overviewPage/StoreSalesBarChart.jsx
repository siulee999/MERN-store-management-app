import { Chart } from "react-chartjs-2";
import { salesByStoreData } from "../../data/mockDashboardData.js";
import { formatValue } from "../../utils/formatValue.js";

const StoreSalesBarChart = ({ className }) => {
  const data = {
    labels: salesByStoreData.map(store => store.shopIdName),
    datasets: [
      {
        type: 'line',
        label: 'Average sales',
        data: salesByStoreData.map(store => store.averageSales),
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgb(37, 99, 235)"
      },
      {
        type: 'bar',
        label: 'Sales of last month',
        data: salesByStoreData.map(store => store.lastMonthSales),
        backgroundColor: salesByStoreData.map(store => store.amountChange > 0 ? "rgb(234, 88, 12, 0.8)" : "rgb(234, 88, 12, 0.4)")
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        position: "top",
        align: "start"
      },
      title: {
        display: true,
        text: 'Sales Performance of Each Store',
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
        callbacks: {
          label: (tooltipItem) => {
            const datasetLabel = tooltipItem.dataset.label || '';
            const value = tooltipItem.dataset.data[tooltipItem.dataIndex];
            return `${datasetLabel}: ${formatValue(value, "currency")}`;
          },
          afterLabel: (tooltipItem) => {
            const { amountChange, percentageChange } = salesByStoreData[tooltipItem.dataIndex];
            return `Change: ${formatValue(amountChange, "currency")} (${percentageChange}%)`;
          }
        },
      }
    },
    scales: {
      x: {
        grid: { offset: true },
        ticks: {
          callback: (value) => {
            return formatValue(value, "currency")
          }
        }
      }
    },
    indexAxis: 'y',
  };

  return (
    <div className={`dashboard-card relative h-[600px] lg:h-full ${className}`}>
      <Chart data={data} options={options} />
    </div>
  )
}

export default StoreSalesBarChart