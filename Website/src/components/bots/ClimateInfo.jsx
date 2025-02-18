import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Stepper, Step, Select } from "../component";
import Input from "../UI/Input";

const Climate = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [stepError, setStepError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [submittedData, setSubmittedData] = useState(null); // State to store the submitted data

  const validateStep = async (step) => {

    let fieldsToValidate = [];
    switch (step) {
      case 1:
        fieldsToValidate = ["crop", "soil", "irrigation_date"];
        break;
      default:
        return true;
    }

    const isValid = await trigger(fieldsToValidate);
    if (!isValid) {
      if (step === 1) {
        setStepError("Please fill in your name and select your role");
      }
    } else {
      setStepError("");
    }
    return isValid;
  };

  const handleStepChange = async (newStep) => {
    setStepError(""); // Clear previous error
    const isValid = await validateStep(newStep - 1);
    if (isValid) {
      if (newStep === 4) {
        // Simulate OTP send
        setIsOtpSent(true);
      }
      return true;
    }
    return false;
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", { ...data});
    setSubmittedData({ ...data}); // Store submitted data
    setFormSubmitted(true); // Set form submission state to true
  };


  

  // useEffect(() => {
  //   try {
  //     const response = await fetch('')
  //   }
  // })

  return (
    <div className="font-['Navbar']">
      <form onSubmit={handleSubmit(onSubmit)}>
        {!formSubmitted ? ( // Show the form if not submitted
          <Stepper
            initialStep={1}
            onStepChange={handleStepChange}
            onFinalStepCompleted={handleSubmit(onSubmit)}
            backButtonText="Previous"
            nextButtonText="Next"
            disableStepIndicators={true}
          >
            {/* <Step>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to the Weather Bot!
                </h2>
                <p className="text-gray-600"></p>
              </div>
            </Step> */}

            <Step>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold mb-4">Crop Information</h2>
                {stepError && (
                  <div className="text-red-500 text-sm mb-2">{stepError}</div>
                )}
                <Input
                  label="Crop Name"
                  {...register("crop", {
                    required: "Crop name is required",
                    minLength: {
                      value: 2,
                      message: "Crop name must be at least 2 characters",
                    },
                  })}
                  error={errors.crop?.message}
                />
                <Select
                  label="What is your soil type?"
                  options={["Select", "sandy", "loamy", "clayey"]}
                  {...register("soil", {
                    validate: (value) =>
                      value !== "Select" || "Please select a soil type",
                  })}
                  error={errors.soil?.message}
                />
                <Input
                  label="Date of Irrigation"
                  type="date"
                  {...register("irrigation_date", {
                    required: "Date is required",
                  })}
                  error={errors.irrigation_date?.message}
                />
              </div>
            </Step>
          </Stepper>
        ) : ( // Show the second page with the submitted data
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
            <p className="text-gray-600 mb-4">Your form has been successfully submitted. Here is the information you provided:</p>
            
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Crop Information:</h3>
              <p><strong>Crop Name:</strong> {submittedData?.crop}</p>
              <p><strong>Soil Type:</strong> {submittedData?.soil}</p>
              <p><strong>Date of Irrigation:</strong> {submittedData?.irrigation_date}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Climate;
