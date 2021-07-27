import ClassRepositoryInteface from "./class.repository.interface";

export default class ClassRepositoryMemory implements ClassRepositoryInteface {
  private classes: any[];
  constructor() {
    this.classes = [
      {
        level: "EM",
        module: "3",
        code: "A",
        capacity: 2,
      },
    ];
  }

  getAll(): any[] {
    return this.classes;
  }

  getByCode(code: string): any {
    const clazz = this.classes.find((clazz) => clazz.code === code);
    if (!clazz) {
      throw new Error("class not found");
    }
    return clazz;
  }
}
