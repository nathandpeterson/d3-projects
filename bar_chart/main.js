
const margin = {top: 10, right: 10, bottom: 100, left: 100}
const width = 700 - margin.right - margin.left
const height = 500 - margin.top - margin.bottom 

const svg = d3.select('.chart').append('svg')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)

const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)


const data = d3.json('data.json', (err, data) => {
  if(err) console.log(err)

  const tallestBuilding = Math.max(...data.map(e => e.height))

  const x = d3.scaleBand()
    .domain(data.map(building => building.name))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3)

  const y = d3.scaleLinear()
    .domain([0, tallestBuilding])
    .range([height,0])

  const xAxisCall = d3.axisBottom(x)
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(xAxisCall)
    .selectAll('text')
      .attr('y', '10')
      .attr('x', '-5')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-40)')

  const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + 'ft')
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxisCall)
 
  
  let bars = g.selectAll('rect')
    .data(data)
  
  bars.enter()
    .append('rect')
    .attr('y', d => y(d.height)) 
    .attr('x', d => x(d.name))
    .attr('height', d => height - y(d.height))
    .attr('width', 60)
    .attr('fill', 'gray')
})
