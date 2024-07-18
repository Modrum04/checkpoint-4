import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./ReportCard.scss";

function ReportCard({ data }) {
  return (
    <div className="report-card-container">
      <h2>Client : {data.client.name}</h2>
      <h2>Agent : {data.seller.name}</h2>
      <p>Date de la visite : {formatDate(data.visitDate)}</p>
      <p>CA réalisé : {data.orderDetails.revenueGenerated} € HT</p>
      <p>Volume commandé : {data.orderDetails.articlesOrdered} unités</p>
      <Link to={`${data._id}`}>
        <button className="button-md-indigo-fullfilled">voir les détails du compte rendu</button>
      </Link>
    </div>
  );
}

export default ReportCard;
