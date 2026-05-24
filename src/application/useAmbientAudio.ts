import { useState } from "react";

export type AmbientAudioTrack = "rain" | "forest" | "night";

const TRACKS: Record<AmbientAudioTrack, string> = {
  rain: "/audio/rain.mp3",
  forest: "/audio/forest.mp3",
  night: "/audio/night.mp3",
};


// Core AudioEngine: isolated playback module (single source of truth)
// ================================
// AUDIO ENGINE MODULE (EXTRACTED)
// ================================
export class AudioEngine {
  audio: HTMLAudioElement | null = null;
  track: AmbientAudioTrack = "rain";

  playing = false;
  baseVolume = 0.5;

  fadeInterval: number | null = null;

  constructor() {
    this.audio = new Audio(TRACKS[this.track]);
    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = this.baseVolume;
  }

  setTrack(track: AmbientAudioTrack) {
    this.track = track;

    if (!this.audio) return;

    this.audio.pause();
    this.audio.src = TRACKS[track];
    this.audio.load();
  }

  async play() {
    if (!this.audio) return;

    this.audio.volume = 0;

    try {
      await this.audio.play();
      this.playing = true;
      this.fadeTo(this.baseVolume, 800);
    } catch (e) {
      console.error("AudioEngine play failed", e);
      this.playing = false;
    }
  }

  pause() {
    if (!this.audio) return;

    this.playing = false;
    this.fadeTo(0, 400);

    setTimeout(() => {
      this.audio?.pause();
    }, 400);
  }

  async toggle() {
    if (this.playing) {
      this.pause();
    } else {
      await this.play();
    }

    return this.playing;
  }

  private fadeTo(target: number, duration = 600) {
    if (!this.audio) return;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const stepTime = 50;
    const steps = duration / stepTime;
    const start = this.audio.volume;
    const delta = (target - start) / steps;

    let i = 0;

    this.fadeInterval = window.setInterval(() => {
      i++;
      if (!this.audio) return;

      this.audio.volume = Math.min(1, Math.max(0, this.audio.volume + delta));

      if (i >= steps) {
        this.audio.volume = target;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, stepTime);
  }
}

const engine = new AudioEngine();

export function useAmbientAudio() {
  const [currentTrack, setCurrentTrack] = useState<AmbientAudioTrack>("rain");
  const [isPlaying, setIsPlaying] = useState(false);

  async function playAudio() {
    await engine.play();
    setIsPlaying(engine.playing);
  }

  function pauseAudio() {
    engine.pause();
    setIsPlaying(engine.playing);
  }

  async function toggleAudio() {
    const playing = await engine.toggle();
    setIsPlaying(playing);
  }

  function selectTrack(track: AmbientAudioTrack) {
    engine.setTrack(track);
    setCurrentTrack(track);
  }

  return {
    currentTrack,
    isPlaying,
    toggleAudio,
    selectTrack,
    // duckVolume, startBreathModulation, stopBreathModulation can be re-added if needed
  };
}