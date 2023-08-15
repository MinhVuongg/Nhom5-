import { CANVAS_DEFAULT_STYLE } from "../utils/constants.js";
export default class Player {
  constructor(xpoint, ypoint, width, height, color) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isHover = false;
    this.isChoose = false;
    this.hoverColor = "green";
    this.chooseColor = "orange";
    this.data = {
      maxHealthPoint: 3,
      healthPoint: 3,
      mainHero: {},
      subHero: {},
    };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.roundRect(this.xpoint, this.ypoint, this.width, this.height, 10);
    if (this.isChoose) {
      ctx.fillStyle = this.chooseColor;
      ctx.shadowColor = this.chooseColor;
      ctx.shadowBlur = 20;
    } else if (this.isHover) {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.hoverColor;
      ctx.shadowBlur = 20;
    } else {
      ctx.fillStyle = this.color;
    }

    ctx.closePath();
    ctx.fill();

    // reset style
    ctx.fillStyle = CANVAS_DEFAULT_STYLE.fillStyle;
    ctx.shadowColor = CANVAS_DEFAULT_STYLE.shadowColor;
    ctx.shadowBlur = CANVAS_DEFAULT_STYLE.shadowBlur;

    this.drawHealth(ctx);
  }

  drawHealth(ctx) {
    let radius = 10;
    let healthPointInTotal = this.data.healthPoint / this.data.maxHealthPoint;
    let healthColor =
      healthPointInTotal < 0.5
        ? "red"
        : healthPointInTotal < 1
        ? "yellow"
        : "green";

    for (let i = 0; i < this.data.maxHealthPoint; i++) {
      ctx.beginPath();
      let centerX = this.xpoint + radius;
      let centerY = this.ypoint + this.height - radius - radius * 2 * i;

      ctx.fillStyle = i >= this.data.healthPoint ? "gray" : healthColor;
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }

    // reset style
    ctx.fillStyle = CANVAS_DEFAULT_STYLE.fillStyle;
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
