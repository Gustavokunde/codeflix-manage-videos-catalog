import InvalidUuidError from "../../shared/errors/invalid-uuid.error";
import { v4 as uuidv4, validate } from "uuid";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = validate(this.id);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
