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


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /*var test = serializer.serializeToString(this.responseXML);
            alert(test);//myFunction(this);*/
            var pageLengths = ParseGoodreadsXML(this);
            DrawBookSpines(pageLengths);
        }
    };
    xhttp.open("GET", "https://www.goodreads.com/review/list?v=2&id=21709595&shelf=read&key=xtrmhqHu1ByJB77703Mlw", true);
    xhttp.send();

    //Get titles for the "currently reading" bookshelf
    function ParseGoodreadsXML(xml) {
        var xmlDoc = xml.responseXML;
        //var xmlString = serializer.serializeToString(xmlDoc);
        var x = xmlDoc.getElementsByTagName("title")[1];
        var pageLengths = xmlDoc.getElementsByTagName("num_pages");
         console.log(pageLengths);
        var pageLengthsContainer = [];

        for (var i = 0; i < pageLengths.length; i++) {

            if (pageLengths[i].firstChild != null) {
                var bookPageLength = pageLengths[i].firstChild.nodeValue;

                pageLengthsContainer.push(bookPageLength);
                console.log(bookPageLength);
            }
        }
        //console.log(pages.firstChild);
        //console.log(x.firstChild);
        /*var stringVersion = serializer.serializeToString(x.firstChild);
        pages = serializer.serializeToString(pages.firstChild);
        pages = parseInt(pages);
        document.getElementById("testParagraph").innerHTML = stringVersion + ', pages: ' + pages;*/
        //$('#testParagraph').text(x.firstChild);
        return pageLengthsContainer;
    }


    //Draw book spines on canvas
    function DrawBookSpines(pageLengths) {

        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var bookWidthTotal = 15;

        for (var i = 0; i < pageLengths.length; i++) {


            //Determine how big the book should be
            var bookWidth = pageLengths[i] * .1;
            var bookSpacing = (pageLengths[i] * .1) + 25;
            var color = getRandomColor();

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

    function getRandomColor() {
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