export default class Classroom {
  level: string;
  module: string;
  code: string;
  capacity: number;
  startDate: string;
  endDate: string;

  constructor({
    level,
    module,
    code,
    capacity,
    startDate,
    endDate,
  }: {
    level: string;
    module: string;
    code: string;
    capacity: number;
    startDate: string;
    endDate: string;
  }) {
    this.level = level;
    this.module = module;
    this.code = code;
    this.capacity = capacity;
    this.startDate = startDate;
    this.endDate = endDate;
  }


}
