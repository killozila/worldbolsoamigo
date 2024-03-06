import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import Pix from "../assets/images/pix.svg";
import Cartao from "../assets/images/card.svg";
import Boleto from "../assets/images/boleto.svg";

const FormStep2 = () => {
  const { state, dispatch } = useFormContext();
  const [isMonthly, setIsMonthly] = useState(true);
  const [plan,setPlan] =  useState('Pix')

  const handleToggleClick = (e) => {
    e.preventDefault();
    setIsMonthly((prevIsMonthly) => !prevIsMonthly);
  };

  const handlePlanChange = (selected) => {
    setPlan(selected)
  };
  const handleSubmission = async () => {
    await dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { billingPlan: plan, billingCycle: isMonthly ? 'unico' : 'anual' },
    });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="flex flex-col my-2 gap-4">
      <header>
        <h1 className="font-extrabold text-3xl">Pagamento</h1>
        <p className="text-sm text-neutral-cool-gray leading-none">
         Escolha um método de pagamento 
        </p>
      </header>
      <form className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2  md:gap-4 md:flex-row text-primary-marine-white">
          {/* Pix */}
          <div
            className={`flex flex-row items-center p-4 gap-4 md:flex-col md:items-start md:w-1/3 border border-neutral-cool-gray md:p-4 rounded-md mb-2 cursor-pointer hover:border-neutral-cool-gray  ${
              plan === "Pix" &&
              "border-neutral-cool-gray border-2 bg-neutral-alabaster"
            }`}
            onClick={() => handlePlanChange("Pix")}
          >
            <img
              src={Pix}
              alt="Pix"
              className="h-12  md:mb-8"
            />
            <div className="font-bold">
              <h6 className="font-extrabold text-xl">Pix</h6>
              {isMonthly ? (
                <p className="text-neutral-cool-gray">R$ 9,90</p>
              ) : (
                <p className="text-primary-marine-green">
                  <span className="text-neutral-cool-gray">R$ 90 </span> <br /> Ajudar 12 meses
                </p>
              )}
            </div>
          </div>
          {/* Card */}
          <div
            className={`flex flex-row items-center p-4 gap-4 md:flex-col md:items-start md:w-1/3 border border-neutral-cool-gray md:p-4 rounded-md mb-2 cursor-pointer hover:border-neutral-cool-gray hover:border-2${
              plan === "Cartão" &&
              "border-neutral-cool-gray border-2 bg-neutral-alabaster "
            }`}
            onClick={() => handlePlanChange("Cartão")}
          >
            <img
              src={Cartao}
              alt="Cartão"
              className="h-12  md:mb-8"
            />
            <div className="font-bold">
              <h6 className="font-extrabold text-xl">Cartão</h6>
              {isMonthly ? (
                <p className="text-neutral-cool-gray">R$ 12</p>
              ) : (
                <p className="text-primary-marine-green">
                  <span className="text-neutral-cool-gray">R$ 120</span> <br /> Ajudar 12 meses
                </p>
              )}
            </div>
          </div>
          {/* Boleto */}
          <div
            className={`flex flex-row items-center p-4 gap-4 md:flex-col md:items-start md:w-1/3 border border-neutral-cool-gray md:p-4 rounded-md mb-2 cursor-pointer hover:border-neutral-cool-gray hover:border-2${
              plan === "Boleto" &&
              "border-neutral-cool-gray border-2 bg-neutral-alabaster "
            }`}
            onClick={() => handlePlanChange("Boleto")}
          >
            <img
              src={Boleto}
              alt="Boleto"
              className="h-12  md:mb-8"
            />
            <div className="font-bold">
              <h6 className="font-extrabold text-xl">Boleto</h6>
              {isMonthly ? (
                <p className="text-neutral-cool-gray">R$ 15</p>
              ) : (
                <p className="text-primary-marine-green">
                  <span className="text-neutral-cool-gray">R$ 150</span> <br /> Ajudar 12 meses
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pagamento uncio/anual */}
        <div className="w-full flex flex-row items-center justify-center bg-neutral-alabaster text-primary-marine-white text-lg gap-4 p-3 rounded-md">
          <p
            className={`cursor-pointer ${
              isMonthly ? "bg-primary-marine-white" : "bg-primary-marine-white"
            }`}
            onClick={handleToggleClick}
          >
            Único
          </p>
          <button
            className="relative bg-primary-marine-black w-12 h-6 rounded-full flex  flex-col justify-center"
            onClick={handleToggleClick}
          >
            <span
              className={`bg-white h-4 w-4 rounded-full absolute transition-transform transform my-auto ${
                isMonthly ? "ml-2" : " ml-6"
              }`}
            ></span>
          </button>
          <p
            className={`cursor-pointer ${
              !isMonthly ? "bg-primary-marine-white" : "bg-primary-marine-white"
            }`}
            onClick={handleToggleClick}
          >
            Anual
          </p>
        </div>
        {/* previous next buttons */}
        <div className="hidden md:flex justify-between mt-8">
          <button
            className=" text-xl text-neutral-cool-gray hover:cursor-pointer hover:text-black"
            onClick={() => { dispatch({ type: "PREVIOUS_STEP" }) }}
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
            onClick={() => { dispatch({ type: "PREVIOUS_STEP" })}}
          >
            Voltar
          </button>

          <button
            className=".bg-primary-marine-black text-white rounded-md w-32 p-3 disabled:opacity-50"
            onClick={handleSubmission}
          >
            Avançar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep2;
