import { IDrawer, IPosition } from "./drawers";
import { Line } from "./drawers/Line";


export class Manager {
    /** 图层集合 */
    private levels: IDrawer[] = [];
    private active: IDrawer | null = null;
    private index: number = -1;

    public get canRedo(): boolean {
        return this.index < this.levels.length - 1;
    }
    public get canUndo(): boolean {
        return this.index !== -1;
    }

    public drawing(canvas: HTMLCanvasElement ,ctx: CanvasRenderingContext2D): void {
        canvas.width = canvas.width;
    }

    public mouseDown(pos: IPosition): void {
        const line = this.active = new Line();
        

    }

    public mouseMove(pos: IPosition): void {

    }

    public mouseUp(pos: IPosition) {

    }

    public undo(): void {
        if (!this.canUndo) return;
    }

    public redo(): void {
        if (!this.canRedo) return;
    }
}