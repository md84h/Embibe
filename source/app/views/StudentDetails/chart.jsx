import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Chart extends Component{
    constructor(props){
        super(props)
        this.margin= {'top': 20, 'right': 20, 'bottom': 20, 'left': 30};
    }
    getSVGContainer(node, graphHeight, graphWidth){
      return d3.select(node)
        .append("svg")
        .attr("height", graphHeight)
        .attr("width", graphWidth)
        .attr("style","padding-left:15px;overflow: inherit;")
        .append("g");
    }
    getOrdinalXScale(graphData, graphWidth){
        var xScaleRange = graphData.length * 30;
        let GRAPH_MARGIN = this.margin;
        var xScale = d3.scale.ordinal() .rangeRoundBands([GRAPH_MARGIN.left, graphWidth / 2 + xScaleRange], 0.2).domain(graphData.map(function(d) {
            return d.x;
          }));
        return xScale;
    }
    getLinearYScale(graphData, graphHeight){
        let GRAPH_MARGIN = this.margin;
        return d3.scale.linear()
          .range([graphHeight - GRAPH_MARGIN.top, GRAPH_MARGIN.bottom])
          .domain([ 0,
            d3.max(graphData, function (d) {
              return d.y;
            })
          ]);
    }
    renderAxes(svgContainer, graphData, graphWidth, graphHeight){
        let GRAPH_MARGIN = this.margin;
        let yScale = this.getLinearYScale(graphData, graphHeight);
        let xScale = this.getOrdinalXScale(graphData, graphWidth);
        let yAxis = d3.svg.axis()
          .scale(yScale)
          .ticks(5)
          .orient("left");

        let xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom");

        svgContainer
          .append("g")
            .attr("transform", "translate(0," + (graphHeight - GRAPH_MARGIN.bottom) + ")")
            .attr("class","x-axis")
          .call(xAxis)
            .attr("fill", "none")
            .attr("stroke", "#cccccc")
            .attr("stroke-width", "1.5");

        svgContainer
          .append("g")
            .attr("transform", "translate(" + (GRAPH_MARGIN.left) + ",0)")
            .attr("class","y-axis")
          .call(yAxis)
            .attr("fill", "none")
            .attr("stroke", "#cccccc")
            .attr("stroke-width", "1.5");

        svgContainer
            .selectAll(".y-axis text")
              .attr("fill", "black")
              .attr("text-anchor", "end")
              .attr("stroke", "none")
              .attr("style","font-size:14px;")
              .attr("stroke-width", "0.5");

      svgContainer
          .selectAll(".x-axis text")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("stroke", "none")
            .attr("style","font-size:14px;")
            .attr("stroke-width", "0.5");
    }

    renderBarGraph(svgContainer, graphData, graphWidth, graphHeight){
        let yScale = this.getLinearYScale(graphData, graphHeight);
        let xScale = this.getOrdinalXScale(graphData, graphWidth);
        let GRAPH_MARGIN = this.margin;
       svgContainer.selectAll("rect")
         .data(graphData)
       .enter()
         .append("rect")
         .attr("class", "bar")
         .attr("x", function(d){
           return xScale(d.x);
         })
         .attr("y", function (d) {
                 return graphHeight - GRAPH_MARGIN.bottom;
             })
         .attr("width", xScale.rangeBand())
         .attr("height", 0)
         .attr("fill", "#9b59b6")
         .attr("stroke", "none")
       .transition()
         .duration(900)
         .attr("y", function(d){
           return yScale(d.y);
         })
         .attr("height", function(d) {
           return ((graphHeight - GRAPH_MARGIN.bottom) - yScale(d.y));
         });
       svgContainer.selectAll(".text")
         .data(graphData)
        .enter()
         .append("text")
         .attr("class","label")
         .attr("text-anchor", "middle")
         .attr("fill", "black")
         .attr("font-family", "Helvetica Neue")
         .attr("x", (function(d) { return xScale(d.x) + xScale.rangeBand() / 2 ;}))
         .attr("y", function(d) { return yScale(d.y) - 20 })
         .attr("dy", ".55em")
         .attr("style","font-size:16px")
         .text(function(d) { return d.y; });
    }

    formatData(jsonData){
        let formattedData = [];
        for (let i in jsonData){
          formattedData.push({
            'x': i,
            'y': parseInt(jsonData[i])
          });
        }
        return formattedData;
    }
    componentDidMount(){
        let graphData = this.formatData(this.props.marks);
        let node = ReactDOM.findDOMNode(this.refs["bar-chart"])
        let graphHeight = 240;
        let graphWidth = 530;
        let svgContainer = this.getSVGContainer(node, graphHeight, graphWidth);
        this.renderAxes(svgContainer, graphData, graphWidth, graphHeight);
        this.renderBarGraph(svgContainer, graphData, graphWidth, graphHeight);
    }

    render(){
        return(
            <div ref="bar-chart"></div>
        )
    }

}
