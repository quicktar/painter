
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

/** 绘制对象基础属性 */
export interface IDrawerBase {
    // 旋转角度
    angle: number;
    isActived?: boolean;
    opacity: number;
    react: IDrawRect;
    type: EnumDrawerType;
}

/** 线状绘制 */
export interface ILineBase extends IDrawerBase {
    isClosed: boolean;
    isMulti: boolean;
    lineWidth: number;
    points: IPosition[];
    strokeColor: string;
    type: EnumDrawerType.Line;
}
/** 区域绘制 */
export interface IAreaBase extends Omit<ILineBase, 'type'> {
    isClosed: true;
    isMulti: true;
    fillColor: string;
    type: EnumDrawerType.Area;
}

/** 文本绘制 */
export interface ITextBase extends IDrawerBase {
    color: string;
    fontFamily: string;
    fontSize: number;
    type: EnumDrawerType.Text;
}

export enum EnumDrawerType {
    Line = 1,
    Area = 2,
    Text = 3,
    Mixed = 4,
}

export function genDrawerBase<T extends EnumDrawerType>(type: T) {
        switch (type) {
            case EnumDrawerType.Line: {
                const line: ILineBase = {
                    isClosed: false,
                    isMulti: false,
                    lineWidth: 1,
                    points: [],
                    strokeColor: "blue",
                    type: EnumDrawerType.Line,
                    angle: 0,
                    opacity: 0,
                    react: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    },
                };
                return line;
            }
            case EnumDrawerType.Area: {
                const area: IAreaBase = {
                    fillColor: "green",
                    type: EnumDrawerType.Area,
                    lineWidth: 1,
                    isClosed: true,
                    isMulti: true,
                    points: [],
                    strokeColor: "",
                    angle: 0,
                    opacity: 0,
                    react: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    },
                };
                return area;
            }
        }
        return null;
}