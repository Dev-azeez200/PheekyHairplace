import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiPackage, FiPlus, FiTrendingUp, FiX } from "react-icons/fi";

export interface StockAdjustmentWig {
  id: number;
  name: string;
  stock: number;
}

interface StockAdjustmentModalProps {
  isOpen: boolean;
  wigs: StockAdjustmentWig[];
  selectedWig: StockAdjustmentWig | null;
  onClose: () => void;
  onSave: (id: number, quantity: number) => void;
}

const inputClassName =
  "w-full rounded-xl border border-[#e7e1d5] bg-[#fcfbf8] px-3.5 py-3 text-sm text-[#39362e] outline-none transition placeholder:text-[#aaa69d] focus:border-[#9b8046] focus:bg-white focus:ring-2 focus:ring-[#9b8046]/15";

const labelClassName =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7c756a]";

const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({
  isOpen,
  wigs,
  selectedWig,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const initialWigId =
    selectedWig?.id.toString() || wigs[0]?.id.toString() || "";

  const [wigId, setWigId] = useState(initialWigId);
  const [quantity, setQuantity] = useState(
    String(selectedWig?.stock ?? wigs[0]?.stock ?? 0),
  );
  const [reason, setReason] = useState("Stock received");

  useEffect(() => {
    const nextId = selectedWig?.id.toString() || wigs[0]?.id.toString() || "";
    setWigId(nextId);
    const activeWig = wigs.find((wig) => wig.id.toString() === nextId);
    setQuantity(String(activeWig?.stock ?? 0));
  }, [selectedWig, wigs]);

  const currentWig = wigs.find((wig) => wig.id.toString() === wigId);

  const handleWigChange = (nextWigId: string) => {
    setWigId(nextWigId);
    const nextWig = wigs.find((wig) => wig.id.toString() === nextWigId);
    setQuantity(String(nextWig?.stock ?? 0));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!wigId || quantity === "" || Number(quantity) < 0) return;
    onSave(Number(wigId), Number(quantity));
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1d1a17]/45 p-3 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="stock-adjustment-title"
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#ece7dc] bg-[#fffdf9] shadow-[0_20px_60px_rgba(31,25,20,0.18)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[#eee9df] bg-[#fdfaf4] px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f2ebdc] text-[#7d6023]">
              <FiTrendingUp size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a28746]">
                Inventory control
              </p>
              <h2
                id="stock-adjustment-title"
                className="mt-1 font-serif text-xl font-bold text-[#2f2a24] sm:text-2xl"
              >
                Stock Adjustment
              </h2>
              <p className="mt-1 text-xs text-[#8e8a82]">
                Update the quantity of an existing wig.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close stock adjustment modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#8b857d] transition hover:bg-[#f3efe8] hover:text-[#2f2a24]"
          >
            <FiX size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div className="rounded-2xl border border-[#efe7d9] bg-[#faf8f4] p-4">
            <div className="flex items-center gap-2 text-[#816326]">
              <FiPackage size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
                Selected wig
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#eee7da] bg-white p-3">
              <div>
                <p className="text-sm font-bold text-[#332f2a]">
                  {currentWig?.name || "Choose a wig"}
                </p>
                <p className="mt-1 text-[11px] text-[#8f8a82]">
                  Current stock: {currentWig?.stock ?? 0} units
                </p>
              </div>
              <span className="inline-flex rounded-full bg-[#edf3eb] px-2.5 py-1 text-[10px] font-semibold text-[#697c62]">
                {currentWig ? "Active" : "No wig selected"}
              </span>
            </div>
          </div>

          <div>
            <label className={labelClassName}>Select wig</label>
            <select
              value={wigId}
              onChange={(event) => handleWigChange(event.target.value)}
              className={inputClassName}
              required
            >
              {wigs.map((wig) => (
                <option key={wig.id} value={wig.id}>
                  {wig.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClassName}>New stock quantity</label>
              <input
                type="number"
                min="0"
                required
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Adjustment reason</label>
              <select
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className={inputClassName}
              >
                <option>Stock received</option>
                <option>Damaged product</option>
                <option>Manual stock correction</option>
                <option>Returned item</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-[#efebdf] bg-[#fffdf8] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8c867d]">
              Summary
            </p>
            <p className="mt-2 text-sm leading-6 text-[#534f49]">
              Reason:{" "}
              <span className="font-semibold text-[#2d2923]">{reason}</span>.
              Saving will set the wig stock to{" "}
              <span className="font-semibold text-[#2d2923]">
                {quantity || 0}
              </span>{" "}
              units.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#e5dfd3] bg-white px-4 py-2.5 text-sm font-semibold text-[#665f56] transition hover:bg-[#f7f4ee]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!currentWig || quantity === "" || Number(quantity) < 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#76591d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#604714] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiPlus size={15} />
              Save Adjustment
            </button>
          </div>
        </form>
      </section>
    </div>,
    document.body,
  );
};

export default StockAdjustmentModal;
