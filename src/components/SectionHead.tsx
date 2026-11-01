import { useRevealGroup } from "@/lib/reveal";

export default function SectionHead({ num, title, meta }: { num: string; title: string; meta?: string }) {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <div className="section__head" ref={ref} data-reveal>
      <h2 className="section__title">
        <span className="section__num num">{num}</span>&nbsp;&nbsp;{title}
      </h2>
      {meta ? <p className="section__meta">{meta}</p> : null}
    </div>
  );
}
