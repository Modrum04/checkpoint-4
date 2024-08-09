import { useLoaderData } from "react-router-dom";
import GlobalBarChart from "../components/GlobalBarChart";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import DropdownSelector from "../components/DropdownSelector";
import "./ActivityMonitoring.scss";
import DetailsChart from "../components/DetailsChart";
import GlobalLineChartByMonth from "../components/GlobalLineChartByMonth";

function ActivityMonitoring() {
  const [displayGlobalChart, setDisplayGlobalChart] = useState(true);
  const [displayDetailsChart, setDisplayDetailsChart] = useState(true);
  const reports = useLoaderData();
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const { fetchedData: filterReports } = fetchData("reports", {
    filterBy: filterBy,
    filterValue: filterValue,
  });

  const { fetchedData: fetchedClientsList } = fetchData("clients");
  const { fetchedData: fetchedSellersList } = fetchData("sellers");

  const handleClickDisplayButton = (getter, setter) => setter(!getter);

  const getListOfSellersOrClients = (filterBy) => {
    switch (filterBy) {
      case "seller.id":
        return fetchedSellersList; //renvoie la liste des noms et id des vendeurs
        break;
      case "client.id":
        return fetchedClientsList; //renvoie la liste des noms et id des clients
        break;
      default:
        return false;
    }
  };

  useEffect(() => {
    setFilterValue("");
  }, [filterBy]);

  return (
    <div className="monitoring-container">
      {sessionStorage.isAdmin === "true" ? (
        <>
          <header>
            <h1>Tableau de bord</h1>
            <div className="selector-container">
              <button
                className={`${
                  displayGlobalChart ? "button-sm-indigo-fullfilled " : "button-sm-indigo-outlined"
                }`}
                onClick={() => handleClickDisplayButton(displayGlobalChart, setDisplayGlobalChart)}
              >
                {`${displayGlobalChart ? "Masquer le bilan global" : "Afficher le bilan global"}`}
              </button>
              <button
                className={`${
                  displayDetailsChart ? "button-sm-indigo-fullfilled " : "button-sm-indigo-outlined"
                }`}
                onClick={() =>
                  handleClickDisplayButton(displayDetailsChart, setDisplayDetailsChart)
                }
              >
                {`${
                  displayDetailsChart ? "Masquer le bilan détaillé" : "Afficher le bilan détaillé"
                }`}
              </button>
            </div>
            {displayDetailsChart && (
              <div className="selector-container">
                <h2>Filtrer par</h2>
                <DropdownSelector
                  selected={filterBy}
                  setSelected={setFilterBy}
                  dropdownDatasList={[
                    { _id: "seller.id", name: "Agent" },
                    { _id: "client.id", name: "Client" },
                  ]}
                />
                {getListOfSellersOrClients(filterBy) && (
                  <DropdownSelector
                    selected={filterValue}
                    setSelected={setFilterValue}
                    dropdownDatasList={getListOfSellersOrClients(filterBy)}
                  />
                )}
              </div>
            )}
          </header>

          <div className="chart-container">
            {filterReports.length ? (
              displayDetailsChart && (
                <DetailsChart
                  data={filterValue ? filterReports : reports}
                  person={filterBy ? filterBy.split(".")[0] : "client"}
                />
              )
            ) : (
              <h2>Aucune vente réalisée pour client</h2>
            )}
            {displayGlobalChart && <GlobalBarChart data={reports} />}
            {displayGlobalChart && <GlobalLineChartByMonth data={reports} />}
          </div>
        </>
      ) : (
        <>
          <h1>Page réservées aux administrateurs</h1>
          <h2>Vous n'êtes pas autorisés à accéder à ce contenu</h2>
        </>
      )}
    </div>
  );
}
export default ActivityMonitoring;
