import "./ReportForm.scss";
import "../style/button.scss";
import "../style/input.scss";
import { Form, useActionData, useLoaderData, redirect } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";
import DropdownSelector from "../components/DropdownSelector";

const hostUrl = import.meta.env.VITE_API_URL;

function ReportEditForm() {
  const data = useLoaderData();

  const [selectedSeller, setSelectedSeller] = useState(data.seller._id);
  const [selectedClient, setSelectedClient] = useState(data.client._id);

  const actionResponse = useActionData();

  return (
    <>
      <div className="report-form-container">
        <Form method="put">
          <h1>Modification du Compte rendu n°{data._id}</h1>
          <input type="hidden" name="seller" value={data.seller._id} />
          <input type="hidden" name="client" value={data.client._id} />
          <section className="parties">
            <div>
              <label htmlFor="seller-name">Agent</label>
              <DropdownSelector
                selected={selectedSeller}
                setSelected={setSelectedSeller}
                dropdownDatasList={[data.seller]}
                name={"seller-name"}
                disabled={true}
              />
              <em>n° salarié : {data.seller._id}</em>
            </div>
            <div>
              <label htmlFor="client-name">Client</label>
              <DropdownSelector
                selected={selectedClient}
                setSelected={setSelectedClient}
                dropdownDatasList={[data.client]}
                name={"client-name"}
                disabled={true}
              />
              <em>n° client : {data.client._id}</em>
            </div>
          </section>
          <section className="visit-date">
            <label htmlFor="visit-date">Date de la visite</label>
            <input
              id="visit-date"
              name="visit-date"
              type="date"
              className="input-sm-indigo-outlined"
              required
              defaultValue={data.visitDate.split("T")[0]}
            />
            <p>Requis</p>
          </section>
          <section className="order">
            <div>
              <label htmlFor="articles-ordered">Nombre d'articles commandés</label>
              <input
                id="articles-ordered"
                placeholder="nombre d'unités"
                name="articles-ordered"
                type="number"
                className="input-sm-indigo-outlined"
                required
                defaultValue={data.orderDetails.articlesOrdered}
              />
              <p>Requis</p>
            </div>
            <div>
              <label htmlFor="generated-revenue">Chiffre d'affaire réalisé</label>
              <input
                id="generated-revenue"
                placeholder="€ HT"
                name="generated-revenue"
                type="number"
                step="0.01"
                className="input-sm-indigo-outlined"
                required
                defaultValue={data.orderDetails.revenueGenerated}
              />
              <p>Requis</p>
            </div>
          </section>
          <section>
            <h3>Synthèse</h3>
            <textarea required id="report-text" name="report-text" defaultValue={data.reportText} />
            <p>Requis</p>
          </section>
          <h2>Prévisionnel</h2>
          <section className="next-visit-date">
            <label htmlFor="next-visit-date">Prochaine visite</label>
            <input
              id="next-visit-date"
              name="next-visit-date"
              type="date"
              className="input-sm-indigo-outlined"
              required
              defaultValue={data.nextVisit.expectedDate.split("T")[0]}
            />
            <p>Requis</p>
          </section>{" "}
          <section className="forecast">
            <div>
              <label htmlFor="expected-ordered">Volume prévisionnel de vente</label>
              <input
                id="expected-ordered"
                placeholder="nombre d'unités"
                name="expected-ordered"
                type="number"
                className="input-sm-indigo-outlined"
                required
                defaultValue={data.nextVisit.expectedArticles}
              />
              <p>Requis</p>
            </div>
            <div>
              <label htmlFor="expected-revenue">Chiffre d'affaire prévisionnel</label>
              <input
                id="expected-revenue"
                placeholder="€ HT"
                name="expected-revenue"
                type="number"
                step="0.01"
                className="input-sm-indigo-outlined"
                required
                defaultValue={data.nextVisit.expectedRevenue}
              />
              <p>Requis</p>
            </div>
          </section>
          <input
            id="submit"
            type="submit"
            name="submit"
            value="Envoyer"
            className="button-lg-indigo-fullfilled"
          />
        </Form>
      </div>
      <Modal
        isOpen={!!actionResponse}
        message={
          actionResponse?.error
            ? "Une erreur s'est produite lors de l'enregistrement du compte rendu."
            : "Le comte rendu à été enregistré avec succès."
        }
      />
    </>
  );
}

export async function updateReport({ request, params }) {
  const formData = await request.formData();
  const id = params.id;

  const seller = formData.get("seller");
  const client = formData.get("client");
  const reportText = formData.get("report-text");

  const visitDate = formData.get("visit-date");
  const articlesOrdered = formData.get("articles-ordered");
  const revenueGenerated = formData.get("generated-revenue");

  const expectedDate = formData.get("next-visit-date");
  const expectedArticles = formData.get("expected-ordered");
  const expectedRevenue = formData.get("expected-revenue");

  const requestBody = {
    seller,
    client,
    reportText,
    visitDate,
    orderDetails: { articlesOrdered, revenueGenerated },
    nextVisit: { expectedDate, expectedArticles, expectedRevenue },
  };
  try {
    const response = await fetch(`${hostUrl}/api/reports/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.token}`,
      },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();

    if (response.ok) {
      return responseBody;
    }
  } catch (e) {
    console.error(e.message);
    return { error: true };
  }
  return null;
}

export default ReportEditForm;
