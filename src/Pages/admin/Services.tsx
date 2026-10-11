import { useState } from "react";
import { FiImage, FiPlus, FiSave, FiTrash2, FiX } from "react-icons/fi";
import {
  readServiceImage,
  saveNailServices,
  saveTransformations,
  useNailServices,
  useTransformations,
  type NailServiceRecord,
  type TransformationRecord,
} from "../../data/services";

type ServiceDraft = Pick<NailServiceRecord, "name" | "description" | "image">;
type TransformationImageField = "beforeImage" | "afterImage";

const emptyDraft: ServiceDraft = {
  name: "",
  description: "",
  image: "",
};

const Services = () => {
  const services = useNailServices();
  const transformations = useTransformations();
  const [draft, setDraft] = useState<ServiceDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [galleryMessage, setGalleryMessage] = useState("");

  const editService = (service: NailServiceRecord) => {
    setEditingId(service.id);
    setDraft({
      name: service.name,
      description: service.description,
      image: service.image,
    });
    setMessage("");
  };

  const startNewService = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setMessage("");
  };

  const updateImage = async (file?: File) => {
    if (!file) return;
    try {
      const image = await readServiceImage(file);
      setDraft((current) => ({ ...current, image }));
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    }
  };

  const updateTransformationImage = async (
    slotId: number,
    field: TransformationImageField,
    file?: File,
  ) => {
    if (!file) return;
    try {
      const image = await readServiceImage(file);
      const updatedTransformations = transformations.map((slot) =>
        slot.id === slotId ? { ...slot, [field]: image } : slot,
      );
      saveTransformations(updatedTransformations);
      setGalleryMessage(`Transformation ${slotId} saved.`);
    } catch (error) {
      setGalleryMessage(
        error instanceof Error ? error.message : "Image upload failed.",
      );
    }
  };

  const handleSave = () => {
    if (!draft.name.trim() || !draft.description.trim() || !draft.image) {
      setMessage("Add a service name, description, and main image before saving.");
      return;
    }

    const updatedService: NailServiceRecord = {
      ...draft,
      id: editingId ?? crypto.randomUUID(),
    };

    try {
      saveNailServices(
        editingId
          ? services.map((service) =>
              service.id === editingId ? updatedService : service,
            )
          : [...services, updatedService],
      );
      setMessage("Service saved.");
      setEditingId(updatedService.id);
    } catch {
      setMessage("Could not save. Remove some images or use smaller files.");
    }
  };

  const handleDelete = (serviceId: string) => {
    try {
      saveNailServices(services.filter((service) => service.id !== serviceId));
      if (editingId === serviceId) startNewService();
      setMessage("Service removed.");
    } catch {
      setMessage("Could not update the service list.");
    }
  };

  const serviceImageField = () => (
    <label className="block text-sm font-medium text-[#39352f]">
      Service image *
      <span className="mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-[#d9d2c8] bg-[#faf9f6] text-center text-xs text-[#746d63]">
        {draft.image ? (
          <img src={draft.image} alt="Service image preview" className="h-36 w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-2 px-3">
            <FiImage size={20} />
            Choose image
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => void updateImage(event.currentTarget.files?.[0])}
        />
      </span>
    </label>
  );

  const transformationImageField = (
    slot: TransformationRecord,
    field: TransformationImageField,
    label: string,
  ) => (
    <label className="block text-xs font-medium text-[#39352f]">
      {label}
      <span className="mt-2 flex h-36 cursor-pointer items-center justify-center overflow-hidden border border-dashed border-[#d9d2c8] bg-[#faf9f6] text-center text-xs text-[#746d63]">
        {slot[field] ? (
          <img src={slot[field]} alt={`${label} preview`} className="h-full w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-2 px-3">
            <FiImage size={20} />
            Choose image
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) =>
            void updateTransformationImage(
              slot.id,
              field,
              event.currentTarget.files?.[0],
            )
          }
        />
      </span>
    </label>
  );

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#24231f]">Services</h1>
          <p className="mt-1 text-sm text-[#6b6258]">
            Manage the four no-price cards in the Nails & Beauty section.
          </p>
        </div>
        <button
          type="button"
          onClick={startNewService}
          className="inline-flex items-center gap-2 bg-[#29251f] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#494238]"
        >
          <FiPlus /> Add service
        </button>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
        <div className="divide-y divide-[#eeeae4] border border-[#eeeae4] bg-white">
          {services.map((service) => (
            <article key={service.id} className="flex items-center gap-4 p-4">
              <img src={service.image} alt="" className="h-16 w-16 shrink-0 object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-[#24231f]">{service.name}</h2>
                <p className="mt-1 line-clamp-2 text-xs text-[#6b6258]">{service.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => editService(service)}
                  className="border border-[#e5e0d8] px-3 py-2 text-xs font-medium text-[#39352f] hover:bg-[#f7f5f1]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  title={`Delete ${service.name}`}
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-[#8c514a] hover:bg-[#fbf2ef]"
                >
                  <FiTrash2 aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
          {services.length === 0 && (
            <p className="p-6 text-sm text-[#6b6258]">No services yet. Add your first service.</p>
          )}
        </div>

        <div className="border border-[#eeeae4] bg-white p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-[#24231f]">
              {editingId ? "Edit service" : "New service"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={startNewService}
                className="inline-flex items-center gap-1 text-xs text-[#6b6258] hover:text-[#24231f]"
              >
                <FiX /> Cancel
              </button>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#39352f]">
              Service name *
              <input
                value={draft.name}
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                className="mt-2 w-full border border-[#d9d2c8] px-3 py-2.5 text-sm outline-none focus:border-[#8b7654]"
                placeholder="e.g. Lace frontal installation"
              />
            </label>
            <label className="block text-sm font-medium text-[#39352f]">
              Description *
              <textarea
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                rows={3}
                className="mt-2 w-full resize-y border border-[#d9d2c8] px-3 py-2.5 text-sm outline-none focus:border-[#8b7654]"
                placeholder="Describe what the service includes"
              />
            </label>

            {serviceImageField()}

            {message && <p role="status" className="text-sm text-[#6b6258]">{message}</p>}
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#29251f] px-4 py-3 text-sm font-medium text-white hover:bg-[#494238]"
            >
              <FiSave /> Save service
            </button>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <header>
          <h2 className="text-xl font-semibold text-[#24231f]">Home transformations</h2>
          <p className="mt-1 text-sm text-[#6b6258]">
            Manage the five before-and-after pairs shown in the Home page gallery.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {transformations.map((slot) => (
            <article key={slot.id} className="border border-[#eeeae4] bg-white p-4">
              <h3 className="text-sm font-semibold text-[#24231f]">
                Transformation {String(slot.id).padStart(2, "0")}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {transformationImageField(slot, "beforeImage", "Before")}
                {transformationImageField(slot, "afterImage", "After")}
              </div>
            </article>
          ))}
        </div>
        {galleryMessage && (
          <p role="status" className="text-sm text-[#6b6258]">{galleryMessage}</p>
        )}
      </section>
    </section>
  );
};

export default Services;  