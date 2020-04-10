export class Product {
  public id: number;
  public createdAt: Date;
  public name: string;
  public image: string;
  public price: number;

  constructor(id: number, createdAt: Date, name: string, image: string, price: number) {
    this.id = id;
    this.createdAt = createdAt;
    this.name = name;
    this.image = image;
    this.price = price;
  }
}