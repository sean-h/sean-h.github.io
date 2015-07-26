var chaos = new function() {
  this.canvas = document.getElementById('canvas-chaos');
  this.context = this.canvas.getContext('2d');
  this.context.fillStyle = '#000000';

  this.points = [{x: 400, y: 200}, {x: 600, y: 600}, {x: 200, y: 600}];

  this.draw = function (iterations) {
    var context = this.context;
    var points = this.points;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.lineTo(points[2].x, points[2].y);
    context.closePath();
    context.stroke();

    var point = {x: 500, y: 500}

    for (var i = 0; i < iterations; i++) {
      var cornerPoint = points[Math.floor(Math.random() * 3)];
      point = {x: (point.x + cornerPoint.x) / 2, y: (point.y + cornerPoint.y) / 2}
      context.fillRect(point.x, point.y, 1, 1);
    }
    context.stroke();
  }

  this.render = function () {
    this.draw(document.getElementById('chaos-iterations').value);
  }
}
