import Entity from "../../../shared/domain/entity/entity";

export default interface CategoryRepository {
  insert(value: Entity): Promise<Entity>;
}
