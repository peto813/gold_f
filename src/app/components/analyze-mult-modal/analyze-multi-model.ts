export class AnalyzeMultiModel {
  constructor(
    public precio:number,
    public transacciones:Array<object>,
    public cantidad:number,
    public pesoPost: number,
    public currency:string,
    public weightUnit: string
  ) {  }
}
