import { useNavigate } from "react-router-dom";
import "./BackButton.scss";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} type="button" className="back-button">
      &#x3c;
    </button>
  );
}

export default BackButton;
