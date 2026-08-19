export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  length: string;
  color: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
}
