import React, { useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { generateRandomRGBA } from "../utils/generateRandomRgb";
import { getCyclesDates } from "../utils/getCyclesDates";
import { formatDate } from "../utils/formatDate";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const GlobalLineChartByMonth = ({ data }) => {
  const aggregateTotalSalesByMonth = (data, cycle) => {
    return data
      .map((report) =>
        cycle === "current"
          ? {
              date: report.visitDate,
              article: report.orderDetails.articlesOrdered,
              revenue: report.orderDetails.revenueGenerated,
            }
          : {
              date: report.nextVisit.expectedDate,
              article: report.nextVisit.expectedArticles,
              revenue: report.nextVisit.expectedRevenue,
            },
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reduce((acc, report) => {
        const key = formatDate(report.date).split("/");
        const formattedKey = `${key[1]}-${key[2]}`;

        if (!acc[formattedKey]) {
          acc[formattedKey] = {
            month: formattedKey,
            totalArticlesOrdered: 0,
            totalRevenueGenerated: 0,
          };
        }

        acc[formattedKey].totalArticlesOrdered += report.article;
        acc[formattedKey].totalRevenueGenerated += report.revenue;

        return acc;
      }, {});
  };

  const arrayWithAgregateSalesCurrentCycle = Object.values(
    aggregateTotalSalesByMonth(data, "current"),
  );
  const arrayWithAgregateSalesForecastCycle = Object.values(
    aggregateTotalSalesByMonth(data, "forecast"),
  );
  console.log(arrayWithAgregateSalesCurrentCycle);

  const chartData = {
    labels: arrayWithAgregateSalesCurrentCycle.map((el) => el.month),

    datasets: [
      {
        label: "Volume de vente réalisé en unités",
        data: arrayWithAgregateSalesCurrentCycle.map((el) => el.totalArticlesOrdered),
        backgroundColor: generateRandomRGBA(arrayWithAgregateSalesCurrentCycle, "0.3"),
        borderColor: generateRandomRGBA(arrayWithAgregateSalesCurrentCycle, "1"),
        borderWidth: 1,
      },
      {
        label: "Chiffre d'affaire réalisé (en centaines d'euros) ",
        data: arrayWithAgregateSalesCurrentCycle.map((el) => el.totalRevenueGenerated / 100),
        backgroundColor: generateRandomRGBA(arrayWithAgregateSalesCurrentCycle, "0.3"),
        borderColor: generateRandomRGBA(arrayWithAgregateSalesCurrentCycle, "1"),
        borderWidth: 1,
      },
      {
        label: "Volume de vente prévisionnel en unités ",
        data: arrayWithAgregateSalesForecastCycle.map((el) => el.totalArticlesOrdered),
        backgroundColor: generateRandomRGBA(arrayWithAgregateSalesForecastCycle, "0.3"),
        borderColor: generateRandomRGBA(arrayWithAgregateSalesForecastCycle, "1"),
        borderWidth: 1,
      },
      {
        label: "Chiffre d'affaire prévisionnel (en centaines d'euros)",
        data: arrayWithAgregateSalesForecastCycle.map((el) => el.totalRevenueGenerated / 100),
        backgroundColor: generateRandomRGBA(arrayWithAgregateSalesForecastCycle, "0.3"),
        borderColor: generateRandomRGBA(arrayWithAgregateSalesForecastCycle, "1"),
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
        text: `Evolution mensuelle des ventes réalisées et prévisionnelles sur ${arrayWithAgregateSalesCurrentCycle.length} mois`,
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

  return <Line data={chartData} options={options} />;
};

export default GlobalLineChartByMonth;
