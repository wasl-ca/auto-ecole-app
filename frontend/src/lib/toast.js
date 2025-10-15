import toast from "react-hot-toast";

export const showError = (message) => {
  toast.error(message || "Something went wrong");
};

export const showSuccess = (message) => {
  toast.success(message);
};

export const showInfo = (message) => {
  toast(message);
};
export const showLoading = (message) => {
  toast.loading(message || "Loading...");
};
export const dismissToast = (id) => {
  toast.dismiss(id);
};