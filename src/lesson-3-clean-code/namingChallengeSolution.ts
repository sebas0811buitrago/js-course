interface IceCream {
  name: string;
  units: number;
}

class PopsyStore {
  private stock: IceCream[];

  constructor(initalStoke: IceCream[]) {
    this.stock = initalStoke;
  }

  sell(iceCreamName: string) {
    const iceCream = this.stock.find(
      (currentIceCream) => currentIceCream.name === iceCreamName,
    );
    if (iceCream && iceCream.units > 0) {
      iceCream.units--;
      console.log(`${iceCreamName} sold. Remaining units: ${iceCream.units}`);
    } else {
      console.log(`${iceCreamName} is out of stock or does not exist.`);
    }
  }

  buy(iceCreamName: string, newUnits: number) {
    const iceCream = this.stock.find(
      (currentIceCream) => currentIceCream.name === iceCreamName,
    );
    if (iceCream) {
      iceCream.units += newUnits;
      console.log(
        `${newUnits} units of ${iceCreamName} bought. Total units: ${iceCream.units}`,
      );
    } else {
      this.stock.push({ name: iceCreamName, units: newUnits });
      console.log(`${iceCreamName} added to stock with ${newUnits} units.`);
    }
  }

  isIceCreaminStock(iceCreamName: string) {
    return this.stock.find(
      (currentIceCream) => currentIceCream.name === iceCreamName,
    );
  }
}
const initialStockStore1 = [
  { name: "Vanilla", units: 10 },
  { name: "Chocolate", units: 15 },
  { name: "Strawberry", units: 12 },
  { name: "Mint Chocolate Chip", units: 8 },
  { name: "Cookie Dough", units: 5 },
] satisfies IceCream[];

const iceCreamStore1 = new PopsyStore(initialStockStore1);

iceCreamStore1.sell("Vanilla");
iceCreamStore1.buy("Vanilla", 4);

iceCreamStore1.isIceCreaminStock("Vanilla");
