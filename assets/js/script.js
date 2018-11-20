console.log("Easy peasy japaneasy");
// import { data } from './data.js'
start();

function start() {
  let cleandata = getData();
  let addCompair = addCompiar(cleandata);
  createButtons(cleandata);
  createChart(addCompair);
  d3Magic(addCompair);
  sortByMeters(addCompair);
  // console.log(addCompair);
}
// will fix this later
function getData() {
  // this data does get generated from the api
  let data = [
    { book: "true", meter: 71, compare: "avonturenroman" },
    { book: "true", meter: 4, compare: "bijbels-verhaal" },
    { book: "true", meter: 33, compare: "biografie" },
    { book: "true", meter: 263, compare: "detective" },
    { book: "true", meter: 98, compare: "dieren" },
    { book: "true", meter: 10, compare: "doktersverhaal" },
    { book: "true", meter: 23, compare: "erotiek" },
    { book: "true", meter: 0, compare: "experimentele-roman" },
    { book: "true", meter: 180, compare: "familieroman" },
    { book: "true", meter: 8, compare: "feministisch-verhaal" },
    { book: "true", meter: 3, compare: "homofiel-thema" },
    { book: "true", meter: 133, compare: "humor" },
    { book: "true", meter: 0, compare: "indisch-milieu" },
    { book: "true", meter: 1, compare: "islamitisch-milieu" },
    { book: "true", meter: 0, compare: "joods-milieu" },
    { book: "true", meter: 23, compare: "kinderleven" },
    { book: "true", meter: 84, compare: "oorlog-en-verzet" },
    { book: "true", meter: 14, compare: "paarden-pony's" },
    { book: "true", meter: 53, compare: "politieke-roman" },
    { book: "true", meter: 87, compare: "protestants-milieu" },
    { book: "true", meter: 403, compare: "psychologisch-verhaal" },
    { book: "true", meter: 12, compare: "racisme" },
    { book: "true", meter: 251, compare: "romantisch-verhaal" },
    { book: "true", meter: 61, compare: "school" },
    { book: "true", meter: 184, compare: "science-fiction" },
    { book: "true", meter: 94, compare: "sociaal-politiek-verhaal" },
    { book: "true", meter: 14, compare: "spionage" },
    { book: "true", meter: 34, compare: "sport" },
    { book: "true", meter: 35, compare: "streek-boeren-verhaal" },
    { book: "true", meter: 384, compare: "thriller" },
    { book: "true", meter: 308, compare: "verhalenbundel" },
    { book: "true", meter: 10, compare: "western" },
    { book: "true", meter: 17, compare: "zeeverhaal" }
  ];
  // Removes
  let cleanData = data.filter(function(books) {
    return books.meter > 0;
  });

  return cleanData;
}

function addCompiar(data) {
  // This is so when the data gets generated ill aways add these
  data.push(
    {
      book: false,
      meter: 300,
      fill: "url",
      compare: "Eifel"
    },
    {
      book: false,
      meter: 93,
      fill: "url",
      compare: "Vrijheidsbeeld"
    },
    {
      book: false,
      meter: 1.7,
      fill: "url",
      compare: "persoon"
    },
    {
      book: false,
      meter: 30,
      fill: "url",
      compare: "Christ the Redeemer"
    }
  );
  return data;
}
function createButtons(data) {
  let selectOptions = document.getElementById("selectOptions");
  data.forEach(objects => {
    if (objects.book === "true") {
      option = document.createElement("option");
      option.value = option.textContent = objects.compare;
      selectOptions.appendChild(option);
    }
  });
}

function sortByMeters(data) {
  let sort = document.getElementById("SortByHeight").value;
  console.log(sort);
  data.sort(function(x, y) {
    return d3.ascending(x.meter, y.meter);
  });
  if (sort === "true") {
    d3Magic(data);
  }
}

function createChart(data) {}

function d3Magic(data) {
  let height = 500;
  let width = 900;
  let margin = { top: 20, right: 0, bottom: 30, left: 40 };

  let x = d3
    .scaleBand()
    .domain(data.map(d => d.compare))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  let y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.meter)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  let xAxis = g =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

  let yAxis = g =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove());

  //#ffffe0 #ffd59b #ffa474 #f47461 #db4551 #b81b34 #8b0000
  const svg = d3.select("svg");
  svg
    .append("g")
    .attr("fill", "#ffd59b")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.compare))
    .attr("y", d => y(d.meter))
    .attr("height", d => y(0) - y(d.meter))
    .attr("width", x.bandwidth())
    .attr("fill", d => (d.book == "true") ? '#ffd59b' : '#6CB7B5' )
    .on("mouseover", function(d) {
      d3.select(this)
        .attr("rect", 10)
        .transition()
        .style("fill", d => (d.book == "true") ? '#8b0000' : '#6c94b7' )
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .attr("rect", 10)
        .transition()
        .style("fill", d => (d.book == "true") ? '#ffd59b' : '#6CB7B5' )
    });

  svg
    .append("g")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  svg.append("g").call(yAxis);
}

// chart = {

// console.log(data);
// return svg.node();
// }
