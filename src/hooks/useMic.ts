import { useCallback, useEffect, useRef, useState } from "react";

export type MicError = "permission_denied" | "unavailable" | null;

/**
 * Ascolta il microfono e chiama onSnuff() quando il volume medio
 * supera la soglia per un breve periodo sostenuto (non un singolo spike).
 *
 * @param onSnuff - callback quando viene rilevato un "soffio"
 * @param threshold - soglia volume normalizzato 0-1
 */
export default function useMicrophoneSnuffer(
  onSnuff: () => void,
  threshold = 0.25,
) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<MicError>(null);
  const [volume, setVolume] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const onSnuffRef = useRef(onSnuff);

  useEffect(() => {
    onSnuffRef.current = onSnuff;
  }, [onSnuff]);

  const stopListening = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
    }
    audioContextRef.current = null;
    analyserRef.current = null;

    setIsListening(false);
    setVolume(0);
  }, []);

  const startListening = useCallback(async () => {
    if (audioContextRef.current) return;

    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const REQUIRED_CONSECUTIVE_HITS = 4;
      let consecutiveHits = 0;

      const checkVolume = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length / 255;
        setVolume(average);

        if (average > threshold) {
          consecutiveHits += 1;
          if (consecutiveHits >= REQUIRED_CONSECUTIVE_HITS) {
            onSnuffRef.current?.();
            stopListening();
            return;
          }
        } else {
          consecutiveHits = 0;
        }

        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      setIsListening(true);
      checkVolume();
    } catch (err) {
      console.error("Errore microfono:", err);
      const domErr = err as DOMException;
      setError(
        domErr?.name === "NotAllowedError"
          ? "permission_denied"
          : "unavailable",
      );
      stopListening();
    }
  }, [threshold, stopListening]);

  useEffect(() => {
    return () => stopListening();
  }, [stopListening]);

  return { isListening, startListening, stopListening, error, volume };
}
