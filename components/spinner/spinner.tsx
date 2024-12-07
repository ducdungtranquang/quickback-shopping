export default function Spinner() {
  return (
    <div role="status" className="flex justify-center w-full p-4">
     <img src="/loading.gif" alt="loading" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
