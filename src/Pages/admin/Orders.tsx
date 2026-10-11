import React, { useMemo, useState } from "react";
import {
  FiActivity,
  FiArchive,
  FiBox,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiEye,
  FiFilter,
  FiPackage,
  FiRefreshCw,
  FiSearch,
  FiShoppingBag,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";
import OrderDetailsModal, {
  type Order,
  type OrderStatus,
} from "../Modals/OrderDetailsModal";

const initialOrders: Order[] = [
  {
    id: "ORD-4821",
    date: "Oct 11, 2026",
    customer: "Folake Chukwudi",
    initials: "FC",
    email: "folake@example.com",
    product: 'Bone Straight 20" HD Frontal',
    details: "13x4 Lace, Natural Black, 180% Density",
    amount: 450000,
    payment: "Paystack Online",
    status: "Pending Approval",
    category: "Human Hair",
  },
  {
    id: "ORD-4820",
    date: "Oct 10, 2026",
    customer: "Halima Danjuma",
    initials: "HD",
    email: "halima@example.com",
    product: 'Water Wave 22" Glueless Unit',
    details: "13x6 HD Lace, Natural Black, 180% Density",
    amount: 420000,
    payment: "Bank Transfer",
    status: "Ready for Pickup",
    category: "Human Hair",
  },
  {
    id: "ORD-4819",
    date: "Oct 10, 2026",
    customer: "Ngozi Eze",
    initials: "NE",
    email: "ngozi@example.com",
    product: 'Deep Wave 20" Closure + Care Set',
    details: "5x5 HD Closure, Premium Human Hair",
    amount: 415000,
    payment: "Card Payment",
    status: "Shipped",
    category: "Human Hair",
  },
  {
    id: "ORD-4818",
    date: "Oct 09, 2026",
    customer: "Zainab Adeleke",
    initials: "ZA",
    email: "zainab@example.com",
    product: 'Body Wave 18" Bundle Deal',
    details: "3 Bundles, Brazilian Human Hair",
    amount: 380000,
    payment: "Paystack Online",
    status: "Ready for Pickup",
    category: "Bundles",
  },
  {
    id: "ORD-4817",
    date: "Oct 09, 2026",
    customer: "Sharon Peters",
    initials: "SP",
    email: "sharon@example.com",
    product: 'Silky Straight 18" Unit',
    details: "13x4 Lace, Glueless, Natural Black",
    amount: 260000,
    payment: "Bank Transfer",
    status: "Awaiting Crafting",
    category: "Human Hair",
  },
  {
    id: "ORD-4816",
    date: "Oct 08, 2026",
    customer: "Amara Okafor",
    initials: "AO",
    email: "amara@example.com",
    product: 'Curly Bob 14" Closure Wig',
    details: "5x5 Closure, Pre-plucked Hairline",
    amount: 195000,
    payment: "Card Payment",
    status: "Delivered",
    category: "Wigs",
  },
  {
    id: "ORD-4815",
    date: "Oct 08, 2026",
    customer: "Tolu Adebayo",
    initials: "TA",
    email: "tolu@example.com",
    product: 'Kinky Straight 16" Wig',
    details: "Glueless Cap, Natural Black",
    amount: 225000,
    payment: "Paystack Online",
    status: "Pending Approval",
    category: "Wigs",
  },
];

const statusTabs = [
  "All Orders",
  "Pending Approval",
  "Awaiting Crafting",
  "Ready for Pickup",
  "Shipped",
  "Delivered",
] as const;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles: Record<OrderStatus, string> = {
  "Pending Approval": "bg-[#fff0d4] text-[#94651b]",
  "Awaiting Crafting": "bg-[#f0eaff] text-[#7657b7]",
  "Ready for Pickup": "bg-[#fff0d8] text-[#a16b18]",
  Shipped: "bg-[#e6f0ff] text-[#3466a5]",
  Delivered: "bg-[#e5f5e9] text-[#278047]",
};

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  iconColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  iconColor: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-[#f0eee9] bg-white p-3.5 shadow-[0_2px_10px_rgba(40,32,20,0.025)] sm:p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.09em] text-[#8b8983] sm:text-[10px]">
            {title}
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-[#282720] sm:text-2xl">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}
        >
          <Icon className={`text-lg ${iconColor}`} />
        </div>
      </div>

      <p className="mt-3 text-[10px] text-[#858178]">{subtitle}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[9px] font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState<string>("All Orders");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [payment, setPayment] = useState("All Channels");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [notice, setNotice] = useState("");
  const pageSize = 5;

  const counts = useMemo(() => {
    const result: Record<string, number> = { "All Orders": orders.length };

    statusTabs.slice(1).forEach((status) => {
      result[status] = orders.filter((order) => order.status === status).length;
    });

    return result;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab =
        activeTab === "All Orders" || order.status === activeTab;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Categories" || order.category === category;

      const matchesPayment =
        payment === "All Channels" || order.payment === payment;

      return matchesTab && matchesSearch && matchesCategory && matchesPayment;
    });
  }, [orders, activeTab, search, category, payment]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((previous) =>
      previous.map((order) => (order.id === id ? { ...order, status } : order)),
    );

    setSelectedOrder((previous) =>
      previous?.id === id ? { ...previous, status } : previous,
    );

    setNotice(`Order ${id} updated to ${status}.`);
    setTimeout(() => setNotice(""), 3000);
  };

  const exportOrders = () => {
    const header = [
      "Order ID",
      "Date",
      "Customer",
      "Product",
      "Amount",
      "Payment",
      "Status",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.date,
      order.customer,
      order.product,
      order.amount,
      order.payment,
      order.status,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }),
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "wig-product-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + order.amount, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending Approval",
  ).length;

  const craftingOrders = orders.filter(
    (order) => order.status === "Awaiting Crafting",
  ).length;

  const readyOrders = orders.filter(
    (order) => order.status === "Ready for Pickup",
  ).length;

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] p-3 text-[#302e29] sm:p-5 lg:p-7">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a58a52]">
              <span>Wig & Beauty Fulfillment</span>
              <span>/</span>
              <span>Order Management</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#292821] sm:text-3xl">
              Wig & Product Orders
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#89867d]">
              Manage wig orders, track fulfillment, monitor payments, and
              coordinate customer deliveries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportOrders}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#e9e4da] bg-white px-3.5 py-2.5 text-xs font-semibold transition hover:bg-[#f6f2e9]"
            >
              <FiDownload />
              Export Manifest
            </button>
          </div>
        </header>

        {/* Summary cards */}
        <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Orders"
            value={String(orders.length + 335)}
            subtitle="↑ 12.5% compared to last month"
            icon={FiShoppingBag}
            color="bg-[#fff0d6]"
            iconColor="text-[#a27c32]"
          />

          <MetricCard
            title="Pending Approval"
            value={String(pendingOrders + 18)}
            subtitle="Orders waiting for review"
            icon={FiClock}
            color="bg-[#fff0d6]"
            iconColor="text-[#a27c32]"
          />

          <MetricCard
            title="Awaiting Crafting"
            value={String(craftingOrders + 47)}
            subtitle="In production and preparation"
            icon={FiPackage}
            color="bg-[#efeeeb]"
            iconColor="text-[#615e55]"
          />

          <MetricCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue + 42650000)}
            subtitle={`${readyOrders + 92} orders in fulfillment`}
            icon={FiTrendingUp}
            color="bg-[#fff4e2]"
            iconColor="text-[#a27c32]"
          />
        </section>

        {/* Fulfillment overview */}
        <section className="mb-5 rounded-xl border border-[#efede7] bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">Fulfillment Overview</h2>
              <p className="mt-1 text-[10px] text-[#918d83]">
                Current order processing pipeline
              </p>
            </div>
            <FiActivity className="text-lg text-[#a58a52]" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: "Pending Review",
                value: pendingOrders,
                icon: FiClock,
                color: "bg-[#fff2dc]",
              },
              {
                label: "In Production",
                value: craftingOrders,
                icon: FiRefreshCw,
                color: "bg-[#f0eaff]",
              },
              {
                label: "Ready for Pickup",
                value: readyOrders,
                icon: FiBox,
                color: "bg-[#fff2dc]",
              },
              {
                label: "Delivered",
                value: orders.filter((o) => o.status === "Delivered").length,
                icon: FiCheck,
                color: "bg-[#e8f5eb]",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg bg-[#fbfaf7] p-3"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                >
                  <item.icon className="text-base" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-bold">{item.value}</p>
                  <p className="text-[10px] text-[#89867d]">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Order registry */}
        <section className="overflow-hidden rounded-xl border border-[#efede7] bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-[#f0eee9] px-4 py-4 sm:flex-row sm:items-center sm:px-5">
            <div>
              <h2 className="text-sm font-bold">Order Registry</h2>
              <p className="mt-1 text-[10px] text-[#918d83]">
                {filteredOrders.length} orders found
              </p>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
                setPayment("All Channels");
                setActiveTab("All Orders");
                setCurrentPage(1);
              }}
              className="flex items-center gap-2 self-start text-[10px] font-semibold text-[#8c7445] hover:text-[#292821] sm:self-auto"
            >
              <FiRefreshCw />
              Reset filters
            </button>
          </div>

          {/* Status tabs */}
          <div className="flex gap-2 overflow-x-auto border-b border-[#f0eee9] px-4 py-3 sm:px-5">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-semibold transition ${
                  activeTab === tab
                    ? "bg-[#a58a52] text-white"
                    : "bg-[#f8f7f4] text-[#706d65] hover:bg-[#eeeae1]"
                }`}
              >
                {tab}
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] ${
                    activeTab === tab
                      ? "bg-white/20 text-white"
                      : "bg-white text-[#706d65]"
                  }`}
                >
                  {counts[tab] ?? 0}
                </span>
              </button>
            ))}
          </div>

          {/* Search and filters */}
          <div className="flex flex-col gap-2 border-b border-[#f0eee9] p-4 sm:flex-row sm:items-center sm:px-5">
            <div className="relative min-w-0 flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#a19d94]" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by Order ID, Client, Wig SKU, or Tracking Number..."
                className="w-full rounded-lg border border-[#eae7df] bg-[#fdfcf9] py-2.5 pl-9 pr-3 text-xs outline-none transition placeholder:text-[#aaa69c] focus:border-[#b49a62] focus:ring-2 focus:ring-[#b49a62]/10"
              />
            </div>

            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-[#eae7df] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#b49a62]"
            >
              <option>All Categories</option>
              <option>Human Hair</option>
              <option>Wigs</option>
              <option>Bundles</option>
            </select>

            <select
              value={payment}
              onChange={(event) => {
                setPayment(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-[#eae7df] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#b49a62]"
            >
              <option>All Channels</option>
              <option>Paystack Online</option>
              <option>Bank Transfer</option>
              <option>Card Payment</option>
            </select>

            <button
              onClick={() => setShowFilters((value) => !value)}
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs transition ${
                showFilters
                  ? "border-[#a58a52] bg-[#faf4e7]"
                  : "border-[#eae7df] hover:bg-[#f8f7f4]"
              }`}
            >
              <FiFilter />
              <span className="sm:hidden">More filters</span>
              <FiChevronDown />
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 border-b border-[#f0eee9] bg-[#fcfbf8] px-4 py-3 sm:px-5">
              <label className="flex items-center gap-2 text-[11px] text-[#77736a]">
                <FiCalendar />
                Order date
                <select className="rounded-md border border-[#eae7df] bg-white p-2 outline-none">
                  <option>Any date</option>
                  <option>Today</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </label>
              <p className="self-center text-[10px] text-[#99958b]">
                Use the search, category and payment filters above to narrow
                down your results.
              </p>
            </div>
          )}

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-262.5 border-collapse text-left">
              <thead>
                <tr className="bg-[#fbfaf7]">
                  {[
                    "ORDER",
                    "CLIENT & CUSTOMER DETAILS",
                    "COMMISSION / PRODUCT INFO",
                    "AMOUNT",
                    "PAYMENT",
                    "FULFILLMENT",
                    "ACTIONS",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap border-b border-[#f0eee9] px-4 py-3 text-[9px] font-bold uppercase tracking-[0.07em] text-[#8b877e]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="group border-b border-[#f2f0eb] transition hover:bg-[#fdfbf6]"
                  >
                    <td className="px-4 py-4 align-middle">
                      <p className="whitespace-nowrap text-[11px] font-bold text-[#353229]">
                        <span className="mr-1 text-[#b49a62]">◆</span>
                        {order.id}
                      </p>
                      <p className="mt-1 whitespace-nowrap text-[9px] text-[#99958b]">
                        {order.date}
                      </p>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4ead5] text-[10px] font-bold text-[#98763a]">
                          {order.initials}
                        </div>
                        <div>
                          <p className="whitespace-nowrap text-[11px] font-semibold">
                            {order.customer}
                          </p>
                          <p className="mt-1 whitespace-nowrap text-[9px] text-[#99958b]">
                            {order.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="max-w-65 px-4 py-4 align-middle">
                      <p className="text-[11px] font-semibold text-[#3b3830]">
                        {order.product}
                      </p>
                      <p className="mt-1 text-[9px] leading-4 text-[#908c82]">
                        {order.details}
                      </p>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <p className="whitespace-nowrap text-[11px] font-bold">
                        {formatCurrency(order.amount)}
                      </p>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <span className="whitespace-nowrap rounded-md border border-[#ece9e2] bg-white px-2 py-1.5 text-[9px] text-[#77736a]">
                        {order.payment}
                      </span>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-1.5">
                        <button
                          title="View order"
                          onClick={() => setSelectedOrder(order)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eae7df] text-[#706d65] transition hover:border-[#b49a62] hover:bg-[#faf3e4] hover:text-[#8d6d2f]"
                        >
                          <FiEye className="text-sm" />
                        </button>

                        {order.status === "Pending Approval" ? (
                          <button
                            onClick={() =>
                              updateStatus(order.id, "Awaiting Crafting")
                            }
                            className="whitespace-nowrap rounded-lg bg-[#a58a52] px-2.5 py-2 text-[9px] font-semibold text-white transition hover:bg-[#8b713c]"
                          >
                            Approve
                          </button>
                        ) : order.status === "Awaiting Crafting" ? (
                          <button
                            onClick={() =>
                              updateStatus(order.id, "Ready for Pickup")
                            }
                            className="whitespace-nowrap rounded-lg bg-[#f3e9d3] px-2.5 py-2 text-[9px] font-semibold text-[#85662d] transition hover:bg-[#ead8b3]"
                          >
                            Ready
                          </button>
                        ) : order.status === "Ready for Pickup" ? (
                          <button
                            onClick={() => updateStatus(order.id, "Shipped")}
                            className="whitespace-nowrap rounded-lg bg-[#e6f0ff] px-2.5 py-2 text-[9px] font-semibold text-[#3466a5] transition hover:bg-[#d5e5fb]"
                          >
                            Ship
                          </button>
                        ) : order.status === "Shipped" ? (
                          <button
                            onClick={() => updateStatus(order.id, "Delivered")}
                            className="whitespace-nowrap rounded-lg bg-[#e5f5e9] px-2.5 py-2 text-[9px] font-semibold text-[#278047] transition hover:bg-[#d1ebd8]"
                          >
                            Deliver
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 rounded-lg bg-[#e5f5e9] px-2.5 py-2 text-[9px] font-semibold text-[#278047]">
                            <FiCheck />
                            Done
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f4ed]">
                        <FiArchive className="text-xl text-[#a58a52]" />
                      </div>
                      <p className="mt-3 text-sm font-semibold">
                        No orders found
                      </p>
                      <p className="mt-1 text-xs text-[#908c82]">
                        Try changing your search or filter options.
                      </p>
                      <button
                        onClick={() => {
                          setSearch("");
                          setCategory("All Categories");
                          setPayment("All Channels");
                          setActiveTab("All Orders");
                        }}
                        className="mt-3 text-xs font-semibold text-[#98763a] hover:underline"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-[10px] text-[#8e8a81]">
              Showing{" "}
              {filteredOrders.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}{" "}
              to {Math.min(currentPage * pageSize, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eae7df] text-xs disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 min-w-8 rounded-lg px-2 text-[10px] font-semibold transition ${
                      currentPage === page
                        ? "bg-[#8d7139] text-white"
                        : "border border-[#eae7df] hover:bg-[#f8f5ed]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eae7df] text-xs disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-5 flex flex-col gap-2 text-[10px] text-[#a19d94] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Wig & Beauty Fulfillment. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#55a36b]" />
              System operational
            </span>
            <span>Order management</span>
          </div>
        </footer>
      </div>

      {/* Notifications */}
      {notice && (
        <div className="fixed bottom-5 right-5 z-70 flex max-w-[calc(100%-40px)] items-center gap-3 rounded-xl bg-[#24221c] px-4 py-3 text-xs text-white shadow-xl">
          <FiCheck className="shrink-0 text-[#b9dcb8]" />
          {notice}
          <button
            onClick={() => setNotice("")}
            className="ml-2 text-white/70 hover:text-white"
          >
            <FiX />
          </button>
        </div>
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          statusStyle={statusStyles[selectedOrder.status]}
          onClose={closeModal}
          onUpdateStatus={(status) => updateStatus(selectedOrder.id, status)}
          onDone={() => {
            setNotice(`Order ${selectedOrder.id} details reviewed.`);
            closeModal();
            setTimeout(() => setNotice(""), 3000);
          }}
        />
      )}
    </div>
  );
};

export default Orders;
