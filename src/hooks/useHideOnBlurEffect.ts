import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

// -=-=-= Types & Validators -=-=-= //
type useHideOnBlurEffectArgs<TRef extends HTMLElement> = {
  syncRef: RefObject<TRef>;
  syncIsRefVisible: boolean;
  syncSetIsRefVisible: Dispatch<SetStateAction<boolean>>;
};

export default function useHideOnBlurEffect<TRef extends HTMLElement>(
  config: useHideOnBlurEffectArgs<TRef>
) {
  const {
    syncRef: ref,
    syncIsRefVisible: isVisible,
    syncSetIsRefVisible: setIsVisible,
  } = config;

  useEffect(() => {
    const hideRefOnBlur = (event: Event) => {
      if (
        isVisible &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", hideRefOnBlur);

    return () => {
      document.removeEventListener("mousedown", hideRefOnBlur);
    };
  }, [isVisible]);
}
