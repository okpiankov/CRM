import { makeAutoObservable } from "mobx";
type TypeData = {
    cardId: string
    columnName: string
    actually_paid: number
}

class Store {
    data: TypeData = { cardId: "", columnName: "", actually_paid: 0 };

  constructor() {
    makeAutoObservable(this);
  }
  addStore( value1: string, value2: string, value3: number ) {
    this.data = { cardId: value1, columnName: value2, actually_paid: value3 };
  }
}
export default new Store();
