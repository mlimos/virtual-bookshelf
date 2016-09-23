var ServiceClass = {

    goodReadsCalloutResponse: ''

}


function GoodReadsCalloutTest(shelfParam) {
    var xmlResponse = '';
    $.get('https://www.goodreads.com/review/list?v=2&id=21709595&shelf=' + shelfParam + '&key=xtrmhqHu1ByJB77703Mlw', function(response) {
        //console.log('get response: ' + response);

       /* var pageLengths = GetPageLengths(response);
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');

        DrawShelf(canvas, context);
        DrawBookSpines(pageLengths, canvas, context);
        console.log('page lengths array: ' + pageLengths);*/

        ServiceClass.goodReadsCalloutResponse = response;

        //console.log('test service class: ' + ServiceClass.goodReadsCalloutResponse);

        xmlResponse = response;

    });

    return xmlResponse;
}