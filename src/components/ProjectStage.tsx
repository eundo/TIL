import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "../lib/content";
import type { ProjectScene } from "../lib/project-scene";
import "./ProjectStage.css";

export default function ProjectStage({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<ProjectScene | null>(null);
  const current = useRef(0);
  const project = projects[active];

  useEffect(() => {
    let disposed = false;
    const element = canvas.current;
    if (!element || projects.length === 0) return;
    import("../lib/project-scene")
      .then(async ({ createProjectScene }) => {
        if (disposed) return;
        const next = await createProjectScene(element, projects, setActive);
        if (disposed) {
          next.destroy();
          return;
        }
        scene.current = next;
        next.select(current.current);
        setReady(true);
      })
      .catch(() => {
        /* The real screenshots remain usable without WebGL. */
      });
    return () => {
      disposed = true;
      scene.current?.destroy();
      scene.current = null;
    };
  }, [projects]);
  useEffect(() => {
    current.current = active;
    scene.current?.select(active);
  }, [active]);

  if (!project) return null;
  const select = (value: number) =>
    setActive((value + projects.length) % projects.length);
  return (
    <section className="project-stage" aria-label="대표 프로젝트">
      <div className={`stage-media ${ready ? "is-ready" : ""}`}>
        <div className="stage-fallback" aria-hidden="true">
          {projects.map(
            (item, index) =>
              item.cover && (
                <img
                  key={item.id}
                  className={`fallback-shot fallback-${(index - active + projects.length) % projects.length}`}
                  src={item.cover.src}
                  width={item.cover.width}
                  height={item.cover.height}
                  alt=""
                  loading={index < 3 ? "eager" : "lazy"}
                  hidden={
                    (index - active + projects.length) % projects.length >= 3
                  }
                />
              ),
          )}
        </div>
        <canvas
          ref={canvas}
          aria-hidden="true"
          data-testid="project-stage-canvas"
        />
      </div>
      <div className="stage-heading container">
        <h1>박은도</h1>
        <p>Backend / Batch / Product UI</p>
      </div>
      <div className="stage-navigation container">
        <div className="stage-controls">
          <button
            className="icon-button"
            onClick={() => select(active - 1)}
            aria-label="이전 프로젝트"
            title="이전 프로젝트"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="icon-button"
            onClick={() => select(active + 1)}
            aria-label="다음 프로젝트"
            title="다음 프로젝트"
          >
            <ArrowRight size={18} />
          </button>
          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <a
          className="stage-project-link"
          href={project.href}
          aria-live="polite"
        >
          <span>{project.title}</span>
          <ArrowUpRight size={20} />
        </a>
      </div>
    </section>
  );
}
