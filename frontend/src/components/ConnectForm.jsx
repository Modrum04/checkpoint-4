import "./ConnectForm.scss";
import "../style/button.scss";
import "../style/input.scss";
import { Form, Link, useActionData, useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const hostUrl = import.meta.env.VITE_API_URL;

function ConnectForm({ setIsConnected }) {
  const location = useLocation();
  const userSession = useActionData();

  useEffect(() => {
    if (!userSession) {
      return;
    }
    setIsConnected(sessionStorage.connected);
  }, [userSession]);

  const handleDisconnectSession = () => {
    sessionStorage.clear();
    setIsConnected(false);
  };

  return (
    <div className="connect-container">
      {sessionStorage.token ? (
        <svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="10" fill="green" />
        </svg>
      ) : (
        <svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="10" fill="red" />
        </svg>
      )}
      <h2>{sessionStorage.token ? `Bienvenue ${sessionStorage?.sellerName}` : "Connection"}</h2>
      {sessionStorage.token ? (
        <>
          <Link to="/reports">
            <button className="button-sm-indigo-fullfilled">Voir les rapports commerciaux</button>
          </Link>{" "}
          {sessionStorage?.isAdmin === "true" && (
            <Link to="/activity-monitoring">
              <button className="button-sm-indigo-fullfilled">Voir le tableau de bord</button>
            </Link>
          )}
          <button className="button-sm-indigo-fullfilled" onClick={handleDisconnectSession}>
            Se déconnecter
          </button>
        </>
      ) : (
        <>
          <Form method="post">
            <section className="email-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={location.state?.email ? location.state.email : ""}
                placeholder="nom@mail.com"
                required
              />
            </section>
            <section className="password-container">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={location.state?.password ? location.state.password : ""}
                required
              />
            </section>
            <input
              id="submit"
              type="submit"
              name="submit"
              value="Se connecter"
              className="button-sm-indigo-fullfilled"
            />
          </Form>
          <Toaster />
        </>
      )}
    </div>
  );
}

export async function login({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const requestBody = {
    email,
    password,
  };

  try {
    const response = await fetch(`${hostUrl}/api/sellers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();

    if (!response.ok) {
      toast.error(responseBody.message, {
        duration: 4000,
        position: "bottom-right",
      });
      return null;
    }
    toast.success("Votre compte a été créé.", {
      duration: 4000,
      position: "bottom-right",
    });

    const { token, sellerName, sellerId, isAdmin } = responseBody;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("sellerName", sellerName);
    sessionStorage.setItem("sellerId", sellerId);
    sessionStorage.setItem("isAdmin", isAdmin);
    sessionStorage.setItem("connected", true);

    return responseBody;
  } catch (e) {
    console.error(e.message);
    return { error: true };
  }
  return null;
}

export default ConnectForm;
