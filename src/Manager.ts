import { EnumDrawerType, genDrawerBase, IDrawerBase, IDrawRect, ILineBase, IPosition } from "./drawers";


export interface IManager {
    /** 根据坐标激活绘制对象 */
    active(pos: IPosition): IDrawerBase | null;
    /** 根据选取激活绘制对象集合 */
    activeByArea(rect: IDrawRect): IDrawerBase[];
    canRedo(): boolean;
    canUndo(): boolean;
    change<T extends IDrawerBase>(attr: Partial<T>): boolean;

    drawEnd(pos?: IPosition): void;
    drawMove(pos: IPosition): void;
    drawStart(pos: IPosition, type: number): void;
    getActivedCurrent(): IDrawerBase[];
    getDrawers(): IDrawerBase[];
    redo(): void;
    undo(): void;
}

export class DrawerManager implements IManager {
    private activeIndexs: number[] = [];
    private drawIndex = -1;
    private levels: IDrawerBase[] = [];
    private redoList: any[] = [];
    private undoList: any[] = [];


    public active(pos: IPosition): IDrawerBase | null {
        return null;
    }
    activeByArea(rect: IDrawRect): IDrawerBase[] {
        throw new Error("Method not implemented.");
    }
    canRedo(): boolean {
        throw new Error("Method not implemented.");
    }
    canUndo(): boolean {
        throw new Error("Method not implemented.");
    }
    change<T extends IDrawerBase>(attr: Partial<T>): boolean {
        throw new Error("Method not implemented.");
    }
    public changeDrawType(type: string) {
        // const curType = checkType(type);
    }
    public drawEnd(pos: IPosition): void {
        if (this.drawIndex === -1) return;
        const drawer = this.levels[this.drawIndex] as ILineBase;
        if (drawer.isMulti) {
            drawer.points.push({...pos});
        } else {
            drawer.points.splice(1, 1, {...pos});
        }
        this.drawIndex = -1;
    }
    public drawMove(pos: IPosition): void {
        if (this.drawIndex === -1) return;
        const drawer = this.levels[this.drawIndex] as ILineBase;
        if (drawer.isMulti) {
            drawer.points.push({...pos});
        } else {
            drawer.points.splice(1, 1, {...pos});
        }
    }
    public drawStart(pos: IPosition, type: number): void {
        if (this.drawIndex !== -1) return;
        const line = genDrawerBase(EnumDrawerType.Line) as ILineBase;
        // line.isMulti = true;
        // line.isClosed = true;
        line.points.push(pos);
        this.drawIndex = this.levels.length;
        this.levels.push(line);
    }
    public getActivedCurrent(): IDrawerBase[] {
        const collection: IDrawerBase[] = [];
        for (const idx of this.activeIndexs) {
            collection.push(this.levels[idx]);
        }
        return collection;
    }
    getDrawers(): IDrawerBase[] {
        return [...this.levels];
    }
    redo(): void {
        throw new Error("Method not implemented.");
    }
    undo(): void {
        throw new Error("Method not implemented.");
    }

}