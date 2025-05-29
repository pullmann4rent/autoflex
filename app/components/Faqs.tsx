import { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

export function Question({ faqObject: { question, answer } }) {
  const [currentIcon, setIcon] = useState('plus'); //VSCODE automatically imported useState hook for me
  const handleOnClick = () => {
    setIcon(currentIcon === 'plus' ? 'minus' : 'plus');
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOnClick();
    }
  };

  return (
    <div className="faq-box">
      <h4 className="pointer" onClick={() => currentIcon === 'plus' ? setIcon('minus') : setIcon('plus')}>{question}</h4>
      { currentIcon === 'plus' ? <FaCirclePlus onClick={() => setIcon('minus')} /> : <FaCircleMinus onClick={() => setIcon('plus')} /> }

      <p className={`answer ${currentIcon === 'plus' ? "hidden" : ""}`}>
        {answer}
      </p>
    </div>
  );
}
