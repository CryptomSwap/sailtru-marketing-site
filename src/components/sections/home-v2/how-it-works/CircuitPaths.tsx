import {
  OUTPUTS,
  RETURN_PATH,
  SOURCES,
  VB,
  inboundPath,
  outboundPath
} from "@/components/sections/home-v2/how-it-works/circuit-geometry";

function Wire({
  d,
  group,
  id,
  minor = false,
  pulse = false
}: {
  d: string;
  group: "in" | "out" | "back";
  id: string;
  minor?: boolean;
  pulse?: boolean;
}) {
  return (
    <g className={minor ? "intel-path intel-path--minor" : "intel-path"} data-path-group={group}>
      <path className="intel-path__base" d={d} data-base={group} data-path-id={id} />
      <path className="intel-path__draw" d={d} data-draw={group} data-path-id={id} />
      {pulse ? <path className="intel-path__pulse" d={d} data-pulse={group} data-path-id={id} /> : null}
    </g>
  );
}

export function CircuitPaths() {
  return (
    <svg
      className="intel-paths"
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {SOURCES.map((source) => (
        <Wire
          key={source.id}
          d={inboundPath(source.x, source.landX)}
          group="in"
          id={source.id}
          minor={!source.major}
          pulse={source.major}
        />
      ))}
      {OUTPUTS.map((output) => (
        <Wire key={output.id} d={outboundPath(output.x)} group="out" id={output.id} pulse={output.id === "found"} />
      ))}
      <Wire d={RETURN_PATH} group="back" id="return" pulse />
    </svg>
  );
}
