import Level from "../../entity/level";
import LevelRepositoryInterface from "./level.repository.interface";

export default class LevelRepositoryMemory implements LevelRepositoryInterface {
  private levels: Level[];

  constructor() {
    this.levels = [
      new Level({
        code: "EF1",
        description: "Ensino Fundamental I",
      }),
      new Level({
        code: "EF2",
        description: "Ensino Fundamental II",
      }),
      new Level({
        code: "EM",
        description: "Ensino Médio",
      }),
    ];
  }

  getAll(): Level[] {
    return this.levels;
  }

  getByCode(code: string): Level {
    const levels = this.levels.find((level) => level.code === code);
    if (!levels) {
      throw new Error("level not found");
    }
    return levels;
  }
}
