import { summaryData } from "../../data/mockDashboardData"

const SummarySection = ({ className }) => {
  return (
    <div className={`dashboard-card grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col justify-evenly items-stretch *:border-b-2 *:border-gray-200 *:p-2 gap-3 ${className}`}
    >
      {summaryData?.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 text-gray-800"
        >
          <div className="rounded-xl bg-gray-200 p-2">
            <item.IconComponent size={40} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold">{item.count}</span>
            <span className="text-xs text-black">{item.label}</span>
          </div>
        </div>))
      }
    </div>
  )
}

export default SummarySection