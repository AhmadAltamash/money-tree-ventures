"use client";

import { Fragment, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";

const tagline =
  "Sahi knowledge ka beej boyein. Seekhein, plan karein aur apne pace par shuru karein. Kyunki haan, paise ped pe ugte hain.";

const words = tagline.split(" ");

// Words start in a soft color and turn to full color one by one as they scroll into view.
export function TaglineReveal() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wordElements = textRef.current?.querySelectorAll<HTMLElement>("[data-word]");
    if (!wordElements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If many words appear at once, keep them in reading order with a small delay between each.
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Number((a.target as HTMLElement).dataset.index) - Number((b.target as HTMLElement).dataset.index));

        entering.forEach((entry, position) => {
          const wordElement = entry.target as HTMLElement;
          wordElement.style.transitionDelay = `${Math.min(position * 40, 400)}ms`;
          wordElement.dataset.active = "true";
          observer.unobserve(wordElement);
        });
      },
      // A word turns on when it rises above the lower 30% of the screen.
      { rootMargin: "0px 0px -30% 0px" },
    );

    wordElements.forEach((wordElement) => observer.observe(wordElement));
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Hamari soch" className="py-20">
      <Container>
        <p ref={textRef} className="heading-3 max-w-170">
          {words.map((word, index) => (
            <Fragment key={index}>
              <span
                data-word
                data-index={index}
                className="inline-block text-foreground/30 transition-colors duration-500 ease-base data-[active=true]:text-foreground motion-reduce:text-foreground motion-reduce:transition-none"
              >
                {word}
              </span>{" "}
            </Fragment>
          ))}
        </p>
      </Container>
    </section>
  );
}
