/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

const margin = {top: 50, right: 20, bottom: 100, left: 80}
const width = 800 - margin.right - margin.left
const height = 500 - margin.top - margin.bottom 

const g = d3.select('#chart-area')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)
			
let time = 0

let x = d3.scaleLog()
	.base(10)
	.range([0, width])
	.domain([142, 150000])
let y = d3.scaleLinear()
	.range([height, 0])
	.domain([0, 90])
let area = d3.scaleLinear()
	.range([25*Math.PI, 1500*Math.pi])
let continentColor = d3.scaleOrdinal(d3.schemeCategory20)

let xLabel = g.append('text')
	.attr('y', height + 50)
	.attr('x', width / 2)
	.attr('font-size', '20px')
	.attr('text-anchor', 'middle')
	.text('GDP per capita ($)')
let yLabel = g.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('x', -170)
	.attr('y', -40)
	.attr('font-size', '20px')
	.attr('text-anchor', 'middle')
	.attr('Life Expectancy in Years')
let timeLabel = g.append('text')
	.attr('y', height - 10)
	.attr('x', width - 40)
	.attr('font-size', '40px')
	.attr('opacity', '0.4')
	.attr('text-anchor', 'middle')
	.text('1800')

let xAxisCall = d3.axisBottom(x)
	.tickValues([400, 4000, 40000])
	.tickFormat(d3.format('$'))
g.append('g')
	.attr('class', 'x axis')
	.attr('transform', `translate(0, ${height})`)
	.call(xAxisCall)

let yAxisCall = d3.axisLeft(y)
g.append('g')
	.attr('class', 'y axis')
	.call(yAxisCall)

d3.json("data/data.json", function(data){
	console.log(data);
	// Clean data
	const cleanData = data.map(year => {
		let data = (country.income && country.life_exp)
		return data
	}).map(country => {
		country.income = +country.income
		country.life_exp = +country.life_exp
		return country
	})
})