import { useContext } from "react";
import NotificationContext from "./context";

const useNotification = () => useContext(NotificationContext);

export default useNotification;
