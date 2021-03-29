// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 700;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 500;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

let svg_one = d3.select("#graph1")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", graph_1_height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

let svg_two = d3.select("#graph2")
    .append("svg")
    .attr("width", graph_2_width)
    .attr("height", graph_2_height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

let svg_three = d3.select("#graph3")
    .append("svg")
    .attr("width", graph_3_width)
    .attr("height", graph_3_height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("../data/netflix.csv").then(function(data) {
    
    //initializing data for all three graphs 
    data1 = cleanData1(data);
    data2 = cleanData2(data);
    data3 = cleanData3(data);
    console.log(data3);

    console.log("ugh", d3.max(Object.values(data1).map(d => parseInt(d))))
    //create graph 1
    let x1 = d3.scaleLinear()
        .domain([0, d3.max(Object.values(data1).map(d => parseInt(d)))])
        .range([0, (graph_1_width - margin.left - margin.right)]);

    let y1 = d3.scaleBand()
        .domain(Object.keys(data1))
        .range([0, graph_1_height - margin.top - margin.bottom])
        .padding(0.1);
    svg_one.append("g")
        .call(d3.axisLeft(y1).tickSize(0).tickPadding(10));

    let bars1 = svg_one.selectAll("rect").data(Object.entries(data1));

    bars1.enter()
        .append("rect")
        .merge(bars1)
        .attr("fill", "purple")
        .attr("x", 0)
        .attr("y", function(d) { return y1(d[0]); })
        .attr("width", function(d) { return x1(parseInt(d[1])); })
        .attr("height",  y1.bandwidth()); 

    let counts1 = svg_one.append("g").selectAll("text").data(Object.entries(data1));

    counts1.enter()
        .append("text")
        .merge(counts1)
        .attr("x", function(d) { return 8 + x1(parseInt(d[1])); })
        .attr("y", function(d) { return 10 + y1(d[0]); })
        .style("text-anchor", "start")
        .style("font-size", 10)
        .text(function(d) { return Math.round(x1(parseInt(d[1]))); }); 

    // label for x axis
    svg_one.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2},
                                    ${(graph_1_height - margin.top - margin.bottom) + 30})`)
        .style("text-anchor", "middle")
        .text("Number of Titles");

    // label for y axis
    svg_one.append("text")
        .attr("transform", `translate(-140, ${(graph_1_height - margin.top - margin.bottom) / 2})`) 
        .style("text-anchor", "middle")
        .text("Genre");

    // title for graph 2
    svg_one.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2}, ${-20})`) 
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Number of Titles per Genre on Netflix"); 

    
    //code for graph 2
    let x2 = d3.scaleLinear()
        .domain([0, d3.max(Object.values(data2).map(d => parseInt(d)))])
        .range([0, (graph_2_width - margin.left - margin.right)]);

    let y2 = d3.scaleBand()
        .domain(Object.keys(data2))
        .range([0, graph_2_height - margin.top - margin.bottom])
        .padding(0.1);
    svg_two.append("g")
        .call(d3.axisLeft(y2).tickSize(0).tickPadding(10));

    let bars2 = svg_two.selectAll("rect").data(Object.entries(data2));

    bars2.enter()
        .append("rect")
        .merge(bars2)
        .attr("fill", "purple")
        .attr("x", 0)
        .attr("y", function(d) { return y2(d[0]); })
        .attr("width", function(d) { return x2(parseInt(d[1])); })
        .attr("height",  y2.bandwidth()); 

    let counts2 = svg_two.append("g").selectAll("text").data(Object.entries(data2));

    counts2.enter()
        .append("text")
        .merge(counts2)
        .attr("x", function(d) { return 8 + x2(parseInt(d[1])); })
        .attr("y", function(d) { return 12 + y2(d[0]); })
        .style("text-anchor", "start")
        .style("font-size", 10)
        .text(function(d) { return Math.round(x2(parseInt(d[1]))); }); 

    // label for x axis
    svg_two.append("text")
        .attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2},
                                    ${(graph_2_height - margin.top - margin.bottom) + 30})`)
        .style("text-anchor", "middle")
        .text("Avg. Runtime");

    // label for y axis
    svg_two.append("text")
        .attr("transform", `translate(-75, ${(graph_2_height - margin.top - margin.bottom) / 2})`) 
        .style("text-anchor", "middle")
        .text("Year");

    // title for graph 2
    svg_two.append("text")
        .attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2}, ${-20})`) 
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Average Runtimes of Movies by Year");

    //code for graph 3
    let x3 = d3.scaleLinear()
        .domain([0, d3.max(Object.values(data3).map(d => parseInt(d)))])
        .range([0, (graph_3_width - margin.left - margin.right)]);

    let y3 = d3.scaleBand()
        .domain(Object.keys(data3))
        .range([0, graph_3_height - margin.top - margin.bottom])
        .padding(0.1);
    svg_three.append("g")
        .call(d3.axisLeft(y3).tickSize(0).tickPadding(10));

    let bars3 = svg_three.selectAll("rect").data(Object.entries(data3));

    bars3.enter()
        .append("rect")
        .merge(bars3)
        .attr("fill", "purple")
        .attr("x", 0)
        .attr("y", function(d) { return y3(d[0]); })
        .attr("width", function(d) { return x3(parseInt(d[1])); })
        .attr("height",  y3.bandwidth()); 

    let counts3 = svg_three.append("g").selectAll("text").data(Object.entries(data3));

    counts3.enter()
        .append("text")
        .merge(counts3)
        .attr("x", function(d) { return 8 + x3(parseInt(d[1])); })
        .attr("y", function(d) { return 12 + y3(d[0]); })
        .style("text-anchor", "start")
        .style("font-size", 10)
        .text(function(d) { return Math.round(x3(parseInt(d[1]))); }); 

    // label for x axis
    svg_three.append("text")
        .attr("transform", `translate(${(graph_3_width - margin.left - margin.right) / 2},
                                    ${(graph_3_height - margin.top - margin.bottom) + 30})`)
        .style("text-anchor", "middle")
        .text("Number of Movies Made");

    // label for y axis
    // svg_three.append("text")
    //     .attr("transform", `translate(-150, ${(graph_3_height - margin.top - margin.bottom) / 2})`) 
    //     .style("text-anchor", "middle")
    //     .text("Director-Actor Pairs");

    // title for graph 2
    svg_three.append("text")
        .attr("transform", `translate(${(graph_3_width - margin.left - margin.right) / 2}, ${-20})`) 
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Top Director-Actor Pairs by Number of Movies");

});

//gets necessary data to make graph 1
function cleanData1(data) {
    //genres are surrounded by quotes and separated by commas
    let dict = {};
    for (i = 0; i < data.length; i++) {
        let genres = data[i].listed_in.replace(/["]/g, "");
        let separated = genres.split(", ");
        for (j = 0; j < separated.length; j++){
            if (!(separated[j] in dict)) {
                dict[separated[j]] = 1;
            }
            else {
                dict[separated[j]] = dict[separated[j]] + 1;
            }
        }
    }
    return dict;
}

//gets necessary data for graph 2
function cleanData2(data) {
    //maps year to number of movies in that year
    let dict_count = {};
    //maps year to total runtime of that year
    let dict_added = {};
    //maps year to average runtime
    let dict_final = {};
    for (i = 0; i < data.length; i++) {
        let type = data[i].type;
        let runtime = parseInt(data[i].duration.replace(" min", ""));
        let year = data[i].release_year
        if(type === "Movie") {
            //add to dictionary if not inside
            if (!(year in dict_count)) {
                dict_count[year] = 1;
            }
            //update if already exists in dictionary
            else {
                dict_count[year] = dict_count[year] + 1;
            }
            if (!(year in dict_added)) {
                dict_added[year] = runtime;
            }
            else {
                dict_added[year] = dict_added[year] + runtime;
            }
        }
    }
    //maybe figure out how you can control the year range as your interactive element
    let keyList = Object.keys(dict_count);
    let limit = keyList.length - 21;
    for (j = keyList.length -1; j > limit; j--) {
        let key = keyList[j];
        let total = dict_added[key];
        let c = dict_count[key]
        dict_final[key] = (total/c);
    }
    return dict_final;
}

//gets necessary data for graph 3
function cleanData3(data) {
    //dictionary that maps directors to actors
    let dict = {};
    for (i = 0; i < data.length; i++) {
        let directors = data[i].director.replace(/["]/g, "").split(", ");
        let actors = data[i].cast.replace(/["]/g, "").split(", ");
        if (directors.length === 0 || actors.length === 0) {
            continue;
        }
        for (j = 0; j < directors.length; j++) {
            for (k = 0; k < actors.length; k++) {
                let d = directors[j];
                let a = actors[k];
                if (!d || !a){
                    continue;
                }
                let pair = d + "-" + a;
                if (!(pair in dict)) {
                    dict[pair] =  1;
                }
                else {
                    dict[pair] = dict[pair] + 1;
                }
            }
        }
    }
    final_dict = {};
    let entries = Object.entries(dict);
    //sorting entries to only get the top pairs
    entries.sort(function(one, two) {
            return two[1] - one[1];});
    for (l = 0; l < 15; l++) {
        let key = entries[l][0];
        final_dict[key] = entries[l][1];
    }
    //return top pairs
    return final_dict;
}