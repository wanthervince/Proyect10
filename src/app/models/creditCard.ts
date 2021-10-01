export class creditCard {
  id?: string;
  name: string;
  nrocard: string;
  fexpired: string;
  cvv: number;
  fcreate: Date;
  fupdate: Date;

  constructor(name: string, nrocard: string, fexpired: string, cvv: number) {
    this.name = name;
    this.nrocard = nrocard;
    this.fexpired = fexpired;
    this.cvv = cvv;
    this.fcreate = new Date();
    this.fupdate = new Date();
  }
}
