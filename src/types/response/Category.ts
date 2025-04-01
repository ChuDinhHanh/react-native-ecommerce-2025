export interface Category {
  id: string;
  code: string;
  name: string;
  level: number;
  parentCategoryId: string;
  children: Category[];
  image: string;
}
