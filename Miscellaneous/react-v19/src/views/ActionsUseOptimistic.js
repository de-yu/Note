import { useOptimistic } from "react";

const updateName = async () => {
  await new Promise((resolve) => setTimeout(() => {
    resolve('resolve')
    console.log('resolve')
  }, 1000));
}
export default function ActionsUseOptimistic({currentName = 'currentName'}) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const submitAction = async formData => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    await updateName(newName);
  };

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
    </form>
  );
}