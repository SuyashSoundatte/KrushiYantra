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
        fieldsToValidate = ["name", "role"];
        break;
      case 3:
        fieldsToValidate = ["phone", "email", "password"];
        break;
      case 4:
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
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
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
              <h2 className="text-2xl font-bold mb-4">
                Welcome to the Krushi Yantra!
              </h2>
              <p className="text-gray-600">
                Click on next to set up your account!
              </p>
            </div>
          </Step>

          <Step>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              {stepError && (
                <div className="text-red-500 text-sm mb-2">{stepError}</div>
              )}
              <Input
                label="Your Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                error={errors.name?.message}
              />
              <Select
                label="Who are You?"
                options={["Select", "Farmer", "Buyer"]}
                {...register("role", {
                  validate: (value) =>
                    value !== "Select" || "Please select a role",
                })}
                error={errors.role?.message}
              />
            </div>
          </Step>

          <Step>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              {stepError && (
                <div className="text-red-500 text-sm mb-2">{stepError}</div>
              )}
              <Input
                label="Phone"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                error={errors.phone?.message}
              />
              <Input
                label="Your Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    message: "Please enter a valid email address",
                  },
                })}
                error={errors.email?.message}
              />
              <Input
                label="Create Password"
                type="password"
                placeholder="Create your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
                error={errors.password?.message}
              />
            </div>
          </Step>

          <Step>
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-semibold mb-4">
                Verify Your Account
              </h2>
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
          </Step>
        </Stepper>
      </form>
    </div>
  );
};

export default SignUp;
