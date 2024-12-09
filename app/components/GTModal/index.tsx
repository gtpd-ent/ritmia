import { FaX } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import React, { ComponentPropsWithoutRef, useEffect, useRef } from "react";

import GTLoading from "../GTLoading";

type GTModalProps = ComponentPropsWithoutRef<"dialog"> & {
  loading?: boolean;
  onClose: () => void;
};

const GTModal = ({
  children,
  className,
  loading = false,
  onClose,
  open,
}: GTModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current!;
    if (open) {
      dialog.showModal();
      dialog.dataset.open = "";
    } else {
      delete dialog.dataset.open;
      const handler = () => dialog.close();
      const inner = dialog.children[0] as HTMLElement;
      inner.addEventListener("transitionend", handler);
      return () => inner.removeEventListener("transitionend", handler);
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current!;
    const handler = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("close", handler);
    dialog.addEventListener("cancel", handler);
    return () => {
      dialog.removeEventListener("close", handler);
      dialog.removeEventListener("cancel", handler);
    };
  }, [onClose]);

  return (
    <dialog className={twMerge("group", className)} ref={ref}>
      <div className="fixed inset-0 grid place-content-center bg-black/50 opacity-0 transition-all group-data-[open]:opacity-100">
        <div className="flex w-[75vw] scale-75 flex-col items-center justify-center rounded-xl bg-gray-200 py-4 pt-12 opacity-0 transition-all group-data-[open]:scale-100 group-data-[open]:opacity-100">
          <GTLoading loading={loading} title="Loading...">
            <FaX
              className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={onClose}
              size={16}
            />
            {children}
          </GTLoading>
        </div>
      </div>
    </dialog>
  );
};

export default GTModal;
