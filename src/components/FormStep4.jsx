import React, { useState } from "react";
import ThankYouSlide from "./ThankYouSlide";
import ConfirmationForm from "./ConfirmationForm";

const FormStep4 = () => {
  const [formConfirmed, setFormConfirmed] = useState(false);
  return formConfirmed ? (
    <ThankYouSlide />
  ) : (
    <ConfirmationForm setFormConfirmed={setFormConfirmed} />
  );
};

export default FormStep4;
