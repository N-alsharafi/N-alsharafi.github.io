/**
 * Section title. The heading pins under the top bar while its section is read
 * and shrinks as the section is consumed; the oversized ghost numeral drifts
 * behind the section. Both are driven by the section's `--p`.
 *
 * Only the head's children are scaled — the box itself must keep its full
 * width so its background masks the content scrolling underneath.
 */
export default function SectionHead({ num, title, meta }: { num: string; title: string; meta?: string }) {
  return (
    <>
      <span className="section__ghost num" aria-hidden="true">
        {num}
      </span>
      <div className="section__head">
        <h2 className="section__title">
          <span className="section__num num">{num}</span>&nbsp;&nbsp;{title}
        </h2>
        {meta ? <p className="section__meta">{meta}</p> : null}
      </div>
    </>
  );
}
