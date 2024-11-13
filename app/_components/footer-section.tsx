import React from "react";

export const FooterSection = () => {
  return (
    <footer className="fixed right-4 bottom-2 z-50">
      <p className="text-sm">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://mhm13.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Mubashir
        </a>
      </p>
    </footer>
  );
};
