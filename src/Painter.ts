import { Manager } from "./Manager";
import { IPosition } from "./drawers";

export class Painter {
    private manager;
    constructor(
        private readonly canvas: HTMLCanvasElement, 
        private readonly ctx: CanvasRenderingContext2D
    ) {
        this.manager = new Manager();
    }

    private getPosition(event: MouseEvent): IPosition {
        return { x: event.offsetX, y: event.offsetY };
    }
    private handleMouseDown = (event: MouseEvent) => {
        this.manager.mouseDown(this.getPosition(event));
    }
    private handleMouseMove = (event: MouseEvent) => {
        this.manager.mouseMove(this.getPosition(event));
        this.manager.drawing(this.canvas, this.ctx);
    }
    private handleMouseUp = (event: MouseEvent) => {
        this.manager.mouseUp(this.getPosition(event));
        this.manager.drawing(this.canvas, this.ctx);
    }

    private mountEvent() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
    }

    private unmountEvent() {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
    }
}