var dragon = new function() {
  this.canvas = document.getElementById('canvas-dragon');
  this.context = this.canvas.getContext('2d');
  this.context.fillStyle = '#000000';

  this.steps = ['F', 'FLF'];

  this.reverse = function (lines) {
    var newLines = lines.replace(/L/g, 'A');
    newLines = newLines.replace(/R/g, 'B');
    newLines = newLines.replace(/A/g, 'R');
    newLines = newLines.replace(/B/g, 'L');

    return newLines.split("").reverse().join("");
  }

  for (var i = 2; i < 16; i++) {
    var prev = this.steps[this.steps.length-1];
    this.steps.push(prev.concat('L', this.reverse(prev)));
  }

  this.clearCanvas = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.render = function () {
    var x = 600;
    var y = 300;
    var moveDistance = 5;
    var facing = 1;

    var lastStep = this.steps[this.steps.length-1];
    var iteration = document.getElementById('iteration-select').value - 1;
    var sequence = this.steps[iteration];
    
    var context = this.context;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.beginPath();
    context.moveTo(x, y);
    for (var i = 0; i < sequence.length; i++) {
      switch (sequence[i]) {
        case 'F':
          switch (facing) {
              case 0:
                y += moveDistance;
                break;
              case 1:
                x += moveDistance;
                break;
              case 2:
                y -= moveDistance;
                break;
              case 3:
                x -= moveDistance;
                break;
          }
          context.lineTo(x, y);
          context.moveTo(x, y);
          break;
        case 'L':
          facing = (facing + 1) % 4;
          break;
        case 'R':
          facing = facing - 1;
          facing = ((facing % 4) + 4) % 4;
          break;
      }
    };

    context.stroke();
  }
}
