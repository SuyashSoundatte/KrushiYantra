import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Stepper, Step, Select } from "./component";
import Input from "./UI/Input";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [stepError, setStepError] = useState("");

  const validateStep = async (step) => {
    if (step === 1) return true;

    let fieldsToValidate = [];
    switch (step) {
      case 2:
        fieldsToValidate = ["identifier", "password"];
        break;
      case 3:
        // Temporarily allow proceeding without OTP validation
        return true;
      default:
        return true;
    }

    const isValid = await trigger(fieldsToValidate);
    if (!isValid) {
      // Set appropriate error message based on step
      if (step === 2) {
        setStepError("Please fill in your name and select your role");
      } else if (step === 3) {
        setStepError("Please fill in all contact information fields correctly");
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
    console.log("Form submitted:", { ...data, otp });
    // Handle form submission
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="font-['Navbar']">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stepper
          initialStep={1}
          onStepChange={handleStepChange}
          onFinalStepCompleted={handleSubmit(onSubmit)}
          backButtonText="Previous"
          nextButtonText="Next"
          disableStepIndicators={true}
        >
          <Step>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome Back to the Krushi Yantra!</h2>
              <p className="text-gray-600">Click on next to Login Into your account!</p>
            </div>
          </Step>
          <Step>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-4">Sign In</h2>
              {stepError && (
                <div className="text-red-500 text-sm mb-2">{stepError}</div>
              )}
              <Input
                label="Email or Phone"
                type="text"
                placeholder="Enter your phone number or Email"
                {...register("identifier", {
                  required: "is required",
                  pattern: { 
                    message: "Please enter a valid value" 
                  }
                })}
                error={errors.identifier?.message}
              />
              <Input
                label="Enter Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    message: "Invalid password"
                  }
                })}
                error={errors.password?.message}
              />
            </div>
          </Step>

          {/* <Step>
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-semibold mb-4">Verify Your Account</h2>
              <p className="text-gray-600 mb-4">
                {isOtpSent 
                  ? "We've sent a verification code to your email and phone number."
                  : "Click Complete to finish registration"}
              </p>
              <div className="w-full max-w-xs">
                <Input
                  label="Enter OTP (Optional for now)"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
              <button
                type="button"
                onClick={() => setIsOtpSent(true)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Resend OTP
              </button>
            </div>
          </Step> */}
        </Stepper>
      </form>
    </div>
  );
};

export default SignUp;