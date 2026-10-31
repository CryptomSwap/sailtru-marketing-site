"use client";

import { useEffect, useId, useRef } from "react";

const providers = ["Google", "ChatGPT", "Claude", "Perplexity"];
const routes = [
  "M 790 470 C 650 390 440 460 385 430 C 345 395 450 350 610 365 C 740 380 825 430 790 470 Z",
  "M 50 480 C 170 395 360 455 405 470 C 455 490 300 540 160 550 C 65 550 20 520 50 480 Z",
  "M 780 580 C 650 520 470 530 430 495 C 395 465 530 440 670 465 C 780 485 835 550 780 580 Z",
  "M 100 300 C 230 280 380 315 420 360 C 465 410 365 380 260 355 C 140 330 35 350 100 300 Z",
];

function ProviderMark({ index }: { index: number }) {
  if (index === 0) return <g fill="none" strokeWidth="3.5">
    <path d="M7 -7 A10 10 0 0 0 -8 -6" stroke="#ea4335"/><path d="M-8 -6 A10 10 0 0 0 -8 7" stroke="#fbbc05"/>
    <path d="M-8 7 A10 10 0 0 0 7 8" stroke="#34a853"/><path d="M7 8 Q12 4 10 0 H1" stroke="#4285f4"/>
  </g>;
  if (index === 1) return <g fill="none" stroke="#263e39" strokeWidth="1.7">{Array.from({length:6}, (_, i) => <path key={i} transform={`rotate(${i * 60})`} d="M0 -10 C9 -15 15 -3 8 2 L0 6 L-5 2 V-5 Z"/>)}</g>;
  if (index === 2) return <g stroke="#c36d4f" strokeWidth="2.5">{Array.from({length:10}, (_, i) => <path key={i} transform={`rotate(${i * 36})`} d="M0 -4 L1 -13"/>)}</g>;
  return <g fill="none" stroke="#32818a" strokeWidth="1.6"><path d="M-9 -10 L9 8 V-8 L-9 10 V-8 H9 V10 H-9 Z M0 -14 V14"/></g>;
}

function LittleBoat({ index }: { index: number }) {
  return <g className="harbor-boat-bob">
    <path d="M-36 12 Q0 28 37 10 L26 27 Q-2 39 -28 26 Z" fill={index % 2 ? "#f9f5eb" : "#315fea"}/>
    <path d="M-36 12 Q0 28 37 10 M-29 17 Q0 31 28 17" fill="none"/>
    <path d="M0 15 L0 -58 M-4 -52 Q-12 -24 -30 6 L-4 1 Z" fill="#f9f5eb"/>
    <path d="M5 -55 Q25 -36 29 1 L5 8 Z" fill="#f9f5eb"/>
    <g transform="translate(14 -17) scale(.65)"><ProviderMark index={index}/></g>
    <path d="M-42 37 Q-29 33 -16 37 M-7 40 Q12 35 36 38" stroke="#7d9bad" fill="none" strokeWidth="1"/>
  </g>;
}

export function HarborSketch({ animated = false, className = "" }: { animated?: boolean; className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");
  useEffect(() => {
    if (!animated || !root.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const boats = Array.from(root.current.querySelectorAll<SVGGElement>("[data-boat]"));
    const paths = Array.from(root.current.querySelectorAll<SVGPathElement>("[data-route]"));
    const lengths = paths.map((path) => path.getTotalLength());
    let frame = 0;
    let previous = 0;
    let time = 0;
    const tick = (now: number) => {
      if (previous && !document.hidden && !reduced.matches) time += Math.min((now - previous) / 1000, .05);
      previous = now;
      boats.forEach((boat, index) => {
        const point = paths[index].getPointAtLength(((time / (32 + index * 5) + index * .23) % 1) * lengths[index]);
        boat.setAttribute("transform", `translate(${point.x} ${point.y}) scale(${index === 3 ? .68 : .85})`);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animated]);

  return <svg ref={root} className={`harbor-sketch ${animated ? "harbor-sketch--animated" : ""} ${className}`} viewBox="0 0 860 700" fill="none" stroke="#23394b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <defs>
      <pattern id={`${id}-sea`} width="105" height="38" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)">
        <path d="M8 18 Q18 14 32 18 M60 29 Q72 25 88 28" stroke="#96b6c3" strokeWidth=".8" opacity=".6"/>
      </pattern>
      <radialGradient id={`${id}-wash`}><stop stopColor="#cee3e6" stopOpacity=".8"/><stop offset="1" stopColor="#f8f5ed" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="445" cy="445" rx="410" ry="245" fill={`url(#${id}-wash)`} stroke="none"/>
    <ellipse className="harbor-water" cx="445" cy="445" rx="400" ry="225" fill={`url(#${id}-sea)`} stroke="none"/>
    <g stroke="#9aa9a8" strokeWidth="1" opacity=".65">
      <path d="M44 252 Q155 242 235 249 M589 247 Q694 239 815 250 M70 240 L114 208 L132 222 L167 191 L218 241 M646 240 L698 212 L725 229 L747 204 L810 239"/>
      <path d="M102 147 Q110 140 119 148 Q127 140 136 146 M663 126 Q671 119 680 127 Q687 120 695 125"/>
    </g>
    {/* The original little pier remains visible through every improvement. */}
    <g>
      <path d="M260 306 Q249 273 282 253 Q314 237 362 254 L405 292 L365 334 Z" fill="#e5e2d6"/>
      <path d="M261 305 Q301 324 366 332 M276 311 L282 297 M297 320 L307 302 M327 327 L338 310" stroke="#919891"/>
      <path d="M315 296 L350 282 L478 380 L443 398 Z" fill="#eee6d5"/>
      {Array.from({length:10}, (_, i) => <path key={i} d={`M${326+i*12} ${304+i*9.2} l33 -14`}/>)}
      <path d="M443 398 V424 M478 380 V408 M348 321 V345 M382 345 V370" strokeWidth="4"/>
      <path d="M443 399 V424 M478 380 V408" stroke="#a29c8b" strokeWidth="1"/>
    </g>
    <g data-build="1" className="harbor-build">
      <path className="harbor-beam" d="M314 193 L637 107 L636 238 Z" fill="#ffe6a1" opacity=".22" stroke="none"/>
      <path d="M286 278 L295 192 H322 L334 284 Q310 296 286 278 Z" fill="#fbf8ef"/>
      <path d="M291 234 L328 242 L326 226 L293 218 Z" fill="#315fea" stroke="none"/>
      <path d="M291 193 H327 V179 H291 Z M288 179 L310 164 L331 179 Z" fill="#315fea"/>
      <path d="M298 181 V190 M309 181 V191 M320 181 V191" stroke="#f9f5eb"/>
      <path d="M304 279 V262 Q311 253 317 264 V285 M307 208 H314 V216 H307 Z" fill="#243c55"/>
      <path d="M280 286 Q310 302 341 290 M285 290 Q310 304 336 296" stroke="#6b8391"/>
      <text x="311" y="141" textAnchor="middle" className="harbor-note">A little easier to find.</text>
      <path d="M326 146 Q347 151 331 166" stroke="#6e8aaa" strokeDasharray="3 5"/>
    </g>
    <g data-build="2" className="harbor-build">
      <path d="M440 393 L472 377 L596 449 L563 469 Z" fill="#eee6d5"/>
      {Array.from({length:9}, (_, i) => <path key={i} d={`M${450+i*13} ${399+i*7.5} l31 -17`}/>)}
      <path d="M563 468 V499 M595 450 V479 M504 435 V463" strokeWidth="4"/>
      <path d="M495 425 L465 445 L512 477 L541 456 Z" fill="#f4ebda"/>
      <path d="M474 445 L521 470 M485 438 L532 462"/>
      <path d="M488 386 V356 M471 350 L511 359 L511 375 L471 366 Z" fill="#f8f5ed"/>
      <path d="M479 360 L503 365 M499 361 L503 365 L498 368" stroke="#315fea"/>
      <path d="M368 311 L368 288 M398 334 V311 M428 357 V334 M368 292 L428 338" stroke="#72828a"/>
      <text x="615" y="424" className="harbor-note">Come on in.</text>
      <path d="M610 429 Q599 435 596 443" stroke="#6e8aaa" strokeDasharray="3 5"/>
    </g>
    <g data-build="3" className="harbor-build">
      <path d="M366 274 L367 220 L422 200 L465 235 V292 L414 309 Z" fill="#f8f1e2"/>
      <path d="M358 220 L415 180 L473 233 L420 248 Z" fill="#315fea"/>
      <path d="M420 248 V309 M366 222 L420 249 M415 184 L420 244"/>
      <path d="M431 280 V258 L448 252 V288 Z M379 239 L396 246 V264 L379 258 Z" fill="#d3e4e7"/>
      <path d="M431 265 L448 259 M439 256 V285 M387 243 V260" stroke="#607d8b"/>
      <path d="M376 275 L411 287 V299 L376 287 Z" fill="#fffaf0"/>
      <text transform="translate(379 285) rotate(18)" fontSize="10" fill="#253d54" stroke="none" fontFamily="sans-serif">SailTru</text>
      <path d="M456 313 L500 337 L481 349 L438 325 Z M445 324 V337 M489 342 V355" fill="#e5dcc9"/>
      <path d="M348 278 V243 M345 243 Q328 231 337 219 Q357 220 352 239 M346 255 Q323 249 327 237 Q343 235 346 250" fill="#c1cbb5"/>
      <path d="M507 389 V349 M503 349 Q486 337 493 327 Q513 325 511 345" fill="#c1cbb5"/>
      <path d="M340 210 Q389 161 475 228" stroke="#71849b"/>
      {[0,1,2,3,4].map((i) => <path key={i} d={`M${352+i*25} ${197 + Math.pow(i-1.5,2)*4} l3 12 l8 -7 Z`} fill={i%2 ? "#efca79" : "#315fea"} strokeWidth=".8"/>)}
      <text x="434" y="148" className="harbor-note">A place worth returning to.</text>
    </g>
    <g opacity="0" pointerEvents="none">{routes.map((path, index) => <path key={index} data-route d={path}/>)}</g>
    <g data-build="1" className="harbor-build">
      {providers.map((provider, index) => <g key={provider} data-boat transform={`translate(${[670,160,660,170][index]} ${[390,490,565,320][index]}) scale(.8)`}><LittleBoat index={index}/></g>)}
    </g>
    <text x="430" y="665" textAnchor="middle" className="harbor-footnote">Discovery channels, illustrated. Not provider endorsements.</text>
  </svg>;
}
