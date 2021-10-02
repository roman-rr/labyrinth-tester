var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
export default function main(game, start) {
    return __awaiter(this, void 0, void 0, function* () {
        let state;
        let isFinished;
        let currentX = start.x;
        let currentY = start.y;
        yield game.right(currentX, currentY);
        currentX += 1;
        while (!isFinished) {
            state = yield game.state(currentX, currentY);
            isFinished = state.finish;
            // console.log('state', state);
            // console.log('finished ?', isFinished.finish);
            if (state.bottom) {
                yield game.down(currentX, currentY);
                currentY += 1;
                continue;
            }
            if (state.right) {
                yield game.right(currentX, currentY);
                currentX += 1;
                continue;
            }
            // if (state.right) {
            //     await game.right(currentX, currentY);
            //     currentX += 1;
            //     continue;
            // } 
            // if (state.bottom) {
            //     await game.down(currentX, currentY);
            //     currentY += 1;
            //     continue;
            // }
            // if (state.left) {
            //     await game.left(currentX, currentY);
            //     currentX -= 1;
            //     continue;
            // } 
            // if (state.top) {
            //     await game.up(currentX, currentY);
            //     currentY -= 1;
            //     continue;
            // } 
        }
        return ({ x: currentX, y: currentY });
    });
}
// state(x: number, y: number): Promise<{
//     top: boolean; // можно ли шагать вверх
//     bottom: boolean; // можно ли шагать вниз
//     left: boolean; // можно ли шагать влево
//     right: boolean; // можно ли шагать вправо
//     start: boolean; // ячейка - стартовая
//     finish: boolean; // ячейка - финиш
// }>;
