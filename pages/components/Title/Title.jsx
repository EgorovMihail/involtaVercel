import style from "./Title.module.sass";

export default function Title(props) {
  return (
    <div className={style.title__block}>
      <h1 className={style.title__text}>{props.text}</h1>
    </div>
  );
}
