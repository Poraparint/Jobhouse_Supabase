"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
  isDisabled?: boolean;
};


export function SubmitButton({
  children,
  pendingText = "Submitting...",
  isDisabled = false,
  ...props
}: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      {...props}
      className={`text-white w-full my-5 rounded-md 
        ${
          isPending || isDisabled
            ? "btn bg-gray-200 text-gray-500 cursor-not-allowed"
            : "btn btn-primary"
        }`}
      type="submit"
      aria-disabled={isPending || isDisabled} // ปรับ aria-disabled ให้สัมพันธ์กับทั้งสองสถานะ
      disabled={isPending || isDisabled} // ปิดการใช้งานปุ่มเมื่อเป็น pending หรือ disabled
    >
      {isPending ? pendingText : children}
    </button>
  );
}
