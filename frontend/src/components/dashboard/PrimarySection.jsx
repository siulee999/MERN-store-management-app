import { totalRevenueData } from "../../data/mockDashboardData";
import { formatValue } from "../../utils/formatValue";

const PrimarySection = ({ className }) => {
  const getTrendIcon = (trend) => {
    if (trend.direction === 'up') return '↑';
    if (trend.direction === 'down') return '↓';
    return '-';
  };

  return (
    <section className={`flex flex-col sm:flex-row gap-6 ${className}`}>
      {totalRevenueData?.map((item, idx) => (
        <div key={idx} className="dashboard-card flex-col items-stretch text-center flex-grow ">
          <p>{item.label}</p>
          <h2 className="flex justify-center items-baseline flex-wrap">
            <span className={`text-3xl xl:text-4xl font-bold mr-2 ${item.textColor}`}>{formatValue(item.value, item.format)}</span>
            <span className={`text-xl font-semibold shrink-0 ${item.trend.direction === "up" ? "text-green-600" : (
              item.trend.direction === "down" ? "text-red-600" : "text-yellow-600"
            )}`}>
              {`${getTrendIcon(item.trend)} ${item.trend.percentage}%`}
            </span>
          </h2>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  )
}

export default PrimarySection