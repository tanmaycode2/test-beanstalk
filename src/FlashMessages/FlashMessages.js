import { toast } from "react-toastify";
export const FlashMessages = (message, color, flag) => {
  if (flag) {
    color === "success"
      ? toast.success(message, {
          pauseOnFocusLoss: false,
          icon: false,
          style: {
            color: "#fff",
            background: "#0ead7c",
          },
          progressStyle: {
            color: "#fff",
            background: "#fff",
          },
        })
      : toast.error(message, {
          pauseOnFocusLoss: false,
          icon: false,
          style: {
            color: "#fff",
            background: "red",
            font: "Open-sans",
          },
          progressStyle: {
            color: "#fff",
            background: "#fff",
          },
        });
  }
};
