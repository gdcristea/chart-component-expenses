// Data from the JSON file
const myJson = [
  {
    day: "mon",
    amount: 17.45,
  },
  {
    day: "tue",
    amount: 34.91,
  },
  {
    day: "wed",
    amount: 52.36,
  },
  {
    day: "thu",
    amount: 31.07,
  },
  {
    day: "fri",
    amount: 23.39,
  },
  {
    day: "sat",
    amount: 43.28,
  },
  {
    day: "sun",
    amount: 25.48,
  },
];

// Variables
var xValues = [];
var yValues = [];
let dayOfTheWeekString;

// Extract values from json file
function addValues() {
  for (let i = 0; i < myJson.length; i++) {
    xValues.push(myJson[i].day);
    yValues.push(myJson[i].amount);
  }
}

// Get the current day
function getTheDay() {
  addValues();
  let date = new Date();
  let dayOfTheWeek = date.getDay();
  switch (dayOfTheWeek) {
    case 0:
      dayOfTheWeekString = "sun";
      break;
    case 1:
      dayOfTheWeekString = "mon";
      break;
    case 2:
      dayOfTheWeekString = "tue";
      break;
    case 3:
      dayOfTheWeekString = "wed";
      break;
    case 4:
      dayOfTheWeekString = "thu";
      break;
    case 5:
      dayOfTheWeekString = "fri";
      break;
    default:
      dayOfTheWeekString = "sat";
  }
}

getTheDay();

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        data: yValues,
        borderRadius: 5,
        backgroundColor: (color) => {
          let colorIndex = xValues.findIndex(
            (element) => element === dayOfTheWeekString
          );
          let colors =
            color.index === colorIndex
              ? "hsl(186, 34%, 60%)"
              : "hsl(10, 79%, 65%)";
          return colors;
        },
        hoverBackgroundColor: (color) => {
          let colorIndex = xValues.findIndex(
            (element) => element === dayOfTheWeekString
          );
          let colors =
            color.index === colorIndex
              ? "hsla(186, 49%, 80%, 1)"
              : "hsla(10, 100%, 76%, 1)";
          return colors;
        },
      },
    ],
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 15,
            family: "DM Sans",
          },
          color: "hsla(27, 10%, 52%, 1)",
        },
      },
      y: {
        grace: "70%",
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length == 1) {
        event.native.target.style.cursor = "pointer";
      }
      if (chartElement.length == 0) {
        event.native.target.style.cursor = "default";
      }
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      datalabels: {
        anchor: "end",
        align: "top",
        backgroundColor: "#382314",
        color: "#fff",
        padding: 5,
        offset: 8,
        borderRadius: 5,
        font: {
          family: "DM Sans",
          size: 18,
        },
        display: function (context) {
          return context.active;
        },
        formatter: function (value) {
          return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      },
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
  },
  plugins: [ChartDataLabels],
});
