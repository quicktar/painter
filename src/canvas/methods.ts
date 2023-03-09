import { ILineBase, IPosition } from "../drawers";


export function drawLine(ctx: CanvasRenderingContext2D, line: ILineBase): void {
    const {
        strokeColor,
        lineWidth,
        points,
        isClosed,
    } = line;
    if (points.length < 2) return;
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    for (let i = 0, len = points.length - 1; i < len; i++) {
        moveLine(ctx, points[i], points[i + 1]);
    }
    if (isClosed) {
        moveLine(ctx, points[points.length - 1], points[0])
    }
    ctx.stroke();
    ctx.restore();
}

export function drawArea(ctx: CanvasRenderingContext2D) {

}

function moveLine(ctx: CanvasRenderingContext2D, start: IPosition, end: IPosition) {
    // 修正线条
    ctx.moveTo(start.x - 0.5, start.y - 0.5);
    ctx.lineTo(end.x - 0.5, end.y - 0.5);
}