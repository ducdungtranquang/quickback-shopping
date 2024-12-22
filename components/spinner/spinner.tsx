export default function Spinner() {
  return (
    <div role="status" className="flex justify-center w-full p-[60px] pt-[120px]">
      <img src="/loading.gif" alt="loading" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
