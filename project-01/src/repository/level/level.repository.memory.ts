import LevelRepositoryInterface from "./level.repository.interface";

export default class LevelRepositoryMemory implements LevelRepositoryInterface {
  private levels: any[];

  constructor() {
    this.levels = [
      {
        code: "EF1",
        description: "Ensino Fundamental I",
      },
      {
        code: "EF2",
        description: "Ensino Fundamental II",
      },
      {
        code: "EM",
        description: "Ensino Médio",
      },
    ];
  }

  getAll(): any[] {
    return this.levels;
  }

  getByCode(code: string): any {
    const levels = this.levels.find((level) => level.code === code);
    if (!levels) {
      throw new Error("level not found");
    }
    return levels;
  }
}
