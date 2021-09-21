import React, { useEffect, useState } from "react";
import "../css/style.css"

interface Iinput {
    id: number,
    text: string
}
const ListInputs = () => {
  const [inputs, setInputs] = useState([]);

  const getinputs = async () => {
    try {
      const response = await fetch("http://localhost:4000/list");
      const jsonData = await response.json();
      setInputs(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getinputs();
  }, []);

  console.log(inputs);

  return (
    <main className = "table">
      {" "}
      <table>
        <tbody>
          {inputs.map((input: Iinput) => (
            <tr key={input.id}>
              <td>{input.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ListInputs;