import type { CSSProperties, ReactNode } from "react";

/**
 * One act of the scroll stage.
 *
 * `data-scene` marks the pinned region and `--len` is the scroll distance the
 * act owns beyond the first viewport. The stage inside is sticky, so the act's
 * content changes in place instead of scrolling past — see lib/stage.ts.
 */
export default function Scene({
  id,
  act,
  num,
  title,
  meta,
  len = "140vh",
  children,
}: {
  id: string;
  act: string;
  num: string;
  title: string;
  meta?: ReactNode;
  len?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`scene scene--${act}`}
      id={id}
      data-scene
      style={{ "--len": len } as CSSProperties}
    >
      <div className="stage">
        <header className="hud shell">
          <p className="hud__id">
            <span className="hud__num num">{num}</span>
            <span>{title}</span>
          </p>
          {meta ? <p className="hud__meta">{meta}</p> : null}
          <span className="hud__rule" aria-hidden="true" />
        </header>
        <div className={`stage__inner act act--${act} shell`}>{children}</div>
      </div>
    </section>
  );
}
