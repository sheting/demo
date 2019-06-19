function barChart(canvas, data, options) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.title = 'Canvas Demo';
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.padding = 50;
    this.bgColor = '#fff';
    this.fillColor = '#1E9FFF';
    this.axisColor = '#666';
    this.titleColor = '#000';
    this.hoverColor = '#f00';
    this.xLength = 0; // x轴上坐标点之间的长度
    this.yLength = 0; // y轴上坐标点之间的长度
    this.yNumber = 5; // y轴的段数
    this.yFictitious = 0; // y轴坐标点之间显示的间距
    this.looped = null; // 是否循环
    this.current = 0; // 当前加载柱状图高度的百分数
    this.currentIndex = -1; // 当前柱的index
    this.onceMove = -1;
    this.titlePosition = 'top'; // 图标标题
    this.contentColor = '#eee'; // 内容颜色
    this.data = data;
    this.dataLength = this.data.length;
    this.colors = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
    this.init(options)
}
barChart.prototype = {
    init: function(options) {
        if (options) {
            this.padding = options.padding || 50;
            this.yNumber = options.yNumber || 5;
            this.bgColor = options.bgColor || '#fff';
            this.axisColor = options.axisColor || '#666';
            this.fillColor = options.fillColor || '#1E9FFF';
            this.title = options.title || 'Canvas Demo';
            this.titleColor = options.titleColor || '#000';
            this.titlePosition = options.titlePosition || 'top';
            this.contentColor = options.contentColor || '#eee';
            this.hoverColor = options.hoverColor || '#f00';
        }
        this.xLength = Math.floor((this.width - this.padding * 2 - 10) / this.dataLength);
        this.yLength = Math.floor((this.height - this.padding * 2 - 10) / this.yNumber);
        this.yFictitious = this.getYFictitious(this.data);
        this.yRatio = this.yLength / this.yFictitious;
        this.looping()
    },
    drawAxis: function() {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.axisColor;
        // y轴线
        this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5);
        this.ctx.lineTo(this.padding + 0.5, this.padding + 0.5);
        // x轴线
        this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5);
        this.ctx.lineTo(this.width - this.padding + 0.5, this.height - this.padding + 0.5);
        // 绘制线
        this.ctx.stroke();
    },
    drawPoint: function() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.axisColor;
        this.ctx.textAlign = 'center';
        // x轴坐标点
        for (var i = 0; i < this.dataLength; i++) {
            var xAxis = this.data[i].xAxis;
            var xlen = this.xLength * (i + 1);
            this.ctx.moveTo(this.padding + xlen + 0.5, this.height - this.padding + 0.5);
            this.ctx.lineTo(this.padding + xlen + 0.5, this.height - this.padding + 5.5);
            this.ctx.fillText(xAxis, this.padding + xlen - this.xLength / 2, this.height - this.padding + 15);
        }
        // y轴
        this.ctx.beginPath();
        this.ctx.textAlign = 'right';
        for (var i = 0; i < this.yNumber; i++) {
            var ylen = this.yLength * (i + 1);
            var y = this.yFictitious * (i + 1);
            this.ctx.moveTo(this.padding, this.height - this.padding - ylen);
            this.ctx.lineTo(this.padding - 5, this.height - this.padding - ylen);
            this.ctx.fillText(y, this.padding - 10, this.height - this.padding - ylen + 5)
        }
        this.ctx.stroke();
    },
    looping: function () {
        this.looped = requestAnimationFrame(this.looping.bind(this));
        // current 用来计算当前柱状的高度占最终高度的百分之几，通过不断循环实现柱状上升的动画
        if (this.current < 100) {
            this.current = (this.current + 3) > 100 ? 100 : (this.current + 3);
            this.drawAnimation()
        } else {
            window.cancelAnimationFrame(this.looped);
            this.looped = null;
            this.watchHover();
        }
    },
    drawAnimation: function() {
        for (var i = 0; i < this.dataLength; i++) {
            var x = Math.ceil(this.data[i].value * this.current / 100 * this.yRatio);
            var y = this.height - this.padding - x;
            this.data[i].left = this.padding + this.xLength / 4 + this.xLength * i;
            this.data[i].top = y;
            this.data[i].right = this.padding + 3 * this.xLength / 4 + this.xLength * i;
            this.data[i].bottom = this.height - this.padding;
            this.drawUpdate();
        }
    },
    drawUpdate: function () {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.drawAxis();
        this.drawPoint();
        this.drawTitle();
        this.drawChart();
    },
    drawChart: function () {
        for (var i = 0; i < this.dataLength; i++) {
            if (this.currentIndex === i) this.ctx.fillStyle = this.hoverColor;
            else this.ctx.fillStyle = this.fillColor;
            this.ctx.fillRect(this.data[i].left, this.data[i].top, this.data[i].right - this.data[i].left, this.data[i].bottom - this.data[i].top);
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                this.data[i].value * this.current / 100,
                this.data[i].left + this.xLength / 4,
                this.data[i].top -5
            )
        }
    },
    drawTitle: function () {
        if (this.title) {
            this.ctx.beginPath();
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = this.titleColor;
            this.ctx.font = '16px Microsoft YaHei';
            if (this.titlePosition === 'bottom' && this.padding >=40) {
                this.ctx.fillText(this.title, this.width / 2, this.height - 5)
            } else {
                this.ctx.fillText(this.title, this.width / 2, this.padding / 2)
            }
        }
    },
    getYFictitious: function(data) {
        var arr = data.slice(0);
        arr.sort(function(a,b){
            return -(a.value-b.value);
        });
        var len = Math.ceil(arr[0].value / this.yNumber);
        var pow = len.toString().length - 1;
        pow = pow > 2 ? 2 : pow;
        return Math.ceil(len / Math.pow(10, pow)) * Math.pow(10, pow);
    },
    watchHover: function () {
        this.canvas.addEventListener('mousemove', (ev) => {
            ev = ev || window.event;
            this.currentIndex = -1;
            for (var i = 0; i < this.dataLength; i++) {
                if (ev.offsetX > this.data[i].left && ev.offsetX < this.data[i].right && ev.offsetY > this.data[i].top && ev.offsetY < this.data[i].bottom) {
                    this.currentIndex = i;
                    console.log('current-----', this.currentIndex)
                }
            }
            this.drawHover();
        })
    },
    drawHover: function() {
        if(this.currentIndex !== -1){
            if(this.onceMove === -1){
                this.onceMove = this.currentIndex;
                this.canvas.style.cursor = 'pointer';
                this.drawUpdate();
            }
        }else{
            if(this.onceMove !== -1){
                this.onceMove = -1;
                this.canvas.style.cursor = 'inherit';
                this.drawUpdate();
            }
        }
    }
}