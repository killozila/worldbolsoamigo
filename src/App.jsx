import React from "react";
import { useFormContext } from "./context/FormContext";
import FormStep1 from "./components/FormStep1";
import FormStep2 from "./components/FormStep2";
import FormStep3 from "./components/FormStep3";
import FormStep4 from "./components/FormStep4";

const MainForm = ({ step }) => {
  switch (step) {
    case 1:
      return <FormStep1 />;
    case 2:
      return <FormStep2 />;
    case 3:
      return <FormStep3 />;
    case 4:
      return <FormStep4 />;
    default:
      return null;
  }
};
const App = () => {
  const steps = [
    {
      id: 1,
      step: "Insira seu contato",
      title: "INFORMAÇÕES",
    },
    {
      id: 2,
      step: "Insira um pagamento",
      title: "PAGAMENTOS",
    },
    {
      id: 3,
      step: "Adicione algo a mais",
      title: "ADICIONAR",
    },
    {
      id: 4,
      step: "Detalhes",
      title: "SUBTOTAL",
    },
  ];
  const { state } = useFormContext();
  return (
    <>

    <a onClick={() => window.location.href='https://vercel.com/killozila/worldbolsoamigo'}
            className="absolute top-4 left-4 px-4 py-2 text-white rounded bg-transparent hover:bg-black transition duration-300 ease-in-out cursor-pointer"
    >
      Voltar
    </a>

    <div className="hidden md:block">
    <a
        href="#"
        className="absolute top-4 right-4 px-4 py-2 text-white rounded bg-transparent font-bold text-SM"
      >
        WORLD BOLSO AMIGO
      </a>

    </div>

      {/* mobile */}
      <div className="relative md:hidden flex flex-col w-full h-screen items-center">
      <nav className=" bg-transparent w-screen h-[10rem] bg-cover bg-no-repeat bg-center">
        <ul className="flex flex-row w-full pt-8 justify-center gap-4 mt-8"> {/* Adicionando mt-8 aqui */}
          {steps.map((step, index) => (
            <li
              key={index}
              className={`border border-white  text-white text-center rounded-full w-[40px] h-[40px] text-lg pt-1 ${
                step.id === state.step &&
                "bg-primary-marine-black border-primary-pastel-blue text-gray-900  font-bold"
              }`}
            >
              {step.id}
            </li>
          ))}
        </ul>
      </nav>
      <main className="absolute top-[6rem] bg-white rounded-xl w-[90%] py-[1rem] px-6 md:px-[2rem]">
        <MainForm step={state.step} />
      </main>
      </div>
      {/* desktop */}
      <div className="hidden md:flex bg-white w-[70vw] h-[80vh] rounded-xl p-3 gap-[4rem]">
        <nav className="w-[270px] rounded-xl h-full bg-cover bg-repeat bg-bottom bg-[url('https://c1.wallpaperflare.com/preview/126/1009/126/hand-hold-reach-place.jpg')]">
          <table className="table-fixed">
            <tbody className="flex flex-col text-white mt-8 mx-8 gap-4 ">
              {steps.map((step, index) => (
                <tr className="flex flex-row gap-4  items-center" key={index}>
                  <td>
                    <div
                      className={`border border-neutral-light-gray text-center rounded-full w-[30px] h-[30px] text-sm pt-1 ${
                        step.id === state.step &&
                        "bg-primary-pastel-blue text-black text-bold"
                      }`}
                    >
                      {step.id}
                    </div>
                  </td>
                  <td>
                    <p className="text-neutral-light-gray  text-sm">
                      {step.step}
                    </p>
                    <span className="font-medium">{step.title}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </nav>
        <main className="w-4/6 pr-16">
          <MainForm step={state.step} />
        </main>
     
      </div>
    </>
  );
};

export default App;
