import type { JourneySceneContent } from "./journey-content";

export function JourneyScene({ scene, index, part="copy" }: { scene: JourneySceneContent; index: number; part?: "copy" | "evidence" }) {
  const accentStart=scene.accent?scene.title.indexOf(scene.accent):-1;
  return (
    <article id={part==="copy"?scene.id:`${scene.id}-example`} className={`ij-scene ij-scene--${scene.id}`}>
      {part==="copy"&&<div className="ij-scene__copy">
        <p className="ij-eyebrow">{scene.eyebrow}</p>
        <h2>{accentStart>=0?<>{scene.title.slice(0,accentStart)}<span className="harbor-title-accent">{scene.accent}</span>{scene.title.slice(accentStart+scene.accent!.length)}</>:scene.title}</h2>
        <p className="harbor-body">{scene.body}</p>
        <span className="ij-scene__bearing" aria-hidden>{String(index + 1).padStart(2, "0")} / 03</span>
      </div>}
      {part==="evidence"&&scene.card && <aside className="harbor-evidence">
        <p className="ij-eyebrow">{scene.card.label}</p>
        {index===1 ? <>
          <h3>Make the next step visible.</h3>
          <p className="harbor-example-copy"><span className="harbor-demo-before">Finding: the service page puts its enquiry link in the footer.</span><span className="harbor-demo-after">Recommendation: place one clear enquiry action beside the service and explain what happens next.</span></p>
        </> : <><h3>{scene.card.title}</h3><p>{scene.card.detail}</p></>}
      </aside>}
    </article>
  );
}
