import { useEffect, useId, useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import type { GalleryStep, Screen } from "../lib/content";
import "./ScreenGallery.css";

export default function ScreenGallery({
  steps,
  title,
  layout,
}: {
  steps: GalleryStep[];
  title: string;
  layout: string;
}) {
  const [active, setActive] = useState(
    layout === "pipeline" && steps.length > 2 ? 2 : 0,
  );
  const [expanded, setExpanded] = useState<Screen | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefix = useId();
  useEffect(() => {
    if (expanded) dialog.current?.showModal();
    else dialog.current?.close();
  }, [expanded]);
  const step = steps[active];
  if (!step) return null;
  const screenshot = (screen: Screen, kind: string) => (
    <button
      type="button"
      className={`gallery-shot ${kind}`}
      onClick={() => setExpanded(screen)}
      aria-label={`${screen.alt} 크게 보기`}
      title="크게 보기"
    >
      <img
        src={screen.src}
        alt={screen.alt}
        width={screen.width}
        height={screen.height}
        decoding="async"
      />
      <span className="expand-icon">
        <Expand size={17} />
      </span>
    </button>
  );
  return (
    <section
      className={`screen-gallery gallery-${layout}`}
      aria-label={`${title} 화면`}
    >
      <div
        className="gallery-band"
        role="tabpanel"
        id={`${prefix}-panel`}
        aria-labelledby={`${prefix}-tab-${active}`}
      >
        <div className="gallery-images container">
          {step.desktop && screenshot(step.desktop, "desktop")}
          {step.mobile && screenshot(step.mobile, "mobile")}
        </div>
      </div>
      <div className="container">
        <div
          className="gallery-tabs"
          role="tablist"
          aria-label="프로젝트 화면 선택"
        >
          {steps.map((item, index) => (
            <button
              ref={(node) => {
                tabs.current[index] = node;
              }}
              key={item.label}
              type="button"
              role="tab"
              id={`${prefix}-tab-${index}`}
              aria-controls={`${prefix}-panel`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight")
                  next = (index + 1) % steps.length;
                else if (event.key === "ArrowLeft")
                  next = (index - 1 + steps.length) % steps.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = steps.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                tabs.current[next]?.focus();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="gallery-caption">{step.caption}</p>
      </div>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-label="화면 확대"
        onCancel={() => setExpanded(null)}
        onClick={(event) => {
          if (event.target === dialog.current) setExpanded(null);
        }}
      >
        <button
          className="icon-button dialog-close"
          type="button"
          onClick={() => setExpanded(null)}
          aria-label="닫기"
          title="닫기"
        >
          <X size={23} />
        </button>
        {expanded && (
          <img
            src={expanded.src}
            alt={expanded.alt}
            width={expanded.width}
            height={expanded.height}
          />
        )}
      </dialog>
    </section>
  );
}
