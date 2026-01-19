
export type Category = 'Jackets' | 'Dresses' | 'All';
export type Language = 'EN' | 'RU' | 'ZH';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  imageUrl: string;
  tag?: string;
  sizes: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
