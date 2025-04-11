import { otpSchema } from "@/common/config/schemas";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface OTPInputFormProps {
  onSubmit: (values: { otp: string }) => void;
  loading?: boolean;
}

export function OTPInputForm({ onSubmit, loading }: OTPInputFormProps) {
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });

  const resendOTP = () => {
    setTimer(60);
    setResendDisabled(true);
    toast.info("Your OTP is 007007");
  };

  const handleResend = () => {
    resendOTP();
  };

  const handleTryAgain = () => {
    reset();
    clearErrors("otp");
    resendOTP();
  };

  useEffect(() => {
    if (resendDisabled) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendDisabled]);

  const handleSubmitOTP = (values: { otp: string }) => {
    if (values.otp !== "007007") {
      setError("otp", { type: "manual", message: "Wrong OTP" });
      return;
    }
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitOTP)}
      className="space-y-4 px-4 py-2"
    >
      <p className="text-sm font-medium">Please enter OTP</p>
      <input
        type="text"
        maxLength={6}
        inputMode="numeric"
        {...register("otp")}
        className="border p-2 rounded w-full"
      />
      {errors.otp && (
        <p className="text-red-500 text-sm">
          {errors.otp.message}{" "}
          <Button
            type="button"
            onClick={handleTryAgain}
            className="text-blue-600 underline ml-1 text-sm cursor-pointer"
          >
            Try Again
          </Button>
        </p>
      )}

      <div className="text-sm flex justify-between items-center">
        <span>
          {resendDisabled ? `${timer}s` : ""}
          {resendDisabled ? null : (
            <Button
              type="button"
              onClick={handleResend}
              className="text-blue-600 underline ml-2"
            >
              Resend
            </Button>
          )}
        </span>
      </div>

      <Button
        type="submit"
        disabled={!!errors.otp}
        className="w-full bg-red-500 text-white py-2 rounded disabled:opacity-50"
        loading={loading}
      >
        Continue
      </Button>
    </form>
  );
}
