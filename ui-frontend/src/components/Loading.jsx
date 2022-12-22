import Spinner from "react-bootstrap/Spinner";
import style from "./Header.scss";

export default function Loading() {
  return (
    <Spinner animation="border" role="status" className={style.loading}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
