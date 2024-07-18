import { Link } from "react-router-dom";
import ReportCard from "../components/ReportCard";
import "./Reports.scss";
import DropdownSelector from "../components/DropdownSelector";
import { fetchData } from "../utils/fetchData";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";

function Reports() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("client.name");
  const [order, setOrder] = useState("asc");

  const { fetchedData: fetchedReports } = fetchData("reports", {
    filterBy: sessionStorage.isAdmin === "true" ? filterBy : "seller.id",
    filterValue: sessionStorage.isAdmin === "true" ? filterValue : sessionStorage.sellerId,
    sortBy: sortBy,
    order: order,
  });

  const { fetchedData: fetchedClientsList } = fetchData("clients");
  const { fetchedData: fetchedSellersList } = fetchData("sellers");
  const { fetchedData: fetchedDatesList } = fetchData("reports");

  const getListOfSellersOrClientsOrVisit = (filterBy) => {
    switch (filterBy) {
      case "seller.id":
        return fetchedSellersList;
        break;
      case "client.id":
        return fetchedClientsList;
        break;
      case "visitDate":
        return fetchedDatesList
          .sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate))
          .map((el) => ({
            name: formatDate(el.visitDate),
            _id: el.visitDate,
          }));
        break;
      default:
        return false;
    }
  };

  return (
    <div className="reports-container">
      {sessionStorage.token ? (
        <>
          <header>
            <h1>Liste des comptes rendus</h1>
            <Link to="/report-form">
              <button className="button-sm-indigo-fullfilled">Saisir un nouveau rapport</button>
            </Link>
            <p>Nombre total : {fetchedReports.length}</p>
            <div className="selector-container">
              {sessionStorage.isAdmin === "true" ? (
                <>
                  <h2>Filtrer par</h2>
                  <DropdownSelector
                    selected={filterBy}
                    setSelected={setFilterBy}
                    dropdownDatasList={[
                      { _id: "seller.id", name: "Agent" },
                      { _id: "client.id", name: "Client" },
                      { _id: "visitDate", name: "Date de visite" },
                    ]}
                  />
                  {getListOfSellersOrClientsOrVisit(filterBy) && (
                    <DropdownSelector
                      selected={filterValue}
                      setSelected={setFilterValue}
                      dropdownDatasList={getListOfSellersOrClientsOrVisit(filterBy)}
                    />
                  )}
                </>
              ) : (
                <>
                  <h2>Rapports de {sessionStorage.sellerName}</h2>
                </>
              )}
            </div>
            <div className="selector-container">
              <h2>Trier par</h2>
              <DropdownSelector
                selected={sortBy}
                setSelected={setSortBy}
                dropdownDatasList={
                  sessionStorage.isAdmin === "true"
                    ? [
                        { _id: "seller.name", name: "Agent" },
                        { _id: "client.name", name: "Client" },
                        { _id: "visitDate", name: "Date de visite" },
                      ]
                    : [
                        { _id: "client.name", name: "Client" },
                        { _id: "visitDate", name: "Date de visite" },
                      ]
                }
              />
              <h2>Sens du tri</h2>
              <DropdownSelector
                selected={order}
                setSelected={setOrder}
                dropdownDatasList={[
                  { _id: "asc", name: "Ascendant" },
                  { _id: "dsc", name: "Descendant" },
                ]}
              />
            </div>
          </header>

          <div className="reports-cards-container">
            {fetchedReports.length &&
              fetchedReports.map((report) => <ReportCard data={report} key={report._id} />)}
          </div>
        </>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          Connectez-vous pour accéder à la liste des comptes rendus
        </h1>
      )}
    </div>
  );
}
export default Reports;
