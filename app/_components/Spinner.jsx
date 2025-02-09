
export default function Spinner () {
  return (
    <div className="flex justify-center h-full pt-40 items-center flex-row gap-2">
      <div className="size-6 rounded-full bg-blue-900 animate-bounce" />
      <div className="size-6 rounded-full bg-blue-900 animate-bounce [animation-delay:-.1s]" />
      <div className="size-6 rounded-full bg-blue-900 animate-bounce [animation-delay:-.2s]" />
    </div>
  );
}

