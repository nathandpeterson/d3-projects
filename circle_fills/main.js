var data = [134, 125, 76, 400, 112]

const svg = d3.select('.chart').append('svg')
.attr('width', 700)
.attr('height', 200)

let circles = svg.selectAll('circle')
 .data(data)

circles.enter()
  .append('circle')
  .attr('cx', function(d,i){
    return (i * 150) + 70
  } )
  .attr('cy', 100) 
  .attr('r', d => d/5)
  .attr('fill', 'purple')

// const circle = svg.append('circle')
  // .attr('cx', 200)
  // .attr('cy', 200)
  // .attr('r', 100)
  // .attr('fill', 'pink')

// var rect = svg.append('rect')
//   .attr('x', 45)
//   .attr('y', 45)
//   .attr('width', 50)
//   .attr('height', 50)
//   .attr('fill', 'yellow')
