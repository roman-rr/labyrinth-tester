// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
export default async function main(game, start) {
    let state;
    let isFinished;
    let currentX = start.x;
    let currentY = start.y;

    await game.right(currentX, currentY);
    currentX += 1;


    while (!isFinished) {
        state = await game.state(currentX, currentY);
        isFinished = state.finish;
        // console.log('state', state);
        // console.log('finished ?', isFinished.finish);

        if (state.bottom) {
            await game.down(currentX, currentY);
            currentY += 1;
            continue;
        }

        if (state.right) {
            await game.right(currentX, currentY);
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
}


// state(x: number, y: number): Promise<{
//     top: boolean; // можно ли шагать вверх
//     bottom: boolean; // можно ли шагать вниз
//     left: boolean; // можно ли шагать влево
//     right: boolean; // можно ли шагать вправо
//     start: boolean; // ячейка - стартовая
//     finish: boolean; // ячейка - финиш
// }>;