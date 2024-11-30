export class CreateProductDto {
  title: string;
  slug: string;
  description: string;
  price: number;
  categoryIds: string[];
}
