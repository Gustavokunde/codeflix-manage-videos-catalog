import ValidationError from "../../../shared/errors/validation-error";
import { Category } from "./category";

describe("Category integration  tests", () => {
  describe("create method", () => {
    it("should show a invalid category when created using name property", () => {
      expect(() => new Category({ name: null })).toThrow(
        new ValidationError("The name is required.")
      );

      expect(() => new Category({ name: "" })).toThrow(
        new ValidationError("The name is required.")
      );

      expect(() => new Category({ name: "t".repeat(256) })).toThrow(
        new ValidationError(
          "The name must be less or equal than 255 characteres."
        )
      );
      expect(() => new Category({ name: 5 as any })).toThrow(
        new ValidationError("The name must be a string.")
      );
    });

    it("should show a invalid category when created using description property", () => {
      expect(
        () => new Category({ name: "Movie", description: 5 as any })
      ).toThrow(new ValidationError("The description must be a string."));
    });

    it("should show a invalid category when created using is_active property", () => {
      expect(
        () => new Category({ name: "Movie", is_active: 5 as any })
      ).toThrow(new ValidationError("The is_active must be a boolean."));
    });
  });

  describe("update method", () => {
    it("should show a invalid category when created using name property", () => {
      let category = new Category({ name: "Movie" });
      expect(() => category.update(null, null)).toThrow(
        new ValidationError("The name is required.")
      );

      expect(() => category.update("", null)).toThrow(
        new ValidationError("The name is required.")
      );

      expect(() => category.update(5 as any, null)).toThrow(
        new ValidationError("The name must be a string.")
      );

      expect(() => category.update("t".repeat(256), null)).toThrow(
        new ValidationError(
          "The name must be less or equal than 255 characteres."
        )
      );
    });

    it("should show a invalid category when created using description property", () => {
      let category = new Category({ name: "Movie" });

      expect(() => category.update("5", 5 as any)).toThrow(
        new ValidationError("The description must be a string.")
      );
    });
  });
});
