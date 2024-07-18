import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./ReportForm.scss";
import "../style/button.scss";
import "../style/input.scss";
import "./Register.scss";

export const hostUrl = import.meta.env.VITE_API_URL;

function Register() {
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const responseData = useActionData();
  useEffect(() => {
    if (responseData) {
      navigate("/", { state: { email: responseData.email, password: responseData.password } });
    }
  }, [responseData]);

  return (
    <div className="report-form-container">
      <Form method="post" action="/register">
        <h1>Formulaire d'enregistrement</h1>
        <section className="name">
          <label htmlFor="name">Nom</label>
          <input
            id="name"
            name="name"
            placeholder="Entrer votre nom"
            className="input-sm-gray-outlined"
            required
          />
        </section>

        <section className="email">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            pattern="^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
            placeholder="Entrer votre adresse mail"
            className="input-sm-gray-outlined"
            required
          />
        </section>
        <section className="phone">
          <label htmlFor="phone">Numéro de ligne</label>
          <input
            id="phone"
            name="phone"
            placeholder="Entrer votre numéro de ligne"
            className="input-sm-gray-outlined"
            required
          />
        </section>
        <section className="password-section">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Entrer le mot de passe souhaité"
            className="input-sm-gray-outlined"
            minLength="8"
            required
          />
          <ul>
            <li>Le mot de passe doit comporter au moins :</li>
            <li>8 caractères</li>
            <li>1 lettre</li>
            <li>1 chiffre</li>
          </ul>
          <label htmlFor="password-check">Vérification du mot de passe</label>
          <input
            id="password-check"
            name="password-check"
            type="password"
            pattern={pwd}
            placeholder="Entrer à nouveau le mot passe"
            className="input-sm-gray-outlined"
            required
          />
        </section>
        <button type="submit" className="button-lg-indigo-fullfilled">
          Valider
        </button>
      </Form>
      <Toaster />
    </div>
  );
}

export async function postNewSeller({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");

  const requestBody = {
    name,
    email,
    phone,
    password,
    isAdmin: false,
  };
  try {
    const response = await fetch(`${hostUrl}/api/sellers/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();

    if (!response.ok) {
      toast.error(responseBody.error.message, {
        duration: 4000,
        position: "bottom-right",
      });
      return null;
    }
    toast.success("Votre compte a été créé.", {
      duration: 4000,
      position: "bottom-right",
    });

    return requestBody;
  } catch (e) {
    console.error(e.message);
    return { error: true };
  }
}

export default Register;
