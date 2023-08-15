import Card from "./card.js";

export default class CardContainer {
  constructor(xpoint, ypoint, width, height, color, gameState) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.width = width;
    this.height = height;
    this.color = color;
    this.cards = [];

    this.mouseX = 0;
    this.mouseY = 0;

    this.isClick = 0;
  }

  init(cards) {
    let cXpoint = this.xpoint;
    cards.forEach((e, i) => {
      let cHeith = 150;
      let cWidth = cHeith * 0.8;
      cXpoint = i == 0 ? cXpoint : cXpoint + cWidth;
      let cYpoint = this.ypoint;
      let cColor = "white";
      let data = { name: e.name };
      // let card = new Card(cXpoint, cYpoint, cWidth, cHeith, cColor, data);
      this.cards.push(new Card(cXpoint, cYpoint, cWidth, cHeith, cColor, data));
    });
  }

  addCards(cards) {
    cards.forEach((e) => {
      this.addCard(e);
    });
  }

  addCard(card) {
    let cHeith = 150;
    let cWidth = cHeith * 0.8;
    let cXpoint = this.xpoint + cWidth * this.cards.length;
    let cYpoint = this.ypoint;
    let cColor = "white";
    let data = { name: card.name };
    this.cards.push(new Card(cXpoint, cYpoint, cWidth, cHeith, cColor, data));
  }

  draw(ctx) {
    this.cards.forEach((e) => {
      e.draw(ctx);
    });
  }

  hover(ctx, mouseX, mouseY) {
    this.cards.forEach((e) => {
      e.hover(ctx, mouseX, mouseY);
    });
  }

  click(ctx, mouseX, mouseY) {
    this.cards.forEach((e) => {
      e.click(ctx, mouseX, mouseY);
    });
  }

  update(ctx) {
    this.draw(ctx);
  }
}
