// Print all of the news items on hackernews
var jsdom = require("jsdom");
var fs = require("fs");
var data = fs.readFileSync(process.argv[2] || "./fc.svg").toString();
var _ = require('underscore')

var jquery = fs.readFileSync("./jquery-1.9.1.min.js").toString();

/* parse the html and create a dom window */
var window = require('jsdom').jsdom(data, null, {
        // standard options:  disable loading other assets
        // or executing script tags
        FetchExternalResources: false,
        ProcessExternalResources: false,
        MutationEvents: false,
        QuerySelector: false
}).createWindow();


/* apply jquery to the window */
var $ = require('jquery').create(window);

$("svg").attr('width','100%')
$("svg").attr('height','90%')
 
$("*").contents().filter(function(){
    return this.nodeType == 8;
}).each(function(i, e){
    var m
    if ( m = e.nodeValue.match(/slide:((\d[,]?)+)/) ) {
        var slides = m[1].split(",")
        // get next element, +1 = text node
        //var enext =  e._parentNode._childNodes[i+2]
        var enext = $(e).next()
        process.stderr.write("class is "+enext.attr('class')+" \n")
        enext.addClass("slide") // marks as slide
        _.each(slides, function(sl) {
            var c = 'slide-'+sl
            process.stderr.write("Adding class "+c+"\n")
            enext.addClass(c)
        });
    }
    if ( m = e.nodeValue.match(/highlight:((\d[,]?)+)/) ) {
        var slides = m[1].split(",")
        // get next element, +1 = text node
        //var enext =  e._parentNode._childNodes[i+2]
        var enext = $(e).next()
        process.stderr.write("class is "+enext.attr('class')+" \n")
        enext.addClass("highlight") // marks as slide
        _.each(slides, function(sl) {
            var c = 'highlight-'+sl
            process.stderr.write("Adding class "+c+"\n")
            enext.addClass(c)
        });
    }
});

console.log("<!DOCTYPE html>")
console.log("<html>")
console.log("<head>")
console.log('   <script src="d3.v3.min.js"></script>')
console.log('   <script src="jquery-1.9.1.min.js"></script>')
console.log('   <script src="underscore-min.js"></script>')
console.log('   <script src="scr.js"></script>')
console.log('   <link rel="stylesheet" href="app.css">')

console.log('</head>')
console.log('<body>')
console.log(window.document.innerHTML.toString())
console.log('</body>')
console.log('</html>')
process.exit()
