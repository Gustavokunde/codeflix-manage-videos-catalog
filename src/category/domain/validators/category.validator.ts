import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import ValidatorFieldsInterface from "shared/validators/validator-fields-interface";
import ClassValidatorFields from "../../../shared/validators/class-validator-fields";
import { CategoryProperties } from "../entities/category";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({
    name,
    created_at,
    description,
    is_active,
  }: CategoryProperties) {
    Object.assign(this, { name, created_at, description, is_active });
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: any): boolean {
    return super.validate(new CategoryRules(data));
  }
}

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
