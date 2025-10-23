import { useEffect, useState } from "react";
import { salesByCategoryData, totalRevenueData } from "../../data/mockDashboardData";
import { Doughnut } from "react-chartjs-2";
import { formatValue } from "../../utils/formatValue.js";

const CategoryDoughnutChart = ({ className }) => {
  const [legendPosition, setLegendPosition] = useState("bottom");
  const lastMonthRevenue = totalRevenueData?.find(item => item.id === "lastMonth").value;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setLegendPosition('right');
      } else {
        setLegendPosition("bottom");
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const data = {
    labels: salesByCategoryData.map(cate => cate.category),
    datasets: [
      {
        label: "Sales",
        data: salesByCategoryData.map(cate => cate.percentageOfTotal),
        backgroundColor: [
          'rgb(234, 88, 12)',
          'rgb(37, 99, 235, 0.9)',
          'rgb(147, 51, 234, 0.9)',
          'rgb(234, 88, 12, 0.6)',
          'rgb(234, 88, 12, 0.4)',
          'rgb(234, 88, 12, 0.2)',
        ],
      }

    ]
  }

  const options = {
    cutout: '60%',
    plugins: {
      legend: {
        position: legendPosition,
      },
      title: {
        display: true,
        text: 'Sales Distribution of Total Sales',
        font: { size: 18 }
      },
      centerText: {
        text: formatValue(lastMonthRevenue, "currency")
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
            return `${datasetLabel}: ${value}%`;
          }
        },
      }
    }
  }

  return (
    <div className={`dashboard-card px-4 pb-3 h-[450px] sm:h-[250px] lg:h-full ${className}`} >
      <div className="relative h-full w-full sm:w-5/6">
        <Doughnut data={data} options={options} />
      </div>
    </div >
  )
}

export default CategoryDoughnutChart