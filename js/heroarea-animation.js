// ヒーローエリアの背景アニメーション
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let streamLines = [];
    let animationId;
    
    // キャンバスサイズ設定
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    
    // HSL色を16進数に変換
    function hslToHex(h, s, l) {
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let r, g, b;
        
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    // キラキラ光る破片（パーティクル）クラス
    class GlitterParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 100; // 奥行き感
            this.size = Math.random() * 4; // 大きいサイズ（0-4）
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.speedZ = (Math.random() - 0.5) * 0.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            
            // HSL色空間でカラフルな色を生成
            const hue = 200 + Math.random() * 100; // 青〜青緑系
            const saturation = 0.6 + Math.random() * 0.4;
            const lightness = 0.5 + Math.random() * 0.3;
            this.color = hslToHex(hue, saturation, lightness);
            this.opacity = 0.6 + Math.random() * 0.4;
            
            // 形状をランダムに選択
            this.shape = Math.floor(Math.random() * 4); // 0:円, 1:四角, 2:三角, 3:ダイヤ
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.z += this.speedZ;
            this.rotation += this.rotationSpeed;
            
            // 画面外に出たら反対側から再登場
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
            if (this.z < 0) this.z = 100;
            if (this.z > 100) this.z = 0;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // 奥行きによるサイズ調整
            const scale = (100 - this.z) / 100;
            const drawSize = this.size * scale;
            const drawOpacity = this.opacity * scale;
            
            ctx.fillStyle = this.color + Math.floor(drawOpacity * 255).toString(16).padStart(2, '0');
            
            // 形状に応じて描画
            switch(this.shape) {
                case 0: // 円
                    ctx.beginPath();
                    ctx.arc(0, 0, drawSize, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 1: // 四角
                    ctx.fillRect(-drawSize, -drawSize, drawSize * 2, drawSize * 2);
                    break;
                case 2: // 三角
                    ctx.beginPath();
                    ctx.moveTo(0, -drawSize);
                    ctx.lineTo(-drawSize, drawSize);
                    ctx.lineTo(drawSize, drawSize);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 3: // ダイヤ
                    ctx.beginPath();
                    ctx.moveTo(0, -drawSize);
                    ctx.lineTo(drawSize, 0);
                    ctx.lineTo(0, drawSize);
                    ctx.lineTo(-drawSize, 0);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        }
    }
    
    // 背景で動くランダムな線クラス
    class StreamLine {
        constructor() {
            this.points = [];
            this.speed = Math.random() * 0 + 0.02; // ゆっくりとした速度に変更
            this.opacity = Math.random() * 0.3 + 0.1;
            this.color = hslToHex(200 + Math.random() * 60, 0.5, 0.4);
            
            // ランダムな線の点を生成（左右均等に配置）
            const pointCount = Math.floor(Math.random() * 10) + 15; // 点数も増加
            const margin = canvas.width * 0.3; // マージンを調整
            for (let i = 0; i < pointCount; i++) {
                this.points.push({
                    x: Math.random() * (canvas.width + margin * 2) - margin, // 左右均等に配置
                    y: Math.random() * (canvas.height + margin) - margin * 0.5, // 上下も調整
                    z: Math.random() * 200 - 100
                });
            }
        }
        
        update() {
            // 線をゆっくりと奥に吸い込まれるように移動
            this.points.forEach(point => {
                point.z -= this.speed; // 奥に向かって移動
                if (point.z < -100) {
                    point.z = 100; // 手前から再スタート
                    const margin = canvas.width * 0.3;
                    point.x = Math.random() * (canvas.width + margin * 2) - margin; // 左右均等に配置
                    point.y = Math.random() * (canvas.height + margin) - margin * 0.5; // 上下も調整
                }
            });
        }
        
        draw() {
            if (this.points.length < 2) return;
            
            ctx.strokeStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            let firstPoint = true;
            this.points.forEach(point => {
                // 奥行きによる位置調整
                const scale = (100 + point.z) / 200;
                const drawX = point.x * scale + (canvas.width * (1 - scale)) / 2;
                const drawY = point.y * scale + (canvas.height * (1 - scale)) / 2;
                
                if (scale > 0.1) { // 見える範囲のみ描画
                    if (firstPoint) {
                        ctx.moveTo(drawX, drawY);
                        firstPoint = false;
                    } else {
                        ctx.lineTo(drawX, drawY);
                    }
                }
            });
            
            ctx.stroke();
        }
    }
    
    // キラキラパーティクル初期化
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 4000) + 100; // 数を大幅に増加
        for (let i = 0; i < particleCount; i++) {
            particles.push(new GlitterParticle());
        }
    }
    
    // 背景ストリーム線初期化
    function initStreamLines() {
        streamLines = [];
        const lineCount = Math.floor((canvas.width * canvas.height) / 15000) + 1; // 線の密度を減少
        for (let i = 0; i < lineCount; i++) {
            streamLines.push(new StreamLine());
        }
    }
    
    // グリッド線を描画（削除済み）
    function drawGrid() {
        // グリッド線は削除されました
    }
    
    // アニメーション
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 1. 背景の青い方眼紙グリッドを描画
        drawGrid();
        
        // 2. 背景で動くランダムな線を描画・更新
        streamLines.forEach(streamLine => {
            streamLine.update();
            streamLine.draw();
        });
        
        // 3. キラキラ光る破片（パーティクル）を描画・更新
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // 初期化と開始
    setCanvasSize();
    initParticles();
    initStreamLines();
    animate();
    
    // リサイズ対応
    window.addEventListener('resize', () => {
        setCanvasSize();
        initParticles();
        initStreamLines();
    });
});
