export default async function main(node, start) {
    let state;
    let isFinished;
    let currentX = start.x;
    let currentY = start.y;
    let steps = [];
    let stepsDirections = [];

    let doStep = async(direction) => {
        if (direction === 'right') {
            await node.right(currentX, currentY);
            currentX += 1;
        } 

        if (direction === 'bottom') {
            await node.down(currentX, currentY);
            currentY += 1;
        }
        
        if (direction === 'left') {
            await node.left(currentX, currentY);
            currentX -= 1;
        } 

        if (direction === 'top') {
            await node.up(currentX, currentY);
            currentY -= 1;
        } 

        steps.push(`${currentX},${currentY}`);
        stepsDirections.push(direction);
    }

    const canGoDirecation = (dir, state) => {
        let value = false;
        if (dir === 'left') {
            if (state.left && !steps.includes(`${currentX - 1},${currentY}`))
                value = true;
        } 
        if (dir === 'right') {
            if (state.right && !steps.includes(`${currentX + 1},${currentY}`)) 
                value = true;
        }  
        if (dir === 'top') {
            if (state.top && !steps.includes(`${currentX},${currentY - 1}`)) 
                value = true;
        }
        if (dir === 'bottom') {
            if (state.bottom && !steps.includes(`${currentX},${currentY + 1}`)) 
                value = true;
        }
        return value;
    }

    const waysToGo = (state) => {
        let arr = [
            canGoDirecation('right', state), 
            canGoDirecation('left', state), 
            canGoDirecation('top', state), 
            canGoDirecation('bottom', state)
        ];
        return arr.filter(Boolean).length;
    };

    await doStep('right');

    let backStepsDirections = [];
    while (!isFinished) {
        state = await node.state(currentX, currentY);
        isFinished = state.finish;

        if (waysToGo(state)) {
            backStepsDirections = []; // clear

            if (canGoDirecation('bottom', state)) {
                await doStep('bottom');
                continue;
            }

            if (canGoDirecation('right', state)) {
                await doStep('right');
                continue;
            }

            if (canGoDirecation('left', state)) {
                await doStep('left');
                continue;
            }

            if (canGoDirecation('top', state)) {
                await doStep('top');
                continue;
            }
        }

        if (!waysToGo(state)) {
            if (!backStepsDirections.length) {
                backStepsDirections = stepsDirections;
            }

            let where = backStepsDirections[backStepsDirections.length - 1];
            switch(where) {
                case 'left': where = 'right'; break;
                case 'right': where = 'left'; break;
                case 'top': where = 'bottom'; break;
                case 'bottom': where = 'top'; break;
            }

            if (where === 'left' && state.left) {
                await node.left(currentX, currentY);
                currentX -= 1;
            }

            if (where === 'right' && state.right) {
                await node.right(currentX, currentY);
                currentX += 1;
            }

            if (where === 'bottom' && state.bottom) {
                await node.down(currentX, currentY);
                currentY += 1;
            }

            if (where === 'top' && state.top) {
                await node.up(currentX, currentY);
                currentY -= 1;
            }

            backStepsDirections = backStepsDirections.slice(0, -1);
            continue;
        }        

        break;
    }
    
    return ({ x: currentX, y: currentY });
}