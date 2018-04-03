This is a repo for d3 projects.
I am following a tutorial. The master repo is here: https://github.com/adamjanes/udemy-d3

* Bar-chart pulls in data from a json file and renders the relative height of buildings.

Central to understanding how d3 works is the difference between domain and range. Domain is the set of values in your data, whereas range is the context in which the data will be displayed. 

![screen shot of bar-chart](bar-chart.png)

The chart should dynamically adjust if you change the number of buildings in the json file.

* .scaleBand

Bar charts can use a d3.scaleBand() to set the x axis. The .scaleBand method allows you to map each bar onto a datapoint. According to the d3 docs, 'Band scales are typically used for bar charts with an ordinal or categorical dimension.' In the following snippet, I am setting the x-axis to bars, mapping the domain to the name of each building, and then mapping the range to the width of the chart. You can also set padding in the .scaleBand method.

```const x = d3.scaleBand()
    .domain(data.map(building => building.name))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3)
```

* .scaleOrdinal (Array of strings as one data mapping)

For a heat-map or visualizations in which one of the axes maps onto an array of strings, you might use an ordinal scale. 'Ordinal scales have a discrete domain, such as a set of names or categories.' This scale can be used to associate colors (an array of strings representing colors) with datapoints.

``` const nameScale = d3.scaleOrdinal()
    .domain(data)
    .range(["white", "blue", "gray", "black"]);
```

D3 also provides some color scheme arrays that can be used on ordinal scales to map data onto color values. 

``` const colors = d3.scaleOrdinal()
    .domain(['January', 'February', 'March', 'April', 'May'])
    .range([d3.schemeCategory10])
```



