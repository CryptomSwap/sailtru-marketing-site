#!/bin/bash
# Interleaved B (Lenis off, :3101) / C (Lenis on, :3102) runs, 3 each per viewport.
cd /home/tom/work/harbor-3d-tools
for n in 1 2 3; do
  for k in desktop mobile; do
    echo "== run $n $k B $(cut -d' ' -f1-3 /proc/loadavg)"; bash perf-run.sh before-B http://localhost:3101 $k $n
    echo "== run $n $k C $(cut -d' ' -f1-3 /proc/loadavg)"; bash perf-run.sh after-C http://localhost:3102 $k $n
  done
done
echo ALLDONE
