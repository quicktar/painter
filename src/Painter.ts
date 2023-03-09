import { DrawerManager, IManager } from "./Manager";
import { IPosition } from "./drawers";
import { drawFactory } from "./canvas";

export class Painter {
    /** 用来管理绘制操作和绘制对象 */
    private manager: IManager;
    constructor(
        private readonly canvas: HTMLCanvasElement, 
        private readonly ctx: CanvasRenderingContext2D
    ) {
        this.manager = new DrawerManager();
        this.canvas.setAttribute("tabIndex", "-1");
        this.mountEvent();
    }

    public exec(command: string): void {
        console.log(command);
    }

    private drawing() {
        // 清空画布
        this.canvas.width = this.canvas.width;
        for (const drawer of this.manager.getDrawers()) {
            drawFactory(this.ctx, drawer);
        }
    }

    private getPosition(event: MouseEvent): IPosition {
        return { x: event.offsetX, y: event.offsetY };
    }
    private handleMouseDown = (event: MouseEvent) => {
        this.manager.drawStart(this.getPosition(event), 0);
    }
    private handleMouseLeave = (event: MouseEvent) => {
        // this.manager.drawEnd(this.getPosition(event));
        // this.drawing();
    }
    private handleMouseMove = (event: MouseEvent) => {
        this.manager.drawMove(this.getPosition(event));
        this.drawing();
    }
    private handleMouseUp = (event: MouseEvent) => {
        this.manager.drawEnd(this.getPosition(event));
        this.drawing();
    }

    private mountEvent() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseleave', this.handleMouseLeave)
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
    }

    private unmountEvent() {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
    }
}