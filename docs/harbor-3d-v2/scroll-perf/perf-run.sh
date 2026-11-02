#!/bin/bash
# usage: perf-run.sh <label> <baseUrl> <desktop|mobile> <runIndex>   -> /home/tom/work/harbor-3d-v2-run/perf/<label>-<kind>-<run>.json
L=$1; BASE=$2; K=$3; N=$4
cp /home/tom/work/harbor-3d-tools/perf-jank.mjs /mnt/c/Users/User/shots/tools/perf-jank.mjs
mkdir -p /mnt/c/Users/User/shots/perf
LOAD=$(cut -d' ' -f1-3 /proc/loadavg)
cd /mnt/c/Users/User/shots/tools && "/mnt/c/Program Files/nodejs/node.exe" perf-jank.mjs "$BASE" "C:\\Users\\User\\shots\\perf\\$L-$K-$N.json" "$K" "$L" "$LOAD"
cp /mnt/c/Users/User/shots/perf/$L-$K-$N.json /home/tom/work/harbor-3d-v2-run/perf/
