
const margin = {top: 10, right: 20, bottom: 30, left: 80}
const width = 600 - margin.right - margin.left
const height = 400 - margin.top - margin.bottom 

const svg = d3.select('#chart-area').append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)

const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

const data = d3.json('data/revenues.json', (err, data) => {
  if(err) console.log(err)
  const cleanData = data.map(el => {
    el.revenue = parseInt(el.revenue, 10)
    el.profit = parseInt(el.profit, 10)
    return el
  })
  console.log('clean', cleanData)

const highestRevenue = Math.max(...cleanData.map(month => month.revenue))

const x = d3.scaleBand()
  .domain(cleanData.map(month => month.month ))
  .range([0, width])
  .paddingInner(0.3)
  .paddingOuter(0.3)

const y = d3.scaleLinear()
  .domain([0, highestRevenue])
  .range([height,0])

const xAxisCall = d3.axisBottom(x)
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
    .call(xAxisCall)
    .selectAll('text')
      .attr('y', '10')
      .attr('text-anchor', 'middle')

const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => '$' + d)
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxisCall)
    
let bars = g.selectAll('rect')
    .data(cleanData)
  
bars.enter()
    .append('rect')
    .attr('y', d => y(d.revenue))
    .attr('x', d => x(d.month))
    .attr('height', d => height - y(d.revenue))
    .attr('width', 60)
    .attr('fill', 'gray')
})
