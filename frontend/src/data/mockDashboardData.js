import { RiGiftLine, RiShipLine, RiStore3Line, RiUserSmileLine } from 'react-icons/ri';
import { FiUsers } from "react-icons/fi";
import { TbInvoice } from "react-icons/tb";


const totalRevenueData = [
  {
    id: "yesterday",
    label: "Yesterday's Sales",
    value: 151202,
    description: "Oct 20",
    trend: { direction: "down", percentage: 5.0 },
    textColor: 'text-blue-600',
    format: "currency",
  },
  {
    id: "lastWeek",
    label: "Last Week's Sales",
    value: 3126173,
    description: "Oct 13 - Oct 19",
    trend: { direction: "up", percentage: 12.9 },
    textColor: 'text-purple-600',
    format: "currency",
  },
  {
    id: "lastMonth",
    label: "Last Month's Sales",
    value: 11251266,
    description: "Sep 2025",
    trend: { direction: "up", percentage: 2.5 },
    textColor: 'text-orange-600',
    format: "currency",
  }
];

const summaryData = [
  {
    id: 'products',
    IconComponent: RiGiftLine,
    count: 5280,
    label: 'Products',
  },
  {
    id: 'orders',
    IconComponent: TbInvoice,
    count: 2872,
    label: 'Orders',
  },
  {
    id: 'customers',
    IconComponent: RiUserSmileLine,
    count: 1532,
    label: 'Customers',
  },
  {
    id: 'employees',
    IconComponent: FiUsers,
    count: 428,
    label: 'Employees',
  },
  {
    id: 'vendors',
    IconComponent: RiShipLine,
    count: 28,
    label: 'Vendors',
  },
  {
    id: 'stores',
    IconComponent: RiStore3Line,
    count: 15,
    label: 'Stores',
  }
];


const salesByCategoryData = [
  { category: "Kitchen Appliances", revenue: 3937500, percentageOfTotal: 35.0 },
  { category: "Laundry Appliances", revenue: 2812500, percentageOfTotal: 25.0 },
  { category: "Small Appliances", revenue: 1687500, percentageOfTotal: 15.0 },
  { category: "Cleaning Appliances", revenue: 1350000, percentageOfTotal: 12.0 },
  { category: "Air Treatment", revenue: 900000, percentageOfTotal: 8.0 },
  { category: "Heating & Cooling", revenue: 562500, percentageOfTotal: 5.0 }
];



const weeklySalesData = [
  { week: 1, month: "2025-08-03", sales: 2230875 },
  { week: 2, month: "2025-08-10", sales: 2630875 },
  { week: 3, month: "2025-08-17", sales: 2344700 },
  { week: 4, month: "2025-08-24", sales: 2676016 },
  { week: 5, month: "2025-08-31", sales: 2993409 },
  { week: 6, month: "2025-09-07", sales: 2850299 },
  { week: 7, month: "2025-09-14", sales: 2490419 },
  { week: 8, month: "2025-09-21", sales: 2748503 },
  { week: 9, month: "2025-09-28", sales: 2835779 },
  { week: 10, month: "2025-10-05", sales: 2855991 },
  { week: 11, month: "2025-10-12", sales: 2766537 },
  { week: 12, month: "2025-10-19", sales: 3126173 },
];


const salesByStoreData = [
  {
    shopIdName: "S300",
    shopName: "AIRSIDE 分店",
    lastMonthSales: 700000,
    amountChange: 50000,
    percentageChange: 7.14,
    averageSales: 725000,
  },
  {
    shopIdName: "S301",
    shopName: "APM TechLife 分店",
    lastMonthSales: 850000,
    amountChange: -30000,
    percentageChange: -3.53,
    averageSales: 835000,
  },
  {
    shopIdName: "S303",
    shopName: "APM 分店",
    lastMonthSales: 740000,
    amountChange: 40000,
    percentageChange: 5.41,
    averageSales: 760000,
  },
  {
    shopIdName: "S304",
    shopName: "Moko 分店",
    lastMonthSales: 680000,
    amountChange: -30000,
    percentageChange: -4.41,
    averageSales: 665000,
  },
  {
    shopIdName: "S305",
    shopName: "又一城分店",
    lastMonthSales: 850000,
    amountChange: 50000,
    percentageChange: 5.88,
    averageSales: 875000,
  },
  {
    shopIdName: "S306",
    shopName: "PopCorn 2 分店 (TechLife 店中店)",
    lastMonthSales: 700000,
    amountChange: 20000,
    percentageChange: 2.86,
    averageSales: 710000,
  },
  {
    shopIdName: "S307",
    shopName: "上水廣場分店",
    lastMonthSales: 650000,
    amountChange: -50000,
    percentageChange: -7.69,
    averageSales: 625000,
  },
  {
    shopIdName: "S308",
    shopName: "PopCorn 2 分店",
    lastMonthSales: 720000,
    amountChange: 20000,
    percentageChange: 2.78,
    averageSales: 730000,
  },
  {
    shopIdName: "S309",
    shopName: "名都分店",
    lastMonthSales: 600000,
    amountChange: -20000,
    percentageChange: -3.33,
    averageSales: 590000,
  },
  {
    shopIdName: "S310",
    shopName: "元朗廣場分店",
    lastMonthSales: 610000,
    amountChange: 10000,
    percentageChange: 1.64,
    averageSales: 615000,
  },
  {
    shopIdName: "S311",
    shopName: "莊士敦道分店",
    lastMonthSales: 730000,
    amountChange: -30000,
    percentageChange: -4.11,
    averageSales: 715000,
  },
  {
    shopIdName: "S312",
    shopName: "萬邦行分店 (TechLife 店中店)",
    lastMonthSales: 900000,
    amountChange: 50000,
    percentageChange: 5.56,
    averageSales: 925000,
  },
  {
    shopIdName: "S313",
    shopName: "中環分店",
    lastMonthSales: 920000,
    amountChange: -40000,
    percentageChange: -4.35,
    averageSales: 900000,
  },
  {
    shopIdName: "S314",
    shopName: "健威坊分店",
    lastMonthSales: 640000,
    amountChange: 30000,
    percentageChange: 4.69,
    averageSales: 655000,
  },
  {
    shopIdName: "S315",
    shopName: "時代廣場分店 (TechLife 店中店)",
    lastMonthSales: 950000,
    amountChange: 50000,
    percentageChange: 5.26,
    averageSales: 975000,
  },
];


export { totalRevenueData, summaryData, weeklySalesData, salesByCategoryData, salesByStoreData }