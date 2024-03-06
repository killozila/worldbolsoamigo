import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";

const FormStep1 = () => {
  const { state, dispatch } = useFormContext();
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const handleChange = (fieldName, e) => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { [fieldName]: e.target.value },
    });
  };

  const handleBlur = (fieldName) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
  };

  const isRequiredFieldValid = (fieldValue) => {
    return fieldValue.trim() !== "";
  };

  const displayError = (fieldName, error) => {
    return touchedFields[fieldName] && !isRequiredFieldValid(state.formData[fieldName]) && (
      <p className="text-red-500 text-left text-sm">{error}</p>
    );
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^\+?[0-9]\d{9,14}$/.test(phone);
  };

  const isFormValid = () => {
    const { name, email, phone } = state.formData;
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      isValidEmail(email) &&
      isValidPhone(phone)
    );
  };

  return (
    
    <div className="flex flex-col my-8 gap-4">
      <header>
        <h1 className="font-extrabold text-3xl">Contato</h1>
        <p className="text-sm text-neutral-cool-gray leading-none">
          Por favor informe suas informações de contato.
        </p>
      </header>
      <form className="flex flex-col gap-2 ">
        <label
          htmlFor="nameInput"
          className="font-bold flex flex-row items-center justify-between"
        >
          Nome
          {displayError("Nome", "Este campo está vazio")}
        </label>
        <input
          type="text"
          name="name"
          id="nameInput"
          placeholder="Insira seu Nome"
          className={`w-full border ${
            touchedFields.name && !isRequiredFieldValid(state.formData.name)
              ? "border-red-500  focus:outline-red-500"
              : "border-neutral-cool-gray"
          } p-2 rounded-md mb-2`}
          value={state.formData.name}
          onChange={(e) => handleChange("name", e)}
          onBlur={() => handleBlur("name")}
        />

        <label htmlFor="emailInput" className="font-bold flex flex-row items-center justify-between">
          Email
          {displayError("email", "Este campo está vazio")}
          {touchedFields.email && state.formData.email.trim() !== "" && !isValidEmail(state.formData.email) && (
            <p className="text-red-500 text-left text-sm">
              Por favor insira um email válido.
            </p>
          )}
        </label>
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="Insira seu email"
          className={`w-full border ${
            (touchedFields.email && state.formData.email.trim() === "") || (touchedFields.email && !isValidEmail(state.formData.email)) 
              ? "border-red-500  focus:outline-red-500"
              : "border-neutral-cool-gray focus:outline-black" 
          } p-2 rounded-md mb-2`}
          value={state.formData.email}
          onChange={(e) => handleChange("email", e)}
          onBlur={() => handleBlur("email")}
        />

        <label htmlFor="phoneNumber" className="font-bold flex flex-row items-center justify-between text-nowrap">
          Número de celular
          {displayError("Número", "Este campo está vazio")}
          {touchedFields.phone && state.formData.phone.trim() !== "" && !isValidPhone(state.formData.phone) && (
            <p className="text-red-500 text-left text-sm">
              Por favor insira um número válido
            </p>
          )}
        </label>
        <input
          type="tel"
          name="phone"
          id="phoneNumber"
          placeholder="Insira um número de celular"
          className={`w-full border ${
            (touchedFields.phone && state.formData.phone.trim() === "") || (touchedFields.phone && !isValidPhone(state.formData.phone)) 
              ? "border-red-500  focus:outline-red-500"
              : "border-neutral-cool-gray"
          } p-2 rounded-md mb-4`}
          value={state.formData.phone}
          onChange={(e) => handleChange("phone", e)}
          onBlur={() => handleBlur("phone")}
        />
        <div className="hidden md:flex justify-end mt-8">
          <button
            className="bg-primary-marine-black text-white rounded-md w-32 p-3 disabled:opacity-90"
            onClick={() => {
              if (isFormValid()) {
                dispatch({ type: "NEXT_STEP" });
              }
            }}
            disabled={!isFormValid()}
          >
            Avançar
          </button>
        </div>
        {/* mobile */}
        <div className="md:hidden flex flex-row bg-transparent fixed w-screen  bottom-0 left-0 p-4 justify-end">
          <button
            className="bg-primary-marine-black text-white rounded-md w-32 p-3 disabled:opacity-90"
            onClick={() => {
              if (isFormValid()) {
                dispatch({ type: "NEXT_STEP" });
              }
            }}
            disabled={!isFormValid()}
          >
            Avançar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep1;
