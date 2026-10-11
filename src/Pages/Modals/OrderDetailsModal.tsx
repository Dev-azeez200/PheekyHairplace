import React from "react";
import { FiCheck, FiShoppingBag, FiUser, FiX } from "react-icons/fi";

export type OrderStatus =
  | "Pending Approval"
  | "Awaiting Crafting"
  | "Ready for Pickup"
  | "Shipped"
  | "Delivered";

export type Order = {
  id: string;
  date: string;
  customer: string;
  initials: string;
  email: string;
  product: string;
  details: string;
  amount: number;
  payment: string;
  status: OrderStatus;
  category: string;
};

type OrderDetailsModalProps = {
  order: Order;
  statusStyle: string;
  onClose: () => void;
  onUpdateStatus: (status: OrderStatus) => void;
  onDone: () => void;
};

const orderStatuses: OrderStatus[] = [
  "Pending Approval",
  "Awaiting Crafting",
  "Ready for Pickup",
  "Shipped",
  "Delivered",
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  statusStyle,
  onClose,
  onUpdateStatus,
  onDone,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]"
    onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-details-title"
      className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
    >
      <div className="flex items-start justify-between border-b border-[#efede7] p-5">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#a58a52]">
            Order Details
          </p>
          <h2 id="order-details-title" className="mt-1 text-xl font-bold">
            {order.id}
          </h2>
          <p className="mt-1 text-xs text-[#918d83]">Placed on {order.date}</p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close order details"
          className="rounded-lg border border-[#ece9e2] p-2 text-[#77736a] hover:bg-[#f8f7f4]"
        >
          <FiX />
        </button>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-center gap-3 rounded-xl bg-[#fbfaf7] p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1e5cc] font-bold text-[#98763a]">
            {order.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{order.customer}</p>
            <p className="mt-1 break-all text-xs text-[#8c887e]">
              {order.email}
            </p>
          </div>
          <FiUser className="text-lg text-[#a58a52]" />
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#918d83]">
            Product information
          </h3>
          <div className="rounded-xl border border-[#efede7] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f7f0e2]">
                <FiShoppingBag className="text-lg text-[#a58a52]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{order.product}</p>
                <p className="mt-1 text-xs leading-5 text-[#8c887e]">
                  {order.details}
                </p>
                <p className="mt-2 text-[10px] text-[#8c887e]">
                  Category: {order.category}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#e9e5dc] pt-4">
              <span className="text-xs text-[#8c887e]">Order total</span>
              <span className="text-lg font-bold">
                {formatCurrency(order.amount)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[#efede7] p-3">
            <p className="mb-2 text-[10px] text-[#918d83]">Payment method</p>
            <p className="text-xs font-semibold">{order.payment}</p>
          </div>

          <div className="rounded-xl border border-[#efede7] p-3">
            <p className="mb-2 text-[10px] text-[#918d83]">
              Fulfillment status
            </p>
            <span
              className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[9px] font-semibold ${statusStyle}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="order-status"
            className="mb-2 block text-xs font-semibold"
          >
            Update order status
          </label>
          <select
            id="order-status"
            value={order.status}
            onChange={(event) =>
              onUpdateStatus(event.target.value as OrderStatus)
            }
            className="w-full rounded-lg border border-[#e8e4db] bg-white px-3 py-3 text-xs outline-none focus:border-[#a58a52]"
          >
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-[#efede7] pt-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#e8e4db] px-4 py-2.5 text-xs font-semibold hover:bg-[#f8f7f4]"
          >
            Close
          </button>
          <button
            onClick={onDone}
            className="rounded-lg bg-[#211f1a] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#a58a52]"
          >
            <span className="inline-flex items-center gap-2">
              <FiCheck />
              Done
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default OrderDetailsModal;
