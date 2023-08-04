// src/repositories/ProductRepository.ts
import { Product } from "../models/Product";
import { Repository } from "./Repository";

const products: Product[] = []; // Simulated product data, replace with actual API calls

export class ProductRepository extends Repository<Product> {
  constructor() {
    super(products);
  }
}
