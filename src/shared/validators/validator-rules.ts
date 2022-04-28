import ValidationError from "../../shared/errors/validation-error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): Omit<this, "required"> {
    if (isEmpty(this.value) || this.value === "") {
      throw new ValidationError(`The ${this.property} is required.`);
    }
    return this;
  }

  string(): Omit<this, "string"> {
    if (!isEmpty(this.value) && typeof this.value !== "string") {
      throw new ValidationError(`The ${this.property} must be a string.`);
    }
    return this;
  }

  maxLength(max: number): Omit<this, "maxLength"> {
    if (!isEmpty(this.value) && this.value.length > max) {
      throw new ValidationError(
        `The ${this.property} must be less or equal than ${max} characteres.`
      );
    }
    return this;
  }

  boolean(): Omit<this, "boolean"> {
    if (!isEmpty(this.value) && typeof this.value !== "boolean") {
      throw new ValidationError(`The ${this.property} must be a boolean.`);
    }
    return this;
  }
}
export function isEmpty(value: any) {
  return value === null || value === undefined;
}