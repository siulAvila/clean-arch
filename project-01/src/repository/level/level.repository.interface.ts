import Level from "../../entity/level";

export default interface LevelRepositoryInterface {
  getAll(): Level[];
  getByCode(code: string): Level;
}
