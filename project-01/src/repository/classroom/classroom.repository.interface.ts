import Classroom from "../../entity/classroom";

export default interface ClassroomRepositoryInteface {
  getAll(): Classroom[];
  getByCode(code: string): Classroom;
}
