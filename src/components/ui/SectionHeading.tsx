type SectionHeadingProps = {
  id: string;
  title: string;
  description?: string;
};

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 id={id} className="heading-3 max-w-170">
        {title}
      </h2>
      {description ? <p className="body-3 max-w-170 text-muted">{description}</p> : null}
    </div>
  );
}
