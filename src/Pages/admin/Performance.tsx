import React from "react";
import { FiBarChart2, FiTrendingUp, FiActivity } from "react-icons/fi";

const Performance: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <header className="rounded-2xl border border-[#e9e5de] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a7947]">
          Pheeky Hairplace
        </p>
        <h1 className="mt-2 font-serif text-4xl text-[#1f1a17]">Performance</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Revenue", value: "₦7.85M", icon: FiTrendingUp },
          { label: "Conversion", value: "6.8%", icon: FiBarChart2 },
          { label: "Engagement", value: "92%", icon: FiActivity },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#e9e5de] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9a938a]">
                {label}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6f2eb] text-[#9a7947]">
                <Icon size={16} />
              </div>
            </div>
            <p className="mt-5 text-2xl font-bold text-[#1f1a17]">{value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-[#e9e5de] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <h2 className="text-sm font-semibold text-[#231f1d]">
            Monthly performance
          </h2>
          <div className="mt-6 flex h-52 items-end gap-3">
            {[35, 52, 78, 66, 90, 110, 96].map((height, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[8px] text-[#9a938a]">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][index]}
                </span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-[#a77b27] to-[#d8b96f]"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e9e5de] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <h2 className="text-sm font-semibold text-[#231f1d]">Highlights</h2>
          <div className="mt-4 space-y-3">
            {[
              { label: "Sales growth", value: "+18.4%" },
              { label: "Repeat bookings", value: "72%" },
              { label: "Avg. order size", value: "₦42,800" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl bg-[#faf7f3] px-3 py-2.5"
              >
                <span className="text-[10px] text-[#625d59]">{item.label}</span>
                <span className="text-[10px] font-semibold text-[#2b2724]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;
