import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("0");

  const processInput = () => {
    console.log(input);
    setInput(eval(input));
  };

  const append = (key) => {
    if (input.length === 1 && input === "0") {
      setInput(key);
    } else if (input[0] === "0") {
      setInput(input.slice(1, input.length));
    } else {
      handleEdgeCases(key);
    }
  };

  const handleEdgeCases = (key) => {
    if (isExp(key) && isExp(input[input.length - 1])) {
      if (key === "-") {
        setInput(input + key);
      } else if (input.slice(input.length - 2) === "*-") {
        setInput(input.slice(0, input.length - 2) + key);
      } else {
        setInput(input.slice(0, input.length - 1) + key);
      }
    } else if (isExp(key) && !isExp(input[input.length - 1])) {
      let lastExp = "";
      for (let i = input.length - 2; i >= 0; i--) {
        if (isExp(input[i])) {
          lastExp = input[i];
          break;
        }
      }
      if (lastExp === "." && key === ".") {
        setInput(input);
      } else {
        setInput(input + key);
      }
    } else {
      setInput(input + key);
    }
  };

  const isExp = (char) => {
    let a = ["+", "-", ".", "*", "/"];
    let found = a.find((item) => item === char);

    return found ? true : false;
  };

  const clear = () => {
    setInput("0");
  };

  return (
    <div className="calculator-container">
      <Display input={input} />
      <Keys
        clear={clear}
        append={append}
        processInput={processInput}
        setInput={setInput}
      />
    </div>
  );
}

const Keys = (props) => {
  return (
    <div>
      <div className="keys">
        <button
          id="clear"
          onClick={() => {
            props.setInput("");
            props.clear();
          }}
        >
          AC
        </button>
        <button id="add" onClick={() => props.append("+")}>
          +
        </button>
        <button id="subtract" onClick={() => props.append("-")}>
          -
        </button>
        <button id="multiply" onClick={() => props.append("*")}>
          *
        </button>
        <button id="divide" onClick={() => props.append("/")}>
          /
        </button>
        <button id="decimal" onClick={() => props.append(".")}>
          .
        </button>
        <button id="zero" onClick={() => props.append("0")}>
          0
        </button>
        <button id="one" onClick={() => props.append("1")}>
          1
        </button>
        <button id="two" onClick={() => props.append("2")}>
          2
        </button>
        <button id="three" onClick={() => props.append("3")}>
          3
        </button>
        <button id="four" onClick={() => props.append("4")}>
          4
        </button>
        <button id="five" onClick={() => props.append("5")}>
          5
        </button>
        <button id="six" onClick={() => props.append("6")}>
          6
        </button>
        <button id="seven" onClick={() => props.append("7")}>
          7
        </button>
        <button id="eight" onClick={() => props.append("8")}>
          8
        </button>
        <button id="nine" onClick={() => props.append("9")}>
          9
        </button>
        <button id="equals" onClick={() => props.processInput()}>
          =
        </button>
      </div>
    </div>
  );
};

const Display = ({ input }) => {
  return (
    <div className="displayElement">
      <div id="display">{input}</div>
    </div>
  );
};

export default App;
