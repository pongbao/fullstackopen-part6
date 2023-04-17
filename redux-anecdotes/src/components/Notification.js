import { useNotificationMessage } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationMessage();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
