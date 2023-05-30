export class ApiError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly type: string;

  constructor(
    description: string,
    name: string,
    type: string,
    httpCode: number
  ) {
    super(description);
    this.name = name;
    this.type = type;
    this.httpCode = httpCode;
  }
}
