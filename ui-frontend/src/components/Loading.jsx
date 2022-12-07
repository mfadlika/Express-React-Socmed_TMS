import Spinner from "react-bootstrap/Spinner";
import style from "./Header.module.css";

export default function Loading() {
  return (
    <Spinner animation="border" role="status" className={style.loading}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
