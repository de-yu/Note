import { useState, useTransition } from "react";
import {useFormStatus} from 'react-dom';

const updateName = async () => {
  await new Promise((resolve) => setTimeout(() => {
    resolve('resolve')
  }, 3000));
}

export default function ActionsUseTransition() {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleSubmit = () => {
    startTransition(async () => {
      const reponse = await updateName();
      console.log(reponse)
    })
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
    </div>
  );
}