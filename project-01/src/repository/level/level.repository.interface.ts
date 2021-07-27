export default interface LevelRepositoryInterface {
  getAll(): any[];
  getByCode(code: string): any;
}
