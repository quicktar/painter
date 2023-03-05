
export interface IPosition {
    x: number;
    y: number;
}

export function defaultPosition(): IPosition {
    return {
        x: 0,
        y: 0,
    }
}

export interface IDrawRect extends IPosition {
    width: number;
    height: number;
}

export interface IDrawer {
    angle: number;
    color: string;
    fillColor: string;
    isActived?: boolean;
    opacity: number;
    react: IDrawRect;
    lineWidth: number;

    change<T extends IDrawer>(attr: Partial<T>): void;
    drawing(ctx: CanvasRenderingContext2D): void;

}

export abstract class Drawer implements IDrawer {
    public angle: number = 0;
    public color: string = 'black';
    public isActived?: boolean | undefined;
    public opacity: number = 1;
    public fillColor: string = 'black';
    public lineWidth: number = 1;
    private _react: IDrawRect;
    constructor() {
        this._react = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
    }

    public get react(): IDrawRect {
        return {...this._react};
    }

    public abstract change<T extends IDrawer>(attr: Partial<T>): void;
    public abstract drawing(ctx: CanvasRenderingContext2D): void;
   
}