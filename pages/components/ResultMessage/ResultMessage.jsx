import style from "./ResultMessage.module.sass";

export default function ResultMessage({ children, ...props }) {
  return (
    <div className={style.result__wrap}>
      <span className={style.message}>{props.message}</span>
    </div>
  );
}
