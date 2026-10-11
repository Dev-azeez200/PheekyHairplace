import React from "react";
import { createPortal } from "react-dom";
import { FiPackage, FiPlus, FiX } from "react-icons/fi";

export interface WigFormValues {
  name: string;
  sku: string;
  origin: string;
  density: string;
  length: string;
  texture: string;
  price: string;
  image: string;
  stock: string;
}

interface AddWigModalProps {
  isOpen: boolean;
  values: WigFormValues;
  onChange: (field: keyof WigFormValues, value: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const inputClassName =
  "w-full rounded-lg border border-[#e8e4da] bg-[#fcfbf8] px-3.5 py-3 text-sm text-[#39362e] outline-none transition placeholder:text-[#aaa69d] focus:border-[#9b8046] focus:bg-white focus:ring-2 focus:ring-[#9b8046]/15";

const labelClassName = "mb-2 block text-xs font-semibold text-[#5b574e]";

const AddWigModal: React.FC<AddWigModalProps> = ({
  isOpen,
  values,
  onChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const field = (name: keyof WigFormValues) => ({
    value: values[name],
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => onChange(name, event.target.value),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange("image", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-[#211f1a]/55 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-5 sm:py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-wig-title"
        className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#e9e4d9] bg-[#fffefa] shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#eeeae1] px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f2eddf] text-[#76591d]">
              <FiPackage size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9b8046]">
                Inventory catalog
              </p>
              <h2
                id="add-wig-title"
                className="mt-1 font-serif text-xl font-bold text-[#302b20] sm:text-2xl"
              >
                Add a new wig
              </h2>
              <p className="mt-1 text-xs text-[#89857b] sm:text-sm">
                Enter the product details and starting stock quantity.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close add wig modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#89857b] transition hover:bg-[#f3f0e9] hover:text-[#302b20]"
          >
            <FiX size={19} />
          </button>
        </header>

        <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <section>
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8d7950]">
                Product identity
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className={labelClassName}>
                    Wig name <span className="text-[#a35c4f">*</span>
                  </span>
                  <input
                    {...field("name")}
                    required
                    autoFocus
                    placeholder="e.g. Bone Straight 20-inch HD Frontal"
                    className={inputClassName}
                  />
                </label>
                <label>
                  <span className={labelClassName}>
                    SKU{" "}
                    <span className="font-normal text-[#989388]">
                      (optional)
                    </span>
                  </span>
                  <input
                    {...field("sku")}
                    placeholder="WIG-2025-007"
                    className={inputClassName}
                  />
                </label>
                <label>
                  <span className={labelClassName}>Hair texture</span>
                  <select {...field("texture")} className={inputClassName}>
                    <option>Bone Straight</option>
                    <option>Body Wave</option>
                    <option>Water Wave</option>
                    <option>Deep Wave</option>
                    <option>Silky Straight</option>
                    <option>Kinky Curly</option>
                  </select>
                </label>

                <label className="sm:col-span-2">
                  <span className={labelClassName}>
                    Wig image <span className="text-[#a35c4f">*</span>
                  </span>
                  <input
                    required
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    className="block w-full cursor-pointer rounded-lg border border-[#e8e4da] bg-[#fcfbf8] px-3 py-2.5 text-sm text-[#39362e] file:mr-3 file:rounded-md file:border-0 file:bg-[#f2eddf] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#76591d] hover:file:bg-[#eadfc0]"
                  />
                </label>
              </div>

              {values.image && (
                <div className="mt-4 rounded-xl border border-[#efe9dc] bg-[#faf7f0] p-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8d7950]">
                    Preview
                  </p>
                  <div className="overflow-hidden rounded-lg border border-[#e9e0d0] bg-white">
                    <img
                      src={values.image}
                      alt={values.name || "Wig preview"}
                      className="h-36 w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </section>

            <section className="border-t border-[#eeeae1] pt-5">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8d7950]">
                Wig specifications
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <label>
                  <span className={labelClassName}>Hair origin</span>
                  <select {...field("origin")} className={inputClassName}>
                    <option>Brazilian Human Hair</option>
                    <option>100% Human Hair</option>
                    <option>Premium Virgin Hair</option>
                    <option>Mongolian Virgin Hair</option>
                  </select>
                </label>
                <label>
                  <span className={labelClassName}>Length</span>
                  <select {...field("length")} className={inputClassName}>
                    {[14, 16, 18, 20, 22, 24, 26, 28, 30].map((length) => (
                      <option key={length}>{length} Inches</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className={labelClassName}>Density</span>
                  <select {...field("density")} className={inputClassName}>
                    <option>130% Density</option>
                    <option>150% Density</option>
                    <option>180% Density</option>
                    <option>200% Density</option>
                    <option>250% Density</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="border-t border-[#eeeae1] pt-5">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8d7950]">
                Pricing & stock
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelClassName}>
                    Price (₦) <span className="text-[#a35c4f">*</span>
                  </span>
                  <input
                    {...field("price")}
                    required
                    type="number"
                    min="1"
                    inputMode="numeric"
                    placeholder="450000"
                    className={inputClassName}
                  />
                </label>
                <label>
                  <span className={labelClassName}>
                    Initial stock quantity{" "}
                    <span className="text-[#a35c4f">*</span>
                  </span>
                  <input
                    {...field("stock")}
                    required
                    type="number"
                    min="0"
                    inputMode="numeric"
                    className={inputClassName}
                  />
                </label>
              </div>
            </section>
          </div>

          <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-[#eeeae1] bg-[#fffefa] px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#e5e0d5] px-4 py-2.5 text-sm font-semibold text-[#6c675d] transition hover:bg-[#f7f5ef]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#76591d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#604714] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76591d]"
            >
              <FiPlus size={16} />
              Add Wig
            </button>
          </footer>
        </form>
      </section>
    </div>,
    document.body,
  );
};

export default AddWigModal;
