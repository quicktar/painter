
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
    const history: ILine[] = [];
    let active: ILine | null = null;

    function drawLine(crc: CanvasRenderingContext2D) {
        container.width = container.width;
        for (const line of history) {
            const { start, end } = line;
            crc.save();
            crc.fillStyle = 'black';
            crc.strokeStyle = 'green';
            crc.moveTo(start.x, start.y);
            crc.lineTo(end.x, end.y);
            crc.stroke();
            crc.restore();
        }
    }
    // 绘制line
    let start: IPosition | null = null;
    let end: IPosition | null = null;
    container.addEventListener('mousedown', (event) => {
        start = {
            x: event.offsetX,
            y: event.offsetY,
        };
    });
    container.addEventListener('mousemove', (event) => {
        end = {
            x: event.offsetX,
            y: event.offsetY,
        };
        if (crc && start && end) {
            if (!active) {
                active = {
                    start,
                    end
                };
                history.push(active);
            } else {
                active.end = end;
            }
            drawLine(crc);
        }
    });
    container.addEventListener('mouseup', (event) => {
        
        end = {
            x: event.offsetX,
            y: event.offsetY,
        };
        if (crc && start && end) {
            if (active) {
                active.end = end;
            }
            drawLine(crc);
        }
        active = null;
        start = null;
        end = null;
    });
}

