import { Fragment, useState } from "react";
import "./App.css";

interface ICheckboxProps {
  checked: boolean;
  label: string;
  checker: any;
}

interface IRateItemProps {
  value: number;
  active: boolean;
}

// constants
const checkboxesInitial = [
  {
    id: 1,
    label: "Include Uppercase Letters",
    checkTick: false,
  },
  {
    id: 2,
    label: "Include Lowercase Letters",
    checkTick: false,
  },
  {
    id: 3,
    label: "Include Numbers",
    checkTick: false,
  },
  {
    id: 4,
    label: "Include Symbols",
    checkTick: false,
  },
];

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = `!@#$%^&*`;

// const lowerAndUpperCaseRegex = new RegExp(`/([a-z].*[A-Z])|([A-Z].*[a-z])/`);
// const numberRegex = new RegExp(`/([0-9])/`);
// const specialCharRegex = new RegExp(`/([!,%,&,@,#,$,^,*,?,_,~])/`);

// const strongPassword = new RegExp(
//   `(?=.*[${lowerCase}])(?=.*[${upperCase}])(?=.*[${numbers}])(?=.*[${symbols}])(?=.*[^${upperCase}${lowerCase}${numbers}${symbols}])(?=.{12,})`
// );
// const mediumPassword = new RegExp(
//   `(?=.*[${lowerCase}])(?=.*[${upperCase}])(?=.*[${numbers}])(?=.*[^${upperCase}${lowerCase}${numbers}])(?=.{8,})`
// );
// const weakPassword = new RegExp(
//   `(?=.*[${lowerCase}])(?=.*[${upperCase}])(?=.*[^${upperCase}${lowerCase}])(?=.{8,})`
// );
// const veryWeakPassword = new RegExp(`(?=.*[${lowerCase}])(?=.{0,7})`);

// icons
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

const copied = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    width={24}
    height={24}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
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

// components
const CheckboxItem = ({ checked, label, checker }: ICheckboxProps) => {
  return (
    <div className="checkbox-item" onClick={checker}>
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
  const [password, setPassword] = useState("");
  const [rangeValue, setRangeValue] = useState(0);
  const [checkboxes, setCheckboxes] = useState(checkboxesInitial);
  const [isStrengthCheckVisible, setIsStrengthCheckVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const strengthRateInText = () => {
    switch (overallStrength) {
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
        return "Strong";
    }
  };

  const calculateRangeColor =
    (((rangeValue - 0) * 20) / (20 - 0)) * 5 + "% 100%";

  // functions
  const copyHandler = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
  };

  const checkHandler = (index: number) => {
    let tempCheckboxes = [...checkboxes];
    tempCheckboxes[index - 1].checkTick = !tempCheckboxes[index - 1].checkTick;
    setCheckboxes(tempCheckboxes);
  };

  const getCheckValueFromCheckbox = (item: string) => {
    let tempCheckboxes = [...checkboxes];
    let specificItem = tempCheckboxes.find((i) => i.label === item);
    return specificItem ? specificItem.checkTick : false;
  };

  const generatePassword = () => {
    let includeChars = "";
    let password = "";
    let strength = 0;

    const containUpperChar = getCheckValueFromCheckbox(
      "Include Uppercase Letters"
    );
    const containLowerChar = getCheckValueFromCheckbox(
      "Include Lowercase Letters"
    );
    const containNumbers = getCheckValueFromCheckbox("Include Numbers");
    const containSymbols = getCheckValueFromCheckbox("Include Symbols");

    if (containUpperChar) {
      includeChars += upperCase;
    }
    if (containLowerChar) {
      includeChars += lowerCase;
    }
    if (containNumbers) {
      includeChars += numbers;
    }
    if (containSymbols) {
      includeChars += symbols;
    }

    // generate password
    for (var i = 0; i < rangeValue; ++i) {
      password += 
        Math.floor(Math.random() * includeChars.length)
      
    }

    // change password strength
    // if (strongPassword.test(password)) {
    //   setOverallStrength(4);
    // } else if (mediumPassword.test(password)) {
    //   setOverallStrength(3);
    // } else if (weakPassword.test(password)) {
    //   setOverallStrength(2);
    // } else if (veryWeakPassword.test(password)) {
    //   setOverallStrength(1);
    // }
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
    }
    if (password.match(/([0-9])/)) {
      strength += 1;
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
    }
    if (password.length > 12) {
      strength += 1;
    }

    setOverallStrength(strength);
    setPassword(password);
    setIsStrengthCheckVisible(true);
    setIsCopied(false);
  };

  return (
    <div className="App">
      <div className="parent">
        <h1>Password Generator</h1>
        <div className="password-div">
          <p>{password || "password"}</p>
          <div onClick={copyHandler}>
            <p>{isCopied === true ? "Copied" : ""}</p>
            {isCopied === true ? copied : copyToClipboard}
          </div>
        </div>
        <div className="strength-test-div">
          <div className="character-length">
            <div className="title">
              <p>Character Length</p>
              <p className="value">{rangeValue}</p>
            </div>
            <div className="range-container">
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                onChange={(e: any) => setRangeValue(e.target.value)}
                value={rangeValue}
                style={{ backgroundSize: calculateRangeColor }}
                className="inputRange"
              />
            </div>
          </div>

          <div className="checkboxes">
            {checkboxes.map((item, index) => {
              return (
                <Fragment key={index}>
                  <CheckboxItem
                    checked={item.checkTick}
                    label={item.label}
                    checker={() => checkHandler(item.id)}
                  />
                </Fragment>
              );
            })}
          </div>

          {isStrengthCheckVisible && (
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
          )}
          <button onClick={generatePassword}>
            <p>Generate</p>
            {rightArrow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
