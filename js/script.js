// Mixing jQuery and Node.js code in the same file? Yes please!

$(function(){

    // Display some statistics about this computer, using node's os module.

    var os = require('os');
    var prettyBytes = require('pretty-bytes');

    $('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
    $('.stats').append('Free memory: <span>' + prettyBytes(os.freemem())+ '</span>');

    // Electron's UI library. We will need it for later.

    var shell = require('shell');


    // Fetch the recent posts on Tutorialzine.

    var ul = $('.flipster ul');
	var serializer = new XMLSerializer();
	
	//Test goodreads callout
	 /*$.ajax({
		url: "https://www.goodreads.com/review/list?v=2&id=21709595&shelf=currently-reading&key=xtrmhqHu1ByJB77703Mlw",
		type: 'GET',
		success: function(data) { 
		
			//alert("Data Loaded: " + data) 
			var xml = $.parseXML(data);
			$xml = $(xml);
			//$test = $xml.find('GoodreadsResponse');
			//alert($(xml).text());
			
		},
		dataType: "xml"
	});*/
	

	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			/*var test = serializer.serializeToString(this.responseXML);
			alert(test);//myFunction(this);*/
			parseGoodreadsXML(this);
		}
	  };
	  xhttp.open("GET", "https://www.goodreads.com/review/list?v=2&id=21709595&shelf=currently-reading&key=xtrmhqHu1ByJB77703Mlw", true);
	  xhttp.send();
	
	function parseGoodreadsXML(xml) {
		var xmlDoc = xml.responseXML;
		//var xmlString = serializer.serializeToString(xmlDoc);
		var x = xmlDoc.getElementsByTagName("title")[0];
		//var kids = x.childNodes[9];
		//var title = kids.nodeValue;
		//var xString = serializer.serializeToString(x);
		console.log(x.firstChild);
		var stringVersion = serializer.serializeToString(x.firstChild);
		document.getElementById("testParagraph").innerHTML = stringVersion;
		//$('#testParagraph').text(x.firstChild);
	}
	
	
	//Test rectangle drawing
	   var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

      context.beginPath();
      context.rect(188, 50, 50, 200);
      context.fillStyle = 'grey';
      context.fill();
      context.lineWidth = 7;
      context.strokeStyle = 'black';
      context.stroke();
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