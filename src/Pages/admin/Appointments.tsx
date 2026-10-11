import React, { useMemo, useState } from "react";
import AppointmentModal, {
  type Appointment,
  type AppointmentStatus,
} from "../Modals/AppointmentModal";
import {
  FiSearch,
  FiCalendar,
  FiChevronDown,
  FiMoreHorizontal,
  FiEye,
  FiTrash2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiPlus,
  FiAlertTriangle,
} from "react-icons/fi";

const initialAppointments: Appointment[] = [
  {
    id: "BK-1024",
    customer: "Amaka Johnson",
    initials: "AJ",
    phone: "+234 803-555-0192",
    email: "amaka.j@gmail.com",
    service: "Wig Installation",
    duration: "120 mins",
    stylist: "Sarah Williams",
    stylistInitials: "SW",
    date: "Oct 8, 2026",
    time: "10:30 AM",
    fee: 45000,
    status: "Pending",
    paymentMethod: "Paystack Pre-authorized Escrow",
    paymentStatus: "Pending",
    location: "Victoria Island, Lagos",
    notes:
      "Client has a specific request regarding the hairline and prefers a natural-looking installation.",
  },
  {
    id: "BK-1023",
    customer: "David Williams",
    initials: "DW",
    phone: "+234 812-441-920",
    email: "david.williams@gmail.com",
    service: "Hair Styling",
    duration: "45 mins",
    stylist: "Jessica C.",
    stylistInitials: "JC",
    date: "Oct 8, 2026",
    time: "11:00 AM",
    fee: 25000,
    status: "Confirmed",
    paymentMethod: "Card Payment",
    paymentStatus: "Paid",
    location: "Lekki Phase 1, Lagos",
    notes: "Client requested a neat, natural finish.",
  },
  {
    id: "BK-1022",
    customer: "Chioma Okafor",
    initials: "CO",
    phone: "+234 708-322-144",
    email: "chioma.okafor@gmail.com",
    service: "Wig Customization",
    duration: "180 mins",
    stylist: "Sarah Williams",
    stylistInitials: "SW",
    date: "Oct 8, 2026",
    time: "12:00 PM",
    fee: 80000,
    status: "Completed",
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    location: "Ikeja, Lagos",
    notes: "Customization and styling requested.",
  },
  {
    id: "BK-1021",
    customer: "Grace Ada",
    initials: "GA",
    phone: "+234 809-223-010",
    email: "grace.ada@gmail.com",
    service: "Hair Braiding",
    duration: "150 mins",
    stylist: "Linda Z.",
    stylistInitials: "LZ",
    date: "Oct 8, 2026",
    time: "2:00 PM",
    fee: 30000,
    status: "Cancelled",
    paymentMethod: "Card Payment",
    paymentStatus: "Refund Pending",
    location: "Yaba, Lagos",
    notes: "Appointment cancelled by the customer.",
  },
  {
    id: "BK-1020",
    customer: "Zainab Bello",
    initials: "ZB",
    phone: "+234 803-121-567",
    email: "zainab.bello@gmail.com",
    service: "Wig Revamp & Treatment",
    duration: "90 mins",
    stylist: "Sarah Williams",
    stylistInitials: "SW",
    date: "Oct 8, 2026",
    time: "3:00 PM",
    fee: 35000,
    status: "Confirmed",
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    location: "Surulere, Lagos",
    notes: "Wig revamp and deep conditioning treatment.",
  },
  {
    id: "BK-1019",
    customer: "Tolu Oladipo",
    initials: "TO",
    phone: "+234 802-111-987",
    email: "tolu.oladipo@gmail.com",
    service: "Bridal Styling Package",
    duration: "240 mins",
    stylist: "Jessica C.",
    stylistInitials: "JC",
    date: "Oct 9, 2026",
    time: "9:00 AM",
    fee: 120000,
    status: "Pending",
    paymentMethod: "Paystack Pre-authorized Escrow",
    paymentStatus: "Pending",
    location: "Lekki, Lagos",
    notes: "Bridal styling consultation and preparation.",
  },
];

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("NGN", "₦");

const statusStyles: Record<AppointmentStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Confirmed: "bg-blue-50 text-blue-700 ring-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Cancelled: "bg-rose-50 text-rose-600 ring-rose-200",
  Rejected: "bg-gray-100 text-gray-600 ring-gray-200",
};

const tabs = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Rejected",
] as const;

type Tab = typeof tabs[number];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(
    initialAppointments,
  );

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState<Appointment | null>(null);
  const [
    deleteAppointment,
    setDeleteAppointment,
  ] = useState<Appointment | null>(null);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"Table" | "Calendar" | "Timeline">(
    "Table",
  );
  const [dateFilter, setDateFilter] = useState("All dates");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [stylistFilter, setStylistFilter] = useState("All Stylists");
  const [notice, setNotice] = useState("");

  const pageSize = 6;

  const counts = useMemo(() => {
    return {
      All: appointments.length,
      Pending: appointments.filter((a) => a.status === "Pending").length,
      Confirmed: appointments.filter((a) => a.status === "Confirmed").length,
      Completed: appointments.filter((a) => a.status === "Completed").length,
      Cancelled: appointments.filter((a) => a.status === "Cancelled").length,
      Rejected: appointments.filter((a) => a.status === "Rejected").length,
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        appointment.customer.toLowerCase().includes(query) ||
        appointment.id.toLowerCase().includes(query) ||
        appointment.service.toLowerCase().includes(query) ||
        appointment.stylist.toLowerCase().includes(query) ||
        appointment.phone.toLowerCase().includes(query);

      const matchesStatus =
        activeTab === "All" || appointment.status === activeTab;

      const matchesService =
        serviceFilter === "All Services" ||
        appointment.service === serviceFilter;

      const matchesStylist =
        stylistFilter === "All Stylists" ||
        appointment.stylist === stylistFilter;

      const matchesDate =
        dateFilter === "All dates" || appointment.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesService &&
        matchesStylist &&
        matchesDate
      );
    });
  }, [
    appointments,
    search,
    activeTab,
    serviceFilter,
    stylistFilter,
    dateFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAppointments.length / pageSize),
  );

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const updateStatus = (
    appointment: Appointment,
    status: AppointmentStatus,
  ) => {
    setAppointments((previous) =>
      previous.map((item) =>
        item.id === appointment.id ? { ...item, status } : item,
      ),
    );

    setSelectedAppointment((previous) =>
      previous?.id === appointment.id ? { ...previous, status } : previous,
    );

    setNotice(`${appointment.id} updated to ${status.toLowerCase()}.`);
  };

  const confirmDelete = () => {
    if (!deleteAppointment) return;

    setAppointments((previous) =>
      previous.filter((item) => item.id !== deleteAppointment.id),
    );

    setNotice(`${deleteAppointment.id} has been deleted.`);
    setDeleteAppointment(null);
    setOpenActionId(null);
    setCurrentPage(1);

    if (selectedAppointment?.id === deleteAppointment.id) {
      setSelectedAppointment(null);
    }
  };

  const exportCSV = () => {
    const headers = [
      "Booking ID",
      "Customer",
      "Service",
      "Stylist",
      "Date",
      "Time",
      "Fee",
      "Status",
    ];

    const rows = filteredAppointments.map((appointment) => [
      appointment.id,
      appointment.customer,
      appointment.service,
      appointment.stylist,
      appointment.date,
      appointment.time,
      appointment.fee,
      appointment.status,
    ]);

    const escapeCSV = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "appointments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const closeModals = () => {
    setSelectedAppointment(null);
    setDeleteAppointment(null);
  };

  return (
    <div
      className="min-h-screen bg-[#f7f7f5] px-4 py-5 text-[#292820] sm:px-6 lg:px-8"
      onClick={() => setOpenActionId(null)}
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
              Appointments Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Oversee client reservations, stylist allocation, and operational
              salon throughput.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FiDownload size={15} />
              Export CSV
            </button>

            <button
              onClick={() =>
                setNotice(
                  "Connect your appointment creation form to add a new booking.",
                )
              }
              className="flex items-center gap-2 rounded-lg bg-[#765719] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f4614]"
            >
              <FiPlus size={16} />
              New Appointment
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by customer name, booking ID, phone..."
              className="w-full rounded-lg border border-gray-200 bg-[#fafaf9] py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#b49a5d] focus:ring-2 focus:ring-[#b49a5d]/10"
            />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex">
            <div className="relative">
              <FiCalendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <select
                value={dateFilter}
                onChange={(event) => {
                  setDateFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-[#b49a5d] lg:min-w-[145px]"
              >
                <option>All dates</option>
                <option>Oct 8, 2026</option>
                <option>Oct 9, 2026</option>
              </select>
              <FiChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
            </div>

            <div className="relative">
              <select
                value={serviceFilter}
                onChange={(event) => {
                  setServiceFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-8 text-sm outline-none focus:border-[#b49a5d] lg:min-w-[145px]"
              >
                <option>All Services</option>
                {[...new Set(appointments.map((a) => a.service))].map(
                  (service) => (
                    <option key={service}>{service}</option>
                  ),
                )}
              </select>
              <FiChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
            </div>

            <div className="relative">
              <select
                value={stylistFilter}
                onChange={(event) => {
                  setStylistFilter(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-8 text-sm outline-none focus:border-[#b49a5d] lg:min-w-[140px]"
              >
                <option>All Stylists</option>
                {[...new Set(appointments.map((a) => a.stylist))].map(
                  (stylist) => (
                    <option key={stylist}>{stylist}</option>
                  ),
                )}
              </select>
              <FiChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
            </div>
          </div>
        </div>

        {/* Status tabs */}
        <div className="mb-5 flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
          <div className="flex gap-1 overflow-x-auto rounded-lg border border-gray-200 bg-white p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => changeTab(tab)}
                className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
                  activeTab === tab
                    ? "bg-[#765719] text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                {tab}
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${
                    activeTab === tab
                      ? "bg-white/15 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {counts[tab]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1 self-end rounded-lg border border-gray-200 bg-white p-1 xl:self-auto">
            {(["Table", "Calendar", "Timeline"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`rounded-md px-3 py-2 text-xs font-medium transition ${
                  viewMode === mode
                    ? "bg-[#f1eadb] text-[#765719]"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {notice && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#e5d6b5] bg-[#fff9ec] px-4 py-3 text-sm text-[#765719]">
            <span>{notice}</span>
            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <FiX size={17} />
            </button>
          </div>
        )}

        {/* Appointments table */}
        {viewMode === "Table" ? (
          <div className="overflow-visible rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-2 border-b border-gray-100 px-4 py-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-bold">Queue Pipeline</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Review and manage customer appointments.
                </p>
              </div>
              <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                {appointments.filter((a) => a.status === "Pending").length}{" "}
                Awaiting Action
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#fafaf8] text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                    <th className="px-4 py-3">Booking ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Service Spec</th>
                    <th className="px-4 py-3">Stylist</th>
                    <th className="px-4 py-3">Date & Time</th>
                    <th className="px-4 py-3">Fee</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {paginatedAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="transition hover:bg-[#fcfbf8]"
                    >
                      <td className="px-4 py-4">
                        <span className="text-xs font-semibold text-[#765719]">
                          #{appointment.id}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eee5d3] text-xs font-bold text-[#765719]">
                            {appointment.initials}
                          </div>
                          <div>
                            <p className="whitespace-nowrap text-xs font-semibold text-gray-800">
                              {appointment.customer}
                            </p>
                            <p className="mt-1 whitespace-nowrap text-[10px] text-gray-400">
                              {appointment.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <p className="whitespace-nowrap text-xs font-medium text-gray-700">
                          {appointment.service}
                        </p>
                        <p className="mt-1 text-[10px] text-gray-400">
                          {appointment.duration}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1ede5] text-[9px] font-bold text-gray-600">
                            {appointment.stylistInitials}
                          </div>
                          <span className="whitespace-nowrap text-xs text-gray-600">
                            {appointment.stylist}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <p className="whitespace-nowrap text-xs text-gray-700">
                          {appointment.date}
                        </p>
                        <p className="mt-1 whitespace-nowrap text-[10px] text-gray-400">
                          {appointment.time}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span className="whitespace-nowrap text-xs font-semibold text-gray-800">
                          {formatMoney(appointment.fee)}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold ring-1 ring-inset ${
                            statusStyles[appointment.status]
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div
                          className="relative flex justify-center"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <button
                            aria-label={`Actions for ${appointment.id}`}
                            onClick={() =>
                              setOpenActionId((previous) =>
                                previous === appointment.id
                                  ? null
                                  : appointment.id,
                              )
                            }
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          >
                            <FiMoreHorizontal size={19} />
                          </button>

                          {openActionId === appointment.id && (
                            <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
                              <button
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setOpenActionId(null);
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-gray-700 transition hover:bg-[#f7f3ea] hover:text-[#765719]"
                              >
                                <FiEye size={15} />
                                View details
                              </button>

                              <button
                                onClick={() => {
                                  setDeleteAppointment(appointment);
                                  setOpenActionId(null);
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                              >
                                <FiTrash2 size={15} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {paginatedAppointments.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center">
                        <FiSearch
                          className="mx-auto mb-3 text-gray-300"
                          size={28}
                        />
                        <p className="text-sm font-semibold text-gray-700">
                          No appointments found
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col justify-between gap-3 border-t border-gray-100 px-4 py-4 sm:flex-row sm:items-center">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {filteredAppointments.length === 0
                    ? 0
                    : (currentPage - 1) * pageSize + 1}
                  –
                  {Math.min(
                    currentPage * pageSize,
                    filteredAppointments.length,
                  )}
                </span>{" "}
                of {filteredAppointments.length} appointments
              </p>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <FiChevronLeft size={15} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition ${
                      currentPage === page
                        ? "bg-[#765719] text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <FiChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold">
              {viewMode === "Calendar"
                ? "Appointments Calendar"
                : "Appointments Timeline"}
            </h2>

            <div className="space-y-3">
              {filteredAppointments.map((appointment) => (
                <button
                  key={appointment.id}
                  onClick={() => setSelectedAppointment(appointment)}
                  className="flex w-full flex-col gap-3 rounded-xl border border-gray-100 p-4 text-left transition hover:border-[#d6c49b] hover:bg-[#fcfbf8] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1eadb] text-xs font-bold text-[#765719]">
                      {appointment.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {appointment.customer}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {appointment.service} · {appointment.stylist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div>
                      <p className="text-xs font-semibold">
                        {appointment.date}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {appointment.time}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        statusStyles[appointment.status]
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </button>
              ))}

              {filteredAppointments.length === 0 && (
                <p className="py-10 text-center text-sm text-gray-500">
                  No appointments found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          statusStyle={statusStyles[selectedAppointment.status]}
          onClose={closeModals}
          onUpdateStatus={updateStatus}
        />
      )}
      {/* DELETE CONFIRMATION MODAL */}
      {deleteAppointment && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          onClick={() => setDeleteAppointment(null)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <FiAlertTriangle size={23} />
            </div>

            <h2
              id="delete-modal-title"
              className="text-lg font-bold text-gray-900"
            >
              Delete appointment?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete booking{" "}
              <span className="font-semibold text-gray-800">
                #{deleteAppointment.id}
              </span>{" "}
              for{" "}
              <span className="font-semibold text-gray-800">
                {deleteAppointment.customer}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDeleteAppointment(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                <FiTrash2 size={15} />
                Delete Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
