// Mixing jQuery and Node.js code in the same file? Yes please!
$(function() {

    // Display some statistics about this computer, using node's os module.

    var os = require('os');
    var prettyBytes = require('pretty-bytes');

    // Electron's UI library. We will need it for later.

    var shell = require('shell');


    // Fetch the recent posts on Tutorialzine.

    var ul = $('.flipster ul');
    var serializer = new XMLSerializer();
    var booksContainerToRead = [];
    var booksContainerCurrentlyReading = [];
    var booksContainerRead = [];
    //var booksContainer = [];

    var canvasOffsetToRead = $("#toReadCanvas").offset();
    var canvasOffsetRead = $("#readCanvas").offset();
    var canvasOffsetCurrentlyReading = $("#currentlyReadingCanvas").offset();
    //var canvasTest = document.getElementById('toReadCanvas');
    //var contextTest = canvasTest.getContext('2d');

     function handleMouseHover(e) {

        var offsetXToRead = canvasOffsetToRead.left;
        var offsetYToRead = canvasOffsetToRead.top;
        var offsetXRead = canvasOffsetRead.left;
        var offsetYRead = canvasOffsetRead.top;
        var offsetXCurrentlyReading = canvasOffsetCurrentlyReading.left;
        var offsetYCurrentlyReading = canvasOffsetCurrentlyReading.top;
        var mouseXToRead = parseInt(e.pageX - offsetXToRead);
        var mouseYToRead = parseInt(e.pageY - offsetYToRead);
        var mouseXRead = parseInt(e.pageX - offsetXRead);
        var mouseYRead = parseInt(e.pageY - offsetYRead);
        var mouseXCurrentlyReading = parseInt(e.pageX - offsetXCurrentlyReading);
        var mouseYCurrentlyReading = parseInt(e.pageY - offsetYCurrentlyReading);

        var offTest = false;

        // Put your mousemove stuff here

        for (var i = 0; i < booksContainerToRead.length; i++) {
          //console.log('book: ' + i + ', ' + booksContainer[i].redraw);
          if (booksContainerToRead[i].isPointInside(mouseXToRead, mouseYToRead)) {
            console.log('title:' + booksContainerToRead[i].id)
            booksContainerToRead[i].highlight();

            booksContainerToRead[i].drawText(e.pageX, e.pageY, booksContainerToRead[i].id);


          }
          else {
            booksContainerToRead[i].redraw();

          }
        }

        for (var i = 0; i < booksContainerRead.length; i++) {
          //console.log('book: ' + i + ', ' + booksContainer[i].redraw);
          if (booksContainerRead[i].isPointInside(mouseXRead, mouseYRead)) {
            booksContainerRead[i].highlight();
            //DrawShelf(canvasTest, contextTest);
          }
          else {
            //DrawShelf(canvasTest, contextTest);
            booksContainerRead[i].redraw();
          }
        }

        for (var i = 0; i < booksContainerCurrentlyReading.length; i++) {
          //console.log('book: ' + i + ', ' + booksContainer[i].redraw);
          if (booksContainerCurrentlyReading[i].isPointInside(mouseXCurrentlyReading, mouseYCurrentlyReading)) {
            booksContainerCurrentlyReading[i].highlight();
            //DrawShelf(canvasTest, contextTest);
          }
          else {
            //DrawShelf(canvasTest, contextTest);
            booksContainerCurrentlyReading[i].redraw();
          }
        }
    }

    //call main
    main();

    function main() {
        GoodReadsCallout('to-read', 'toReadCanvas');
        GoodReadsCallout('currently-reading', 'currentlyReadingCanvas');
        GoodReadsCallout('read', 'readCanvas');

        $(document).mousemove(handleMouseHover);

        /*$("#toReadCanvas").mousemove(handleMouseHoverToRead);


        $('#readCanvas').mousemove(handleMouseHoverRead);*/
        //$("#read").mousemove(handleMouseHoverCurrentlyReading);


    }

    function GoodReadsCallout(shelfParam, canvasId){
      $.get('https://www.goodreads.com/review/list?v=2&id=21709595&shelf=' + shelfParam + '&key=xtrmhqHu1ByJB77703Mlw', function(response){
          console.log('get response: ' + response);

          var bookInfo = GetBookInfo(response);

          DrawShelf(canvasId);
          DrawBookSpines(bookInfo, canvasId);

          /*DrawBookSpines(pageLengths, canvas, context);
          console.log('page lengths array: ' + pageLengths);*/

      });
    }

    //Get page lengths for all books from response
    function GetBookInfo(xmlResponse) {

      var returnObject = {};
      //var titleObject = {pageLength : ''};

      var xml = $(xmlResponse);
      var pageLengthsContainer = [];
      var pageCounterLoop = 0;

      //Getting book titles
      xml.find('title').each(function() {
        var title = $(this).text();

        returnObject[title] = {};
        //returnObject[title].title = title;

      });

      //Getting page lengths
      xml.find('num_pages').each(function(){
          var pageLength = $(this).text();
          //pageLength = parseInt(pageLength);

          //Setting default for when xml returns an empty page length element
          if (pageLength == '') {
            pageLength = '250';
          }
          pageLengthsContainer.push(pageLength);

      });

      for (var title in returnObject) {
        returnObject[title].pageLength = pageLengthsContainer[pageCounterLoop];
        pageCounterLoop++;
      }
      //console.log('return object: ' + JSON.stringify(returnObject));

      return returnObject;
    }

    //Draw book spines on canvas
    function DrawBookSpines(bookInfo, canvasId) {
        console.log('canvas id in draw book spines function: ' + canvasId);
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');
        //var canvas = document.getElementById('myCanvas');
        //var context = canvas.getContext('2d');
        var bookWidthTotal = 15;

        for (var book in bookInfo) {
          console.log(book);

          var bookWidth = bookInfo[book].pageLength * .1;
          var bookSpacing = (bookInfo[book].pageLength * .1) + 25;
          var color = GetRandomColor();

          if (canvasId == 'toReadCanvas') {
              booksContainerToRead.push(new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context));
          }
          else if (canvasId == 'currentlyReadingCanvas') {
              booksContainerCurrentlyReading.push(new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context));
          }
          else if (canvasId == 'readCanvas'){
              booksContainerRead.push(new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context));
          }

          bookWidthTotal = bookWidthTotal + bookWidth + 15;

        }
    }

    function DrawShelf(canvasId) {

      var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');

      context.beginPath();
      context.rect(10, 250, 1200, 10);
      context.fillStyle = '#654321';
      context.fill();
      context.lineWidth = 3;
      context.strokeStyle = '#381904';
      context.stroke();

    }

    function GetRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }



    /*var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.rect(20,20,150,100);
    ctx.stroke();*/

    // The same-origin security policy doesn't apply to electron, so we can
    // send ajax request to other sites. Let's fetch Tutorialzine's rss feed:

    /* $.get('http://feeds.feedburner.com/Tutorialzine', function(response){

         var rss = $(response);

         // Find all articles in the RSS feed:

         rss.find('item').each(function(){
             var item = $(this);

             var content = item.find('encoded').html().split('</a></div>')[0]+'</a></div>';
             var urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;

             // Fetch the first image of the article.
             var imageSource = content.match(urlRegex)[1];


             // Create a li item for every article, and append it to the unordered list.

             var li = $('<li><img /><a target="_blank"></a></li>');

             li.find('a')
                 .attr('href', item.find('link').text())
                 .text(item.find("title").text());

             li.find('img').attr('src', imageSource);

             li.appendTo(ul);

         });

         // Initialize the flipster plugin.

         $('.flipster').flipster({
             style: 'carousel'
         });

         // When an article is clicked, open the page in the system default browser.
         // Otherwise it would open it in the electron window which is not what we want.

         $('.flipster').on('click', 'a', function (e) {

             e.preventDefault();

             // Open URL with default browser.

             shell.openExternal(e.target.href);

         });

     });*/

});
