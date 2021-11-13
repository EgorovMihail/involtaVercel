import styles from "../styles/Home.module.sass";
import FormConteiner from "./components/FormContainer/FormContainer";
import ResultMessage from "./components/ResultMessage/ResultMessage";

export default function Result() {
  return (
    <div className={styles.container}>
      <FormConteiner>
        <ResultMessage message="Ошибка!"></ResultMessage>
      </FormConteiner>
    </div>
  );
}
