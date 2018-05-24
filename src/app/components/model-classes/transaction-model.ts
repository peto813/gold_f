export class Transaction {
  constructor(
    public cantidad:number,
    public precio: number,
    public weightUnit:string,
    public account:any,
    public tipo:string,
    public id?:number,
    public created?:string,
    public pesoPost?: number,
    public fundido?: boolean,
    public legal?: boolean,
    public evalCost?:number,
    public meltCost?:number,
    public related_transaction?:number,
    public pesoPostLegal? : number
  ) {  }
}


