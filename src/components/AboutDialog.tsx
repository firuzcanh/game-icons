import { useEffect, useRef } from "react";

export function AboutDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog ref={ref} className="about" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <div className="about-inner">
        <h2>Credits &amp; License</h2>
        <p>
          The icons are made by <strong>Lorc, Delapouite</strong> and{" "}
          <a href="https://game-icons.net/about.html#authors" target="_blank" rel="noreferrer">
            contributors
          </a>{" "}
          of{" "}
          <a href="https://game-icons.net" target="_blank" rel="noreferrer">
            game-icons.net
          </a>
          , licensed under{" "}
          <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">
            CC BY 3.0
          </a>
          .
        </p>
        <p>
          They were adapted to a 24×24 grid in{" "}
          <a
            href="https://www.figma.com/community/file/1266365661823917037/the-ultimate-games-icons-library"
            target="_blank"
            rel="noreferrer"
          >
            The Ultimate Games Icons Library
          </a>{" "}
          by <strong>Nimesh</strong> (@sup_nim), licensed under{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
            CC BY 4.0
          </a>
          .
        </p>
        <p>
          <strong>Changes made in this app:</strong> icons were grouped into categories, given search tags, and made
          exportable as SVG, React (TSX) components and PNG. The artwork itself is unchanged.
        </p>
        <p className="about-muted">
          When you use an icon, credit it — for example: “Icons by game-icons.net (CC BY 3.0), via The Ultimate Games
          Icons Library by Nimesh (CC BY 4.0).” Turn on “Credit comment” to embed this line in copied code.
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          Got it
        </button>
      </div>
    </dialog>
  );
}
