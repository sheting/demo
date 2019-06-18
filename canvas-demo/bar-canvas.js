function barChart(canvas, data, options) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.padding = 50;
    this.bgColor = '#fff';
    this.axisColor = '#666';
    this.xLength = 0; // x轴上坐标点之间的长度
    this.yLength = 0; // y轴上坐标点之间的长度
    this.yNumber = 5; // y轴的段数
    this.yFictitious = 0; // y轴坐标点之间显示的间距
    this.data = data;
    this.dataLength = this.data.length;
    this.init(options)
}
barChart.prototype = {
    init: function(options) {
        if (options) {
            this.padding = options.padding || 50;
            this.bgColor = options.bgColor || '#fff';
            this.axisColor = options.axisColor || '#666';
        }
        this.xLength = Math.floor((this.width - this.padding * 2 - 10) / this.dataLength);
        this.yLength = Math.floor((this.height - this.padding * 2 - 10) / this.yNumber);
        this.yFictitious = this.getYFictitious(this.data);
        this.yRatio = this.yLength / this.yFictitious;
        this.drawAxis();
        this.drawPoint();
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
    getYFictitious: function(data) {
        var arr = data.slice(0);
        arr.sort(function(a,b){
            return -(a.value-b.value);
        });
        var len = Math.ceil(arr[0].value / this.yNumber);
        var pow = len.toString().length - 1;
        pow = pow > 2 ? 2 : pow;
        return Math.ceil(len / Math.pow(10, pow)) * Math.pow(10, pow);
    }
}