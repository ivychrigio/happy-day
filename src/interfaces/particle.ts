import * as THREE from "three";

export interface Particle {
  x: number;
  y: number;
  z: number;
  speed: number;
  rot: number;
  color: THREE.Color;
}
