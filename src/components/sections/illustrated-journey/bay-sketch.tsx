import { useId } from "react";

type Channel = "openai.svg" | "claude-color.svg" | "google-color.svg" | "perplexity-color.svg";

function Palm({ x, y, scale = 1, lean = 1 }: { x: number; y: number; scale?: number; lean?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="9" cy="32" rx="30" ry="6" fill="#283c40" opacity=".06" />
    <path d={`M0 28Q${14 * lean} 2 ${7 * lean} -35`} stroke="#78827d" strokeWidth="5" strokeLinecap="round" />
    <g transform={`translate(${7 * lean} -35)`} fill="#c4c9bf" stroke="#7d8880" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M0 0Q-30 -26 -48 0Q-26 -6 0 0Z" />
      <path d="M0 0Q-17 -32 -30 -30Q-17 -13 0 0Z" />
      <path d="M0 0Q1 -37 17 -32Q9 -13 0 0Z" />
      <path d="M0 0Q29 -27 47 -8Q23 -8 0 0Z" />
      <path d="M0 0Q38 -7 42 19Q20 6 0 0Z" />
      <path d="M0 0Q-24 -2 -34 24Q-10 9 0 0Z" />
      <path d="M0 0L-39 -2M0 0L38 -8M0 0L34 13M0 0L-27 16" fill="none" opacity=".7" />
    </g>
  </g>;
}

function VisitorBoat({ x, y, scale = 1, channel, blue = false, reverse = false }: { x: number; y: number; scale?: number; channel?: Channel; blue?: boolean; reverse?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g transform={reverse ? "scale(-1 1)" : undefined}>
      <path d="M-42 10Q-63 14 -84 7M-39 20Q-62 27 -91 20" stroke="#bdcbc6" strokeWidth="1.5" strokeLinecap="round" opacity=".65" />
      <ellipse cy="17" rx="37" ry="8" fill="#344846" opacity=".08" />
      <path d="M-35 3Q-6 -8 39 0Q25 19 -27 17Z" fill={blue ? "#315fea" : "#f8f7f1"} stroke={blue ? "#315fea" : "#7c8a87"} strokeWidth="1.5" />
      <path d="M-24 0L-16 -14L9 -15L21 1Z" fill="#fffefa" stroke="#8b9791" strokeWidth="1.2" />
      <path d="M-12 -11H5L10 -3H-17Z" fill="#dce5e1" />
      <path d="M-23 8Q1 7 23 4" stroke={blue ? "#dbe5ff" : "#a7b5b1"} strokeWidth="1.2" />
    </g>
    {channel && <g>
      <path d="M0 -26V-34" stroke="#a5b1ad" />
      <circle cy="-54" r="19" fill="#fffefa" stroke="#d1d8d1" />
      <image href={`/images/brands/${channel}`} x="-11" y="-65" width="22" height="22" style={{ filter: "grayscale(1)", opacity: .58 }} />
    </g>}
  </g>;
}

function House({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#85908a" strokeWidth="1.3" strokeLinejoin="round">
    <path d="M-55 32L4 60L61 37L7 17Z" fill="#b8bbae" stroke="none" opacity=".18" />
    <path d="M-43 -4L4 -23L47 -4V37L4 56L-43 37Z" fill="#fffdf5" />
    <path d="M4 16V56L47 37V-4Z" fill="#e7e8de" />
    <path d="M-49 -5L-9 -34L53 -7L4 17Z" fill="#a8b1a5" />
    <path d="M-37 -8L5 10M-24 -15L18 3M-11 -22L31 -4" stroke="#d7dbd1" />
    <path d="M-13 42V16L0 21V49" fill="#667a78" />
    <path d="M-34 7L-23 11V25L-34 21ZM17 18L28 13V28L17 33ZM33 10L41 6V21L33 25Z" fill="#c2d0cc" />
    <path d="M-37 28L-19 34M14 36L30 29" stroke="#fcfbf6" strokeWidth="3" />
  </g>;
}

// A complete still-state: discovery-channel badges belong to client boats.
// This replaces the moving world when reduced motion or a WebGL fallback is active.
export function BaySketch() {
  const id = useId().replaceAll(":", "");
  const coast = "M148 339C116 321 105 282 124 249C139 226 137 203 163 179C197 149 233 153 254 131C285 100 333 111 365 98C414 78 454 93 485 90C525 85 566 113 599 118C641 125 656 154 692 168C723 181 739 209 755 240C770 271 748 289 763 318C783 359 759 395 724 391C699 389 679 364 681 337C684 304 664 295 657 277C644 247 603 239 568 227C527 213 496 214 461 208C422 201 386 214 353 215C308 217 281 238 260 259C237 282 250 304 234 327C218 350 176 361 148 339Z";
  return <svg className="harbor-sketch bay-sketch" viewBox="0 0 900 580" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id={`${id}-water`}><stop stopColor="#e2eae6" /><stop offset="1" stopColor="#f6f5ef" /></radialGradient>
      <linearGradient id={`${id}-sand`} x1="450" y1="90" x2="450" y2="397" gradientUnits="userSpaceOnUse"><stop stopColor="#eee8d9" /><stop offset="1" stopColor="#e4ddcc" /></linearGradient>
    </defs>
    <ellipse cx="460" cy="325" rx="431" ry="248" fill={`url(#${id}-water)`} />
    <g opacity=".2" transform="translate(782 74) scale(.17)">
      <path d={coast} transform="translate(-450 -220)" fill="#d8dacd" stroke="#8f9b91" strokeWidth="5" />
      <House x={0} y={-40} scale={1.3} />
    </g>
    {Array.from({ length: 26 }, (_, i) => <path key={i} d={`M${95 + i * 157 % 705} ${117 + i * 67 % 420}q12 5 28 0t25 0`} stroke="#b9c8c1" strokeWidth="1" opacity=".3" />)}
    <path d={coast} stroke="#d0ded6" strokeWidth="29" strokeLinejoin="round" opacity=".48" />
    <path d={coast} transform="translate(0 8)" fill="#b3b7a8" opacity=".42" />
    <path d={coast} fill={`url(#${id}-sand)`} stroke="#a8afa1" strokeWidth="1.4" />
    <path d="M151 332C129 306 131 278 143 254C165 218 161 192 199 177C240 158 244 165 279 135C316 113 344 126 376 112C415 94 451 110 487 104C525 99 557 126 599 131C639 138 650 169 684 180C716 194 730 222 742 249C752 277 733 294 751 326C768 359 747 381 726 378" stroke="#fffdf2" strokeWidth="6" strokeLinecap="round" opacity=".85" />
    <path d="M232 313C236 285 221 274 251 246C279 218 315 204 350 202C388 200 424 187 465 195C502 202 535 198 570 214C612 231 647 231 667 261C683 283 697 304 694 335" stroke="#fffdf6" strokeWidth="8" strokeLinecap="round" opacity=".88" />
    <path d="M269 157C334 126 399 149 442 128C488 114 543 142 574 150C504 168 466 157 421 172C366 185 316 167 269 181Z" fill="#c9cebd" opacity=".5" />
    <path d="M161 263C164 223 193 203 224 189C211 223 193 240 191 280Z" fill="#ced1c0" opacity=".45" />
    <path d="M590 161C647 162 696 208 704 250C672 216 632 202 590 192Z" fill="#c4ccba" opacity=".4" />
    <path d="M339 202Q420 187 523 198Q581 205 614 228" stroke="#fbf9ef" strokeWidth="9" strokeLinecap="round" />
    <House x={438} y={164} scale={1.05} /><House x={528} y={159} scale={.65} />
    <Palm x={246} y={213} scale={1.02} lean={-1} /><Palm x={310} y={161} scale={.8} />
    <Palm x={629} y={211} scale={.9} lean={-1} /><Palm x={703} y={300} scale={.88} />
    <Palm x={172} y={301} scale={.7} />
    <g fill="#b9beb0" stroke="#969f93" strokeWidth=".8">
      <path d="M125 330L139 316L158 328L155 340L135 344Z" /><path d="M157 348L169 333L188 341L180 352Z" />
      <path d="M746 388L761 375L780 389L771 400L753 398Z" /><path d="M728 394L738 384L748 395L737 401Z" />
    </g>
    <g stroke="#71827b" strokeLinejoin="round">
      <path d="M411 226V410H422V249H549V410H560V226H549V238H422V226Z" fill="#f4efdf" strokeWidth="1.5" />
      {Array.from({ length: 6 }, (_, i) => <g key={i}>
        <path d={`M422 ${269 + i * 24}H456V${274 + i * 24}H422M549 ${269 + i * 24}H515V${274 + i * 24}H549`} fill="#f5f1e6" strokeWidth="1.2" />
        <circle cx="416" cy={270 + i * 24} r="2.2" fill="#71827b" /><circle cx="554" cy={270 + i * 24} r="2.2" fill="#71827b" />
      </g>)}
      {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M412 ${233 + i * 9}H420M551 ${233 + i * 9}H559`} strokeWidth=".6" opacity=".5" />)}
    </g>
    <VisitorBoat x={441} y={286} scale={.39} /><VisitorBoat x={530} y={286} scale={.39} reverse />
    <VisitorBoat x={530} y={309} scale={.39} reverse /><VisitorBoat x={441} y={334} scale={.39} />
    <VisitorBoat x={530} y={357} scale={.39} reverse />
    <path d="M200 472C289 489 353 442 408 425M565 428C643 453 685 502 780 494" stroke="#9db2cf" strokeWidth="1.4" strokeDasharray="3 9" strokeLinecap="round" opacity=".6" />
    <VisitorBoat x={320} y={452} scale={1.05} channel="openai.svg" blue />
    <VisitorBoat x={196} y={476} scale={.68} channel="google-color.svg" />
    <VisitorBoat x={651} y={465} scale={.83} channel="claude-color.svg" reverse />
    <VisitorBoat x={777} y={500} scale={.65} channel="perplexity-color.svg" reverse />
    <path d="M360 516Q461 544 568 520M401 540Q460 549 511 540" stroke="#b6c7bd" strokeWidth="1.3" opacity=".4" />
  </svg>;
}
