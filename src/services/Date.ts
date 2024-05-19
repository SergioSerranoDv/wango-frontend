export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
