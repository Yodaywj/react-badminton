const drawCaptcha = (width, height, code, canvasRef) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const chars = code.split('');
    const charCount = chars.length;
    const colors = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#8BC34A', '#FFC107'];

    // 绘制背景色
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, width, height);

    // 绘制字符和干扰线
    chars.forEach((char, index) => {
        const fontSize = 30 + Math.floor(Math.random() * 10);
        const color = colors[Math.floor(Math.random() * colors.length)];

        // 绘制字符
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.fillText(char, (index + 1) * (width / (charCount + 1)) - fontSize / 2, height / 2 + fontSize / 2 - 5);

        // 绘制干扰线
        ctx.strokeStyle = color;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }
    });
};


export default drawCaptcha;
