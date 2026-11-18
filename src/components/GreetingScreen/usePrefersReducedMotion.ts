import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Subscribes to the OS motion preference. `useSyncExternalStore` rather than
 * state-plus-effect so the preference is readable during the first render —
 * the greeting has to decide whether to animate at all before it paints, and
 * so it keeps working if the visitor changes the setting mid-visit.
 */
export function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    // On the server there is no preference to read. Rendering the pre-animation
    // state matches what a client with motion enabled renders first, so the
    // markup agrees; a client that prefers reduced motion corrects on hydration.
    () => false,
  );
}
