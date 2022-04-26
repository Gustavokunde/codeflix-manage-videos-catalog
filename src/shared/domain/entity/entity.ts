import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<Props> {
  public readonly id: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
  }
}
