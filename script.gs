/*
MIT License

Copyright (c) 2020 Open-Source @ Illinois

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

function onSubmit(e) {
  var formsheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var newResponse = formsheet.getLastRow() - 1;
  var items = [];
  var data = formsheet.getDataRange().getValues();
  var heading = data[0];
  //Logger.log(data);
  //Logger.log(newResponse);
  var rowLength = data[newResponse].length;
  var forbids = [
    1, // We don't need to show email
    3 // We don't need to show last name.
  ];
  for (var i = 0; i < rowLength; i++){
    if (!forbids.includes(i) && data[newResponse][i]) { 
      items.push({
        "name": String(heading[i]),
        "value": String(data[newResponse][i]),
        "inline": false
      })
    }
  }
  Logger.log(items);
    var content = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": null, 
            "embeds": [{
                "title": "OSAI Verification Request",
                "fields": items,
                "footer": {
                    "text": "Exec should react when member has been added to GitHub org"
                }
            }]
        })
    };

   UrlFetchApp.fetch(POST_URL, content);
};
