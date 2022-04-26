import { omit } from "lodash";
import { Category } from "./category";
import UniqueEntityId from "../../../shared/domain/unique-entity-id.vo";

describe("Category Tests", () => {
  //Tripe AAA - Arrange, Act, Assert
  test("constructor of category", () => {
    // Arrange
    let props = {
      name: "Movie",
      description: "description",
      is_active: true,
      created_at: new Date(),
    };

    //Act
    let category = new Category(props);

    //Assert
    //expect(category.props.name).toBe("Movie");
    //expect(category.props.description).toBe("description");
    //expect(category.props.is_active).toBeTruthy();
    //expect(category.props.created_at).toBe(props.created_at);

    expect(category.props).toStrictEqual(props);
  });

  test("id field", () => {
    let category = new Category({ name: "Movie" });
    expect(category.id).not.toBeNull();

    category = new Category({ name: "Movie" }, undefined);
    expect(category.id).not.toBeNull();

    category = new Category({ name: "Movie" }, new UniqueEntityId());
    expect(category.id).not.toBeNull();
  });

  test("constructor of category without sending all values", () => {
    let category = new Category({ name: "Movie" });

    let props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      created_at,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });
});
