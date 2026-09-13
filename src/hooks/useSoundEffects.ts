import { useCallback, useEffect, useState } from 'react';

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('rp_sound_enabled');
    return saved === 'true'; // Default off to be polite, user can easily toggle on
  });

  useEffect(() => {
    localStorage.setItem('rp_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const playSynth = useCallback(
    (frequency: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.025) => {
      if (!soundEnabled) return;
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);

        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);

        setTimeout(() => {
          ctx.close();
        }, duration * 1000 + 100);
      } catch {
        // Ignore audio errors gracefully
      }
    },
    [soundEnabled]
  );

  const playClick = useCallback(() => {
    playSynth(600, 0.04, 'sine', 0.03);
  }, [playSynth]);

  const playHover = useCallback(() => {
    playSynth(880, 0.02, 'triangle', 0.015);
  }, [playSynth]);

  const playModalOpen = useCallback(() => {
    playSynth(520, 0.12, 'sine', 0.03);
  }, [playSynth]);

  const playSuccess = useCallback(() => {
    playSynth(784, 0.18, 'sine', 0.035);
  }, [playSynth]);

  return {
    soundEnabled,
    toggleSound,
    playClick,
    playHover,
    playModalOpen,
    playSuccess,
  };
}
