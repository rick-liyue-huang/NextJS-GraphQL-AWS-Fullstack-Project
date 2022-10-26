export const convertDateToElapsed = (data: string): string => {
  const now = new Date(Date.now());
  const current = new Date(data);
  const diff = now.getTime() - current.getTime();
  return (diff / 1000 / 60 / 60).toFixed(0);
};
