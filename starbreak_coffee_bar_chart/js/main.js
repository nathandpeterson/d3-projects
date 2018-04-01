/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const margin = {top: 10, right: 10, bottom: 100, left: 100}
const width = 700 - margin.right - margin.left
const height = 500 - margin.top - margin.bottom 

const svg = d3.select('#chart-area').append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)

const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

const data = d3.json('data/revenues.json', (err, data) => {
  if(err) console.log(err)
  console.log('data',data)

const highestRevenue = Math.max(...data.map(month => parseInt(month.revenue, 10)))

const x = d3.scaleBand()
  .domain(data.map(month => month.month ))
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
      .attr('x', '-5')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-40)')

const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => '$' + d)
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxisCall)

})
