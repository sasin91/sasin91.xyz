import { useCallback } from "react";

/**
 * Hook to wrap state updates in a view transition
 *
 * @example
 * const withTransition = useViewTransition();
 * onClick={() => withTransition(() => setTab(newTab))}
 */
export function useViewTransition() {
  return useCallback((callback: () => void) => {
    if ("startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(callback);
    } else {
      callback();
    }
  }, []);
}
