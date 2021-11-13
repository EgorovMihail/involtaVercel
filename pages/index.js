import FormConteiner from "./components/FormContainer/FormContainer";
import Title from "./components/Title/Title";
import { InputComponent } from "./components/Input/InputComponent";
import * as Yup from "yup";
import styles from "../styles/Home.module.sass";
import MultiStep, { FormStep } from "./components/MultiStep/MultiStep";
import parsePhoneNumberFromString from "libphonenumber-js";

// ====== валидация  для 1 шага=====
const validatePersonalInformation = Yup.object().shape({
  lastName: Yup.string()
    .matches(/^([^0-9]*)$/, "Фамилия не должно содержать цифры")
    .min(2, "Слишком короткая фамилия!")
    .max(50, "Слишком длинная фамилия!")
    .required("Это поле является обязателным!"),
  firstName: Yup.string()
    .matches(/^([^0-9]*)$/, "Имя не должно содержать цифры")
    .min(2, "Слишком короткое имя!")
    .max(50, "Слишком длинное имя!")
    .required("Это поле является обязателным!"),
  patronymic: Yup.string()
    .matches(/^([^0-9]*)$/, "Отчество не должно содержать цифры")
    .min(2, "Слишком короткое отчество!")
    .max(50, "Слишком длинное отчество!")
    .required("Это поле является обязателным!"),
});
// ====== валидация  для 2 шага=====

const validateСontactInformation = Yup.object().shape({
  tel: Yup.number()
    .typeError("Поле с номером может содержать только цифры!")
    .test(
      "oneOfRequired",
      "Хотя бы одно поле должно быть заполнено! ",
      function () {
        return this.parent.tel || this.parent.email;
      },
    ),

  email: Yup.string()
    .test(
      "oneOfRequired",
      "Хотя бы одно поле должно быть заполнено! ",
      function () {
        return this.parent.tel || this.parent.email;
      },
    )
    .email("Email должен иметь корректный формат!"),
});

// ====== валидация  для 3 шага=====
const validateUserPhoto = Yup.object().shape({
  file: Yup.array()
    .of(
      Yup.object()
        .shape({
          file: Yup.mixed()
            .test("fileSize", "Размер файла больше 10 Мб!", (value) => {
              if (!value) return false;
              return value.size < 10000000;
            })
            .required(),
          type: Yup.string()
            .oneOf(
              ["image/png", "image/jpeg"],
              "Добавьте файл с правильным форматом!",
            )
            .required(),
          name: Yup.string().required(),
        })
        .typeError("Добавте свою фотографию!"),
    )
    .required("Добавте свою фотографию!"),
});
//функция создания маски
const normolizePhoneNumber = (value) => {
  const phoneNumberObj = {
    plus: "+",
    value: value,
  };
  if (
    phoneNumberObj.value.split("").length == 11 &&
    phoneNumberObj.value.split("")[0] != "+"
  ) {
    value = phoneNumberObj.plus + phoneNumberObj.value;
  }
  const phoneNumber = parsePhoneNumberFromString(value);

  if (!phoneNumber) {
    return value;
  } else {
    return phoneNumber.formatInternational();
  }
};

export default function Home() {
  return (
    <div className={styles.container}>
      <FormConteiner>
        <div className={styles.conteiner__form}>
          <MultiStep
            initialValues={{
              lastName: "",
              firstName: "",
              patronymic: "",
              email: "",
              tel: "",
              file: [],
            }}
          >
            {/* первый шаг  */}
            <FormStep
              stepName="personalInformation"
              onSubmit={() => console.log("step1 submit")}
              validationSchema={validatePersonalInformation}
            >
              <div className={styles.input__wrap}>
                <Title text="Личная информация"></Title>
                <InputComponent
                  id="lastName"
                  type="text"
                  placeholder="Фамилия"
                  name="lastName"
                ></InputComponent>
                <InputComponent
                  id="firstName"
                  type="text"
                  placeholder="Имя"
                  name="firstName"
                ></InputComponent>
                <InputComponent
                  id="patronymic"
                  type="text"
                  placeholder="Отчество"
                  name="patronymic"
                ></InputComponent>
              </div>
            </FormStep>

            {/* второй шаг  */}
            <FormStep
              stepName="contactInformation"
              onSubmit={() => console.log("step2 submit")}
              validationSchema={validateСontactInformation}
            >
              <div className={styles.input__wrap}>
                <Title text="Контактная информация"></Title>

                <InputComponent
                  id="tel"
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  name="tel"
                  onInput={(e) => {
                    e.target.value = normolizePhoneNumber(e.target.value);
                  }}
                ></InputComponent>
                <InputComponent
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  name="email"
                ></InputComponent>
              </div>
            </FormStep>

            {/* третий  шаг  */}
            <FormStep
              stepName="userPhoto"
              onSubmit={() => console.log(formik.errors)}
              validationSchema={validateUserPhoto}
            >
              <div className={styles.input__wrap}>
                <Title text="Фотография"></Title>
              </div>
            </FormStep>
          </MultiStep>
        </div>
      </FormConteiner>
    </div>
  );
}
