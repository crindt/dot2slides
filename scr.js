var slides = []

function setSlide(sli) {
    if ( sli >= slides.length ) {
        console.log("Already on last slide")
        return
    } else if ( sli < 0 ) {
        console.log("Already on first slide")
        return
    }
    var sl = slides[sli]

    d3.selectAll(".slide").style("display","none");
    d3.selectAll(".slide-"+sl).style("display",null);

    d3.selectAll(".highlight").classed("active",null);
    d3.selectAll(".highlight-"+sl).classed("active",true);
}
$(document).ready(function(){

    d3.selectAll(".slide")
        .each(function(d) {
            var classes = d3.select(this).attr("class").split(/\s+/)
            _.each(classes,function(c) {
                var m
                if ( m = c.match(/slide-(\d+)/) ) {
                    slides.push(parseInt(m[1]))
                }
            });
        });
    slides = slides.sort();

    slides = _.uniq(slides)

    console.log(slides)

    var slide = 0;
    setSlide(slide)


    d3.select('body')
        .on("keydown",function() {
            console.log("keypress",d3.event)
            switch(d3.event.keyCode) {
            case 40: // down arrow
            case 39: // right
                if (slide===slides.length-1) {
                    console.log("Already on last slide")
                } else
                    setSlide(++slide)
                break;
            case 37: // left
            case 38: // up
                if ( slide === 0 ) {
                    console.log("Already on first slide")
                } else 
                    setSlide(--slide)
                break;
            }
        })
})


