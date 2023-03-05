import { Drawer, IDrawer, IPosition, defaultPosition } from ".";


export class Line extends Drawer {
    private start: IPosition;
    private end: IPosition;

    constructor() {
        super();
        this.start = defaultPosition();
        this.end = defaultPosition();
    }

    public change(attr: Partial<Line>): void {
        throw new Error("Method not implemented.");
    }

    public drawing(ctx: CanvasRenderingContext2D): void {
        const { start, end, color, lineWidth } = this;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.restore();
    }
    
}