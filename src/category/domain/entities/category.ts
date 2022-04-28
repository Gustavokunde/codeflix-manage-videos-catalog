import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../shared/domain/entity/entity";
import ValidatorRules from "../../../shared/validators/validator-rules";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    Category.validate(props);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description: string): void {
    Category.validate({ name, description, is_active: this.is_active });
    this.name = name;
    this.description = description;
  }

  static validate(props: Omit<CategoryProperties, "created_at">) {
    ValidatorRules.values(props.name, "name")
      .required()
      .string()
      .maxLength(255);
    ValidatorRules.values(props.description, "description").string();
    ValidatorRules.values(props.is_active, "is_active").boolean();
  }

  activate(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }
  set name(value: string) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_ate() {
    return this.props.created_at;
  }
}
