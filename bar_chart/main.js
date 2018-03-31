console.log('connected')

var data = [134, 125, 76, 500, 112]

d3.select('.chart')
  .selectAll('div')
  .data(data)
    .enter()
    .append('div')
    .style('width', function(d) {return d + 'px'})
    .text(function(d) { return d})
