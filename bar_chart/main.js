

const svg = d3.select('.chart').append('svg')
.attr('width', '700')
.attr('height', '500')

const data = d3.json('data.json', (err, data) => {
  if(err) console.log(err)
  
  let bars = svg.selectAll('rect')
    .data(data)

  const tallestBuilding = Math.max(...data.map(e => e.height)) 

  const y = d3.scaleLinear()
    .domain([0, tallestBuilding])
    .range([0, 500])

  bars.enter()
    .append('rect')
    .attr('x', (d,i) => (i * 100) + 50 )
    .attr('y', 0) 
    .attr('height', d => y(d.height))
    .attr('width', 60)
    .attr('fill', 'gray')
})

