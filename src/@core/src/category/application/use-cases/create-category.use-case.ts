import CategoryRepository from "@core/category/domain/repository/category.repository";
import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id.vo";
import { Category } from "../../domain/entities/category";
export default class CreateCategoryUseCase {
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = new Category(input);
    await this.categoryRepo.insert(entity);
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}

//DTO - Data Transfer Object
export type Input = {
  name: string;
  description?: string;
  is_active: boolean;
};

export type Output = {
  id: string | UniqueEntityId;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};
