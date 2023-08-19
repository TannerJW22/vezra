import toast, { useToasterStore, type Toast } from "react-hot-toast";

// -=-=-= Types & Validators -=-=-= //
export type NotifyFn = typeof toast;

export type useNotificationReturn = {
  notify: NotifyFn;
  notifications: Toast[];
  pausedAt: number | undefined;
};

// :::
export default function useNotification(): useNotificationReturn {
  const { toasts, pausedAt } = useToasterStore();

  return {
    notify: toast,
    notifications: toasts,
    pausedAt,
  };
}
