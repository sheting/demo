function barChart(canvas) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.padding = 50;
    console.log('in-----',  this.canvas, this.ctx, this.width, this.height)
    this.init()
}
barChart.prototype = {
    init: function() {
        this.drawAxis()
    },
    drawAxis: function() {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000000';
        // y轴线
        this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5);
        this.ctx.lineTo(this.padding + 0.5, this.padding + 0.5);
        this.ctx.stroke();
        // x轴线
        this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5);
        this.ctx.lineTo(this.width - this.padding + 0.5, this.height - this.padding + 0.5);
        this.ctx.stroke();
    }
}