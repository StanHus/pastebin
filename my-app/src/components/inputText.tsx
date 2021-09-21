import React, { useState } from "react";

function InputText (): JSX.Element {
  const [text, setText] = useState("");

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const body = { text };
      const response = await fetch("http://localhost:4000/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>Paste into here</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Put the text here"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button>Add</button>
      </form>
    </main>
  );
};

export default InputText;