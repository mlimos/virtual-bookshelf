var bookData = {

    toReadBooks : '',
    readBooks : '',
    currentlyReadingBooks : ''

}

/*function buildData(shelfParam, jsonObject) {
  if (shelfParam == 'to-read') {
    toReadBooks = jsonObject;
  }
}*/
function test(result) {
  console.log('this worked');
}

GoodReadsCalloutTest('to-read', test);

function GoodReadsCalloutTest(shelfParam, canvasId, callback) {
    var xmlResponse = '';
    $.get('https://www.goodreads.com/review/list?v=2&id=21709595&shelf=' + shelfParam + '&key=xtrmhqHu1ByJB77703Mlw', function(response) {
        //console.log('get response: ' + response);
        bookData.toReadBooks = GetBookInfoTest(response);
        console.log(bookData.toReadBooks);

        callback(bookData.toReadBooks, canvasId);
       /* var pageLengths = GetPageLengths(response);
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');

        DrawShelf(canvas, context);
        DrawBookSpines(pageLengths, canvas, context);
        console.log('page lengths array: ' + pageLengths);*/

        //ServiceClass.goodReadsCalloutResponse = response;

        //console.log('test service class: ' + ServiceClass.goodReadsCalloutResponse);

        //xmlResponse = response;

    });
}

//Get page lengths for all books from response
function GetBookInfoTest(xmlResponse) {

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
  /*if (shelfParam == 'to-read') {
    bookData.toReadBooks = returnObject;
  }
  else if (shelfParam == 'currently-reading') {
    bookData.currentlyReadingBooks = returnObject;
  }
  else if (shelfParam == 'read') {
    bookData.currentlyReadingBooks = returnObject;
  }*/
}
