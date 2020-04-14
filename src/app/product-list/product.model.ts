export class Product {
  public id: number;
  public createdAt: Date;
  public name: string;
  public image: string;
  public price: number;
  public type: string;
  public publish_from : Date;
  public publish_to: Date;
  public quantity: number;

  constructor(id: number, createdAt: Date, name: string, image: string, price: number, type: string, publish_from: Date, publish_to: Date, quantity: number = 1) {
    this.id = id;
    this.createdAt = createdAt;
    this.name = name;
    this.image = image;
    this.price = price;
    this.type = type;
    this.publish_from = publish_from;
    this.publish_to = publish_to;
    this.quantity = quantity;
  }
}