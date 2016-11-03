const strashipWidth = 10;
const strashipHeight = 5;

const preparePercentSize = (canvas) => {
    const widthPercentToPx = (x) => Math.floor(x * canvas.width / 100);
    const heightPercentToPx = (y) => Math.floor(y * canvas.height / 100);
    return {widthPercentToPx, heightPercentToPx};
};

const buildStarship = function(implementation, canvas, isPlayer, index) {
    const context = canvas.getContext('2d');
    const {widthPercentToPx, heightPercentToPx} = preparePercentSize(canvas);
    const initPos = {
        x: widthPercentToPx(index * strashipWidth),
        y: heightPercentToPx(isPlayer ? 100 : 0),
        width: widthPercentToPx(strashipWidth),
        height: heightPercentToPx(strashipHeight)
    };
    return {
        pos: initPos,
        draw: (pos=initPos) => {
            context.beginPath();
            context.moveTo(pos.x, pos.y);
            context.lineTo(pos.x + pos.width, pos.y);
            if(isPlayer) {
                context.lineTo(pos.x + pos.width / 2, pos.y - pos.height);
            } else {
                context.lineTo(pos.x + pos.width / 2, pos.y + pos.height);
            }
            context.fill();
            return pos;
        }
    };
};

export const buildStarships = (implementations, canvas) => {
    const starchips = implementations.map((implementation, index) => {
        return buildStarship(implementation, canvas, false, index);
    }).concat(buildStarship(null, canvas, true, 0));
    const ctrl = {
        clearAndDraw: () => {
            canvas.width = 80 * window.innerWidth / 100;
            canvas.height = 80 * window.innerHeight / 100;
            starchips.forEach(s => s.pos = s.draw(s.pos));
        },
        move: () => {
            starchips.forEach((s) => s.pos.x = s.pos.x + strashipWidth);
            ctrl.clearAndDraw();
        }
    };
    return ctrl;
};