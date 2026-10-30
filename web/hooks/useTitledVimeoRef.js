import { useCallback, useEffect, useRef } from "react";

export function useTitledVimeoRef(title, playerRef) {
  const observerRef = useRef(null);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return useCallback(
    (node) => {
      observerRef.current?.disconnect();

      if (playerRef) {
        playerRef.current = node;
      }

      const root = node?.shadowRoot;
      if (!root) return;

      const setTitle = () => {
        const iframe = root.querySelector("iframe");
        if (iframe) iframe.title = title;
      };

      setTitle();
      observerRef.current = new MutationObserver(setTitle);
      observerRef.current.observe(root, { childList: true, subtree: true });
    },
    [title, playerRef],
  );
}
