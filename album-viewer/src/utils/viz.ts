import * as d3 from "d3";

// load the data from a json file and create the d3 svg in the then function
export function createViz() {
    // create the svg
    const svg = d3.select("#viz")
        .append("svg")
        .attr("width", 800)
        .attr("height", 600);

    // create the scales for the x and y axis
    // x-axis are the month series and y-axis show the numbers of album selled
    const xScale = d3.scaleBand()
        .range([0, 800])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .range([600, 0]);

    // load the data from the json file
    d3.json("/data/sales.json").then((data) => {
        // set the domains for the scales
        xScale.domain(data.map((d) => d.month));
        yScale.domain([0, d3.max(data, (d) => d.sales)]);

        // create the bars for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.month))
            .attr("y", (d) => yScale(d.sales))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => 600 - yScale(d.sales))
            .attr("fill", "steelblue");
        // create axes for the x and y axis
        svg.append("g")
            .attr("transform", "translate(0,600)")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .call(d3.axisLeft(yScale));         

        // generate a line chart based on the albums sales data
        const line = d3.line()
            .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
            .y((d) => yScale(d.sales));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);       
            
        
    });
}   
