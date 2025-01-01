import { useActionState } from "react";
import {useFormStatus} from 'react-dom';

function DesignButton() {
  const {pending} = useFormStatus();
  return <button type="submit" disabled={pending}> PendingButton </button>
}

const updateName = async () => {
  await new Promise((resolve) => setTimeout(() => {
    resolve('resolve')
  }, 3000));
}

export default function ActionsUseTransition() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) {
        return error;
      }
      return null;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>Update</button>
      {error && <p>{error}</p>}
      <DesignButton />
    </form>
  );
}