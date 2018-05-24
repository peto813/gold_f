export class Broker {
  constructor(
    public username:string,
    public email:string,
    public password1:string,
    public password2:string,
    public location:string,
    public id_number:string,
    public mobile:string,
    public office:string,
    public other:string,
    public gold_balance: number,
    public first_name: string,
    public last_name: string,
    public id?:number,
    public userprofile?:any
  ) {  }
}
