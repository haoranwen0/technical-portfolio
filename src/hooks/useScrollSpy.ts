import { useEffect, useState } from "react";
import type { RefObject } from "react";

type Options = {
  /** Top offset in % of viewport. Section becomes "active" when its top crosses this line. */
  topOffsetPct?: number;
};

/**
 * Tracks which of the given element IDs is currently "active" based on
 * scroll position inside an optional scroll root.
 */
export function useScrollSpy(
  ids: readonly string[],
  rootRef?: RefObject<Element | null>,
  { topOffsetPct = 30 }: Options = {},
): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const root = rootRef?.current ?? null;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const topmost = intersecting.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev,
        );
        setActive(topmost.target.id);
      },
      {
        root,
        rootMargin: `0px 0px -${100 - topOffsetPct}% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootRef, topOffsetPct]);

  return active;
}
