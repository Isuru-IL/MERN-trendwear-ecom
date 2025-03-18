export interface Product {
  _id?: string;
  // name: string;
  // description: string;
  // images: string[];
  // variations: ProductVariation[];
  images: string[];
  variations: Omit<ProductVariation, "id">[];
  name: string;
  description: string
  category:string
  createdAt?: string;
}

export interface ProductVariation {
  _id?: string;
  id: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id?:string;
  email:string;
  firstName: string;
  lastName: string;
  address:string;
  city:string;
  postalCode:string;
  products: {
    productId: string;
    quantity: number;
    size: string;
  }[];
  totalPrice:number;
  createdAt?: string;
}

export interface Auth {
  name: string;
  email: string;
  role: string;
  token: string;
}