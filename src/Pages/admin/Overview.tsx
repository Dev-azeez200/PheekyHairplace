import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiChevronDown,
  FiDownload,
  FiPlus,
  FiScissors,
  FiUserPlus,
} from "react-icons/fi";
import { FaWallet } from "react-icons/fa6";
import { MdChairAlt } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { MdOutlineDiamond } from "react-icons/md";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import assets from "../../assets/assets";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const stats = [
  {
    label: "Total Revenue",
    value: "₦7,850,000",
    trend: "+12.4%",
    description: "vs last month",
    icon: FaWallet,
  },
  {
    label: "Total Appointments",
    value: "1,284",
    trend: "+8.2%",
    description: "vs last month",
    icon: MdChairAlt,
  },
  {
    label: "Pending Bookings",
    value: "48",
    trend: "8",
    description: "review required",
    icon: FaHourglassHalf,
  },
  {
    label: "Total Customers",
    value: "2,845",
    trend: "+15.8%",
    description: "new clients",
    icon: MdOutlineDiamond,
  },
];

const services = [
  {
    name: "Wig Installation",
    price: "₦45,000",
    bookings: 428,
    progress: 100,
    color: "bg-[#80601c]",
  },
  {
    name: "Wig Customization",
    price: "₦80,000",
    bookings: 315,
    progress: 72,
    color: "bg-[#80601c]",
  },
  {
    name: "Hair Styling",
    price: "₦25,000",
    bookings: 284,
    progress: 62,
    color: "bg-[#edc477]",
  },
  {
    name: "Hair Braiding",
    price: "₦30,000",
    bookings: 210,
    progress: 48,
    color: "bg-[#edc477]",
  },
  {
    name: "Wig Revamp & Treatment",
    price: "₦35,000",
    bookings: 176,
    progress: 38,
    color: "bg-[#edc477]",
  },
];

const wigs = [
  {
    name: 'Bone Straight 20"',
    description: "84 units sold ",
    price: "₦37,800,000",
    unitPrice: "₦450,000 / unit",
    image: assets.wig1,
    hot: true,
  },
  {
    name: 'Body Wave 18"',
    description: "62 units sold",
    price: "₦23,560,000",
    unitPrice: "₦380,000 / unit",
    image: assets.wig2,
  },
  {
    name: 'Water Wave 22"',
    description: "48 units sold",
    price: "₦20,160,000",
    unitPrice: "₦420,000 / unit",
    image: assets.wig3,
  },
  {
    name: 'Deep Wave 20"',
    description: "41 units sold",
    price: "₦16,195,000",
    unitPrice: "₦395,000 / unit",
    image: assets.woman,
  },
];

const revenuePeriods = {
  week: [
    { day: "Mon", value: 25 },
    { day: "Tue", value: 50 },
    { day: "Wed", value: 90 },
    { day: "Thu", value: 110 },
    { day: "Fri", value: 130 },
    { day: "Sat", value: 185 },
    { day: "Sun", value: 135 },
  ],
  month: [
    { day: "1-5", value: 42 },
    { day: "6-10", value: 58 },
    { day: "11-15", value: 49 },
    { day: "16-20", value: 76 },
    { day: "21-25", value: 91 },
    { day: "26-30", value: 118 },
  ],
  year: [
    { day: "Jan", value: 72 },
    { day: "Feb", value: 84 },
    { day: "Mar", value: 66 },
    { day: "Apr", value: 94 },
    { day: "May", value: 105 },
    { day: "Jun", value: 88 },
    { day: "Jul", value: 121 },
    { day: "Aug", value: 112 },
    { day: "Sep", value: 132 },
    { day: "Oct", value: 145 },
    { day: "Nov", value: 126 },
    { day: "Dec", value: 158 },
  ],
};

const appointments = [
  {
    id: "#BK-1024",
    client: "Amaka Johnson",
    initials: "AJ",
    avatar: "https://i.pravatar.cc/100?img=47",
    service: "Wig Installation",
    date: "Oct 7 • 10:30 AM",
    stylist: "Sarah",
  },
  {
    id: "#BK-1023",
    client: "David Williams",
    initials: "DW",
    avatar: "https://i.pravatar.cc/100?img=12",
    service: "Hair Styling",
    date: "Oct 7 • 11:00 AM",
    stylist: "Jessica",
  },
  {
    id: "#BK-1022",
    client: "Chioma Okafor",
    initials: "CO",
    avatar: "https://i.pravatar.cc/100?img=44",
    service: "Wig Customization",
    date: "Oct 6 • 02:00 PM",
    stylist: "Sarah",
  },
  {
    id: "#BK-1021",
    client: "Grace Ade",
    initials: "GA",
    avatar: "https://i.pravatar.cc/100?img=32",
    service: "Hair Braiding",
    date: "Oct 6 • 04:30 PM",
    stylist: "Linda",
  },
];

type RevenuePeriod = keyof typeof revenuePeriods;

const formatRevenueInThousands = (amount: number) =>
  amount === 0 ? "₦0" : `₦${(amount / 1000).toLocaleString()}K`;

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<RevenuePeriod>("week");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const revenueData = revenuePeriods[period];
  const chartWidth = 620;
  const chartHeight = 240;
  const plotLeft = 58;
  const plotRight = 12;
  const plotTop = 16;
  const plotBottom = 215;
  const maxValue =
    Math.ceil(
      Math.max(...revenueData.map(({ value }) => value * 10000)) / 500000,
    ) * 500000;

  const chartPoints = revenueData.map((item, index) => ({
    x:
      plotLeft +
      (index * (chartWidth - plotLeft - plotRight)) /
        Math.max(revenueData.length - 1, 1),
    y: plotBottom - ((item.value * 10000) / maxValue) * (plotBottom - plotTop),
  }));

  const linePath = chartPoints.reduce((path, point, index, allPoints) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = allPoints[index - 1];
    const beforePrevious = allPoints[index - 2] ?? previous;
    const next = allPoints[index + 1] ?? point;
    const control1X = previous.x + (point.x - beforePrevious.x) / 6;
    const control1Y = previous.y + (point.y - beforePrevious.y) / 6;
    const control2X = point.x - (next.x - previous.x) / 6;
    const control2Y = point.y - (next.y - previous.y) / 6;
    return `${path} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${point.x} ${point.y}`;
  }, "");
  const areaPath = `${linePath} L ${
    chartPoints[chartPoints.length - 1].x
  } ${plotBottom} L ${chartPoints[0].x} ${plotBottom} Z`;

  const setChartPeriod = (nextPeriod: RevenuePeriod) => {
    setPeriod(nextPeriod);
    setHoveredPoint(nextPeriod === "week" ? 5 : null);
  };

  const exportReport = () => {
    const rows = [
      "Period,Revenue (NGN)",
      ...revenueData.map(({ day, value }) => `${day},${value * 10000}`),
    ];
    const file = new Blob([rows.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `revenue-report-${period}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <div className="flex flex-col gap-5">
        <div className="lg:flex lg:items-center lg:flex-row  lg:justify-between flex flex-col gap-4">
          <div>
            <p className="text-[17px] lg:text-sm font-medium text-dark">
              Welcome back,{" "}
              <span className="font-semibold text-dark">Pheeky</span>
              <span className="mx-1">•</span>
              Today is Oct 8, 2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[15px] font-semibold text-light transition hover:bg-hover">
              <FiCalendar size={13} />
              <select
                aria-label="Revenue date range"
                className="cursor-pointer appearance-none bg-transparent outline-none"
                value={period}
                onChange={(event) =>
                  setChartPeriod(event.target.value as RevenuePeriod)
                }
              >
                <option className="text-dark" value="week">
                  Last 7 Days
                </option>
                <option className="text-dark" value="month">
                  Last 30 Days
                </option>
                <option className="text-dark" value="year">
                  This Year
                </option>
              </select>
              <FiChevronDown size={12} />
            </label>

            <button
              onClick={exportReport}
              className="flex items-center gap-1.5 rounded-lg bg-primary hover:bg-hover px-3 py-2 cursor-pointer text-[15px] font-semibold text-light transition"
            >
              <FiDownload size={13} />
              Export Report
            </button>
          </div>
        </div>

        <div className="rounded-sm border border-[#eeeae4] bg-white px-3 py-2.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[14px] lg:text-sm font-semibold uppercase tracking-[0.14em] text-dark">
                Priority Shortcuts
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <button
                onClick={() => navigate("/admin/products")}
                className="flex items-center gap-1.5 rounded-sm bg-primary hover:bg-hover cursor-pointer px-3 py-2 text-[9px] font-semibold text-white"
              >
                <FiUserPlus size={13} className="text-white" />
                Add Wig
              </button>

              <button
                onClick={() => navigate("/services")}
                className="flex items-center gap-1.5 rounded-sm bg-primary hover:bg-hover cursor-pointer px-3 py-2 text-[9px] font-semibold text-white "
              >
                <FiPlus size={13} className="text-white" />
                Add Service
              </button>

              <button
                onClick={() => navigate("/admin/orders")}
                className="flex items-center gap-1.5 rounded-sm bg-primary hover:bg-hover cursor-pointer px-3 py-2 text-[9px] font-semibold text-white "
              >
                <FiCalendar size={13} className="text-white" />
                View Bookings
              </button>

              <button
                onClick={() => navigate("/admin/settings")}
                className="flex items-center gap-1.5 rounded-sm bg-primary hover:bg-hover cursor-pointer px-3 py-2 text-[9px] font-semibold text-white"
              >
                <FiScissors size={13} className="text-white]" />
                Add Stylist
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-2 mt-10">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-sm  bg-white p-4 lg:p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] lg:text-[10px] font-semibold uppercase tracking-[0.1em] text-dark">
                  {label}
                </p>

                <h2 className="mt-3 text-xl font-bold tracking-tight text-[#27231f] sm:text-2xl">
                  {value}
                </h2>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Icon size={16} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-10">
        <div className="rounded-sm border border-[#eeeae4] bg-white p-4 shadow-[0_1px_5px_rgba(0,0,0,0.02)] sm:p-5">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-dark">
                  Revenue Overview
                </h3>
              </div>

              <p className="mt-1 text-[12px] text-dark">
                Track bespoke wig sales and salon treatments over time
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="flex items-center gap-1 rounded-xl bg-[#f5f4f2] p-1">
                <button
                  onClick={() => setChartPeriod("week")}
                  className={`rounded-md px-2 py-1 text-[8px] ${
                    period === "week"
                      ? "bg-white font-semibold text-[#4e4841] shadow-sm"
                      : "text-[#9b948c]"
                  }`}
                >
                  Week
                </button>

                <button
                  onClick={() => setChartPeriod("month")}
                  className={`rounded-md px-2 py-1 text-[8px] ${
                    period === "month"
                      ? "bg-white font-semibold text-[#4e4841] shadow-sm"
                      : "text-[#9b948c]"
                  }`}
                >
                  Month
                </button>

                <button
                  onClick={() => setChartPeriod("year")}
                  className={`rounded-md px-2 py-1 text-[10px] ${
                    period === "year"
                      ? "bg-white font-semibold text-[#4e4841] shadow-sm"
                      : "text-[#9b948c]"
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[260px] w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#c89a48" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#c89a48" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3, 4].map((line) => {
                const value = maxValue - (line * maxValue) / 4;
                const y = plotTop + (line * (plotBottom - plotTop)) / 4;

                return (
                  <g key={line}>
                    <line
                      x1={plotLeft}
                      x2={chartWidth - plotRight}
                      y1={y}
                      y2={y}
                      stroke={line === 4 ? "#dedbd5" : "#e9e6e1"}
                      strokeDasharray={line === 4 ? undefined : "3 4"}
                    />
                    <text
                      x={plotLeft - 8}
                      y={y + 3}
                      textAnchor="end"
                      fill="#9b948c"
                      fontSize="12"
                    >
                      {formatRevenueInThousands(value)}
                    </text>
                  </g>
                );
              })}

              <path d={areaPath} fill="url(#revenueGradient)" />

              <path
                d={linePath}
                fill="none"
                stroke="#b38332"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {hoveredPoint !== null && chartPoints[hoveredPoint] && (
                <line
                  x1={chartPoints[hoveredPoint].x}
                  x2={chartPoints[hoveredPoint].x}
                  y1={chartPoints[hoveredPoint].y}
                  y2={plotBottom}
                  stroke="#c9a665"
                  strokeDasharray="3 4"
                />
              )}

              {revenueData.map((item, index) => {
                const { x, y } = chartPoints[index];

                return (
                  <g key={item.day}>
                    <circle
                      cx={x}
                      cy={y}
                      r={hoveredPoint === index ? "5.5" : "3.5"}
                      fill={hoveredPoint === index ? "#292624" : "#c89a48"}
                      stroke="#a77b27"
                      strokeWidth="2"
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      onClick={() => setHoveredPoint(index)}
                      onFocus={() => setHoveredPoint(index)}
                      onBlur={() => setHoveredPoint(null)}
                      tabIndex={0}
                    />
                    <title>{`${item.day}: ₦${(
                      item.value * 10000
                    ).toLocaleString()}`}</title>
                  </g>
                );
              })}
            </svg>

            {hoveredPoint !== null && chartPoints[hoveredPoint] && (
              <div
                className="pointer-events-none absolute -translate-x-1/2 rounded-xl bg-[#11100e] px-3 py-2 text-white shadow-lg"
                style={{
                  left: `${Math.max(
                    (chartPoints[hoveredPoint].x / chartWidth) * 100 - 20,
                    5,
                  )}%`,
                  top: `${Math.max(
                    (chartPoints[hoveredPoint].y / chartHeight) * 100 - 9,
                    0,
                  )}%`,
                }}
                role="status"
              >
                <p className="text-[10px] font-bold uppercase">
                  {period === "week" && hoveredPoint === 5
                    ? "Saturday Peak"
                    : revenueData[hoveredPoint].day}
                </p>
                <p className="text-[14px] font-bold">
                  {formatRevenueInThousands(
                    revenueData[hoveredPoint].value * 10000,
                  )}
                </p>
              </div>
            )}
          </div>

          <div
            className="mt-[-20px] grid pl-8 pr-2"
            style={{
              gridTemplateColumns: `repeat(${revenueData.length}, minmax(0, 1fr))`,
            }}
          >
            {revenueData.map((item) => (
              <span
                key={item.day}
                className={`text-center text-[14px] ${
                  hoveredPoint === revenueData.indexOf(item)
                    ? "font-bold text-[#403a34]"
                    : "text-[#aaa39b]"
                }`}
              >
                {item.day}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-[#eeeae4] bg-white p-4 shadow-[0_1px_5px_rgba(0,0,0,0.02)] sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#302b27]">
                Appointment Mix
              </h3>

              <p className="mt-1 text-[8px] text-[#a19a92]">
                Capacity distribution this month
              </p>
            </div>
          </div>

          <div className="relative mx-auto mt-5 h-40 w-40">
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "conic-gradient(#8c681e 0deg 198deg, #f0c879 198deg 360deg)",
              }}
            />

            <div className="absolute inset-[18px] flex flex-col items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-bold text-[#302c28]">1,284</span>

              <span className="text-[7px] uppercase tracking-wide text-[#9c958e]">
                Bookings
              </span>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-[#faf8f4] px-2.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#8c681e]" />
                <span className="text-[15px] text-dark">Confirmed</span>
              </div>

              <p className="mt-1 text-[8px] font-bold text-[#35302b]">
                55% (706)
              </p>
            </div>

            <div className="rounded-lg bg-[#faf8f4] px-2.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#f0c879]" />
                <span className="text-[15px] text-dark">Other bookings</span>
              </div>

              <p className="mt-1 text-[8px] font-bold text-[#35302b]">
                45% (578)
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 bg-[#faf9f7] mt-10 lg:grid-cols-2">
        <section className="flex min-w-0 flex-col rounded-sm   bg-white p-5 shadow-[0_2px_5px_rgba(0,0,0,0.02)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-primary text-white">
                <FiScissors size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="font-serif text-lg font-bold text-[#171717] sm:text-xl">
                  Popular Services
                </h2>
                <p className="mt-1 text-[16px] lg:text-sm text-dark ">
                  Ranked by volume this month
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#805b14] transition-colors hover:text-[#b68a35] sm:text-sm"
            >
              <span className="hidden sm:inline">Service Menu</span>
              <span className="sm:hidden">Menu</span>
              <FiArrowRight size={17} />
            </button>
          </div>

          <div className="mt-7 flex-1 space-y-4">
            {services.map((service) => (
              <div key={service.name}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="lg:text-sm text-[16px] font-medium text-dark">
                      {service.name}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                    <span className="font-semibold text-[15px] text-dark">
                      {service.bookings} bookings
                    </span>
                  </div>
                </div>

                <div className="h-[8px] w-full overflow-hidden rounded-full bg-[#e9e8e6]">
                  <div
                    className={`h-full rounded-full ${service.color} transition-all duration-500`}
                    style={{ width: `${service.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border rounded-sm border-primary px-3 py-3 sm:mt-10 sm:px-4">
            <p className="lg:text-[13px] text-[18px] text-dark">
              Average appointment turnaround:
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span className="font-semibold text-dark ">1h 45m</span>
              <span className="font-semibold text-[#946b19] text-xs">
                98.4% Client Satisfaction
              </span>
            </div>
          </div>
        </section>

        <section className="flex min-w-0 flex-col rounded-sm  bg-white p-5 shadow-[0_2px_5px_rgba(0,0,0,0.02)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-primary text-white">
                <FiShoppingBag size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="font-serif text-lg font-bold text-[#171717] sm:text-xl">
                  Best Selling Wigs
                </h2>
                <p className="mt-1 text-[15px] lg:text-xs text-dark sm:text-sm">
                  Premium Virgin Hair Collections
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#805b14] transition-colors hover:text-[#b68a35] sm:text-sm"
            >
              View All
              <FiArrowRight size={17} />
            </button>
          </div>

          <div className="mt-5 flex-1">
            {wigs.map((wig) => (
              <div
                key={wig.name}
                className="flex items-center gap-3 border-b border-[#f1efed] py-3 last:border-b-0"
              >
                <img
                  src={wig.image}
                  alt={wig.name}
                  className="h-12 w-12 shrink-0 rounded-sm border border-[#eee9e3] object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[18px] lg:text-sm font-medium text-[#171717]">
                      {wig.name}
                    </h3>

                    {wig.hot && (
                      <span className="rounded-[4px] bg-[#ffe1a8] px-2 py-0.5 text-[10px] font-bold text-[#805b14]">
                        HOT
                      </span>
                    )}
                  </div>

                  <p className="mt-1 lg:text-xs text-dark">{wig.description}</p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[18px] lg:text-xs font-bold text-[#171717] sm:text-sm">
                    {wig.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-sm border border-primary px-3 py-3 sm:px-4">
            <p className="lg:text-[13px] text-[16px] text-dark">
              Combined Wig Sales Velocity:
            </p>
            <p className="lg:text-sm text-[14px] font-bold text-dark">
              ₦97,715,000 Gross
            </p>
          </div>
        </section>
      </div>

      <section className="flex min-h-[450px] w-full flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-5">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-base font-semibold text-[#202020] sm:text-lg">
              Recent Atelier Appointments
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Real-time scheduling logs and stylist bookings
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-[#9b702e] transition hover:text-[#c49a50]"
          >
            View All
            <FiArrowRight size={14} />
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="bg-[#f5f5f3] text-[10px] font-semibold uppercase tracking-wide text-[#555]">
                <th className="rounded-l-lg px-3 py-3">Booking ID</th>
                <th className="px-3 py-3">Client</th>
                <th className="px-3 py-3">Service</th>
                <th className="px-3 py-3">Date &amp; Time</th>
                <th className="rounded-r-lg px-3 py-3">Stylist</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b border-gray-100 text-xs transition hover:bg-[#fcfaf6]"
                >
                  <td className="whitespace-nowrap px-3 py-4 font-semibold text-[#333]">
                    {appointment.id}
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <img
                        src={appointment.avatar}
                        alt={appointment.client}
                        className="h-7 w-7 shrink-0 rounded-full object-cover"
                      />
                      <span className="max-w-[100px] truncate font-medium text-[#333]">
                        {appointment.client}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-4 text-gray-600">
                    <span className="block max-w-[115px]">
                      {appointment.service}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-gray-600">
                    {appointment.date}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-gray-700">
                    {appointment.stylist}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <p className="text-[11px] text-gray-500">
            Showing latest 4 of 1,284 bookings
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="flex items-center gap-1 rounded-lg bg-[#f4f4f2] px-3 py-2 text-[11px] font-medium text-gray-700 transition hover:bg-[#e9e6df] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiChevronLeft size={13} />
              Previous
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex items-center gap-1 rounded-lg bg-[#f4f4f2] px-3 py-2 text-[11px] font-medium text-gray-700 transition hover:bg-[#e9e6df]"
            >
              Next
              <FiChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Overview;
