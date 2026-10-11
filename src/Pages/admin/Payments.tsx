import React, { useMemo, useState } from "react";
import {
  FiActivity,
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCreditCard,
  FiDownload,
  FiDollarSign,
  FiEye,
  FiFilter,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import {
  LogTransactionModal,
  TransactionDetailsModal,
  type PaymentTransaction,
} from "../Modals/PaymentsModals";

const transactions: PaymentTransaction[] = [
  {
    id: "TXN-9942",
    timestamp: "Oct 08, 2026 10:30 AM",
    customer: "Amaka Johnson",
    initials: "AJ",
    service: "Salon Services",
    reference: "Wig Installation · REF-1024",
    amount: 45000,
    channel: "Paystack Auth",
    status: "Completed",
  },
  {
    id: "TXN-9941",
    timestamp: "Oct 08, 2026 09:15 AM",
    customer: "Folake Oladuti",
    initials: "FO",
    service: "Wig Sale",
    reference: "Bone Straight 30″ · ORDER-221",
    amount: 45000,
    channel: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "TXN-9940",
    timestamp: "Oct 07, 2026 04:30 PM",
    customer: "Halima Danjuma",
    initials: "HD",
    service: "Deposit Escrow",
    reference: "Deposit Escrow Hold",
    amount: 80000,
    channel: "Mastercard",
    status: "Pending",
  },
  {
    id: "TXN-9939",
    timestamp: "Oct 07, 2026 02:15 PM",
    customer: "David Williams",
    initials: "DW",
    service: "Salon Services",
    reference: "Braiding · REF-982",
    amount: 25000,
    channel: "Lokal Airtel",
    status: "Completed",
  },
  {
    id: "TXN-9938",
    timestamp: "Oct 07, 2026 01:00 PM",
    customer: "Sharon Peters",
    initials: "SP",
    service: "International Wig Order",
    reference: "Express Custom Packaging",
    amount: 525000,
    channel: "Stripe Internet",
    status: "Completed",
  },
  {
    id: "TXN-9937",
    timestamp: "Oct 06, 2026 05:45 PM",
    customer: "Kemi Balogun",
    initials: "KB",
    service: "Rescheduled Booking Hold",
    reference: "VIP Suite Session",
    amount: 35000,
    channel: "Bank USSD",
    status: "Pending",
  },
  {
    id: "TXN-9936",
    timestamp: "Oct 06, 2026 03:20 PM",
    customer: "Grace Williams",
    initials: "GW",
    service: "Hair Treatment",
    reference: "Premium Hair Care",
    amount: 18000,
    channel: "Paystack Auth",
    status: "Completed",
  },
  {
    id: "TXN-9935",
    timestamp: "Oct 05, 2026 11:10 AM",
    customer: "Tolu Adeyemi",
    initials: "TA",
    service: "Wig Installation",
    reference: "Frontal Installation",
    amount: 65000,
    channel: "Bank Transfer",
    status: "Failed",
  },
  {
    id: "TXN-9934",
    timestamp: "Oct 04, 2026 09:40 AM",
    customer: "Sarah James",
    initials: "SJ",
    service: "Product Purchase",
    reference: "Luxury Hair Bundle",
    amount: 95000,
    channel: "Mastercard",
    status: "Completed",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const stats = [
  {
    title: "Net Settled Revenue",
    value: "₦28,450,000",
    change: "+12.4%",
    description: "From last 30 days",
    icon: FiDollarSign,
    color: "bg-[#fbf2df] text-[#96701d]",
    chart: "M0 25 Q12 22 22 25 T45 18 T65 22 T85 9 T110 12",
  },
  {
    title: "Booking Escrow",
    value: "₦3,850,000",
    change: "12 holds",
    description: "Locked pending clearance",
    icon: FiShield,
    color: "bg-[#f1f1ef] text-[#77766f]",
    chart: "M0 25 L20 25 L32 21 L45 21 L60 21 L75 21 L90 21 L110 21",
  },
  {
    title: "Average Transaction (₦)",
    value: "₦54,200",
    change: "+8.6%",
    description: "Average transaction value",
    icon: FiTrendingUp,
    color: "bg-[#fff5e6] text-[#b18a3d]",
    chart: "M0 25 Q15 28 25 19 T45 22 T65 12 T85 17 T110 5",
  },
  {
    title: "Dispute & Refund Rate",
    value: "0.4%",
    change: "₦20,000",
    description: "2 claims · 0.2% resolved",
    icon: FiActivity,
    color: "bg-[#f0efec] text-[#6c6b66]",
    chart: "M0 22 L25 22 L40 22 L55 22 L70 22 L85 22 L110 22",
  },
];

const statusStyles: Record<PaymentTransaction["status"], string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-600",
};

const Payments: React.FC = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Transactions");
  const [channel, setChannel] = useState("All Channels");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<PaymentTransaction | null>(null);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState("Oct 01 - Oct 08, 2026");
  const [notice, setNotice] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const pageSize = 6;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.customer.toLowerCase().includes(query) ||
        item.service.toLowerCase().includes(query) ||
        item.reference.toLowerCase().includes(query);

      const matchesStatus =
        status === "All Transactions" || item.status === status;

      const matchesChannel =
        channel === "All Channels" || item.channel === channel;

      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [search, status, channel]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / pageSize),
  );

  const currentTransactions = filteredTransactions.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const exportCSV = () => {
    const headers = [
      "Transaction ID",
      "Timestamp",
      "Customer",
      "Service",
      "Reference",
      "Amount",
      "Channel",
      "Status",
    ];

    const rows = filteredTransactions.map((item) => [
      item.id,
      item.timestamp,
      item.customer,
      item.service,
      item.reference,
      item.amount,
      item.channel,
      item.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "financial-ledger.csv";
    link.click();

    URL.revokeObjectURL(url);
    setNotice("CSV exported successfully.");
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("All Transactions");
    setChannel("All Channels");
    setPage(1);
  };

  const changeStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const changeChannel = (value: string) => {
    setChannel(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6] px-3 py-5 text-[#282824] sm:px-5 lg:px-8 lg:py-7">
      <div className="mx-auto max-w-[1600px] space-y-5">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#81621c] text-white">
                <FiCreditCard size={17} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b702e]">
                Finance & Accounting
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Financial Ledger & Transactions
            </h1>

            <p className="mt-1 text-sm text-[#888780]">
              Track salon appointments, bookings, escrow, payouts, and all
              settlement payments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-[#e9e5dc] bg-white px-3 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <div>
                <p className="text-[11px] font-semibold">
                  Live Settlement Feed
                </p>
                <p className="text-[10px] text-[#98968e]">Synced 2 min ago</p>
              </div>
            </div>

            <button
              type="button"
              title="View settlement feed"
              onClick={() => setNotice("Settlement feed refreshed.")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e9e5dc] bg-white transition hover:bg-[#f6f0e2]"
            >
              <FiRefreshCw size={16} />
            </button>

            <button
              type="button"
              onClick={() => setShowReceipt(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#282824] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#81621c]"
            >
              <FiPlus size={17} />
              Log Transaction
            </button>
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="min-w-0 rounded-xl border border-[#ece9e1] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition hover:border-[#d7c69e]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-[#89877e]">
                    {stat.title}
                  </p>

                  <div className={`rounded-md p-2 ${stat.color}`}>
                    <Icon size={15} />
                  </div>
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight">
                  {stat.value}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
                      index === 3
                        ? "bg-[#f5f3ef] text-[#77766f]"
                        : "bg-[#fbf0d8] text-[#94701e]"
                    }`}
                  >
                    {index === 3 ? (
                      <FiShield size={11} />
                    ) : (
                      <FiArrowUpRight size={11} />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-[#aaa89f]">
                    {stat.description}
                  </span>
                </div>

                <svg
                  viewBox="0 0 110 30"
                  preserveAspectRatio="none"
                  className="mt-3 h-8 w-full"
                  aria-hidden="true"
                >
                  <path
                    d={stat.chart}
                    fill="none"
                    stroke={index === 1 ? "#a9a28f" : "#b99a50"}
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            );
          })}
        </section>

        {/* Filters and actions */}
        <section className="rounded-xl border border-[#ece9e1] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a096]"
                size={16}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by Transaction Reference, Customer..."
                className="h-10 w-full rounded-lg border border-[#ece9e1] bg-[#fcfcfb] pl-10 pr-3 text-xs outline-none transition placeholder:text-[#aaa89f] focus:border-[#b99a50] focus:ring-2 focus:ring-[#b99a50]/10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={exportCSV}
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e9e5dc] px-3 text-xs font-medium transition hover:bg-[#faf7ef]"
              >
                <FiDownload size={14} />
                Download Audit CSV
              </button>

              <button
                type="button"
                onClick={() =>
                  setNotice("Reconciliation complete: demo data checked.")
                }
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e9e5dc] px-3 text-xs font-medium transition hover:bg-[#faf7ef]"
              >
                <FiRefreshCw size={14} />
                Reconcile POS
              </button>

              <button
                type="button"
                onClick={() => setShowReceipt(true)}
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#80611c] px-3 text-xs font-semibold text-white transition hover:bg-[#654b12]"
              >
                <FiPlus size={14} />
                Log Cash/Terminal Receipt
              </button>
            </div>
          </div>

          {/* Status filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-medium text-[#aaa89f]">
              Channel:
            </span>

            {[
              "All Channels",
              "Paystack Auth",
              "Bank Transfer",
              "Mastercard",
            ].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => changeChannel(item)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition ${
                  channel === item
                    ? "bg-[#292925] text-white"
                    : "border border-[#eeeae2] bg-white text-[#77766f] hover:bg-[#f7f5f0]"
                }`}
              >
                {item}
              </button>
            ))}

            <div className="mx-1 hidden h-5 border-l border-[#e9e5dc] sm:block" />

            <span className="text-[11px] font-medium text-[#aaa89f]">
              Status:
            </span>

            <div className="relative">
              <select
                value={status}
                onChange={(e) => changeStatus(e.target.value)}
                className="h-8 appearance-none rounded-lg border border-[#eeeae2] bg-white py-1 pl-3 pr-8 text-[11px] outline-none focus:border-[#b99a50]"
              >
                <option>All Transactions</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
              <FiChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#96948c]"
                size={13}
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDateFilter(!showDateFilter)}
                className="flex h-8 items-center gap-2 rounded-lg border border-[#eeeae2] px-3 text-[11px] text-[#77766f] transition hover:bg-[#faf7ef]"
              >
                <FiCalendar size={13} />
                {dateRange}
                <FiChevronDown size={12} />
              </button>

              {showDateFilter && (
                <div className="absolute left-0 top-10 z-20 w-64 rounded-xl border border-[#e9e5dc] bg-white p-4 shadow-xl">
                  <p className="mb-3 text-xs font-semibold">Filter by date</p>
                  <label className="mb-1 block text-[11px] text-[#888780]">
                    Start date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-10-01"
                    className="mb-3 h-9 w-full rounded-lg border border-[#e9e5dc] px-2 text-xs outline-none focus:border-[#b99a50]"
                  />
                  <label className="mb-1 block text-[11px] text-[#888780]">
                    End date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-10-08"
                    className="mb-3 h-9 w-full rounded-lg border border-[#e9e5dc] px-2 text-xs outline-none focus:border-[#b99a50]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setDateRange("Custom date range");
                      setShowDateFilter(false);
                      setNotice(
                        "Date range selected. Connect your date filter to your transaction API.",
                      );
                    }}
                    className="w-full rounded-lg bg-[#80611c] py-2 text-xs font-semibold text-white hover:bg-[#654b12]"
                  >
                    Apply date range
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto flex items-center gap-1 text-[11px] text-[#80611c] hover:underline"
            >
              <FiFilter size={13} />
              Clear filters
            </button>
          </div>
        </section>

        {/* Ledger table */}
        <section className="overflow-hidden rounded-xl border border-[#ece9e1] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col justify-between gap-3 border-b border-[#eeeae2] px-4 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-sm font-bold">Live Ledger Entries</h2>
              <p className="mt-1 text-[11px] text-[#96948c]">
                Complete record of incoming and outgoing transactions
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#fff3d9] px-2.5 py-1 text-[10px] font-semibold text-[#88671e]">
                {filteredTransactions.length} Recent Entries
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-[#98968e]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b99a50]" />
                Auto-Sync: 10s interval
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-250 border-collapse text-left">
              <thead>
                <tr className="bg-[#f7f6f3] text-[10px] font-semibold uppercase tracking-wide text-[#96948c]">
                  <th className="px-4 py-3">Transaction</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Allocation & Service</th>
                  <th className="px-4 py-3 text-right">Amount (₦)</th>
                  <th className="px-4 py-3">Channel & Term</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f0eee8]">
                {currentTransactions.map((item) => (
                  <tr key={item.id} className="transition hover:bg-[#fdfbf6]">
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="text-[11px] font-semibold text-[#383832]">
                        #{item.id}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-[11px] text-[#888780]">
                      {item.timestamp}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8f0df] text-[10px] font-bold text-[#96701d]">
                          {item.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="whitespace-nowrap text-[11px] font-semibold">
                            {item.customer}
                          </p>
                          <p className="mt-1 text-[10px] text-[#aaa89f]">
                            Verified Customer
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="whitespace-nowrap text-[11px] font-semibold">
                        {item.service}
                      </p>
                      <p className="mt-1 whitespace-nowrap text-[10px] text-[#9c987f]">
                        {item.reference}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right">
                      <span className="text-xs font-bold">
                        {formatCurrency(item.amount)}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center gap-2 text-[11px] text-[#77766f]">
                        <FiCreditCard size={13} />
                        {item.channel}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          statusStyles[item.status]
                        }`}
                      >
                        <span className="mr-1">●</span>
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        title="View transaction"
                        onClick={() => setSelected(item)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eeeae2] text-[#77766f] transition hover:border-[#b99a50] hover:bg-[#fbf4e5] hover:text-[#80611c]"
                      >
                        <FiEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {currentTransactions.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-14 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f4ec] text-[#9a7a36]">
                        <FiSearch size={20} />
                      </div>
                      <p className="mt-3 text-sm font-semibold">
                        No transactions found
                      </p>
                      <p className="mt-1 text-xs text-[#96948c]">
                        Try adjusting your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-3 text-xs font-semibold text-[#80611c] hover:underline"
                      >
                        Reset filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-[#eeeae2] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-[#96948c]">
              Displaying{" "}
              <span className="font-semibold text-[#383832]">
                {filteredTransactions.length === 0
                  ? 0
                  : (page - 1) * pageSize + 1}
                –{Math.min(page * pageSize, filteredTransactions.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#383832]">
                {filteredTransactions.length}
              </span>{" "}
              matched records
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-8 items-center gap-1 rounded-lg border border-[#eeeae2] px-3 text-[11px] transition hover:bg-[#faf7ef] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronLeft size={13} />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (number) =>
                    number === 1 ||
                    number === totalPages ||
                    Math.abs(number - page) <= 1,
                )
                .map((number, index, array) => (
                  <React.Fragment key={number}>
                    {index > 0 && number - array[index - 1] > 1 && (
                      <span className="px-1 text-xs text-[#96948c]">...</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setPage(number)}
                      className={`h-8 min-w-8 rounded-lg px-2 text-[11px] transition ${
                        page === number
                          ? "bg-[#80611c] font-semibold text-white"
                          : "border border-[#eeeae2] hover:bg-[#faf7ef]"
                      }`}
                    >
                      {number}
                    </button>
                  </React.Fragment>
                ))}

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-8 items-center gap-1 rounded-lg border border-[#eeeae2] px-3 text-[11px] transition hover:bg-[#faf7ef] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <FiChevronRight size={13} />
              </button>
            </div>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-2 pb-2 text-[10px] text-[#aaa89f] sm:flex-row">
          <p>Financial Ledger · Transaction Management</p>
          <p>All amounts displayed in Nigerian Naira (NGN)</p>
        </footer>
      </div>

      {selected && (
        <TransactionDetailsModal
          transaction={selected}
          statusStyle={statusStyles[selected.status]}
          onClose={() => setSelected(null)}
        />
      )}

      {showReceipt && (
        <LogTransactionModal
          onClose={() => setShowReceipt(false)}
          onSubmit={() => {
            setShowReceipt(false);
            setNotice(
              "Transaction form submitted. Connect your API to save the transaction.",
            );
          }}
        />
      )}

      {/* Toast notification */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-60 flex max-w-sm items-start gap-3 rounded-xl border border-[#e9e5dc] bg-white p-4 shadow-xl"
        >
          <FiCheckCircle
            className="mt-0.5 shrink-0 text-emerald-600"
            size={18}
          />
          <p className="text-sm">{notice}</p>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="ml-2 text-lg leading-none text-[#96948c] hover:text-black"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Payments;
