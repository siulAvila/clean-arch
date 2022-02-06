import Module from "../../entity/modules";

export default interface ModuleRepositoryInteface {
  getAll(): Module[];
  getByCode(code: string, level: string): Module;
}
