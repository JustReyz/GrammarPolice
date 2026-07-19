export function playSound(type: "correct" | "incorrect") {
  try {
    const audio = new Audio(`/audio/${type}.mp3`);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch {}
}
