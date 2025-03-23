import { useState, useEffect } from "react";
import axios from "axios";

export const ResendButton = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsButtonDisabled(false);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResend =async () => {
    setTimeLeft(60);
    setIsButtonDisabled(true);

    try {
       await axios.post(
        "http://localhost:5000/api/auth/resendVerifyToken"
      );
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex justify-between items-center mt-2">
      <button
        onClick={handleResend}
        className="bg-transparent focus:bg-transparent"
        disabled={isButtonDisabled}
      >
        Resend Code
      </button>
      {timeLeft > 0 && <p className="text-white"> {timeLeft} </p>}
    </div>
  );
};
