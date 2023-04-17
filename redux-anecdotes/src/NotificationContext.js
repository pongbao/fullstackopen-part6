import { useReducer, createContext, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ANECDOTE":
      return `you added "${action.payload}"`;
    case "VOTE_ANECDOTE": {
      console.log(action);
      return `you voted "${action.payload}"`;
    }
    case "REMOVE_NOTIFICATION": {
      console.log(action);
      return null;
    }

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
