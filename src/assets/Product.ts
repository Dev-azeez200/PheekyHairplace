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
];