import { useEffect, useState } from "react";
import { Form, Link, useActionData, useLoaderData } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./ReportDetails.scss";
import "../style/colors.scss";
import Modal from "../components/Modal";
import { usePDF } from "react-to-pdf";

const hostUrl = import.meta.env.VITE_API_URL;

const requestHeader = () => {
  const token = sessionStorage.getItem("token");
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

const fetchExternalsDetails = (endpoint, id, setter) => {
  fetch(`${hostUrl}/api/${endpoint}/${id}`, requestHeader())
    .then((response) => response.json())
    .then((data) => setter(data));
};

function ReportDetails() {
  const datasReportDetails = useLoaderData();
  const actionResponse = useActionData();

  if (!datasReportDetails) {
    return (
      <div>
        <Modal
          isOpen={true}
          message={
            actionResponse?.error
              ? "Une erreur s'est produite lors de l'enregistrement du compte rendu."
              : "Le compte rendu a été supprimé avec succès."
          }
        />
      </div>
    );
  }

  const { _id, seller, client, visitDate, reportText, orderDetails, nextVisit } =
    datasReportDetails;
  const { toPDF, targetRef } = usePDF({
    filename: seller.name.replace(/[^a-zA-Z]/g, "") + "-" + formatDate(visitDate),
  });

  const [clientDetails, setClientDetails] = useState({});
  const [sellerDetails, setSellerDetails] = useState({});

  useEffect(() => {
    fetchExternalsDetails("clients", client._id, setClientDetails);
    fetchExternalsDetails("sellers", seller._id, setSellerDetails);
  }, []);

  return (
    <>
      <div className="report-details-container">
        <div ref={targetRef} className="report-details">
          <h1>Détail du compte rendu</h1>
          <div className="parties">
            <p>Agent : {seller.name}</p>
            <p>Client : {client.name}</p>
          </div>
          <div className="last-visit">
            <h2>Derniere visite</h2>
            <p>Visite effectuée le : {formatDate(visitDate)}</p>
            <p>Nombre d'articles commandés : {orderDetails.articlesOrdered} unités</p>
            <p>Chiffre d'affaire réalisé : {orderDetails.revenueGenerated} € HT</p>
            <h3>Synthese</h3>
            <p>{reportText}</p>
          </div>
          <div className="forecast">
            <h2>Previsionnel</h2>
            <p>Prochaine visite attendue le : {formatDate(nextVisit.expectedDate)}</p>
            <p>Volume de vente previsionnel : {nextVisit.expectedArticles} unités</p>
            <p>Chiffre d'affaire attendu : {nextVisit.expectedRevenue} € HT</p>
          </div>
          <div className="client-details">
            <h2>Informations - Client</h2>
            <p>Société : {clientDetails.name}</p>
            <p>Adresse de la societe : {clientDetails.adress}</p>
            <p>Contact au sein de la societe : {clientDetails.contact}</p>
            <p>n° client : {clientDetails._id}</p>
          </div>
          <div className="seller-details">
            <h2>Informations - Agent</h2>
            <p>Identité : {sellerDetails.name}</p>
            <p>email : {sellerDetails.email}</p>
            <p>Numero de telephone : {sellerDetails.phone}</p>
            <p>n° salarié : {sellerDetails._id}</p>
          </div>
        </div>
        <button className="button-lg-indigo-fullfilled" onClick={() => toPDF()}>
          Télécharger le pdf
        </button>
        <div className="button-container">
          <Link to={`/report-edit-form/${_id}`}>
            <button className="button-lg-indigo-fullfilled">Modifier</button>
          </Link>
          <Form method="delete">
            <input
              id="submit"
              type="submit"
              name="submit"
              value="Suppprimer"
              className="button-lg-indigo-fullfilled"
            />
          </Form>
        </div>
      </div>
    </>
  );
}

export default ReportDetails;

export const deleteReport = async ({ request, params }) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${hostUrl}/api/reports/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.info("Report deleted successfully");
      return await response.json();
    } else {
      console.error("Failed to delete report");
      return { error: "Failed to delete report" };
    }
  } catch (e) {
    console.error("Error:", e.message);
    return { error: e.message };
  }
};
