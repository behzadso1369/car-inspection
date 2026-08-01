// @ts-nocheck -- Experimental Three.js viewer is still JavaScript-style code.
"use client"
import { useState, useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, useProgress, Center } from "@react-three/drei";
import * as THREE from "three";

/* ══════════════════════════════════════════════════════════════════════
   1. PART MAP
   The GLB's mesh names come from the original SketchUp material names
   (Portuguese). This table translates them into user-facing groups and
   marks which ones are painted body panels.
   ══════════════════════════════════════════════════════════════════════ */
const PART_MAP = {
  "PINTURA CARRO":  { fa: "رنگ بدنه",          en: "Body Paint",    painted: true,  cat: "body"  },
  "METAL":          { fa: "قطعات فلزی",        en: "Metal Trim",    painted: false, cat: "trim"  },
  "PLASTICO PRETO": { fa: "پلاستیک مشکی",      en: "Black Plastic", painted: false, cat: "trim"  },
  "PLASTICO CINZA": { fa: "پلاستیک خاکستری",   en: "Grey Plastic",  painted: false, cat: "trim"  },
  "ESPELHO":        { fa: "آینه بغل",           en: "Mirrors",       painted: false, cat: "trim"  },
  "PNEU":           { fa: "لاستیک",             en: "Tyres",         painted: false, cat: "wheel" },
  "RODAS":          { fa: "رینگ چرخ",           en: "Rims",          painted: false, cat: "wheel" },
  "VIDRO":          { fa: "شیشه",               en: "Glass",         painted: false, cat: "glass" },
  "VIDRO PRETO":    { fa: "شیشه دودی",          en: "Tinted Glass",  painted: false, cat: "glass" },
  "VIDRO VERMELHO": { fa: "چراغ عقب",           en: "Taillights",    painted: false, cat: "light" },
  "FAROL1":         { fa: "چراغ جلو",           en: "Headlight",     painted: false, cat: "light" },
  "FAROL 2":        { fa: "کاسه چراغ",          en: "Lamp Housing",  painted: false, cat: "light" },
  "FAROL 3":        { fa: "لنز چراغ",           en: "Lamp Lens",     painted: false, cat: "light" },
  "FAROL 4":        { fa: "چراغ ترمز",          en: "Brake Light",   painted: false, cat: "light" },
};

const CATEGORIES = {
  body:  { fa: "بدنه",     icon: "🚗" },
  glass: { fa: "شیشه",     icon: "🪟" },
  light: { fa: "چراغ",     icon: "💡" },
  wheel: { fa: "چرخ",      icon: "🛞" },
  trim:  { fa: "تزیینات",  icon: "⚙️" },
  other: { fa: "سایر",     icon: "📦" },
};

const PAINTS = [
  { hex: "#B31B1B", fa: "قرمز تانگو" },
  { hex: "#0B0F14", fa: "مشکی فانتوم" },
  { hex: "#E8E8E6", fa: "سفید صدفی" },
  { hex: "#1B2A4A", fa: "آبی نیمه‌شب" },
  { hex: "#8E9294", fa: "نقره‌ای فلزی" },
  { hex: "#1D3B2A", fa: "سبز زمردی" },
];

const WIRE = "#3FA9F5";
const HOVER = "#00E5FF";
const SELECT = "#FFD54F";

/* ══════════════════════════════════════════════════════════════════════
   2. THE MODEL
   ══════════════════════════════════════════════════════════════════════ */
function CarModel({ url, hovered, selected, onHover, onSelect, paintOn, paintColor, onReady }) {
  const { scene } = useGLTF(url);
  const rootRef = useRef();

  // Clone once so hot-reloads don't accumulate material overrides
  const model = useMemo(() => scene.clone(true), [scene]);

  // Discover every named group inside the GLB
  const groups = useMemo(() => {
    const found = [];
    model.traverse((o) => {
      if (!o.isMesh) return;
      const raw = (o.name || "UNNAMED").replace(/^EDGES_/, "");
      if (o.name.startsWith("EDGES_")) { o.visible = false; return; } // hide SketchUp edge lines
      const meta = PART_MAP[raw];
      const id = raw;
      let g = found.find((x) => x.id === id);
      if (!g) {
        g = {
          id,
          fa: meta?.fa || `قطعه ${raw}`,
          en: meta?.en || raw,
          painted: meta?.painted ?? false,
          cat: meta?.cat || "other",
          meshes: [],
          tris: 0,
        };
        found.push(g);
      }
      g.meshes.push(o);
      g.tris += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3;
    });
    return found;
  }, [model]);

  useEffect(() => { onReady(groups); }, [groups, onReady]);

  // Normalise position + scale so any GLB lands nicely in frame
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 4.2 / Math.max(size.x, size.y, size.z);
    model.scale.setScalar(scale);
    model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
  }, [model]);

  // Repaint every frame-relevant change
  useEffect(() => {
    groups.forEach((g) => {
      const isHov = hovered === g.id;
      const isSel = selected === g.id;
      const lit = isHov || isSel;
      const isGlass = g.cat === "glass";
      const isLight = g.cat === "light";
      const showPaint = paintOn && g.painted;

      g.meshes.forEach((m) => {
        const orig = m.material;
        const base = new THREE.Color(
          showPaint ? paintColor
          : lit     ? (isSel ? SELECT : HOVER)
          : isGlass ? "#7FD4FF"
          : isLight ? "#FFE9A8"
          :           "#2E6FA8"
        );

        const mat = new THREE.MeshPhysicalMaterial({
          color: base,
          transparent: true,
          opacity: lit ? 0.92 : showPaint ? 0.62 : isGlass ? 0.16 : 0.24,
          roughness: isGlass ? 0.02 : 0.28,
          metalness: isGlass ? 0.0 : 0.65,
          transmission: isGlass && !lit ? 0.7 : 0,
          thickness: 0.4,
          emissive: new THREE.Color(
            isSel ? SELECT : isHov ? HOVER : showPaint ? paintColor : "#082A4A"
          ),
          emissiveIntensity: isSel ? 0.5 : isHov ? 0.6 : showPaint ? 0.12 : 0.28,
          side: THREE.DoubleSide,
          depthWrite: lit,
        });

        m.material = mat;
        if (orig && orig.dispose && orig.userData.__generated) orig.dispose();
        mat.userData.__generated = true;
      });
    });
  }, [groups, hovered, selected, paintOn, paintColor]);

  return (
    <group
      ref={rootRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        const n = (e.object.name || "").replace(/^EDGES_/, "");
        onHover(n);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        const n = (e.object.name || "").replace(/^EDGES_/, "");
        onSelect(n);
      }}
    >
      <primitive object={model} />
    </group>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   3. GYRO CONTROL — tilt the phone to orbit
   ══════════════════════════════════════════════════════════════════════ */
function GyroControls({ enabled }) {
  const { camera } = useThree();
  const tilt = useRef({ beta: 0, gamma: 0 });
  const origin = useRef(null);
  const radius = useRef(7);

  useEffect(() => {
    if (!enabled) { origin.current = null; return; }
    radius.current = camera.position.length();
    const onOrient = (e) => {
      if (e.beta == null || e.gamma == null) return;
      if (!origin.current) origin.current = { beta: e.beta, gamma: e.gamma };
      tilt.current = {
        beta: e.beta - origin.current.beta,
        gamma: e.gamma - origin.current.gamma,
      };
    };
    window.addEventListener("deviceorientation", onOrient, true);
    return () => window.removeEventListener("deviceorientation", onOrient, true);
  }, [enabled, camera]);

  useFrame(() => {
    if (!enabled) return;
    const az = THREE.MathUtils.degToRad(tilt.current.gamma * 2.5);
    const el = THREE.MathUtils.clamp(
      THREE.MathUtils.degToRad(28 + tilt.current.beta * 1.2), 0.15, 1.4
    );
    const r = radius.current;
    camera.position.lerp(
      new THREE.Vector3(
        r * Math.cos(el) * Math.sin(az),
        r * Math.sin(el),
        r * Math.cos(el) * Math.cos(az)
      ),
      0.08
    );
    camera.lookAt(0, 0.7, 0);
  });

  return null;
}

/* ══════════════════════════════════════════════════════════════════════
   4. LOADER
   ══════════════════════════════════════════════════════════════════════ */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        fontFamily: "Vazirmatn, Tahoma, sans-serif", direction: "rtl",
        color: WIRE, textAlign: "center", width: 180,
      }}>
        <div style={{ fontSize: 12, marginBottom: 10 }}>در حال بارگذاری مدل</div>
        <div style={{ height: 3, background: "#0A2540", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: `linear-gradient(90deg, ${WIRE}, ${HOVER})`,
            transition: "width .2s",
          }} />
        </div>
        <div style={{ fontSize: 11, marginTop: 8, color: "#1E5580" }}>{Math.round(progress)}٪</div>
      </div>
    </Html>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   5. APP
   ══════════════════════════════════════════════════════════════════════ */
export default function CarViewer() {
  const modelUrl = "/models/audi_a3_optimized.glb";
  const [groups, setGroups]     = useState([]);
  const [hovered, setHovered]   = useState(null);
  const [selected, setSelected] = useState(null);
  const [paintOn, setPaintOn]   = useState(false);
  const [paintColor, setPaint]  = useState("#B31B1B");
  const [autoRotate, setAuto]   = useState(true);
  const [gyro, setGyro]         = useState(false);
  const [tab, setTab]           = useState("body");

  const handleSelect = (id) => {
    if (!id) return;
    setSelected((p) => (p === id ? null : id));
    setAuto(false);
  };

  const enableGyro = async () => {
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      const res = await DeviceOrientationEvent.requestPermission();
      if (res !== "granted") return;
    }
    setGyro((g) => !g);
    setAuto(false);
  };

  const paintedGroups = groups.filter((g) => g.painted);
  const visibleGroups = groups.filter((g) => g.cat === tab);
  const activeCats = [...new Set(groups.map((g) => g.cat))];
  const sel = groups.find((g) => g.id === selected);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "radial-gradient(ellipse at 45% 35%, #071A2E 0%, #03080F 72%)",
      fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
      direction: "rtl", color: "#CFE6FF",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>

      {/* ── HEADER ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, padding: "10px 16px", flexShrink: 0, zIndex: 20,
        background: "rgba(3,8,18,.82)", borderBottom: "1px solid #0C2440",
        backdropFilter: "blur(14px)",
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: .3, color: "#E6F2FF" }}>
            Audi A3 · نمای فنی
          </div>
          <div style={{ fontSize: 10, color: "#2A5880", marginTop: 1 }}>
            {groups.length} گروه قطعه · {paintedGroups.length} گروه رنگ‌شده
          </div>
        </div>

        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          <Btn active={paintOn} onClick={() => setPaintOn((p) => !p)}
               activeBg="linear-gradient(135deg,#7A1010,#B31B1B)" activeBorder="#B31B1B">
            🎨 {paintOn ? "رنگ روشن" : "نمایش رنگ"}
          </Btn>
          <Btn active={autoRotate} onClick={() => setAuto((p) => !p)}>
            {autoRotate ? "⏸ توقف" : "▶ چرخش"}
          </Btn>
          <Btn active={gyro} onClick={enableGyro}
               activeBg="linear-gradient(135deg,#0A4A6E,#0E7FA8)" activeBorder="#0E7FA8">
            📱 ژیروسکوپ
          </Btn>
        </div>
      </header>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>

        {/* Canvas */}
        <div style={{ flex: 1, position: "relative" }}>
          <Canvas
            camera={{ position: [4.5, 2.2, 6], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
            style={{ background: "transparent" }}
            onPointerMissed={() => setSelected(null)}
          >
            <ambientLight intensity={0.4} color="#2B5FA8" />
            <directionalLight position={[6, 10, 6]}  intensity={1.5} color="#B9D8FF" />
            <directionalLight position={[-6, 4, -5]} intensity={0.7} color="#0B4B8C" />
            <pointLight position={[0, 6, 0]}   intensity={1.1} color="#1E7FD4" />
            <pointLight position={[-4, .6, 0]} intensity={.6} color="#0A44CC" distance={10} />
            <pointLight position={[ 4, .6, 0]} intensity={.6} color="#062A88" distance={10} />

            <Suspense fallback={<Loader />}>
              <CarModel
                url={modelUrl}
                hovered={hovered}
                selected={selected}
                onHover={setHovered}
                onSelect={handleSelect}
                paintOn={paintOn}
                paintColor={paintColor}
                onReady={setGroups}
              />
            </Suspense>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <planeGeometry args={[24, 24]} />
              <meshBasicMaterial color="#040C18" transparent opacity={0.85} />
            </mesh>
            <gridHelper args={[18, 36, "#0E3560", "#071B30"]} position={[0, 0, 0]} />

            <OrbitControls
              enabled={!gyro}
              enableDamping dampingFactor={0.06}
              rotateSpeed={0.6} zoomSpeed={0.8}
              minDistance={3} maxDistance={14}
              maxPolarAngle={Math.PI / 2 - 0.03}
              target={[0, 0.7, 0]}
              autoRotate={autoRotate} autoRotateSpeed={0.5}
              touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
            />
            <GyroControls enabled={gyro} />
          </Canvas>

          {/* Hover readout */}
          {hovered && !selected && (
            <div style={{
              position: "absolute", top: 14, right: 14,
              background: "rgba(3,8,18,.9)", border: `1px solid ${HOVER}`,
              borderRadius: 9, padding: "7px 13px", fontSize: 12, color: HOVER,
              backdropFilter: "blur(10px)", pointerEvents: "none",
            }}>
              {groups.find((g) => g.id === hovered)?.fa ?? hovered}
            </div>
          )}

          {/* Selected card */}
          {sel && (
            <div style={{
              position: "absolute", top: 14, left: 14, minWidth: 200,
              background: "rgba(3,8,18,.93)", border: `1px solid ${SELECT}`,
              borderRadius: 13, padding: "14px 16px",
              boxShadow: `0 0 30px ${SELECT}28`, backdropFilter: "blur(12px)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: SELECT }}>{sel.fa}</div>
              <div style={{ fontSize: 10, color: "#2A5880", margin: "3px 0 11px" }}>{sel.en}</div>

              <div style={{
                padding: "7px 11px", borderRadius: 8, fontSize: 11,
                display: "flex", alignItems: "center", gap: 8,
                background: sel.painted ? "rgba(179,27,27,.18)" : "rgba(10,80,160,.18)",
                color: sel.painted ? "#FFB4B4" : "#8CC8FF",
              }}>
                {sel.painted ? (
                  <>
                    <span style={{
                      width: 12, height: 12, borderRadius: "50%", flexShrink: 0,
                      background: paintColor, boxShadow: `0 0 9px ${paintColor}`,
                    }} />
                    این قطعه رنگ‌کاری دارد
                  </>
                ) : "⚙️ بدون رنگ‌کاری"}
              </div>

              <div style={{ fontSize: 10, color: "#1E4A70", marginTop: 9 }}>
                {sel.tris.toLocaleString("fa-IR")} مثلث
              </div>

              <button onClick={() => setSelected(null)} style={{
                marginTop: 10, width: "100%", padding: "5px 0",
                background: "rgba(6,22,50,.6)", border: "1px solid #0C2440",
                color: "#2A5880", borderRadius: 7, cursor: "pointer",
                fontSize: 10, fontFamily: "inherit",
              }}>× بستن</button>
            </div>
          )}

          {/* Hint */}
          <div style={{
            position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
            background: "rgba(3,8,18,.75)", border: "1px solid #0C2440",
            borderRadius: 20, padding: "5px 18px", fontSize: 10, color: "#2A5880",
            backdropFilter: "blur(8px)", pointerEvents: "none", whiteSpace: "nowrap",
          }}>
            درگ کن تا بچرخد · اسکرول برای زوم · روی قطعه بزن
          </div>
        </div>

        {/* ── SIDE PANEL ── */}
        <aside style={{
          width: 232, flexShrink: 0, display: "flex", flexDirection: "column",
          background: "rgba(2,6,14,.92)", borderRight: "1px solid #0A1E36",
        }}>
          {paintOn && (
            <div style={{ padding: "10px 11px", borderBottom: "1px solid #0A1E36" }}>
              <div style={{ fontSize: 10, color: "#2A5880", marginBottom: 7 }}>رنگ بدنه</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {PAINTS.map((c) => (
                  <button key={c.hex} title={c.fa} onClick={() => setPaint(c.hex)}
                    style={{
                      width: 25, height: 25, borderRadius: "50%", background: c.hex,
                      border: `2px solid ${paintColor === c.hex ? SELECT : "#0C2440"}`,
                      cursor: "pointer", transition: "transform .15s",
                      transform: paintColor === c.hex ? "scale(1.22)" : "scale(1)",
                      boxShadow: paintColor === c.hex ? `0 0 10px ${c.hex}` : "none",
                    }} />
                ))}
              </div>
              <div style={{ marginTop: 7, fontSize: 10, color: "#4A80B0" }}>
                {PAINTS.find((c) => c.hex === paintColor)?.fa}
              </div>
            </div>
          )}

          <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid #0A1E36" }}>
            {activeCats.map((c) => (
              <button key={c} onClick={() => setTab(c)} style={{
                flex: "0 0 auto", padding: "9px 11px", cursor: "pointer",
                background: tab === c ? "rgba(8,52,110,.5)" : "transparent",
                border: "none", fontFamily: "inherit", fontSize: 10,
                borderBottom: `2px solid ${tab === c ? WIRE : "transparent"}`,
                color: tab === c ? WIRE : "#1E4466", whiteSpace: "nowrap",
              }}>
                {CATEGORIES[c].icon} {CATEGORIES[c].fa}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px 6px" }}>
            {visibleGroups.map((g) => {
              const isSel = selected === g.id;
              const isHov = hovered === g.id;
              return (
                <div key={g.id}
                  onMouseEnter={() => setHovered(g.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelect(g.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 9,
                    padding: "9px 10px", marginBottom: 3, borderRadius: 8, cursor: "pointer",
                    background: isSel ? "rgba(255,213,79,.1)" : isHov ? "rgba(0,90,180,.2)" : "rgba(3,11,28,.5)",
                    border: `1px solid ${isSel ? SELECT : isHov ? "#1A5A8A" : "#07142A"}`,
                    transition: "all .12s",
                  }}>
                  <span style={{
                    width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
                    background: g.painted ? paintColor : "#12324F",
                    border: g.painted ? "none" : `1px solid ${WIRE}`,
                    boxShadow: g.painted ? `0 0 6px ${paintColor}` : "none",
                  }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: isSel ? SELECT : "#8AB8D8" }}>{g.fa}</div>
                    <div style={{ fontSize: 9, color: "#1A3A5C", marginTop: 1 }}>{g.en}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "9px 12px", borderTop: "1px solid #0A1E36", fontSize: 9, color: "#1A3A5C" }}>
            <Legend color="#B31B1B" label="قطعات رنگ‌دار" />
            <Legend color="#12324F" border={WIRE} label="قطعات بدون رنگ" />
            <Legend color={SELECT} label="انتخاب‌شده" />
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ── small UI helpers ── */
function Btn({ children, active, onClick, activeBg, activeBorder }) {
  return (
    <button onClick={onClick} style={{
      background: active ? (activeBg || "rgba(8,52,110,.6)") : "rgba(8,22,46,.7)",
      border: `1px solid ${active ? (activeBorder || WIRE) : "#0C2440"}`,
      color: active ? "#fff" : "#4A80B0",
      borderRadius: 8, padding: "6px 13px", cursor: "pointer",
      fontSize: 11, fontFamily: "inherit", transition: "all .18s", whiteSpace: "nowrap",
    }}>{children}</button>
  );
}

function Legend({ color, border, label }) {
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 3 }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", background: color,
        border: border ? `1px solid ${border}` : "none", display: "inline-block",
      }} />
      {label}
    </div>
  );
}

useGLTF.preload("/models/audi_a3_optimized.glb");