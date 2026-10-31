// Shared by the DOM story and the 3D scene. Keep this module renderer-free.
export function harborStoryBeat(progress: number) {
  return progress<.24?"passing":progress<.4?"signal":progress<.68?"approaching":progress<.82?"docked":"proof";
}
