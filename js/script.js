// Mixing jQuery and Node.js code in the same file? Yes please!
$(function() {

    // Display some statistics about this computer, using node's os module.

    var os = require('os');
    var prettyBytes = require('pretty-bytes');

    // Electron's UI library. We will need it for later.

    var shell = require('shell');
    var readBooks = '';
    var toReadBooks = '';
    var currentlyReadingBooks = '';

    // Fetch the recent posts on Tutorialzine.

    var ul = $('.flipster ul');
    var serializer = new XMLSerializer();
    var booksContainerToRead = {};
    var booksContainerCurrentlyReading = {};
    var booksContainerRead = {};
    var booksContainer = {};

    var canvasOffsetToRead = $("#toReadCanvas").offset();
    var canvasOffsetRead = $("#readCanvas").offset();
    var canvasOffsetCurrentlyReading = $("#currentlyReadingCanvas").offset();
    //var canvasTest = document.getElementById('toReadCanvas');
    //var contextTest = canvasTest.getContext('2d');

    $('#toReadButton').click(function(){

      if (document.getElementById('toReadButton').className == 'inactive') {
        document.getElementById('toReadButton').className = 'active';
      }
      else if (document.getElementById('toReadButton').className = 'active') {
        document.getElementById('toReadButton').className = 'inactive';
      }
      ButtonHelper('currentlyReadingButton', 'readButton')
      $('#toReadBookList').toggle();


    });

    $('#currentlyReadingButton').click(function(){

      if (document.getElementById('currentlyReadingButton').className == 'inactive') {
        document.getElementById('currentlyReadingButton').className = 'active';
      }
      else if (document.getElementById('currentlyReadingButton').className = 'active') {
        document.getElementById('currentlyReadingButton').className = 'inactive';
      }
      ButtonHelper('readButton', 'toReadButton')
      //document.getElementById('')
      $('#currentlyReadingBookList').toggle();

    });

    $('#readButton').click(function(){

      if (document.getElementById('readButton').className == 'inactive') {
        document.getElementById('readButton').className = 'active';
      }
      else if (document.getElementById('readButton').className == 'active') {
        document.getElementById('readButton').className = 'inactive';
      }
      ButtonHelper('currentlyReadingButton', 'toReadButton')
      $('#readBookList').toggle();

    });

    //When we hover over the list elements


//    $('li').on('mouseover')



    function ButtonHelper(buttonId1, buttonId2) {

      //Logic to determine if a button is currently active
      if (document.getElementById(buttonId1).className == 'active') {
        document.getElementById(buttonId1).className = 'inactive';

        var bookListId = '#' + buttonId1.replace('Button', 'BookList')
        $(bookListId).toggle();
      }
      else if (document.getElementById(buttonId2).className == 'active') {
        document.getElementById(buttonId2).className = 'inactive';

        var bookListId = '#' + buttonId2.replace('Button', 'BookList')
        $(bookListId).toggle();
      }

    }

     function handleMouseHover(e) {

       var tipCanvas = document.getElementById("tip");
       var tipCtx = tipCanvas.getContext("2d");
       var hit = false;

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

        // Put your mousemove stuff here

        //for (var i = 0; i < booksContainerToRead.length; i++) {
        for (var book in booksContainerToRead) {

          //console.log(booksContainerToRead[i]);
          if (booksContainerToRead[book].isPointInside(mouseXToRead, mouseYToRead)) {
            //console.log('title:' + booksContainerToRead[i].id)
            booksContainerToRead[book].highlight();

            booksContainerToRead[book].drawTitleTooltip(e.pageX, e.pageY, booksContainerToRead[book].id, tipCanvas, tipCtx);
            hit = true
          }
          else {
            booksContainerToRead[book].redraw();

          }
          if (!hit) {
            tipCanvas.style.left = "-1000px";
          }
        }

        //for (var i = 0; i < booksContainerRead.length; i++) {
        for (var book in booksContainerRead) {
          //console.log('book: ' + i + ', ' + booksContainer[i].redraw);

          if (booksContainerRead[book].isPointInside(mouseXRead, mouseYRead)) {
            booksContainerRead[book].highlight();
            //console.log('gets here')
              booksContainerRead[book].drawTitleTooltip(e.pageX, e.pageY, booksContainerRead[book].id, tipCanvas, tipCtx);
            //DrawShelf(canvasTest, contextTest);
            hit = true;
          }
          else {
            //DrawShelf(canvasTest, contextTest);
            booksContainerRead[book].redraw();
          }
          if (!hit) {
            tipCanvas.style.left = "-1000px";
          }
        }

        //for (var i = 0; i < booksContainerCurrentlyReading.length; i++) {
        for (var book in booksContainerCurrentlyReading) {
          //console.log('book: ' + i + ', ' + booksContainer[i].redraw);
          if (booksContainerCurrentlyReading[book].isPointInside(mouseXCurrentlyReading, mouseYCurrentlyReading)) {
            booksContainerCurrentlyReading[book].highlight();
            //DrawShelf(canvasTest, contextTest);

            booksContainerCurrentlyReading[book].drawTitleTooltip(e.pageX, e.pageY, booksContainerCurrentlyReading[book].id, tipCanvas, tipCtx);
            hit = true;
          }
          else {
            //DrawShelf(canvasTest, contextTest);
            booksContainerCurrentlyReading[book].redraw();
          }
          if (!hit) {
            tipCanvas.style.left = "-1000px";
          }
        }
    }

    /*function TestFunction(e, booksContainer, canvasId) {

      //Getting canvas offset
      var tipCanvas = document.getElementById("tip");
      var tipCtx = tipCanvas.getContext("2d");
      var hit = false;
      var canvasOffset = $(canvasId).offset();
      //var canvasOffset = canvas.offset();

      //Setting our offset and mouse pointer variables
      var offsetX = canvasOffset.left;
      var offsetY = canvasOffset.top;
      var mouseX = parseInt(e.pageX - offsetX);
      var mouseY = parseInt(e.pageY - offsetY);

      for (var i = 0; i < booksContainer.length; i++) {
        //console.log('book: ' + i + ', ' + booksContainer[i].redraw);
        if (booksContainer[i].isPointInside(mouseX, mouseY)) {
          //console.log('title:' + booksContainerToRead[i].id)
          booksContainer[i].highlight();

          booksContainer[i].drawTitleTooltip(e.pageX, e.pageY, booksContainer[i].id, tipCanvas, tipCtx);
          hit = true
        }
        else {
          booksContainer[i].redraw();

        }
        if (!hit) {
          tipCanvas.style.left = "-1000px";
        }
      }
    }*/

    //call main
    main();

    function main() {
        GoodReadsCallout('to-read', 'toReadCanvas', DrawBookSpines, DrawShelf, BuildBookTitleList);
        GoodReadsCallout('currently-reading', 'currentlyReadingCanvas', DrawBookSpines, DrawShelf, BuildBookTitleList);
        GoodReadsCallout('read', 'readCanvas', DrawBookSpines, DrawShelf, BuildBookTitleList);

        //console.log('this works: ' + bookData.toReadBooks);

        $('#toReadCanvas').mousemove(handleMouseHover);
        $('#readCanvas').mousemove(handleMouseHover);
        $('#currentlyReadingCanvas').mousemove(handleMouseHover);



    }

    /*function GoodReadsCallout(shelfParam, canvasId){
      $.get('https://www.goodreads.com/review/list?v=2&id=21709595&shelf=' + shelfParam + '&key=xtrmhqHu1ByJB77703Mlw', function(response){
          //console.log('get response: ' + response);

          var bookInfo = GetBookInfo(response);

          DrawShelf(canvasId);
          DrawBookSpines(bookInfo, canvasId);
          BuildBookTitleList(bookInfo);

      });
    }*/

    //Get page lengths for all books from response
    /*function GetBookInfo(xmlResponse) {

      var returnObject = {};
      //var titleObject = {pageLength : ''};

      var xml = $(xmlResponse);
      var pageLengthsContainer = [];
      var pageCounterLoop = 0;

      //console.log(xml.text());

      //Getting book titles
      xml.find('title').each(function() {
        var title = $(this).text();

        returnObject[title] = {};
        //returnObject[title].title = title;

      });

      console.log('return object right now: ' + JSON.stringify(returnObject));

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

      //Adding page lengths for each book object
      for (var title in returnObject) {

        returnObject[title].pageLength = pageLengthsContainer[pageCounterLoop];
        pageCounterLoop++;
      }
      //console.log('return object: ' + JSON.stringify(returnObject));

      return returnObject;
    }*/

    //Draw book spines on canvas
    function DrawBookSpines(bookInfo, canvasId) {

        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');
        //var canvas = document.getElementById('myCanvas');
        //var context = canvas.getContext('2d');
        var bookWidthTotal = 15;

        for (var book in bookInfo) {
          //console.log(book);
          var bookId = bookInfo[book].id;

          var bookWidth = bookInfo[book].pageLength * .1;
          var bookSpacing = (bookInfo[book].pageLength * .1) + 25;
          var color = GetRandomColor();
          //booksContainer.push(new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context));
          if (canvasId == 'toReadCanvas') {
              booksContainerToRead[bookId] = new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context);
              //booksContainerToRead.push(new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context));
          }
          else if (canvasId == 'currentlyReadingCanvas') {
            booksContainerCurrentlyReading[bookId] = new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context);
              //booksContainerCurrentlyReading.push(new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context));
          }
          else if (canvasId == 'readCanvas'){
              //console.log('book: ' + book);
              booksContainerRead[bookId] = new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context);
              //booksContainerRead.push(new BookSpine(book, bookWidthTotal, 50, bookWidth, 200, color, 'black', 3, context));
          }

          bookWidthTotal = bookWidthTotal + bookWidth + 15;

        }
    }

    function DrawShelf(canvasId) {

      var canvas = document.getElementById(canvasId);
      var context = canvas.getContext('2d');

      context.beginPath();
      context.rect(10, 250, 1150, 10);
      context.fillStyle = '#654321';
      context.fill();
      context.lineWidth = 3;
      context.strokeStyle = '#381904';
      context.stroke();

    }

    function BuildBookTitleList(bookInfo, bookListHTMLId) {

      for (book in bookInfo) {
        //var bookTitle = document.createElement('li');
        //bookTitle.appendChild(document.createTextNode(book));
        var linkId = book.replace(/\s/g, '');
        console.log(linkId);
        var bookLink =  '<li id="' + bookInfo[book].id + '" class="testClass"><a href=>' + book + '</a></li>';
      //var bookLink =  '<li id="' + bookInfo[book].id + '" class="testClass">' + book + '</li>';
        //bookTitle.setAttribute('a', "#");
        $(bookListHTMLId).append(bookLink);
        $('#' + bookInfo[book].id).hover(function() {

          var x = booksContainerToRead[this.id].x;
          var y = booksContainerToRead[this.id].y;
          var context = booksContainerToRead[this.id].context;

          booksContainerToRead[this.id].highlight();
          //console.log(JSON.stringify(booksContainerToRead));

        });
      }

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
