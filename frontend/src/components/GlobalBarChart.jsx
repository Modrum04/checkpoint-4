import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { generateRandomRGBA } from "../utils/generateRandomRgb";
import { getCyclesDates } from "../utils/getCyclesDates";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GlobalBarChart = ({ data }) => {
  const aggregateTotalSales = (data) => {
    return data.reduce((acc, report) => {
      if (!acc[0]) {
        acc[0] = 0;
      }
      if (!acc[1]) {
        acc[1] = 0;
      }
      if (!acc[2]) {
        acc[2] = 0;
      }
      if (!acc[3]) {
        acc[3] = 0;
      }
      acc[0] += report.orderDetails.articlesOrdered;
      acc[1] += report.orderDetails.revenueGenerated;
      acc[2] += report.nextVisit.expectedArticles;
      acc[3] += report.nextVisit.expectedRevenue;

      return acc;
    }, []);
  };

  const chartData = {
    labels: ["Bilan des ventes"],
    datasets: [
      {
        label: "Volume de vente réalisé en unités",
        data: aggregateTotalSales(data)
          .filter((el, i) => i === 0)
          .map((el, i) => el),
        backgroundColor: generateRandomRGBA(aggregateTotalSales(data), "0.3"),
        borderColor: generateRandomRGBA(aggregateTotalSales(data), "1"),
        borderWidth: 1,
      },
      {
        label: "Chiffre d'affaire réalisé (en centaines d'euros) ",
        data: aggregateTotalSales(data)
          .filter((el, i) => i === 1)
          .map((el, i) => el / 100),
        backgroundColor: generateRandomRGBA(aggregateTotalSales(data), "0.3"),
        borderColor: generateRandomRGBA(aggregateTotalSales(data), "1"),
        borderWidth: 1,
      },
      {
        label: "Volume de vente prévisionnel en unités ",
        data: aggregateTotalSales(data)
          .filter((el, i) => i === 2)
          .map((el, i) => el),
        backgroundColor: generateRandomRGBA(aggregateTotalSales(data), "0.3"),
        borderColor: generateRandomRGBA(aggregateTotalSales(data), "1"),
        borderWidth: 1,
      },
      {
        label: "Chiffre d'affaire prévisionnel (en centaines d'euros)",
        data: aggregateTotalSales(data)
          .filter((el, i) => i === 3)
          .map((el, i) => el / 100),
        backgroundColor: generateRandomRGBA(aggregateTotalSales(data), "0.3"),
        borderColor: generateRandomRGBA(aggregateTotalSales(data), "1"),
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
        text: `Bilan global des ventes réalisées et prévisionnelles`,
      },
      subtitle: {
        display: true,
        text: `   Cycle actuel du ${getCyclesDates(data).firstCurrentCycleDate} au ${
          getCyclesDates(data).lastCurrentCycleDate
        }  - Cycle previsionnel du ${getCyclesDates(data).firstNextCycleDate} au ${
          getCyclesDates(data).lastNextCycleDate
        }`,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default GlobalBarChart;
