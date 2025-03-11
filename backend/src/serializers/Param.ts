import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

class IdParamDTO {
  @Type(() => Number)
  @Min(1)
  id!: number;
}

export { IdParamDTO };
