import { validate } from "uuid";
import InvalidUuidError from "../../shared/errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";

describe("UniqueEntityId and Unit tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid passed in constructor", () => {
    const uuid = "170ac198-e54e-456c-a20d-64fb63a33f8b";
    const vo = new UniqueEntityId(uuid);

    expect(vo.id).toBe(uuid);
  });

  it("should accept an uuid passed in constructor", () => {
    const vo = new UniqueEntityId();

    expect(validate(vo.id)).toBeTruthy;
  });
});
