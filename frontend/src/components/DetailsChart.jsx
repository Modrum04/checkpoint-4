import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { getCyclesDates } from "../utils/getCyclesDates";
import { generateRandomRGBA } from "../utils/generateRandomRgb";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, SubTitle);

const DetailsChart = ({ data, person }) => {
  const aggregateSales = (data, person) => {
    return data.reduce((acc, report) => {
      const id = report[person]._id;
      const personName = report[person].name;
      if (!acc[id]) {
        acc[personName] = {
          id,
          personName,
          totalArticlesSold: 0,
          totalRevenueGenerated: 0,
          totalArticlesExpected: 0,
          totalRevenueExpected: 0,
        };
      }
      acc[personName].totalArticlesSold += report.orderDetails.articlesOrdered;
      acc[personName].totalRevenueGenerated += report.orderDetails.revenueGenerated;
      acc[personName].totalArticlesExpected += report.nextVisit.expectedArticles;
      acc[personName].totalRevenueExpected += report.nextVisit.expectedRevenue;

      return acc;
    }, {});
  };
  const arrayWithAgregateSales = Object.values(aggregateSales(data, person));
  const chartData = {
    labels: arrayWithAgregateSales.map((el) => el.personName),
    datasets: [
      {
        label: "Volume de vente en unités",
        data: arrayWithAgregateSales.map((el) => el.totalArticlesSold),
        backgroundColor: generateRandomRGBA(arrayWithAgregateSales, "0.3"),
        borderColor: generateRandomRGBA(arrayWithAgregateSales, "1"),
        borderWidth: 1,
      },
      {
        label: "Chiffre d'affaire généré (en centaines d'euros)",
        data: arrayWithAgregateSales.map((el) => el.totalRevenueGenerated / 100),
        backgroundColor: generateRandomRGBA(arrayWithAgregateSales, "0.3"),
        borderColor: generateRandomRGBA(arrayWithAgregateSales, "1"),
        borderWidth: 1,
      },
      {
        label: "Volume previsionnel de vente en unités",
        data: arrayWithAgregateSales.map((el) => el.totalArticlesExpected),
        backgroundColor: generateRandomRGBA(arrayWithAgregateSales, "0.3"),
        borderColor: generateRandomRGBA(arrayWithAgregateSales, "1"),
        borderWidth: 1,
      },
      {
        label: "Chiffre d'affaire previsionnel (en centaines d'euros)",
        data: arrayWithAgregateSales.map((el) => el.totalRevenueExpected / 100),
        backgroundColor: generateRandomRGBA(arrayWithAgregateSales, "0.3"),
        borderColor: generateRandomRGBA(arrayWithAgregateSales, "1"),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Ventes - Bilan par ${person === "seller" ? "agent" : "client"}`,
      },
      subtitle: {
        display: true,
        text: `   Cycle actuel du ${getCyclesDates(data).firstCurrentCycleDate} au ${
          getCyclesDates(data).lastCurrentCycleDate
        } - Cycle previsionnel du ${getCyclesDates(data).firstNextCycleDate} au ${
          getCyclesDates(data).lastNextCycleDate
        }`,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default DetailsChart;
