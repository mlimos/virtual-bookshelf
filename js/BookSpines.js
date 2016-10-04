//Class to draw bookspines in the canvas

var BookSpine = (function() {

    // constructor
    function BookSpine(id, x, y, width, height, fill, stroke, strokewidth, context) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = width;
        this.height = height;
        this.fill = fill || "gray";
        this.stroke = stroke || "skyblue";
        this.strokewidth = strokewidth || 2;
        this.context = context;
        this.redraw(this.x, this.y, this.context);
        return (this);
    }
    BookSpine.prototype.redraw = function(x, y, context) {
            this.x = x || this.x;
            this.y = y || this.y;
            this.draw(this.stroke, this.context);
            return (this);
        }
        //
    BookSpine.prototype.highlight = function(x, y, context) {
            console.log('gets here');
            console.log('this: ' + JSON.stringify(this));
            this.x = x || this.x;
            this.y = y || this.y;
            this.draw("orange", this.context);
            return (this);
        }
        //
    BookSpine.prototype.draw = function(stroke, context) {

            context.save();
            context.beginPath();
            context.fillStyle = this.fill;
            context.strokeStyle = stroke;
            context.lineWidth = this.strokewidth;
            context.rect(this.x, this.y, this.width, this.height);
            context.stroke();
            context.fill();
            context.restore();
        }
        //
    BookSpine.prototype.isPointInside = function(x, y) {
        return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
    }

    BookSpine.prototype.drawTitleTooltip = function(x, y, title, tipCanvas, tipCtx) {

      //Get length of text to dynamically set the tooltip canvas to the length of the text + buffer space

      var titleLength = tipCtx.measureText(title).width;
      tipCanvas.width = titleLength + 10;

      //console.log(tipCanvas.width);

      tipCanvas.style.left = (x + 10) + "px";
      tipCanvas.style.top = (y + 25) + "px";

      tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
      tipCtx.font = "15px Helvetica";
      tipCtx.fillColor = 'black';

      tipCtx.fillText(title, 5, 18);

    }

    return BookSpine;

})();
