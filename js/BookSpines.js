//Class to draw bookspines in the canvas

var BookSpine = (function() {

    // constructor
    function BookSpine(id, author, x, y, width, height, fill, stroke, strokewidth, context) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.author = author;
        this.width = width;
        this.height = height;
        this.fill = fill || "gray";
        this.stroke = stroke || "skyblue";
        this.strokewidth = strokewidth || 5;
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
            //console.log('gets here');
            //console.log('this: ' + JSON.stringify(this));
            this.x = x || this.x;
            this.y = y || this.y;
            //console.log(this.strokewidth);
            this.draw("yellow", this.context);
            return (this);
        }
        //
    BookSpine.prototype.draw = function(stroke, context) {
          //console.log("stroke width: " + this.strokewidth);
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

    BookSpine.prototype.drawTitleTooltip = function(x, y, title, author, tipCanvas, tipCtx) {

      //Get length of text to dynamically set the tooltip canvas to the length of the text + buffer space

      var titleLength = tipCtx.measureText(title).width;
      var authorLength = tipCtx.measureText(author + 'by ').width;
      tipCanvas.width = titleLength > authorLength ? titleLength + 10 : authorLength + 10;
      //tipCanvas.width = titleLength + 10;
      tipCanvas.height = 35;

      tipCanvas.style.left = (x + 10) + "px";
      tipCanvas.style.top = (y + 25) + "px";

      tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
      tipCtx.font = "15px Helvetica";
      tipCtx.fillColor = 'black';

      tipCtx.textAlign = "center";
      //tipCtx.fillText(title, 5, 18);
      tipCtx.fillText(title, tipCanvas.width / 2, 18);
      tipCtx.fillText('by: ' + author, tipCanvas.width / 2, 30);
    }

    return BookSpine;

})();
