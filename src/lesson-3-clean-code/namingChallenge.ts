interface InterfaceIceCreamWithNameAndUnits {
  iceCreamName: string;
  iceCreamUnits: number;
}

class Store {
  private listOfStuff: InterfaceIceCreamWithNameAndUnits[];

  constructor(initalStoke: InterfaceIceCreamWithNameAndUnits[]) {
    this.listOfStuff = initalStoke;
  }

  sellIceCream(iceCreamName: string) {
    const currentIceCreamName = this.listOfStuff.find(
      (i) => i.iceCreamName === iceCreamName,
    );
    if (currentIceCreamName && currentIceCreamName.iceCreamUnits > 0) {
      currentIceCreamName.iceCreamUnits--;
      console.log(
        `${iceCreamName} sold. Remaining units: ${currentIceCreamName.iceCreamUnits}`,
      );
    } else {
      console.log(`${iceCreamName} is out of stock or does not exist.`);
    }
  }

  buy(iceCreamName: string, newUnits: number) {
    const iceCream = this.listOfStuff.find(
      (ic) => ic.iceCreamName === iceCreamName,
    );
    if (iceCream) {
      iceCream.iceCreamUnits += newUnits;
      console.log(
        `${newUnits} units of ${iceCreamName} bought. Total units: ${iceCream.iceCreamUnits}`,
      );
    } else {
      this.listOfStuff.push({ iceCreamName, iceCreamUnits: newUnits });
      console.log(`${iceCreamName} added to stock with ${newUnits} units.`);
    }
  }

  validate(icream: string) {
    return this.listOfStuff.find((ic) => ic.iceCreamName === icream);
  }
}
const initialStuff = [
  { iceCreamName: "Vanilla", iceCreamUnits: 10 },
  { iceCreamName: "Chocolate", iceCreamUnits: 15 },
  { iceCreamName: "Strawberry", iceCreamUnits: 12 },
  { iceCreamName: "Mint Chocolate Chip", iceCreamUnits: 8 },
  { iceCreamName: "Cookie Dough", iceCreamUnits: 5 },
] satisfies InterfaceIceCreamWithNameAndUnits[];

const icStore1 = new Store(initialStuff);

icStore1.sellIceCream("Vanilla");
icStore1.buy("Vanilla", 4);
