export default async function main(node, start) {
    let state;
    let isFinished;
    let currentX = start.x;
    let currentY = start.y;
    let steps = [];

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

    while (!isFinished) {
        state = await node.state(currentX, currentY);

        console.log('ways to go', waysToGo(state));
        if (waysToGo(state)) {

            if (canGoDirecation('bottom', state)) {
                console.log('go forward bottom');
                await doStep('bottom');
                continue;
            }

            if (canGoDirecation('right', state)) {
                console.log('go forward right');
                await doStep('right');
                continue;
            }

            if (canGoDirecation('left', state)) {
                console.log('go forward left');
                await doStep('left');
                continue;
            }

            if (canGoDirecation('top', state)) {
                console.log('go forward top');
                await doStep('top');
                continue;
            }
        }

        if (!waysToGo(state)) {
            console.log('go back');
        }        

        console.log('steps', steps);
        break;
    }
    
    return ({ x: currentX, y: currentY });
}