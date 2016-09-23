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

    //call main
    main();

    function main() {
      GoodReadsCallout('to-read', 'toReadCanvas');
      GoodReadsCallout('currently-reading', 'currentlyReadingCanvas');
      GoodReadsCallout('read', 'readCanvas');
      //console.log(ServiceClass.goodReadsCalloutResponse);
      var test = GoodReadsCalloutTest('read');
      console.log('test: ' + test);
      /*if (console.log(ServiceClass.GoodReadsCalloutTest) != '');
      console.log(ServiceClass.GoodReadsCalloutTest);*/

    }

    function GoodReadsCallout(shelfParam, canvasId){
      $.get('https://www.goodreads.com/review/list?v=2&id=21709595&shelf=' + shelfParam + '&key=xtrmhqHu1ByJB77703Mlw', function(response){
          console.log('get response: ' + response);

          var pageLengths = GetPageLengths(response);
          var canvas = document.getElementById(canvasId);
          var context = canvas.getContext('2d');

          DrawShelf(canvas, context);
          DrawBookSpines(pageLengths, canvas, context);
          console.log('page lengths array: ' + pageLengths);

      });
    }

    //Get page lengths for all books from response
    function GetPageLengths(xmlResponse) {
      var xml = $(xmlResponse);
      var pageLengthsContainer = [];
      console.log('xml: ' + xml);
      xml.find('num_pages').each(function(){
          var pageLength = $(this).text();

          if (pageLength != '') {
            pageLengthsContainer.push(pageLength);
          }
      });
      return pageLengthsContainer;
    }

    //Draw book spines on canvas
    function DrawBookSpines(pageLengths, canvas, context) {

        //var canvas = document.getElementById('myCanvas');
        //var context = canvas.getContext('2d');
        var bookWidthTotal = 15;

        for (var i = 0; i < pageLengths.length; i++) {


            //Determine how big the book should be
            var bookWidth = pageLengths[i] * .1;
            var bookSpacing = (pageLengths[i] * .1) + 25;
            var color = GetRandomColor();
            var cornerRadius = 50;

            context.beginPath();
            //context.rect((60 * i) + 15, 50, 35, 200);
            //context.rect((bookWidth * i) + 15, 50, bookWidth, 200);
            context.rect(bookWidthTotal, 50, bookWidth, 200);
            context.fillStyle = color;
            context.fill();
            context.lineWidth = 3;
            context.strokeStyle = 'black';
            context.stroke();


            bookWidthTotal = bookWidthTotal + bookWidth + 15;

        }
    }

    function DrawShelf(canvas, context) {

      /*var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');*/

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
