import { createPainter } from "./src";


(function (){
    const canvas = document.querySelector('canvas#painter') as HTMLCanvasElement;
    if (canvas) {
        createPainter(canvas);
    }
})()
console.log('test');