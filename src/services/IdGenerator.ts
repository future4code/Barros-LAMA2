import { v4 } from "uuid";
import { IIdGenerator } from "../business/ports";
export class IdGenerator implements IIdGenerator {
  public generate = () => {
    return v4()
  }
};