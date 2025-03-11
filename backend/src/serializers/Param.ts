import { IsInt, Min } from "class-validator";

class IdParamDTO {
  @IsInt()
  @Min(1)
  id!: number;
}

export { IdParamDTO };
