import React from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiRefreshCw,
  FiScissors,
  FiUser,
  FiX,
  FiXCircle,
} from "react-icons/fi";

export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Rejected";

export type Appointment = {
  id: string;
  customer: string;
  initials: string;
  phone: string;
  email: string;
  service: string;
  duration: string;
  stylist: string;
  stylistInitials: string;
  date: string;
  time: string;
  fee: number;
  status: AppointmentStatus;
  paymentMethod: string;
  paymentStatus: string;
  location: string;
  notes: string;
};

type AppointmentModalProps = {
  appointment: Appointment;
  statusStyle: string;
  onClose: () => void;
  onUpdateStatus: (appointment: Appointment, status: AppointmentStatus) => void;
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("NGN", "₦");

const DetailCard: React.FC<{
  label: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
}> = ({ label, value, description, icon }) => (
  <div className="min-w-0 rounded-lg border border-gray-100 bg-white p-3.5">
    <div className="mb-2 flex items-center gap-1.5 text-gray-400">
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
    <p className="break-words text-sm font-semibold text-gray-800">{value}</p>
    <p className="mt-1 break-words text-[11px] text-gray-500">{description}</p>
  </div>
);

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  statusStyle,
  onClose,
  onUpdateStatus,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-[2px] sm:p-6"
    onClick={onClose}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-[#f8f8f6] shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-start justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
            Active Reservation
          </p>
          <h2
            id="appointment-modal-title"
            className="font-serif text-xl font-bold text-gray-900 sm:text-2xl"
          >
            Booking #{appointment.id}
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Appointment details and booking management
          </p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close appointment details"
          className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <FiX size={18} />
        </button>
      </div>

      <div className="max-h-[75vh] space-y-5 overflow-y-auto p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eee5d3] text-lg font-bold text-[#765719]">
              {appointment.initials}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                {appointment.customer}
              </h3>
              <p className="mt-1 text-xs text-gray-500">VIP Gold Member</p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <FiPhone size={11} />
                  {appointment.phone}
                </span>
                <span className="flex items-center gap-1">
                  <FiMail size={11} />
                  {appointment.email}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold ring-1 ring-inset ${statusStyle}`}
          >
            {appointment.status === "Pending"
              ? "PENDING APPROVAL"
              : appointment.status.toUpperCase()}
          </span>
        </div>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <FiScissors size={15} className="text-[#765719]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Appointment Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailCard
              label="Service"
              value={appointment.service}
              description="Beauty & Hair Service"
            />
            <DetailCard
              label="Assigned Stylist"
              value={appointment.stylist}
              description="Professional Hair Stylist"
            />
            <DetailCard
              label="Scheduled Slot"
              value={appointment.date}
              description={appointment.time}
              icon={<FiCalendar size={14} />}
            />
            <DetailCard
              label="Hair / Wig Source"
              value="Client Wig"
              description="Client-provided hair"
              icon={<FiUser size={14} />}
            />
            <DetailCard
              label="Duration"
              value={appointment.duration}
              description="Estimated service time"
              icon={<FiClock size={14} />}
            />
            <DetailCard
              label="Location"
              value={appointment.location}
              description="Appointment venue"
              icon={<FiMapPin size={14} />}
            />
          </div>
        </section>

        <section className="rounded-xl border border-[#f0dfbb] bg-[#fff7e8] p-4">
          <div className="mb-2 flex items-center gap-2">
            <FiMessageSquare className="text-[#94702a]" size={15} />
            <h3 className="text-xs font-bold text-gray-800">
              Special Client Notes
            </h3>
          </div>
          <p className="text-xs leading-5 text-gray-600">{appointment.notes}</p>
        </section>

        <section className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="mb-4 flex items-center gap-2">
            <FiCreditCard size={15} className="text-[#765719]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Fee & Payment Information
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4 text-xs">
              <span className="text-gray-500">Service Fee</span>
              <span className="text-right font-semibold text-gray-800">
                {formatMoney(appointment.fee)}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 text-xs">
              <span className="text-gray-500">Payment Method</span>
              <span className="max-w-[65%] text-right font-medium text-gray-700">
                {appointment.paymentMethod}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-gray-500">Payment Status</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  appointment.paymentStatus === "Paid"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {appointment.paymentStatus}
              </span>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-gray-800">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-[#a17a27]">
                  {formatMoney(appointment.fee)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
            Booking Actions
          </h3>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              disabled={
                appointment.status === "Confirmed" ||
                appointment.status === "Completed" ||
                appointment.status === "Cancelled" ||
                appointment.status === "Rejected"
              }
              onClick={() => onUpdateStatus(appointment, "Confirmed")}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#765719] px-3 py-3 text-xs font-semibold text-white transition hover:bg-[#5f4614] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiCheckCircle size={15} />
              Accept Booking
            </button>

            <button
              disabled={
                appointment.status === "Completed" ||
                appointment.status === "Cancelled" ||
                appointment.status === "Rejected"
              }
              onClick={() => onUpdateStatus(appointment, "Rejected")}
              className="flex items-center justify-center gap-2 rounded-lg bg-rose-100 px-3 py-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiXCircle size={15} />
              Reject Booking
            </button>

            <button
              disabled={appointment.status !== "Confirmed"}
              onClick={() => onUpdateStatus(appointment, "Pending")}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiRefreshCw size={14} />
              Reschedule
            </button>

            <button
              disabled={appointment.status !== "Confirmed"}
              onClick={() => onUpdateStatus(appointment, "Completed")}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-3 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiCheckCircle size={14} />
              Mark Completed
            </button>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-white px-5 py-3 sm:px-6">
        <p className="text-[10px] text-gray-400">
          Booking ID: {appointment.id}
        </p>
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default AppointmentModal;
