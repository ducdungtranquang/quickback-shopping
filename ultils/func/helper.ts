export function removeHttps(url: string) {
  const parts = url?.split("/");
  return parts[parts.length - 1];
}

export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const day = date?.getDate()?.toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng tính từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
