export default interface ModuleRepositoryInteface {
  getAll(): any[];
  getByCode(code: string, level: string): any;
}
