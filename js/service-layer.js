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

function getReadBooks() {
  return bookData.readBooks;
}

function getBooksToRead() {
  return bookdata.toReadBooks;
}

function getBooksCurrentlyReading() {
  return bookData.currentlyReadingBooks;
}

function GoodReadsCallout(shelfParam, canvasId, callback1, callback2, callback3) {
    var xmlResponse = '';
    $.get('https://www.goodreads.com/review/list?v=2&id=21709595&shelf=' + shelfParam + '&key=xtrmhqHu1ByJB77703Mlw', function(response) {
        //console.log('get response: ' + response);
        var bookInfo = GetBookInfo(response);
        console.log(bookInfo);

        callback1(bookInfo, canvasId);
        callback2(canvasId);

        //Setting up our data structures for access later
        if (shelfParam == 'to-read') {
          bookData.toReadBooks = bookInfo;
          callback3(bookInfo, "#toReadBookList");
        }
        else if (shelfParam == 'currently-reading') {
          bookData.currentlyReadingBooks = bookInfo;
          callback3(bookInfo, "#currentlyReadingBookList");
        }
        else if (shelfParam == 'read') {
          bookData.readBooks = bookInfo;
          callback3(bookInfo, "#readBookList");
        }

    });
}

//Get page lengths for all books from response
function GetBookInfo(xmlResponse) {

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

}
