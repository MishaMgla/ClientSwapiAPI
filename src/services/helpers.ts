export function getIdFromPeopleUrl(url: string): string | null {
  const match = url.match(/people\/(\d+)\//);
  return match ? match[1] : null;
}

export const formatIsoDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}  ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};
