const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementById('star-container').appendChild(canvas);

const stars = [];
const starCount = 100; // 减少星星的数量

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createStar() {
    const star = {
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        radius: random(0.5, 2),
        brightness: random(0.5, 1.5),
        velocity: random(0.5, 2) // 星星垂直移动的速度
    };
    stars.push(star);
}

// 初始创建一定数量的星星
for (let i = 0; i < starCount; i++) {
    createStar();
}

// 定时添加新的星星
setInterval(createStar, 500); // 每500毫秒添加一颗新星星

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
        
        // 移动星星并检查是否需要重新生成
        star.y -= star.velocity; // 星星缓缓升空
        if (star.y < -star.radius) {
            star.y = canvas.height + star.radius; // 重新生成星星的位置
            star.x = random(0, canvas.width);
            star.velocity = random(0.5, 2); // 可能改变速度
        }
    }
}

animate();