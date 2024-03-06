import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import axios from 'axios'; // Importe o Axios

const ConfirmationForm = ({ setFormConfirmed }) => {
    const { state, dispatch } = useFormContext();
    const formData = state.formData;
    const isMonthly = formData.billingCycle === "monthly" ? true : false;
    const time = isMonthly ? "" : "/Ano";
    let billingPlan = formData.billingPlan;
    let totalAmount = 0;
    let packageAmount = 0;

    switch (formData.billingPlan) {
        case "Pix":
            packageAmount = isMonthly ? 9 : 90;
            break;
        case "Cartão":
            packageAmount = isMonthly ? 12 : 120;
            break;
        case "Boleto":
            packageAmount = isMonthly ? 15 : 150;
            break;
        default:
            packageAmount = 0;
    }
    totalAmount += parseInt(packageAmount);
    function findAddOnAmount(addOn) {
        let addOnAmount;
        switch (addOn) {
            case "alimentos":
                addOnAmount = isMonthly ? 1 : 10;
                break;
            case "roupas":
            case "estudos":
                addOnAmount = isMonthly ? 2 : 20;
                break;
            default:
                addOnAmount = 0;
        }
        totalAmount += addOnAmount;
        return addOnAmount;
    }
    let plan = billingPlan.charAt(0).toUpperCase() + billingPlan.slice(1);
    function formatAddOnName(addon) {
        const formattedName = addon
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        return formattedName;
    }

    // Função para lidar com o envio do formulário para o FormsPark
    const handleFormSubmit = async () => {
        try {
            // Faça a solicitação POST para o endpoint do FormsPark com os dados do formulário
            const response = await axios.post('https://submit-form.com/lkhqNbzOs', formData);
            // Verifique se a resposta foi bem-sucedida
            if (response.status === 200) {
                // Limpe o estado do formulário ou faça qualquer outra ação necessária após o envio bem-sucedido
                console.log('Formulário enviado com sucesso!');
                // Redirecionar com base na escolha de pagamento
                switch (formData.billingPlan) {
                    case "Pix":
                        window.location.href = "https://www.pagbrasil.com/payment-methods/pix/";
                        break;
                    case "Cartão":
                        window.location.href = "https://contasimples.com/lp/scale-cartao-de-credito-pj?utm_source=google&utm_medium=cpc&utm_campaign=s_meio_conversao_cartao+busca_cartao-digital&utm_content=responsivo+cartão%20digital&utm_term=cartão%20digital&hsa_acc=7779896515&hsa_cam=20236990240&hsa_grp=150183866575&hsa_ad=683945530987&hsa_src=g&hsa_tgt=kwd-296590059723&hsa_kw=cartão%20digital&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAiA_tuuBhAUEiwAvxkgTgwGD9Rp7qNCGXkAVeA07FVpya3TulJfuN2FuyDiueLnH1njsK0pkhoCdSsQAvD_BwE";
                        break;
                    case "Boleto":
                        window.location.href = "https://www.asaas.com/boleto-bancario?utm_campaign=boleto&utm_medium=ads&utm_source=google&utm_term=sistema%20de%20boleto&utm_content=search&gad_source=1&gclid=CjwKCAiA_tuuBhAUEiwAvxkgTmqs_iKhw_SjqFvGaqHFFxSYvV0FWypmkQ539CVIsIMzogzIOjwirxoCTc4QAvD_BwE";
                        break;
                    default:
                        console.error('Método de pagamento não reconhecido.');
                }
                setFormConfirmed(true); // Avance para a próxima etapa após o envio bem-sucedido
            } else {
                console.error('Ocorreu um erro ao enviar o formulário.');
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
        }
    };

    return (
        <div className="flex flex-col my-8 gap-4">
            <header>
                <h1 className="font-extrabold text-3xl">Subtotal</h1>
                <p className=" text-neutral-cool-gray leading-none">
                    Verifique os dados e confirme se o valor está adequado ao seu orçamento
                </p>
            </header>
            <div className="flex flex-col gap-2 bg-neutral-magnolia bg-primary-marine-white p-4 rounded-md">
                <ul>
                    <li className="flex flex-row justify-between items-center font-extrabold">
                        <span className="flex flex-col">
                            <h4 className="">{plan}</h4>
                            <a
                                href="#"
                                className="text-sm font-normal underline text-neutral-cool-gray text-primary-marine-green"
                                onClick={() => {
                                    dispatch({ type: 'GO_TO_STEP', payload: 2 });
                                }}
                            >
                                Trocar
                            </a>
                        </span>
                        <p>R$ {packageAmount + ",00" + time}</p>
                    </li>
                    <hr className="w-full my-4" />
                    {formData.addon.length > 0 &&
                        formData.addon.map((addon) => (
                            <li
                                className="flex flex-row justify-between items-center text-sm"
                                key={addon}
                            >
                                <p className="text-neutral-cool-gray ">
                                    {formatAddOnName(addon)}
                                </p>
                                <p>+R$ {findAddOnAmount(addon) + ",00" + time}</p>
                            </li>
                        ))}
                </ul>
            </div>
            <div
                className="flex flex-row justify-between items-center text-sm"
            >
                <p className="text-black ">
                    Total({isMonthly ? "único" : "por ano"})
                </p>
                <p className="text-lg text-primary-marine-green font-bold">+R$ {totalAmount + ",00" + time}</p>
            </div>

            {/* button */}
            <div className="flex flex-col gap-2 ">
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
                        className="bg-primary-marine-black text-white rounded-md w-32 p-3 hover:opacity-80 cursor-pointer"
                        onClick={handleFormSubmit} // Alteração aqui: chame a função handleFormSubmit no clique do botão de avançar
                    >
                        Confirmar
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
                        className="bg-primary-marine-black text-white rounded-md w-32 p-3 hover:opacity-80 cursor-pointer"
                        onClick={handleFormSubmit} // Alteração aqui: chame a função handleFormSubmit no clique do botão de confirmar
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationForm;
