import { use, Suspense } from "react";

const commentsPromise = new Promise(resolve => {
  setTimeout(() => {
    resolve([
      { id: 1, text: 'First' },
      { id: 2, text: 'Second' },
      { id: 3, text: 'Third' },
    ]);
  }, 2000);
});

function Comments() {
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment.text}</p>);
}

export default function UseHook() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments />
    </Suspense>
  )
}