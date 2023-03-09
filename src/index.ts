import { Painter } from "./Painter";

interface IPosition {
    x: number;
    y: number;
}

interface ILine {
    start: IPosition;
    end: IPosition;
}

/**
 * 创建一个画布绘图对象
 * @param container canvas对象
 */
export function createPainter(container: HTMLCanvasElement) {
    if (!container) return null;
    const crc = container.getContext('2d');
    if (!crc) return;
    const painter = new Painter(container, crc);
    (window as any).paint = painter;
}

