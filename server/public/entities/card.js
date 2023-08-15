import { CANVAS_DEFAULT_STYLE } from "../utils/constants.js";

export default class Card {
  constructor(xpoint, ypoint, width, height, color, data) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.width = width;
    this.height = height;
    this.color = color;
    this.data = data;

    this.isHover = false;
    this.isChoose = false;
    this.hoverColor = "green";
    this.chooseColor = "orange";
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.roundRect(this.xpoint, this.ypoint, this.width, this.height, 10);

    // Create gradient
    var gradient = ctx.createLinearGradient(
      this.xpoint,
      this.ypoint + this.height,
      this.xpoint + this.width,
      this.ypoint
    );
    gradient.addColorStop(0, "#662D8C");
    gradient.addColorStop(1, "#ED1E79");

    if (this.isChoose) {
      ctx.fillStyle = this.chooseColor;
      ctx.shadowColor = this.chooseColor;
      ctx.shadowBlur = 20;
    } else if (this.isHover) {
      // ctx.fillStyle = this.hoverColor;
      // ctx.shadowColor = this.hoverColor;
      ctx.fillStyle = gradient;
      ctx.shadowColor = "black";
      ctx.shadowBlur = 20;
    } else {
      ctx.fillStyle = gradient;
    }

    ctx.fill();
    ctx.font = "20px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "white";
    let cardName = this.data ? this.data.name : "Card";
    ctx.fillText(
      cardName,
      this.xpoint + this.width / 2,
      this.ypoint + this.height / 2
    );

    ctx.closePath();

    // reset style
    ctx.fillStyle = CANVAS_DEFAULT_STYLE.fillStyle;
    ctx.shadowColor = CANVAS_DEFAULT_STYLE.shadowColor;
    ctx.shadowBlur = CANVAS_DEFAULT_STYLE.shadowBlur;
    ctx.font = CANVAS_DEFAULT_STYLE.font;
    ctx.textAlign = CANVAS_DEFAULT_STYLE.textAlign;
    ctx.textBaseline = CANVAS_DEFAULT_STYLE.textBaseline;
  }

  hover(ctx, mouseX, mouseY) {
    ctx.beginPath();
    ctx.rect(this.xpoint, this.ypoint, this.width, this.height);
    ctx.closePath();
    this.isHover = ctx.isPointInPath(mouseX, mouseY) ? true : false;
  }

  click(ctx, mouseX, mouseY) {
    ctx.beginPath();
    ctx.rect(this.xpoint, this.ypoint, this.width, this.height);
    ctx.closePath();
    if (ctx.isPointInPath(mouseX, mouseY)) this.isChoose = !this.isChoose;
  }

  update(ctx) {
    this.draw(ctx);
  }
}
