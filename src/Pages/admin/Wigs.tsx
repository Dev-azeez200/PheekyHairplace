import React, { useMemo, useState } from "react";
import AddWigModal, { type WigFormValues } from "../Modals/AddWigModal";
import StockAdjustmentModal from "../Modals/StockAdjustmentModal";
import {
  FiSearch,
  FiDownload,
  FiPlus,
  FiPackage,
  FiAlertTriangle,
  FiShoppingCart,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiSliders,
  FiMoreHorizontal,
  FiEdit2,
  FiEye,
  FiTrash2,
  FiX,
  FiCheck,
} from "react-icons/fi";

type Wig = {
  id: number;
  name: string;
  sku: string;
  origin: string;
  density: string;
  length: string;
  texture: string;
  price: number;
  stock: number;
  performance: string;
  status: "Active" | "Out of Stock";
  image: string;
};

const initialWigs: Wig[] = [
  {
    id: 1,
    name: "Bone Straight 20” HD Frontal",
    sku: "SKU: WIG-2025-001",
    origin: "100% Human Hair",
    density: "180% Density",
    length: "20 Inches",
    texture: "Bone Straight",
    price: 450000,
    stock: 3,
    performance: "84 sold",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80",
  },
  {
    id: 2,
    name: "Body Wave 18” Swiss Lace",
    sku: "SKU: WIG-2025-002",
    origin: "Brazilian Human Hair",
    density: "180% Density",
    length: "18 Inches",
    texture: "Body Wave",
    price: 380000,
    stock: 8,
    performance: "62 sold",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
  },
  {
    id: 3,
    name: "Water Wave 22” Closure Unit",
    sku: "SKU: WIG-2025-003",
    origin: "Brazilian Human Hair",
    density: "200% Density",
    length: "22 Inches",
    texture: "Water Wave",
    price: 420000,
    stock: 14,
    performance: "48 sold",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
  },
  {
    id: 4,
    name: "Deep Wave 20” HD Closure Wig",
    sku: "SKU: WIG-2025-004",
    origin: "Premium Virgin Hair",
    density: "180% Density",
    length: "20 Inches",
    texture: "Deep Wave",
    price: 395000,
    stock: 3,
    performance: "41 sold",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100&q=80",
  },
  {
    id: 5,
    name: "Silky Straight 18” Unit",
    sku: "SKU: WIG-2025-005",
    origin: "100% Human Hair",
    density: "150% Density",
    length: "18 Inches",
    texture: "Silky Straight",
    price: 220000,
    stock: 18,
    performance: "28 sold",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=100&q=80",
  },
  {
    id: 6,
    name: "Kinky Curly 24” Full Lace Wig",
    sku: "SKU: WIG-2025-006",
    origin: "Mongolian Virgin Hair",
    density: "180% Density",
    length: "24 Inches",
    texture: "Kinky Curly",
    price: 520000,
    stock: 0,
    performance: "17 sold",
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=100&q=80",
  },
];

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const Wigs: React.FC = () => {
  const [wigs, setWigs] = useState(initialWigs);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Types");
  const [hairOrigin, setHairOrigin] = useState("All Origins");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [sortBy, setSortBy] = useState("Best Selling");
  const [activeTab, setActiveTab] = useState("All Inventory");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("10");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [selectedWig, setSelectedWig] = useState<Wig | null>(null);
  const [menuId, setMenuId] = useState<number | null>(null);

  const [newWig, setNewWig] = useState<WigFormValues>({
    name: "",
    sku: "",
    origin: "Brazilian Human Hair",
    density: "180% Density",
    length: "20 Inches",
    texture: "Bone Straight",
    price: "",
    image: "",
    stock: "0",
  });

  const filteredWigs = useMemo(() => {
    let result = [...wigs];

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (wig) =>
          wig.name.toLowerCase().includes(term) ||
          wig.sku.toLowerCase().includes(term) ||
          wig.texture.toLowerCase().includes(term),
      );
    }

    if (category !== "All Types") {
      result = result.filter((wig) => wig.texture === category);
    }

    if (hairOrigin !== "All Origins") {
      result = result.filter((wig) => wig.origin === hairOrigin);
    }

    if (stockFilter === "In Stock") {
      result = result.filter((wig) => wig.stock > 0);
    } else if (stockFilter === "Low Stock") {
      result = result.filter((wig) => wig.stock > 0 && wig.stock <= 5);
    } else if (stockFilter === "Out of Stock") {
      result = result.filter((wig) => wig.stock === 0);
    }

    if (activeTab === "Low Stock") {
      result = result.filter((wig) => wig.stock > 0 && wig.stock <= 5);
    } else if (activeTab === "Out of Stock") {
      result = result.filter((wig) => wig.stock === 0);
    } else if (activeTab === "Active Inventory") {
      result = result.filter((wig) => wig.status === "Active");
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Stock: Low to High") {
      result.sort((a, b) => a.stock - b.stock);
    } else {
      result.sort((a, b) => parseInt(b.performance) - parseInt(a.performance));
    }

    return result;
  }, [wigs, search, category, hairOrigin, stockFilter, sortBy, activeTab]);

  const totalUnits = wigs.reduce((sum, wig) => sum + wig.stock, 0);
  const lowStockCount = wigs.filter((wig) => wig.stock > 0 && wig.stock <= 5)
    .length;
  const outOfStockCount = wigs.filter((wig) => wig.stock === 0).length;
  const inventoryValue = wigs.reduce(
    (sum, wig) => sum + wig.price * wig.stock,
    0,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWigs.length / Number(pageSize)),
  );

  const visibleWigs = filteredWigs.slice(
    (page - 1) * Number(pageSize),
    page * Number(pageSize),
  );

  const resetPage = () => setPage(1);

  const handleAddWig = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const stock = Number(newWig.stock);
    const wig: Wig = {
      id: Date.now(),
      name: newWig.name,
      sku: newWig.sku || `SKU-WIG-${Date.now()}`,
      origin: newWig.origin,
      density: newWig.density,
      length: newWig.length,
      texture: newWig.texture,
      price: Number(newWig.price),
      stock,
      performance: "0 sold",
      status: stock === 0 ? "Out of Stock" : "Active",
      image: newWig.image ||
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    };

    setWigs((previous) => [wig, ...previous]);
    setNewWig({
      name: "",
      sku: "",
      origin: "Brazilian Human Hair",
      density: "180% Density",
      length: "20 Inches",
      texture: "Bone Straight",
      price: "",
      image: "",
      stock: "0",
    });
    setShowAddModal(false);
    setPage(1);
  };

  const updateNewWig = (field: keyof WigFormValues, value: string) => {
    setNewWig((previous) => ({ ...previous, [field]: value }));
  };

  const exportInventory = () => {
    const headers = [
      "Name",
      "SKU",
      "Origin",
      "Density",
      "Length",
      "Texture",
      "Price",
      "Stock",
      "Status",
    ];

    const rows = wigs.map((wig) => [
      wig.name,
      wig.sku,
      wig.origin,
      wig.density,
      wig.length,
      wig.texture,
      wig.price,
      wig.stock,
      wig.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "wigs-inventory.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteWig = (id: number) => {
    if (window.confirm("Are you sure you want to delete this wig?")) {
      setWigs((previous) => previous.filter((wig) => wig.id !== id));
      setMenuId(null);
      setSelectedWig(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6] px-3 py-5 text-[#282721] sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-5">
        {/* Header */}
        <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#302b20] sm:text-3xl">
              Wigs & Hairpieces Inventory
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-[#89877f]">
              Manage your wig stock, keep track of inventory levels, and
              maintain product availability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportInventory}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#e8e4da] bg-white px-3 py-2.5 text-xs font-semibold text-[#59564d] transition hover:bg-[#f8f5ed] sm:text-sm"
            >
              <FiDownload size={15} />
              Export Inventory
            </button>

            <button
              onClick={() => setShowAdjustment(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#e8e4da] bg-white px-3 py-2.5 text-xs font-semibold text-[#59564d] transition hover:bg-[#f8f5ed] sm:text-sm"
            >
              <FiSliders size={15} />
              Stock Adjustment
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#76591d] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#604714] sm:text-sm"
            >
              <FiPlus size={16} />
              Add New Wig
            </button>
          </div>
        </header>

        {/* Inventory overview */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="TOTAL STOCK UNITS"
            value={totalUnits.toString()}
            icon={<FiPackage />}
            iconClass="bg-[#f4f1e9] text-[#816326]"
            footer="Across all wig styles"
          >
            <div className="mt-3 flex items-center justify-between border-t border-[#f0ede6] pt-3">
              <span className="text-xs text-[#858176]">Inventory Value</span>
              <span className="text-xs font-bold text-[#38352d]">
                {formatNaira(inventoryValue)}
              </span>
            </div>
          </StatCard>

          <StatCard
            label="CRITICAL RESTOCK"
            value={lowStockCount.toString()}
            icon={<FiAlertTriangle />}
            iconClass="bg-[#fff0d7] text-[#b57a20]"
            footer="Wigs with 5 units or fewer"
          >
            <span className="mt-3 inline-flex rounded-full bg-[#fff0d7] px-2.5 py-1 text-[10px] font-semibold text-[#a66b12]">
              Action required
            </span>
          </StatCard>

          <StatCard
            label="OUT OF STOCK"
            value={outOfStockCount.toString()}
            icon={<FiShoppingCart />}
            iconClass="bg-[#ffe9e7] text-[#ce5e54]"
            footer="Products needing replenishment"
          >
            <span className="mt-3 inline-flex rounded-full bg-[#ffe9e7] px-2.5 py-1 text-[10px] font-semibold text-[#c24f45]">
              Restock needed
            </span>
          </StatCard>

          <StatCard
            label="BEST SELLER (30 DAYS)"
            value="Bone Straight 20”"
            icon={<FiCheck />}
            iconClass="bg-[#e8f1e6] text-[#63865b]"
            footer="Top performing wig"
          >
            <div className="mt-3 flex items-center justify-between border-t border-[#f0ede6] pt-3">
              <span className="text-xs text-[#858176]">Revenue generated</span>
              <span className="text-xs font-bold text-[#38352d]">₦3.87M</span>
            </div>
          </StatCard>
        </section>

        {/* Search and filters */}
        <section className="rounded-xl border border-[#ece9e1] bg-white p-3 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a29e94]" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                placeholder="Search by wig name, SKU, texture, length, density..."
                className="w-full rounded-lg border border-[#e9e6df] bg-[#fdfdfc] py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-[#aaa69d] focus:border-[#a18a56] focus:ring-2 focus:ring-[#a18a56]/10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["All Inventory", "Bone Straight", "Body Wave", "Low Stock"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(
                        ["Bone Straight", "Body Wave"].includes(tab)
                          ? "All Inventory"
                          : tab,
                      );
                      if (["Bone Straight", "Body Wave"].includes(tab)) {
                        setCategory(tab);
                      } else {
                        setCategory("All Types");
                      }
                      resetPage();
                    }}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      activeTab === tab ||
                      (category === tab &&
                        ["Bone Straight", "Body Wave"].includes(tab))
                        ? "bg-[#f3eddf] text-[#795b20]"
                        : "text-[#77736a] hover:bg-[#f7f5f0]"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}

              <button
                onClick={() => {
                  setActiveTab("All Inventory");
                  setCategory("All Types");
                  setHairOrigin("All Origins");
                  setStockFilter("All Stock");
                  setSearch("");
                  resetPage();
                }}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-[#77736a] hover:bg-[#f7f5f0]"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#f0eee8] pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              label="Category"
              value={category}
              onChange={(value) => {
                setCategory(value);
                setActiveTab("All Inventory");
                resetPage();
              }}
              options={[
                "All Types",
                "Bone Straight",
                "Body Wave",
                "Water Wave",
                "Deep Wave",
                "Silky Straight",
                "Kinky Curly",
              ]}
            />

            <FilterSelect
              label="Hair Origin / Grade"
              value={hairOrigin}
              onChange={(value) => {
                setHairOrigin(value);
                resetPage();
              }}
              options={[
                "All Origins",
                "100% Human Hair",
                "Brazilian Human Hair",
                "Premium Virgin Hair",
                "Mongolian Virgin Hair",
              ]}
            />

            <FilterSelect
              label="Stock Availability"
              value={stockFilter}
              onChange={(value) => {
                setStockFilter(value);
                resetPage();
              }}
              options={["All Stock", "In Stock", "Low Stock", "Out of Stock"]}
            />

            <FilterSelect
              label="Sort Order"
              value={sortBy}
              onChange={setSortBy}
              options={[
                "Best Selling",
                "Price: Low to High",
                "Price: High to Low",
                "Stock: Low to High",
              ]}
            />
          </div>
        </section>

        {/* Inventory table */}
        <section className="overflow-hidden rounded-xl border border-[#ece9e1] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#eeece6] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#302b20]">
                Active Catalog Archive
              </h2>
              <p className="mt-1 text-xs text-[#969187]">
                Manage your products, pricing and stock levels.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#f6f3eb] px-2.5 py-1.5 text-xs font-semibold text-[#816326]">
                {filteredWigs.length} products
              </span>
              <button
                onClick={() => setShowAdjustment(true)}
                title="Filter and adjust inventory"
                className="rounded-lg border border-[#ebe8e0] p-2 text-[#858176] hover:bg-[#f8f6f1]"
              >
                <FiFilter size={15} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-262.5 border-collapse text-left">
              <thead>
                <tr className="bg-[#faf9f6] text-[10px] font-bold uppercase tracking-wide text-[#89857b]">
                  <th className="px-4 py-3 font-semibold">
                    Wig / Specifications
                  </th>
                  <th className="px-3 py-3 font-semibold">Origin & Grade</th>
                  <th className="px-3 py-3 font-semibold">Length & Density</th>
                  <th className="px-3 py-3 font-semibold">Price & Margin</th>
                  <th className="px-3 py-3 font-semibold">Stock Level</th>
                  <th className="px-3 py-3 font-semibold">Performance</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f0eee8]">
                {visibleWigs.map((wig) => (
                  <tr
                    key={wig.id}
                    className="group transition hover:bg-[#fdfcf9]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={wig.image}
                          alt={wig.name}
                          className="h-11 w-10 shrink-0 rounded-md border border-[#ece8df] object-cover"
                        />
                        <div className="min-w-0">
                          <p className="max-w-55 text-xs font-bold leading-5 text-[#39362e]">
                            {wig.name}
                          </p>
                          <p className="mt-1 text-[10px] text-[#a09b91]">
                            {wig.sku}
                          </p>
                          <p className="mt-1 text-[10px] text-[#a09b91]">
                            {wig.texture}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <p className="max-w-31.25 text-xs font-medium leading-5 text-[#514e45]">
                        {wig.origin}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-xs font-medium text-[#514e45]">
                        {wig.length}
                      </p>
                      <p className="mt-1 text-[10px] text-[#999489]">
                        {wig.density}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-xs font-bold text-[#39362e]">
                        {formatNaira(wig.price)}
                      </p>
                      <p className="mt-1 text-[10px] text-[#999489]">
                        Retail price
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <div className="space-y-2">
                        <span
                          className={`inline-flex min-w-17.5 items-center justify-center rounded-full px-2 py-1 text-[10px] font-bold ${
                            wig.stock === 0
                              ? "bg-[#ffe8e5] text-[#c65349]"
                              : wig.stock <= 5
                              ? "bg-[#fff0d7] text-[#a66b12]"
                              : "bg-[#edf0ed] text-[#656d61]"
                          }`}
                        >
                          {wig.stock === 0
                            ? "0 in stock"
                            : `${wig.stock} units`}
                        </span>

                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#f0eee8]">
                          <div
                            className={`h-full rounded-full ${
                              wig.stock === 0
                                ? "bg-[#db776d]"
                                : wig.stock <= 5
                                ? "bg-[#d7a54f]"
                                : "bg-[#858b7a]"
                            }`}
                            style={{
                              width: `${Math.min(
                                (wig.stock / 20) * 100,
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-xs font-bold text-[#514e45]">
                        {wig.performance}
                      </p>
                      <p className="mt-1 text-[10px] text-[#999489]">
                        Last 30 days
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          wig.status === "Active"
                            ? "bg-[#edf4eb] text-[#68805d]"
                            : "bg-[#ffe8e5] text-[#c65349]"
                        }`}
                      >
                        {wig.status}
                      </span>
                    </td>

                    <td className="relative px-3 py-4">
                      <button
                        onClick={() =>
                          setMenuId(menuId === wig.id ? null : wig.id)
                        }
                        className="rounded-md p-2 text-[#888378] transition hover:bg-[#f1eee6] hover:text-[#76591d]"
                        aria-label={`Actions for ${wig.name}`}
                      >
                        <FiMoreHorizontal size={17} />
                      </button>

                      {menuId === wig.id && (
                        <div className="absolute right-6 top-12 z-20 w-40 rounded-lg border border-[#eae6dc] bg-white p-1.5 shadow-xl">
                          <button
                            onClick={() => {
                              setSelectedWig(wig);
                              setMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-[#5c584f] hover:bg-[#f7f5ef]"
                          >
                            <FiEye size={14} />
                            View details
                          </button>
                          <button
                            onClick={() => {
                              setSelectedWig(wig);
                              setShowAdjustment(true);
                              setMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-[#5c584f] hover:bg-[#f7f5ef]"
                          >
                            <FiEdit2 size={14} />
                            Adjust stock
                          </button>
                          <button
                            onClick={() => deleteWig(wig.id)}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-[#c65349] hover:bg-[#fff0ee]"
                          >
                            <FiTrash2 size={14} />
                            Delete product
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {visibleWigs.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f1e7] text-[#816326]">
                        <FiPackage size={22} />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#514e45]">
                        No wigs found
                      </p>
                      <p className="mt-1 text-xs text-[#999489]">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-[#eeece6] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#928d83]">
              <span>
                Showing{" "}
                {filteredWigs.length === 0
                  ? 0
                  : (page - 1) * Number(pageSize) + 1}
                –{Math.min(page * Number(pageSize), filteredWigs.length)} of{" "}
                {filteredWigs.length} products
              </span>

              <span className="text-[#d4d0c6]">|</span>

              <label htmlFor="pageSize">Rows:</label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(e.target.value);
                  resetPage();
                }}
                className="rounded-md border border-[#eae6dc] bg-white px-2 py-1.5 outline-none focus:border-[#a18a56]"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage((previous) => previous - 1)}
                className="rounded-md border border-[#eae6dc] p-2 text-[#716d64] hover:bg-[#f7f5ef] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <FiChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(
                  Math.max(0, Math.min(page - 2, totalPages - 3)),
                  Math.max(0, Math.min(page - 2, totalPages - 3)) + 3,
                )
                .map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`h-8 min-w-8 rounded-md px-2 text-xs font-semibold transition ${
                      page === pageNumber
                        ? "bg-[#76591d] text-white"
                        : "text-[#716d64] hover:bg-[#f2efe8]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

              {totalPages > 3 && page < totalPages - 1 && (
                <span className="px-1 text-xs text-[#999489]">...</span>
              )}

              {totalPages > 3 && (
                <button
                  onClick={() => setPage(totalPages)}
                  className={`h-8 min-w-8 rounded-md px-2 text-xs font-semibold ${
                    page === totalPages
                      ? "bg-[#76591d] text-white"
                      : "text-[#716d64] hover:bg-[#f2efe8]"
                  }`}
                >
                  {totalPages}
                </button>
              )}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((previous) => previous + 1)}
                className="rounded-md border border-[#eae6dc] p-2 text-[#716d64] hover:bg-[#f7f5ef] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <FiChevronRight size={15} />
              </button>
            </div>
          </div>
        </section>
      </div>

      <AddWigModal
        isOpen={showAddModal}
        values={newWig}
        onChange={updateNewWig}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddWig}
      />

      {/* Stock adjustment modal */}
      {showAdjustment && (
        <StockAdjustmentModal
          isOpen={showAdjustment}
          wigs={wigs}
          selectedWig={selectedWig}
          onClose={() => {
            setShowAdjustment(false);
            setSelectedWig(null);
          }}
          onSave={(id, quantity) => {
            setWigs((previous) =>
              previous.map((wig) =>
                wig.id === id
                  ? {
                      ...wig,
                      stock: quantity,
                      status: quantity === 0 ? "Out of Stock" : "Active",
                    }
                  : wig,
              ),
            );
            setShowAdjustment(false);
            setSelectedWig(null);
          }}
        />
      )}

      {/* View wig details modal */}
      {selectedWig && !showAdjustment && (
        <Modal
          title="Wig Details"
          subtitle="Product information and stock summary."
          onClose={() => setSelectedWig(null)}
        >
          <div className="flex items-start gap-4">
            <img
              src={selectedWig.image}
              alt={selectedWig.name}
              className="h-24 w-20 rounded-lg border border-[#ece8df] object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-[#302b20]">
                {selectedWig.name}
              </h3>
              <p className="mt-1 text-xs text-[#999489]">{selectedWig.sku}</p>
              <span className="mt-3 inline-flex rounded-full bg-[#edf4eb] px-2.5 py-1 text-xs font-semibold text-[#68805d]">
                {selectedWig.status}
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <DetailItem label="Price" value={formatNaira(selectedWig.price)} />
            <DetailItem label="Stock" value={`${selectedWig.stock} units`} />
            <DetailItem label="Hair Origin" value={selectedWig.origin} />
            <DetailItem label="Length" value={selectedWig.length} />
            <DetailItem label="Density" value={selectedWig.density} />
            <DetailItem label="Texture" value={selectedWig.texture} />
          </div>

          <button
            onClick={() => setSelectedWig(null)}
            className="mt-5 w-full rounded-lg bg-[#76591d] px-4 py-3 text-sm font-semibold text-white hover:bg-[#604714]"
          >
            Close Details
          </button>
        </Modal>
      )}
    </div>
  );
};

/* Reusable summary card */
function StatCard({
  label,
  value,
  icon,
  iconClass,
  footer,
  children,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconClass: string;
  footer: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#ece9e1] bg-white p-4 transition hover:border-[#ddd3bd]">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold tracking-[0.12em] text-[#89857b]">
          {label}
        </p>
        <span className={`rounded-lg p-2 ${iconClass}`}>{icon}</span>
      </div>
      <p className="mt-3 truncate font-serif text-2xl font-bold text-[#302b20]">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#928d83]">{footer}</p>
      {children}
    </div>
  );
}

/* Reusable filter */
function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold text-[#89857b]">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-[#e9e6df] bg-white px-3 py-2.5 pr-9 text-xs text-[#5b574e] outline-none transition focus:border-[#a18a56] focus:ring-2 focus:ring-[#a18a56]/10"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#999489]" />
      </span>
    </label>
  );
}

/* Reusable modal */
function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#ece9e1] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#eeece6] bg-white px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#302b20]">
              {title}
            </h2>
            <p className="mt-1 text-xs text-[#928d83]">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#89857b] hover:bg-[#f5f2eb] hover:text-[#302b20]"
            aria-label="Close modal"
          >
            <FiX size={19} />
          </button>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

/* Product detail item */
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#eeeae2] bg-[#fcfbf8] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#999489]">
        {label}
      </p>
      <p className="mt-1 wrap-break-word text-sm font-semibold text-[#39362e]">
        {value}
      </p>
    </div>
  );
}

export default Wigs;
