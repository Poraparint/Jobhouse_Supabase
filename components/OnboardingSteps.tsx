// components/OnboardingSteps.tsx

"use client"; // ทำให้เป็น Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ใช้ useRouter สำหรับการนำทาง
import StepsModal from "@/components/StepsModal"


const steps = [
  {
    title: "66026190",
    content: "สุภชัย อินชัยเทพ",
  },
  {
    title: "66026189",
    content: "สัณหณัฐ สมณี",
  },
  {
    title: "66026000",
    content: "กิตติศักดิ์ วงศ์ราจา",
  },
  {
    title: "66022769",
    content: "ปรปารินทร์ ภักดีภูมิมินทร์",
  },
];

const OnboardingSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true); // ใช้ state เพื่อควบคุมการเปิดปิด Modal
  const router = useRouter(); // ใช้ useRouter สำหรับการนำทาง

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleOnboardingComplete(); // เรียกฟังก์ชันเมื่อเสร็จสิ้น
    }
  };

  const handleOnboardingComplete = () => {
    router.push("/Customer/C_Pro_Edit"); // นำทางไปยัง C_Pro_Edit เมื่อเสร็จสิ้น
    setIsOpen(false); // ปิด Modal เมื่อเสร็จสิ้น
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <StepsModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="onboarding">
        <h2 className="text-2xl font-semibold">{steps[currentStep].title}</h2>
        <p className="mt-2">{steps[currentStep].content}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="btn"
          >
            ย้อนกลับ
          </button>
          <button onClick={handleNext} className="btn btn-primary">
            {currentStep === steps.length - 1 ? "เสร็จสิ้น" : "ถัดไป"}
          </button>
        </div>
      </div>
    </StepsModal>
  );
};

export default OnboardingSteps;
