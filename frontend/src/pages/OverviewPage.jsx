import { PrimarySection, SummarySection, WeeklySalesLineChart, StoreSalesBarChart, CategoryDoughnutChart,  } from "../components/dashboard";

export default function OverviewPage() {
  return (
    <main className="bg-slate-200 xl:h-dvh xl:grid xl:grid-rows-[60px_1fr] min-w-[330px] min-h-[800px] overflow-y-scroll">
      <h1 className="text-2xl text-primary font-bold text-left py-4 px-6 shadow-2xs bg-white">Overview</h1>
      <div className="py-8 px-6 gap-6 flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-[repeat(9,120px)] xl:grid-cols-6 xl:grid-rows-5">
        <PrimarySection className="lg:col-span-4 lg:row-span-1" />
        <StoreSalesBarChart className="lg:col-span-4 lg:row-span-4 xl:col-span-2 xl:row-span-5 order-1 xl:order-0" />
        <SummarySection className="lg:col-span-1 lg:row-span-4" />
        <WeeklySalesLineChart className="lg:col-span-3 lg:row-span-2" />
        <CategoryDoughnutChart className="lg:col-span-3 lg:row-span-2" />
      </div>
    </main>
  )
}