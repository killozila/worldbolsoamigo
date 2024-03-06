import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import Checkmark from "../assets/images/icon-checkmark.svg";
const FormStep3 = () => {
  const { state, dispatch } = useFormContext();
  const [addOn, setAddOn] = useState([]);
  const billingCycle = state.formData.billingCycle;

  const handleAddOnChange = (selected) => {
    setAddOn((prevAddOn) => {
      if (prevAddOn.includes(selected)) {
        return prevAddOn.filter((item) => item !== selected);
      } else {
        return [...prevAddOn, selected];
      }
    });
  };

  const handleSubmission = async () => {
    await dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { addon: addOn },
    });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="flex flex-col my-2 gap-4">
      <header>
        <h1 className="font-extrabold text-3xl">Adicional</h1>
        <p className="text-sm text-neutral-cool-gray leading-none">
          Escolha um adicional ou clique em Avançar.
        </p>
      </header>
      <form className="flex flex-col gap-2 md:gap-4 text-sm md:text-md text-border-primary-marine-black">
        {/* Add-on Online */}
        <div
          className={`flex flex-row items-center justify-between h-1/3 p-2  border border-neutral-cool-gray rounded-md  cursor-pointer hover:text-border-primary-marine-black ${
            addOn.includes("alimentos") &&
            "border-primary-marine-blue border-2 bg-neutral-alabaster"
          }`}
          onClick={() => handleAddOnChange("alimentos")}
        >
          <div className="flex flex-row items-center gap-2">
          <label
            htmlFor="addonOnline"
            className={`h-6 w-6  flex items-center justify-center border border-neutral-cool-gray rounded-md ${
              addOn.includes("alimentos") ? "bg-primary-marine-blue" : ""
            }`}
          >
            {addOn.includes("alimentos") && (
              <img src={Checkmark} alt="Checkmark " className="text-white md:text-2xl" />
            )}
          </label>
          <div className="font-bold">
            <h6 className="font-extrabold text-lg md:text-xl">Alimentos</h6>
            <p className="text-neutral-cool-gray ">
              Cesta básica de alimentos!
            </p>
          </div>
          </div>
          <div>
            <p className="text-neutral-cool-gray">
              {billingCycle === "unico" ? "+R$ 1,00" : "+R$ 10,00"}
            </p>
          </div>
        </div>
         {/* Add-on storage */}
         <div
          className={`flex flex-row items-center justify-between h-1/3 p-2  border border-neutral-cool-gray rounded-md  cursor-pointer hover:border-primary-marine-blue ${
            addOn.includes("roupas") &&
            "border-primary-marine-blue border-2 bg-neutral-alabaster"
          }`}
          onClick={() => handleAddOnChange("roupas")}
        >
          <div className="flex flex-row items-center gap-2">
          <label
            htmlFor="addonStorage"
            className={`h-6 w-6  flex items-center justify-center border border-neutral-cool-gray rounded-md ${
              addOn.includes("roupas") ? "bg-primary-marine-blue" : ""
            }`}
          >
            {addOn.includes("roupas") && (
              <img src={Checkmark} alt="Checkmark " className="text-white md:text-2xl" />
            )}
          </label>
          <div className="font-bold">
            <h6 className="font-extrabold text-lg md:text-xl">Roupas</h6>
            <p className="text-neutral-cool-gray ">
              +10 roupas novas!
            </p>
          </div>
          </div>
          <div>
            <p className="text-neutral-cool-gray">
              {billingCycle === "unico" ? "+R$ 2,00" : "+R$ 20,00"}
            </p>
          </div>
        </div>
         {/* Add-on profile */}
         <div
          className={`flex flex-row items-center justify-between h-1/3 p-2  border border-neutral-cool-gray rounded-md  cursor-pointer hover:border-primary-marine-blue ${
            addOn.includes("estudos") &&
            "border-primary-marine-blue border-2 bg-neutral-alabaster"
          }`}
          onClick={() => handleAddOnChange("estudos")}
        >
          <div className="flex flex-row items-center gap-2">
          <label
            htmlFor="addonProfile"
            className={`h-6 w-6  flex items-center justify-center border border-neutral-cool-gray rounded-md ${
              addOn.includes("estudos") ? "bg-primary-marine-blue" : ""
            }`}
          >
            {addOn.includes("estudos") && (
              <img src={Checkmark} alt="Checkmark " className="text-white md:text-2xl" />
            )}
          </label>
          <div className="font-bold">
            <h6 className="font-extrabold text-lg md:text-xl">Estudo</h6>
            <p className="text-neutral-cool-gray ">
              Kit de materiais escolares
            </p>
          </div>
          </div>
          <div>
            <p className="text-neutral-cool-gray">
              {billingCycle === "unico" ? "+R$ 2,00" : "+R$ 20,00"}
            </p>
          </div>
        </div>

        {/* previous next buttons */}
        <div className="hidden md:flex justify-between mt-8">
          <button
            className=" text-xl text-neutral-cool-gray hover:cursor-pointer hover:text-black"
            onClick={() => {
              dispatch({ type: "PREVIOUS_STEP" });
            }}
          >
            Voltar
          </button>

          <button
            className="bg-primary-marine-black text-white rounded-md w-32 p-3 disabled:opacity-50"
            onClick={handleSubmission}
          >
            Avançar
          </button>
        </div>

        {/* mobile button */}
        <div className="md:hidden flex flex-row bg-white fixed w-screen  bottom-0 left-0 p-4 justify-between">
          <button
            className=" text-xl text-neutral-cool-gray hover:cursor-pointer hover:text-black"
            onClick={() => {
              dispatch({ type: "PREVIOUS_STEP" });
            }}
          >
            Voltar
          </button>

          <button
            className="bg-primary-marine-blue text-white rounded-md w-32 p-3 disabled:opacity-50"
            onClick={handleSubmission}
          >
            Avançar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep3;
