import Spinner from "react-bootstrap/Spinner";
import "./header.scss";

export default function Loading() {
  return (
    <Spinner animation="border" role="status" className="loading">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
