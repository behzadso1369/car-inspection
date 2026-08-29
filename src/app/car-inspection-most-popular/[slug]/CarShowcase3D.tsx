"use client";

import { ContactShadows, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  Box3,
  CircleGeometry,
  Color,
  DoubleSide,
  type Group,
  type Material,
  Mesh,
  MeshBasicMaterial,
  type MeshStandardMaterial,
  type Object3D,
  Vector3,
} from "three";

const START_ROTATION = Math.PI * 0.72;
const CAR_SPIN = 0.32;
const DARK_GREY = new Color("#4A4F54");
const HEADLIGHT_YELLOW = new Color("#ffcc22");

const KEY_POSITIONS: Record<number, [number, number, number]> = {
  1: [4.8, 1.85, 5.4],
  2: [6, 8, 5],
  3: [0, 11, 1],
  4: [-7, 3.2, 4],
  5: [8, 3.2, 3],
  6: [3.2, 0.45, 7],
  7: [6, 8, 5],
};

export const LIGHT_PRESETS = [
  { id: 1, label: "از سمت شما" },
  { id: 2, label: "بالا جلو" },
  { id: 3, label: "از بالا" },
  { id: 4, label: "از چپ" },
  { id: 5, label: "از راست" },
  { id: 6, label: "پایین جلو" },
  { id: 7, label: "سه‌نقطه‌ای" },
] as const;

function isEdgeMesh(name: string) {
  const n = name.toLowerCase();
  return n.startsWith("edges_") || n === "edge";
}

function isNamed(obj: Object3D, needle: string) {
  let cur: Object3D | null = obj;
  while (cur) {
    if ((cur.name || "").toLowerCase().includes(needle)) return true;
    cur = cur.parent;
  }
  return false;
}

function isRearObject(obj: Object3D) {
  return (
    isNamed(obj, "lempos") ||
    isNamed(obj, "boot") ||
    isNamed(obj, "bump_rea") ||
    isNamed(obj, "vehiclelight") ||
    isNamed(obj, "lamp3") ||
    isNamed(obj, "color_a06")
  );
}

function isHeadlightObject(obj: Object3D) {
  if (isRearObject(obj)) return false;
  return isNamed(obj, "lempu") || isNamed(obj, "1256700");
}

function isHeadlightMesh(mesh: Mesh) {
  if (isRearObject(mesh)) return false;
  if (isHeadlightObject(mesh)) return true;
  const mats = (
    Array.isArray(mesh.material) ? mesh.material : [mesh.material]
  ).filter(Boolean) as Material[];
  const names = mats.map((m) => (m.name || "").toLowerCase());
  if (names.some((n) => n.includes("vitre 15"))) return true;
  return false;
}

function SceneLights({ preset }: { preset: number }) {
  const rigRef = useRef<Group>(null);
  const sheenRef = useRef<Group>(null);
  const key = KEY_POSITIONS[preset] ?? KEY_POSITIONS[2];

  useLayoutEffect(() => {
    if (rigRef.current) rigRef.current.rotation.y = START_ROTATION;
    if (sheenRef.current) sheenRef.current.rotation.y = START_ROTATION;
  }, [preset]);

  useFrame((_, delta) => {
    if (rigRef.current) {
      rigRef.current.rotation.y += delta * CAR_SPIN;
    }
    if (sheenRef.current) {
      sheenRef.current.rotation.y += delta * CAR_SPIN * 1.35;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#f2f4f8", "#416CEA", 0.32]} />
      <group ref={rigRef}>
        <directionalLight position={key} intensity={1.5} />
        <directionalLight
          position={[-key[0] * 0.85, Math.max(key[1] * 0.55, 2.4), -key[2]]}
          intensity={0.55}
          color="#c8d5ee"
        />
        <directionalLight position={[0, 9, 0.4]} intensity={0.38} />
      </group>
      <group ref={sheenRef}>
        <spotLight
          position={[7.2, 5.2, 2.4]}
          angle={0.42}
          penumbra={0.85}
          intensity={1.15}
          color="#ffffff"
        />
      </group>
    </>
  );
}

function RotatingCar({ url }: { url: string }) {
  const groupRef = useRef<Group>(null);
  const lampsRef = useRef<Mesh[]>([]);
  const { scene } = useGLTF(url);
  const { camera } = useThree();

  const cloned = useMemo(() => {
    const root = scene.clone(true);
    let headlamp: Mesh | null = null;

    root.traverse((obj: Object3D) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh) return;
      if (isEdgeMesh(mesh.name || "") || isEdgeMesh(obj.parent?.name || "")) {
        mesh.visible = false;
        return;
      }
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const list = (
        Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      ).filter(Boolean) as Material[];
      const next = list.map((mat) => {
        const copy = mat.clone() as MeshStandardMaterial;
        if ("metalness" in copy && copy.metalness > 0.5) {
          copy.metalness = 0.12;
        }
        if ("envMapIntensity" in copy) {
          copy.envMapIntensity = 0;
        }
        if ("color" in copy && copy.color) {
          const c = copy.color;
          const max = Math.max(c.r, c.g, c.b);
          const min = Math.min(c.r, c.g, c.b);
          const isGlass = copy.transparent || (copy.opacity ?? 1) < 0.95;
          const isRed = c.r > 0.35 && c.r > c.g * 1.5 && c.r > c.b * 1.5;
          const isBlack = max < 0.05;
          const isRim = max > 0.75 && max - min < 0.08;
          const isBodyGrey =
            !isGlass &&
            !isRed &&
            !isBlack &&
            !isRim &&
            max - min < 0.12 &&
            max > 0.08;
          if (isBodyGrey && !isHeadlightMesh(mesh)) {
            copy.color.copy(DARK_GREY);
            copy.metalness = 0.22;
            copy.roughness = 0.42;
          }
        }
        copy.needsUpdate = true;
        return copy;
      });
      mesh.material = Array.isArray(mesh.material) ? next : next[0];

      if (isNamed(mesh, "1256700")) headlamp = mesh;
      else if (!headlamp && isNamed(mesh, "lempu")) headlamp = mesh;
    });

    const box = new Box3().setFromObject(root);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = 2.55 / Math.max(size.x, size.y, size.z, 0.0001);
    root.scale.setScalar(scale);
    root.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale,
    );
    root.updateMatrixWorld(true);

    const lamps: Mesh[] = [];
    if (headlamp) {
      const lampBox = new Box3().setFromObject(headlamp);
      if (!lampBox.isEmpty()) {
        const lampSize = lampBox.getSize(new Vector3());
        const lampCenter = lampBox.getCenter(new Vector3());
        const s = root.scale.x || 1;
        const litMat = new MeshBasicMaterial({
          color: HEADLIGHT_YELLOW,
          toneMapped: false,
          side: DoubleSide,
        });
        const geo = new CircleGeometry(1, 20);
        const ovalX = Math.max(lampSize.x * 0.2, 0.12) / s;
        const ovalY = Math.max(lampSize.y * 0.5, 0.06) / s;
        const offsetX = Math.max(lampSize.x * 0.3, 0.2);
        for (const dx of [-offsetX, offsetX]) {
          const pos = lampCenter.clone();
          pos.x += dx;
          pos.z += 0.16;
          root.worldToLocal(pos);
          const lens = new Mesh(geo, litMat);
          lens.position.copy(pos);
          lens.scale.set(ovalX, ovalY, 1);
          lens.visible = false;
          lens.renderOrder = 25;
          lens.frustumCulled = false;
          root.add(lens);
          lamps.push(lens);
        }
      }
    }
    lampsRef.current = lamps;
    return root;
  }, [scene]);

  useLayoutEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = START_ROTATION;
    }
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * CAR_SPIN;

    const y = groupRef.current.rotation.y;
    const camLen = Math.hypot(camera.position.x, camera.position.z) || 1;
    const facingCamera =
      (Math.sin(y) * camera.position.x + Math.cos(y) * camera.position.z) /
        camLen >
      0.12;
    const blinkOn =
      facingCamera && Math.sin(state.clock.elapsedTime * Math.PI * 2.4) > -0.25;

    for (const lamp of lampsRef.current) {
      lamp.visible = blinkOn;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  );
}

export default function CarShowcase3D({
  url,
  lightPreset = 2,
}: {
  url: string;
  lightPreset?: number;
}) {
  useEffect(() => {
    useGLTF.preload(url);
  }, [url]);

  return (
    <Canvas
      camera={{ position: [4.8, 1.85, 5.4], fov: 26 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      resize={{ debounce: 0, offsetSize: true }}
      style={{
        background: "transparent",
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
      onCreated={({ gl, camera, scene }) => {
        scene.background = null;
        scene.environment = null;
        gl.setClearColor(0x000000, 0);
        camera.lookAt(0, 0.62, 0);
      }}
    >
      <SceneLights preset={lightPreset} />
      <Suspense fallback={null}>
        <RotatingCar url={url} />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.35}
          scale={10}
          blur={2.4}
          far={4}
        />
      </Suspense>
    </Canvas>
  );
}
