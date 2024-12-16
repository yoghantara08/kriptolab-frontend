import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import CheckboxCustom from "@/components/Checkbox/Checkbox";
import CustomErrorMessage from "@/components/Form/CustomErrorMessage";
import CustomInput from "@/components/Form/CustomInput";
import CustomSuccessMessage from "@/components/Form/CustomSuccessMessage";
import { resetPasswordService } from "@/lib/services";
import { IResetPassword } from "@/types";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [successMessage, setSuccessMessage] = useState("");
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<IResetPassword>({ criteriaMode: "all" });

  const submitHandler = async (val: IResetPassword) => {
    setIsLoading(true);

    try {
      await resetPasswordService({
        token,
        newPassword: val.newPassword,
      });

      setSuccessMessage("Reset password successful!");
      setIsError(false);
      reset();
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classNames(
          "flex w-full max-w-lg flex-col gap-5 rounded-xl border-2 p-6 shadow sm:p-8",
          "border-borderColor bg-cardBackground",
        )}
      >
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
          {t("Reset Password")}
        </h2>
        {isError && (
          <CustomErrorMessage
            onClose={() => setIsError(false)}
            message={errorMessage}
          />
        )}

        {successMessage && (
          <CustomSuccessMessage
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        )}

        <CustomInput
          label="New Password"
          name="newPassword"
          type={show ? "text" : "password"}
          placeholder="New Password"
          errors={errors}
          register={register}
          validation={{
            required: "New Password is required!",
            minLength: 6,
          }}
          className="p-3"
        />
        <div>
          <CustomInput
            label="Confirm New Password"
            name="confirmNewPassword"
            type={show ? "text" : "password"}
            placeholder="Confirm New Password"
            errors={errors}
            register={register}
            validation={{
              required: "Confirm New Password is required!",
              minLength: 6,
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match!",
            }}
            className="p-3"
          />
          <div className="mt-3">
            <CheckboxCustom
              checked={show}
              onCheck={setShow}
              className="mt-0.5"
              label="Show password"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-3 h-12 w-full rounded-md disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
