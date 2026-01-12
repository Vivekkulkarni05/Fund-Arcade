import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const saveData = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "users"), {
      name: name,
      email: email,
    });

    alert("Data saved!");
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={saveData}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default Form;
