export const getNotifications = async () => {
  const res = await fetch("api/notification", { method: "GET" });
  return res;
};
