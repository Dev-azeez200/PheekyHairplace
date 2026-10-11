import React from "react";
import { FiDownload, FiPlus, FiX } from "react-icons/fi";

export type PaymentTransaction = {
  id: string;
  timestamp: string;
  customer: string;
  initials: string;
  service: string;
  reference: string;
  amount: number;
  channel: string;
  status: "Completed" | "Pending" | "Failed";
};

type TransactionDetailsModalProps = {
  transaction: PaymentTransaction;
  statusStyle: string;
  onClose: () => void;
};

type LogTransactionModalProps = {
  onClose: () => void;
  onSubmit: () => void;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  transaction,
  statusStyle,
  onClose,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
    onClick={onClose}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-modal-title"
      className="w-full max-w-lg rounded-2xl border border-[#ece9e1] bg-white shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-[#eeeae2] p-5">
        <div>
          <h3 id="transaction-modal-title" className="text-lg font-bold">
            Transaction Details
          </h3>
          <p className="mt-1 text-xs text-[#96948c]">
            Reference: {transaction.id}
          </p>
        </div>
        <button
          type="button"
          aria-label="Close transaction details"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eeeae2] text-lg hover:bg-[#f7f6f3]"
        >
          <FiX />
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="rounded-xl bg-[#faf6eb] p-5 text-center">
          <p className="text-xs text-[#89877e]">Transaction Amount</p>
          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(transaction.amount)}
          </p>
          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
          >
            {transaction.status}
          </span>
        </div>

        {[
          ["Customer", transaction.customer],
          ["Transaction ID", transaction.id],
          ["Service", transaction.service],
          ["Description", transaction.reference],
          ["Payment Channel", transaction.channel],
          ["Date & Time", transaction.timestamp],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col justify-between gap-1 border-b border-[#f0eee8] pb-3 text-sm sm:flex-row"
          >
            <span className="text-[#96948c]">{label}</span>
            <span className="font-medium sm:text-right">{value}</span>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            const details = [
              "TRANSACTION RECEIPT",
              `Transaction: ${transaction.id}`,
              `Customer: ${transaction.customer}`,
              `Service: ${transaction.service}`,
              `Amount: ${formatCurrency(transaction.amount)}`,
              `Channel: ${transaction.channel}`,
              `Status: ${transaction.status}`,
              `Date: ${transaction.timestamp}`,
            ].join("\n");

            const blob = new Blob([details], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${transaction.id}-receipt.txt`;
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#80611c] py-3 text-sm font-semibold text-white transition hover:bg-[#654b12]"
        >
          <FiDownload size={16} />
          Download Transaction Receipt
        </button>
      </div>
    </div>
  </div>
);

export const LogTransactionModal: React.FC<LogTransactionModalProps> = ({
  onClose,
  onSubmit,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
    onClick={onClose}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="log-transaction-title"
      className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-[#eeeae2] p-5">
        <div>
          <h3 id="log-transaction-title" className="text-lg font-bold">
            Log Transaction
          </h3>
          <p className="mt-1 text-xs text-[#96948c]">
            Record a cash, terminal, or bank transaction.
          </p>
        </div>
        <button
          type="button"
          aria-label="Close log transaction"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eeeae2] text-lg hover:bg-[#f7f6f3]"
        >
          <FiX />
        </button>
      </div>

      <form
        className="space-y-4 p-5"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label className="mb-1.5 block text-xs font-semibold">
            Customer Name
          </label>
          <input
            required
            name="customer"
            placeholder="Enter customer name"
            className="h-11 w-full rounded-lg border border-[#e9e5dc] px-3 text-sm outline-none focus:border-[#b99a50] focus:ring-2 focus:ring-[#b99a50]/10"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold">
              Amount (₦)
            </label>
            <input
              required
              name="amount"
              type="number"
              min="1"
              placeholder="50000"
              className="h-11 w-full rounded-lg border border-[#e9e5dc] px-3 text-sm outline-none focus:border-[#b99a50] focus:ring-2 focus:ring-[#b99a50]/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold">
              Transaction Type
            </label>
            <select
              required
              name="type"
              defaultValue=""
              className="h-11 w-full rounded-lg border border-[#e9e5dc] bg-white px-3 text-sm outline-none focus:border-[#b99a50]"
            >
              <option value="" disabled>
                Select type
              </option>
              <option>Salon Services</option>
              <option>Wig Sale</option>
              <option>Booking Escrow</option>
              <option>Refund</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold">
            Payment Channel
          </label>
          <select
            required
            name="channel"
            defaultValue=""
            className="h-11 w-full rounded-lg border border-[#e9e5dc] bg-white px-3 text-sm outline-none focus:border-[#b99a50]"
          >
            <option value="" disabled>
              Select payment channel
            </option>
            <option>Cash</option>
            <option>POS / Terminal</option>
            <option>Bank Transfer</option>
            <option>Paystack Auth</option>
            <option>Mastercard</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold">
            Description / Reference
          </label>
          <input
            name="reference"
            placeholder="Enter transaction description"
            className="h-11 w-full rounded-lg border border-[#e9e5dc] px-3 text-sm outline-none focus:border-[#b99a50] focus:ring-2 focus:ring-[#b99a50]/10"
          />
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#e9e5dc] px-5 py-3 text-sm font-medium hover:bg-[#f7f6f3]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#80611c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#654b12]"
          >
            <FiPlus size={16} />
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  </div>
);
