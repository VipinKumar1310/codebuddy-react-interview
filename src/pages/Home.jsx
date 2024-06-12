import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import FirstStep from "../components/FirstStep";
import SecondStep from "../components/SecondStep";
import ThirdStep from "../components/ThirdStep";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStep, nextStep, prevStep, isFirstStep, isLastStep, step, goToStep } =
    useMultiStepForm([
      <FirstStep
        key="first"
        {...data}
        updateFields={updateFields}
        errors={errors}
        // setErrors={setErrors}
      />,
      <SecondStep
        key="second"
        {...data}
        updateFields={updateFields}
        errors={errors}
        // setErrors={setErrors}
      />,
      <ThirdStep
        key="third"
        {...data}
        updateFields={updateFields}
        errors={errors}
        // setErrors={setErrors}
      />,
    ]);

  const validateStep = () => {
    console.log(data);
    const newErrors = {};
    if (currentStep === 0) {
      if (!data.emailId || !/^\S+@\S+\.\S+$/.test(data.emailId)) {
        newErrors.emailId = "Invalid email address.";
      }
      if (
        !data.password ||
        !/(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*\d){2})(?=(?:.*[!@#$%^&*]){2}).{8,}/.test(
          data.password,
        )
      ) {
        newErrors.password =
          "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters.";
      }
    }
    if (currentStep === 1) {
      if (!data.firstName || !/^[A-Za-z]{2,50}$/.test(data.firstName)) {
        newErrors.firstName = "First name must be between 2 and 50 alphabetic characters.";
      }
      if (data.lastName && !/^[A-Za-z]*$/.test(data.lastName)) {
        newErrors.lastName = "Last name must contain only alphabets.";
      }
      if (!data.address || data.address.length < 10) {
        newErrors.address = "Address must be at least 10 characters long.";
      }
    }
    if (currentStep === 2) {
      if (!data.countryCode || !["+91", "+1"].includes(data.countryCode)) {
        newErrors.countryCode = "Country code must be +91 (India) or +1 (America).";
      }
      if (!data.phoneNumber || !/^\d{10}$/.test(data.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be a 10 digit number.";
      }
      if (!data.acceptTermsAndCondition) {
        newErrors.acceptTermsAndCondition = "You must accept the terms and conditions.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    const submitData = { ...data };
    delete submitData.acceptTermsAndCondition;
    console.log(submitData);

    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: JSON.stringify(submitData),
      });
      const result = await response.json();
      if (result.message === "Success") {
        alert("Form submitted successfully.");
        navigate("/posts");
      } else {
        console.error("Submission failed:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    if (validateStep()) {
      if (isLastStep) {
        submitForm();
      } else {
        nextStep();
      }
    }
  }

  return (
    <div className="relative mx-5 min-h-[500px] w-full max-w-xl rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <div className="flex justify-around">
        <button
          className={`rounded-3xl border border-orange-400 px-6 py-2 text-xs md:text-base ${
            currentStep === 0 ? "bg-orange-400 text-white" : ""
          }`}
          onClick={() => goToStep(0)}
        >
          Form 1
        </button>
        <button
          className={`rounded-3xl border border-orange-400 px-6 py-2 text-xs md:text-base ${
            currentStep === 1 ? "bg-orange-400 text-white" : ""
          }`}
          onClick={() => goToStep(1)}
          disabled={currentStep < 1}
        >
          Form 2
        </button>
        <button
          className={`rounded-3xl border border-orange-400 px-6 py-2 text-xs md:text-base ${
            currentStep === 2 ? "bg-orange-400 text-white" : ""
          }`}
          onClick={() => goToStep(2)}
          disabled={currentStep < 2}
        >
          Form 3
        </button>
      </div>
      <form className="flex h-[85%] flex-col justify-between" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <Link to="/posts" className="mt-4 flex items-center text-blue-600 hover:underline">
            Posts
            <Icon icon="mdi:arrow-right" className="ml-2" />
          </Link>
          <div className="absolute bottom-2 left-1/2 text-xs">
            {currentStep + 1}/{steps.length}
          </div>
          {step}
        </div>
        <div className="flex flex-row justify-between">
          <button
            type="button"
            className={`rounded-3xl border px-4 py-2 ${
              isFirstStep ? "cursor-not-allowed bg-gray-400" : "bg-blue-400 hover:bg-blue-500"
            }`}
            disabled={isFirstStep}
            onClick={prevStep}
          >
            Back
          </button>
          <div className="flex gap-2">
            <button
              disabled={isLastStep}
              type="submit"
              className={`rounded-3xl border px-4 py-2 ${
                isLastStep ? "cursor-not-allowed bg-gray-400" : "bg-green-400 hover:bg-green-500"
              }`}
              // onClick={nextStep}
            >
              Save & Next
            </button>
            <button
              type="submit"
              className="rounded-3xl border bg-green-400 px-4 py-2 hover:bg-green-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
