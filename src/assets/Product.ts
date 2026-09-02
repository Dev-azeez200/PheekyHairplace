import type { Product } from "../types/product";

import wig1 from "./wig1.jpg";
import wig2 from "./wig2.jpg";
import wig3 from "./wig3.jpg";
import woam from "./woam.jpg";
import woman from "./woman.jpg";
import nails1 from "./nails1.jpg";

export const products: Product[] = [
  {
    id: 1,
    name: "Velvet Midnight",
    price: 1250,
    image: wig1,
    category: "Bone Straight",
    length: "24",
    color: "Black",
    description:
      "A luxurious bone-straight hairstyle with a smooth finish and natural movement.",
    rating: 4.8,
    reviews: 24,
    inStock: true,
    featured: true,
  },

  {
    id: 2,
    name: "Honey Silk Curl",
    price: 1450,
    image: wig2,
    category: "Curly",
    length: "20",
    color: "Honey",
    description:
      "Soft flowing curls with a warm honey tone designed for an elegant everyday look.",
    rating: 4.9,
    reviews: 31,
    inStock: true,
    featured: true,
  },

  {
    id: 3,
    name: "Parisian Bob",
    price: 950,
    image: wig3,
    category: "Bob",
    length: "12",
    color: "Black",
    description:
      "A sophisticated short bob inspired by timeless Parisian style.",
    rating: 4.7,
    reviews: 18,
    inStock: true,
  },

  {
    id: 4,
    name: "Golden Riviera",
    price: 1350,
    image: woam,
    category: "Body Wave",
    length: "26",
    color: "Brown",
    description:
      "Beautiful flowing waves with a rich golden-brown finish.",
    rating: 4.8,
    reviews: 27,
    inStock: true,
  },

  {
    id: 5,
    name: "Obsidian Flow",
    price: 1550,
    image: woman,
    category: "Deep Wave",
    length: "28",
    color: "Black",
    description:
      "Deep luxurious waves with dramatic volume and a silky finish.",
    rating: 5,
    reviews: 42,
    inStock: true,
    featured: true,
  },

  {
    id: 6,
    name: "Ice Rebel",
    price: 1200,
    image: nails1,
    category: "Pixie",
    length: "10",
    color: "Blonde",
    description:
      "A modern short cut with a bold icy finish for a confident look.",
    rating: 4.6,
    reviews: 15,
    inStock: true,
  },

  {
    id: 7,
    name: "Ice Rebel Luxe",
    price: 1280,
    image: wig3,
    category: "Pixie",
    length: "10",
    color: "Platinum",
    description:
      "A polished icy short cut with a soft finish and confident shape.",
    rating: 4.7,
    reviews: 19,
    inStock: true,
  },

  {
    id: 8,
    name: "Satin Cascade",
    price: 1600,
    image: wig1,
    category: "Bone Straight",
    length: "26",
    color: "Black",
    description:
      "Long, sleek strands with a glossy finish and natural movement.",
    rating: 4.8,
    reviews: 22,
    inStock: true,
  },

  {
    id: 9,
    name: "Cocoa Blossom",
    price: 1480,
    image: wig2,
    category: "Body Wave",
    length: "22",
    color: "Brown",
    description:
      "Full-bodied waves in a rich cocoa shade for soft everyday glamour.",
    rating: 4.8,
    reviews: 26,
    inStock: true,
  },

  {
    id: 10,
    name: "Amalfi Layers",
    price: 1120,
    image: wig3,
    category: "Bob",
    length: "14",
    color: "Black",
    description:
      "A softly layered bob with an effortless shape and refined finish.",
    rating: 4.6,
    reviews: 17,
    inStock: true,
  },

  {
    id: 11,
    name: "Golden Muse",
    price: 1720,
    image: woam,
    category: "Deep Wave",
    length: "28",
    color: "Golden",
    description:
      "Statement waves with luminous color and luxurious volume.",
    rating: 4.9,
    reviews: 34,
    inStock: true,
  },

  {
    id: 12,
    name: "Noir Majesty",
    price: 1800,
    image: woman,
    category: "Curly",
    length: "30",
    color: "Black",
    description:
      "Dramatic curls with a soft silhouette and a beautifully full finish.",
    rating: 5,
    reviews: 39,
    inStock: true,
  },
];