import { IDrawerBase, EnumDrawerType, ILineBase } from '../drawers';
import { drawLine } from './methods';

export * from './methods';

export function drawFactory(ctx: CanvasRenderingContext2D, drawer: IDrawerBase): void {
    switch (drawer.type) {
        case EnumDrawerType.Line: {
            return drawLine(ctx, drawer as ILineBase);
        }
        case EnumDrawerType.Area: {
            
        }
    }
}