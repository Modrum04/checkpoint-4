import "./ReportForm.scss";
import "../style/button.scss";
import "../style/input.scss";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";
import DropdownSelector from "../components/DropdownSelector";

const hostUrl = import.meta.env.VITE_API_URL;

function ReportForm() {
  const [selectedSeller, setSelectedSeller] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const { clients, sellers } = useLoaderData();

  const actionResponse = useActionData();

  return (
    <>
      <div className="report-form-container">
        <Form method="post">
          <h1>Visite commerciale - Compte rendu</h1>
          <section className="parties">
            <div>
              <label htmlFor="seller-name">Agent</label>
              <DropdownSelector
                selected={selectedSeller}
                setSelected={setSelectedSeller}
                dropdownDatasList={sellers}
                name={"seller-name"}
              />
              <p>Requis</p>
              <em>n° salarié : {selectedSeller}</em>
            </div>
            <div>
              <label htmlFor="client-name">Client</label>
              <DropdownSelector
                selected={selectedClient}
                setSelected={setSelectedClient}
                dropdownDatasList={clients}
                name={"client-name"}
              />
              <p>Requis</p>
              <em>n° client : {selectedClient}</em>
            </div>
          </section>
          <section className="visit-date">
            <label htmlFor="visit-date">Date de la visite</label>
            <input
              id="visit-date"
              name="visit-date"
              type="date"
              className="input-sm-gray-outlined"
              required
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
                className="input-sm-gray-outlined"
                required
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
                className="input-sm-gray-outlined"
                required
              />
              <p>Requis</p>
            </div>
          </section>
          <section>
            <h3>Synthèse</h3>
            <textarea required id="report-text" name="report-text" />
            <p>Requis</p>
          </section>
          <h2>Prévisionnel</h2>
          <section className="next-visit-date">
            <label htmlFor="next-visit-date">Prochaine visite</label>
            <input
              id="next-visit-date"
              name="next-visit-date"
              type="date"
              className="input-sm-gray-outlined"
              required
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
                className="input-sm-gray-outlined"
                required
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
                className="input-sm-gray-outlined"
                required
              />
              <p>Requis</p>
            </div>
          </section>
          <input
            id="submit"
            type="submit"
            name="submit"
            value="Envoyer"
            className="button-lg-olive-fullfilled"
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

export async function addNewReport({ request }) {
  const formData = await request.formData();

  const seller = formData.get("seller-name");
  const client = formData.get("client-name");
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
    const response = await fetch(`${hostUrl}/api/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export default ReportForm;
