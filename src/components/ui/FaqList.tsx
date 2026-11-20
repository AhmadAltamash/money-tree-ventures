import { Plus } from "@phosphor-icons/react/dist/ssr";

type FaqListProps = {
  faqs: { question: string; answer: string }[];
};

// Uses the browser's own <details> element, so it works without any JavaScript.
export function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-lg border border-border bg-surface">
          <summary className="title-3 flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-lg p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
            {faq.question}
            <Plus
              aria-hidden="true"
              size={20}
              className="shrink-0 transition duration-300 ease-base group-open:rotate-45"
            />
          </summary>
          <p className="body-6 px-4 pb-4 text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
