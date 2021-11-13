import style from "./FormContainer.module.sass";

export default function FormConteiner({ children, ...props }) {
  return <div className={style.form__conteiner}>{children}</div>;
}
