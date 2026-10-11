import { useEffect, useState } from "react";
import assets from "../assets/assets";

export type NailServiceRecord = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type TransformationRecord = {
  id: number;
  beforeImage: string;
  afterImage: string;
};

const NAIL_SERVICES_STORAGE_KEY = "pheeky-nail-services";
const NAIL_SERVICES_UPDATED_EVENT = "pheeky-nail-services-updated";
const TRANSFORMATIONS_STORAGE_KEY = "pheeky-transformations";
const TRANSFORMATIONS_UPDATED_EVENT = "pheeky-transformations-updated";

const defaultNailServices: NailServiceRecord[] = [
  {
    id: "manicure",
    name: "Manicure",
    image: assets.Manicure,
    description:
      "A complete nail care treatment to keep your hands and nails clean, healthy, and beautifully polished.",
  },
  {
    id: "pedicure",
    name: "Pedicure",
    image: assets.Pedicure,
    description:
      "A complete foot care treatment to keep your feet and toenails clean, healthy, refreshed, and beautifully polished.",
  },
  {
    id: "classic-nail-care",
    name: "Classic Nail Care",
    image: assets.nails3,
    description:
      "A complete nail care treatment to keep your nails clean, healthy, neatly shaped, and beautifully polished.",
  },
  {
    id: "gel-pedicure",
    name: "Gel Pedicure",
    image: assets.nails2,
    description:
      "A relaxing pedicure finished with durable gel polish for a flawless, long-lasting look.",
  },
];

const defaultTransformations: TransformationRecord[] = Array.from(
  { length: 5 },
  (_, index) => ({ id: index + 1, beforeImage: "", afterImage: "" }),
);

const loadNailServices = (): NailServiceRecord[] => {
  try {
    const storedServices = window.localStorage.getItem(
      NAIL_SERVICES_STORAGE_KEY,
    );
    if (!storedServices) return defaultNailServices;

    const parsedServices: unknown = JSON.parse(storedServices);
    return Array.isArray(parsedServices) ? parsedServices : defaultNailServices;
  } catch {
    return defaultNailServices;
  }
};

export const saveNailServices = (services: NailServiceRecord[]) => {
  window.localStorage.setItem(
    NAIL_SERVICES_STORAGE_KEY,
    JSON.stringify(services),
  );
  window.dispatchEvent(new Event(NAIL_SERVICES_UPDATED_EVENT));
};

export const useNailServices = () => {
  const [services, setServices] = useState<NailServiceRecord[]>(
    loadNailServices,
  );

  useEffect(() => {
    const refreshServices = () => setServices(loadNailServices());
    window.addEventListener(NAIL_SERVICES_UPDATED_EVENT, refreshServices);
    window.addEventListener("storage", refreshServices);

    return () => {
      window.removeEventListener(NAIL_SERVICES_UPDATED_EVENT, refreshServices);
      window.removeEventListener("storage", refreshServices);
    };
  }, []);

  return services;
};

const loadTransformations = (): TransformationRecord[] => {
  try {
    const storedTransformations = window.localStorage.getItem(
      TRANSFORMATIONS_STORAGE_KEY,
    );
    if (!storedTransformations) return defaultTransformations;

    const parsedTransformations: unknown = JSON.parse(storedTransformations);
    if (!Array.isArray(parsedTransformations)) return defaultTransformations;

    return defaultTransformations.map((defaultSlot) => {
      const storedSlot = parsedTransformations.find(
        (slot) => slot.id === defaultSlot.id,
      );
      return storedSlot ? { ...defaultSlot, ...storedSlot } : defaultSlot;
    });
  } catch {
    return defaultTransformations;
  }
};

export const saveTransformations = (
  transformations: TransformationRecord[],
) => {
  window.localStorage.setItem(
    TRANSFORMATIONS_STORAGE_KEY,
    JSON.stringify(transformations),
  );
  window.dispatchEvent(new Event(TRANSFORMATIONS_UPDATED_EVENT));
};

export const useTransformations = () => {
  const [transformations, setTransformations] = useState<
    TransformationRecord[]
  >(loadTransformations);

  useEffect(() => {
    const refreshTransformations = () =>
      setTransformations(loadTransformations());
    window.addEventListener(
      TRANSFORMATIONS_UPDATED_EVENT,
      refreshTransformations,
    );
    window.addEventListener("storage", refreshTransformations);

    return () => {
      window.removeEventListener(
        TRANSFORMATIONS_UPDATED_EVENT,
        refreshTransformations,
      );
      window.removeEventListener("storage", refreshTransformations);
    };
  }, []);

  return transformations;
};

export const readServiceImage = (file: File) =>
  new Promise<string>((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Choose an image file."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The image could not be read."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("The image could not be loaded."));
      image.onload = () => {
        const scale = Math.min(1, 1400 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("The image could not be processed."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const compressedImage = canvas.toDataURL("image/jpeg", 0.8);
        if (compressedImage.length > 1_500_000) {
          reject(
            new Error(
              "Choose a smaller image (under 1.5 MB after compression).",
            ),
          );
          return;
        }
        resolve(compressedImage);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
