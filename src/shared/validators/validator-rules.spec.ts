import ValidationError from "../../shared/errors/validation-error";
import ValidatorRules from "./validator-rules";

describe("Validation Rules Unit Tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });
  test("required validation rule", () => {
    let arrange: { value: any; property: string; messageError: string }[] = [
      {
        value: null,
        property: "field",
        messageError: "The field is required.",
      },
      {
        value: undefined,
        property: "field",
        messageError: "The field is required.",
      },
      {
        value: "",
        property: "field",
        messageError: "The field is required.",
      },
    ];

    arrange.map((a) => {
      expect(() =>
        ValidatorRules.values(a.value, a.property).required()
      ).toThrow(new ValidationError(a.messageError));
    });

    arrange = [
      {
        value: "test",
        property: "field",
        messageError: "The field is required.",
      },
      {
        value: 5,
        property: "field",
        messageError: "The field is required.",
      },
      {
        value: 0,
        property: "field",
        messageError: "The field is required.",
      },
      {
        value: false,
        property: "field",
        messageError: "The field is required.",
      },
    ];

    arrange.map((a) => {
      expect(() =>
        ValidatorRules.values(a.value, a.property).required()
      ).not.toThrow(new ValidationError(a.messageError));
    });
  });

  test("string validation rule", () => {
    let arrange: { value: any; property: string; messageError: string }[] = [
      {
        value: 5,
        property: "field",
        messageError: "The field must be a string.",
      },
      {
        value: {},
        property: "field",
        messageError: "The field must be a string.",
      },
      {
        value: false,
        property: "field",
        messageError: "The field must be a string.",
      },
    ];

    arrange.map((a) => {
      expect(() => ValidatorRules.values(a.value, a.property).string()).toThrow(
        new ValidationError(a.messageError)
      );
    });

    arrange = [
      {
        value: "test",
        property: "field",
        messageError: "The field must be a string.",
      },
    ];

    arrange.map((a) => {
      expect(() =>
        ValidatorRules.values(a.value, a.property).string()
      ).not.toThrow(new ValidationError(a.messageError));
    });
  });

  test("maxLength validation rule", () => {
    let arrange: { value: any; property: string; messageError: string }[] = [
      {
        value: "aaaaa",
        property: "field",
        messageError: "The field must be less or equal than 4 characteres.",
      },
    ];

    arrange.map((a) => {
      expect(() =>
        ValidatorRules.values(a.value, a.property).maxLength(4)
      ).toThrow(new ValidationError(a.messageError));
    });

    arrange = [
      {
        value: "aaaaa",
        property: "field",
        messageError: "The field must be a string.",
      },
    ];

    arrange.map((a) => {
      expect(() =>
        ValidatorRules.values(a.value, a.property).maxLength(5)
      ).not.toThrow(new ValidationError(a.messageError));
    });
  });

  it("should throw a validation error when combining two or more validation rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field is required.")
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field must be a string.")
    );

    validator = ValidatorRules.values("aaaaaa", "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError("The field must be less or equal than 5 characteres.")
    );
  });
});
