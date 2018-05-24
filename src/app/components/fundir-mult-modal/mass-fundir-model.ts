export class MassFundirModel {
  constructor(
    public precio:number,
    public transacciones:Array<object>,
    public cantidad:number,
    public pesoPost: number,
    public currency:string,
    public weightUnit: string
  ) {  }
}
