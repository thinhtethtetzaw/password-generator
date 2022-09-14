import { useState } from "react";
import "./App.css";

interface ICheckboxProps {
  checked: boolean;
  label: string;
}

interface IRateItemProps {
  value: number;
  active: boolean;
}

const copyToClipboard = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    width={24}
    height={24}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
    />
  </svg>
);

const tick = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3.5"
    stroke="currentColor"
    width={16}
    height={16}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const rightArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="currentColor"
    width={18}
    height={18}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
    />
  </svg>
);

const CheckboxItem = ({ checked, label }: ICheckboxProps) => {
  return (
    <div className="checkbox-item">
      <div className="checkbox">
        {checked && <div className="checkbox-icon">{tick}</div>}
      </div>
      <p>{label}</p>
    </div>
  );
};

const RateItem = ({ value, active }: IRateItemProps) => {
  const bgColor = () => {
    switch (value) {
      case 1:
        return "#B7245C";
      case 2:
        return "#EB6534";
      case 3:
        return "#FAF33E";
      case 4:
        return "#37E1B9";
    }
  };

  return (
    <div className="rate-item">
      {active && (
        <div className="fill" style={{ backgroundColor: bgColor() }}></div>
      )}
    </div>
  );
};

const App = () => {
  const [overallStrength, setOverallStrength] = useState(2);

  const strengthRateInText = () => {
    switch (overallStrength) {
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
        return "String";
    }
  };

  return (
    <div className="App">
      <div className="parent">
        <h1>Password Generator</h1>
        <div className="password-div">
          <p>PTxG39#seGE</p>
          <div>{copyToClipboard}</div>
        </div>
        <div className="strength-test-div">
          <div className="character-length">
            <div className="title">
              <p>Character Length</p>
              <p className="value">10</p>
            </div>
            <div className="strength-progress">
              <div className="progress-bar">
                <div className="progress-circle"></div>
              </div>
            </div>
          </div>
          <div className="checkboxes">
            <CheckboxItem checked={true} label={"Include Uppercase Letters"} />
            <CheckboxItem checked={true} label={"Include Lowercase Letters"} />
            <CheckboxItem checked={true} label={"Include Numbers"} />
            <CheckboxItem checked={false} label={"Include Symbols"} />
          </div>
          <div className="overall-strength">
            <p>STRENGTH</p>
            <div className="strength-rating">
              <p>{strengthRateInText()}</p>
              <div className="rates">
                <RateItem
                  value={overallStrength}
                  active={overallStrength >= 1 && true}
                />
                <RateItem
                  value={overallStrength}
                  active={overallStrength >= 2 && true}
                />
                <RateItem
                  value={overallStrength}
                  active={overallStrength >= 3 && true}
                />
                <RateItem
                  value={overallStrength}
                  active={overallStrength >= 4 && true}
                />
              </div>
            </div>
          </div>
          <button>
            <p>Generate</p>
            {rightArrow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
