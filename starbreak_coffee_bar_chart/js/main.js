
const margin = {top: 20, right: 20, bottom: 70, left: 100}
const width = 600 - margin.right - margin.left
const height = 500 - margin.top - margin.bottom 

let displayProfit = true

const transition = d3.transition().duration(750)

const g = d3.select('#chart-area')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

let xAxisGroup = g.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0,${height})`)
  
let yAxisGroup = g.append('g')
  .attr('class', 'y-axis')

const x = d3.scaleBand()
  .range([0, width])
  .padding(0.2)

const y = d3.scaleLinear()
  .range([height,0])
  
g.append('text')
  .attr('x', width/2)
  .attr('y', height+55)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .text('Monthly Sales Figures')

const yLabel = g.append('text')
  .attr('class', 'y axis-label')
  .attr('x', - (height/2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Revenue')

d3.json('data/revenues.json', (err, data) => {
  if(err) console.log(err)
  const cleanData = data.map(el => {
    el.revenue = parseInt(el.revenue, 10)
    el.profit = parseInt(el.profit, 10)
    return el
  })

  d3.interval(() => {
   update(cleanData)
   displayProfit = !displayProfit
  }, 1000)
  update(cleanData)
})

function update(cleanData){
    const value = displayProfit ? 'revenue' : 'profit'

    const highestRevenue = Math.max(...cleanData.map(month => month[value]))

    x.domain(cleanData.map(month => month.month ))
    y.domain([0, highestRevenue])

    let xAxisCall = d3.axisBottom(x)
    xAxisGroup.transition(transition).call(xAxisCall)

    const yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => '$' + d)
      yAxisGroup.call(yAxisCall)

    let bars = g.selectAll('rect')
        .data(cleanData)

    // Update pattern has three parts: exit, update, and enter

    // EXIT, has access to elements on the page but not in data
    // EXIT is usually used to clear elements from the screen.

    bars.exit()
      .attr('fill', 'gray')
      .transition(transition)
      .attr('y', y(0))
      .attr('height', 0)
      .remove()

    // UPDATE: for each datapoint, create or update an element
    bars.transition(transition)
      .attr('y', d => y(d[value]))
      .attr('x', d => x(d.month))
      .attr('height', d => height - y(d[value]))
      .attr('width', 60)

    // ENTER has elements that are in data array but not on page
    
    bars.enter()
        .append('rect')
          .attr('fill', 'seagreen')
          .attr('y', y(0))
          .attr('height', 0)
          .attr('x', d => x(d.month))
          .attr('fill-opacity', 0)
  // Merge -- attributes before merge will just apply to ENTER
          .merge(bars)
  // Merge -- attributes after merge will apply to BOTH ENTER and UPDATE
          .transition(transition)
            .attr('x', d => x(d.month))
            .attr('y', d => y(d[value]))
            .attr('height', d => height - y(d[value]))
            .attr('fill-opacity', 1)

    const label = displayProfit ? 'Revenue' : 'Profit'
    yLabel.text(label)
}
