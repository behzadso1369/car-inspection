"use client"
import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

// ─── Car Parts Definition ─────────────────────────────────────────────────────
const CAR_PARTS = [
  {
    id: "body",
    label: "بدنه اصلی",
    labelEn: "Main Body",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#e53935",
    position: [0, 0.18, 0],
    geometry: "body",
  },
  {
    id: "hood",
    label: "کاپوت",
    labelEn: "Hood",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#e53935",
    position: [0, 0.52, 1.35],
    geometry: "hood",
  },
  {
    id: "roof",
    label: "سقف",
    labelEn: "Roof",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#e53935",
    position: [0, 0.88, 0],
    geometry: "roof",
  },
  {
    id: "trunk",
    label: "صندوق عقب",
    labelEn: "Trunk",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#e53935",
    position: [0, 0.42, -1.38],
    geometry: "trunk",
  },
  {
    id: "door_fl",
    label: "در جلو چپ",
    labelEn: "Front-Left Door",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#e53935",
    position: [-0.72, 0.25, 0.38],
    geometry: "door",
  },
  {
    id: "door_fr",
    label: "در جلو راست",
    labelEn: "Front-Right Door",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#e53935",
    position: [0.72, 0.25, 0.38],
    geometry: "door",
  },
  {
    id: "door_rl",
    label: "در عقب چپ",
    labelEn: "Rear-Left Door",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#e53935",
    position: [-0.72, 0.25, -0.52],
    geometry: "door",
  },
  {
    id: "door_rr",
    label: "در عقب راست",
    labelEn: "Rear-Right Door",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#e53935",
    position: [0.72, 0.25, -0.52],
    geometry: "door",
  },
  {
    id: "bumper_f",
    label: "سپر جلو",
    labelEn: "Front Bumper",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#ff7043",
    position: [0, 0.05, 1.78],
    geometry: "bumper",
  },
  {
    id: "bumper_r",
    label: "سپر عقب",
    labelEn: "Rear Bumper",
    hasPaint: true,
    color: "#00aaff",
    paintColor: "#ff7043",
    position: [0, 0.05, -1.78],
    geometry: "bumper",
  },
  {
    id: "windshield",
    label: "شیشه جلو",
    labelEn: "Windshield",
    hasPaint: false,
    color: "#88ccff",
    position: [0, 0.66, 0.82],
    geometry: "windshield",
  },
  {
    id: "rear_glass",
    label: "شیشه عقب",
    labelEn: "Rear Glass",
    hasPaint: false,
    color: "#88ccff",
    position: [0, 0.66, -0.82],
    geometry: "rear_glass",
  },
  {
    id: "wheel_fl",
    label: "چرخ جلو چپ",
    labelEn: "Front-Left Wheel",
    hasPaint: false,
    color: "#334455",
    position: [-0.88, -0.22, 1.1],
    geometry: "wheel",
  },
  {
    id: "wheel_fr",
    label: "چرخ جلو راست",
    labelEn: "Front-Right Wheel",
    hasPaint: false,
    color: "#334455",
    position: [0.88, -0.22, 1.1],
    geometry: "wheel",
  },
  {
    id: "wheel_rl",
    label: "چرخ عقب چپ",
    labelEn: "Rear-Left Wheel",
    hasPaint: false,
    color: "#334455",
    position: [-0.88, -0.22, -1.1],
    geometry: "wheel",
  },
  {
    id: "wheel_rr",
    label: "چرخ عقب راست",
    labelEn: "Rear-Right Wheel",
    hasPaint: false,
    color: "#334455",
    position: [0.88, -0.22, -1.1],
    geometry: "wheel",
  },
  {
    id: "headlight_l",
    label: "چراغ جلو چپ",
    labelEn: "Left Headlight",
    hasPaint: false,
    color: "#ffffaa",
    position: [-0.6, 0.18, 1.76],
    geometry: "headlight",
  },
  {
    id: "headlight_r",
    label: "چراغ جلو راست",
    labelEn: "Right Headlight",
    hasPaint: false,
    color: "#ffffaa",
    position: [0.6, 0.18, 1.76],
    geometry: "headlight",
  },
  {
    id: "taillight_l",
    label: "چراغ عقب چپ",
    labelEn: "Left Taillight",
    hasPaint: false,
    color: "#ff2200",
    position: [-0.6, 0.25, -1.76],
    geometry: "taillight",
  },
  {
    id: "taillight_r",
    label: "چراغ عقب راست",
    labelEn: "Right Taillight",
    hasPaint: false,
    color: "#ff2200",
    position: [0.6, 0.25, -1.76],
    geometry: "taillight",
  },
  {
    id: "engine",
    label: "موتور",
    labelEn: "Engine",
    hasPaint: false,
    color: "#aaaaaa",
    position: [0, 0.1, 1.1],
    geometry: "engine",
  },
  {
    id: "chassis",
    label: "شاسی",
    labelEn: "Chassis",
    hasPaint: false,
    color: "#556677",
    position: [0, -0.35, 0],
    geometry: "chassis",
  },
];

// ─── Geometry builder ─────────────────────────────────────────────────────────
function getGeometry(type) {
  switch (type) {
    case "body":
      return <boxGeometry args={[1.36, 0.52, 3.4]} />;
    case "hood":
      return <boxGeometry args={[1.3, 0.07, 1.0]} />;
    case "roof":
      return <boxGeometry args={[1.2, 0.18, 1.5]} />;
    case "trunk":
      return <boxGeometry args={[1.3, 0.07, 0.7]} />;
    case "door":
      return <boxGeometry args={[0.06, 0.46, 0.82]} />;
    case "bumper":
      return <boxGeometry args={[1.3, 0.22, 0.18]} />;
    case "windshield":
      return <boxGeometry args={[1.14, 0.38, 0.06]} />;
    case "rear_glass":
      return <boxGeometry args={[1.14, 0.32, 0.06]} />;
    case "wheel":
      return <cylinderGeometry args={[0.28, 0.28, 0.22, 20]} />;
    case "headlight":
      return <boxGeometry args={[0.3, 0.1, 0.06]} />;
    case "taillight":
      return <boxGeometry args={[0.28, 0.1, 0.06]} />;
    case "engine":
      return <boxGeometry args={[0.9, 0.36, 0.7]} />;
    case "chassis":
      return <boxGeometry args={[1.2, 0.08, 3.2]} />;
    default:
      return <boxGeometry args={[0.5, 0.5, 0.5]} />;
  }
}

// ─── Single Part Mesh ─────────────────────────────────────────────────────────
function CarPart({ part, highlighted, selected, onClick, showPaint }) {
  const meshRef = useRef();
  const isWheel = part.geometry === "wheel";

  const isHighlighted = highlighted === part.id;
  const isSelected = selected === part.id;
  const paintVisible = showPaint && part.hasPaint;

  useFrame((_, delta) => {
    if (meshRef.current && (isHighlighted || isSelected)) {
      meshRef.current.rotation.y += delta * 0.3;
    } else if (meshRef.current && isWheel) {
      meshRef.current.rotation.x += delta * 1.2;
    }
  });

  const opacity = isHighlighted || isSelected ? 0.85 : 0.28;
  const emissiveIntensity = isHighlighted ? 0.7 : isSelected ? 0.5 : 0.1;

  const baseColor = paintVisible
    ? part.paintColor || part.color
    : isHighlighted
    ? "#ffffff"
    : part.color;

  return (
    <group position={part.position} rotation={isWheel ? [Math.PI / 2, 0, 0] : [0, 0, 0]}>
      <mesh
        ref={isWheel ? null : meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(part.id);
        }}
        castShadow
      >
        {getGeometry(part.geometry)}
        <meshPhysicalMaterial
          color={baseColor}
          transparent
          opacity={opacity}
          roughness={0.15}
          metalness={0.6}
          transmission={isHighlighted || isSelected ? 0 : 0.4}
          thickness={0.5}
          emissive={isHighlighted ? "#00ffff" : isSelected ? "#ffaa00" : paintVisible ? part.paintColor || "#000" : "#001133"}
          emissiveIntensity={emissiveIntensity}
          side={THREE.DoubleSide}
          depthWrite={false}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay for blueprint effect */}
      {!isHighlighted && !isSelected && (
        <mesh>
          {getGeometry(part.geometry)}
          <meshBasicMaterial
            color={paintVisible ? part.paintColor : "#00aaff"}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      )}

      {/* Paint highlight ring */}
      {paintVisible && !isHighlighted && !isSelected && (
        <mesh scale={[1.02, 1.02, 1.02]}>
          {getGeometry(part.geometry)}
          <meshBasicMaterial
            color={part.paintColor}
            wireframe={false}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Glow for highlighted */}
      {(isHighlighted || isSelected) && (
        <mesh scale={[1.06, 1.06, 1.06]}>
          {getGeometry(part.geometry)}
          <meshBasicMaterial
            color={isHighlighted ? "#00ffff" : "#ffaa00"}
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}

// ─── Floating label in 3D ─────────────────────────────────────────────────────
function PartLabel({ part }) {
  return (
    <group position={[part.position[0], part.position[1] + 0.55, part.position[2]]}>
      <Html center distanceFactor={6} occlude>
        <div style={{
          background: "rgba(0,20,60,0.85)",
          border: "1px solid #00ffff",
          borderRadius: 6,
          padding: "3px 10px",
          color: "#00ffff",
          fontSize: 11,
          fontFamily: "Vazirmatn, Tahoma, sans-serif",
          whiteSpace: "nowrap",
          boxShadow: "0 0 12px #00ffff44",
          userSelect: "none",
          direction: "rtl",
        }}>
          {part.label}
        </div>
      </Html>
    </group>
  );
}

// ─── Car Assembly ─────────────────────────────────────────────────────────────
function Car({ highlighted, selected, onSelect, showPaint, showLabels }) {
  return (
    <group>
      {CAR_PARTS.map((part) => (
        <CarPart
          key={part.id}
          part={part}
          highlighted={highlighted}
          selected={selected}
          onClick={onSelect}
          showPaint={showPaint}
        />
      ))}
      {showLabels && selected && CAR_PARTS.filter(p => p.id === selected).map(part => (
        <PartLabel key={part.id + "_lbl"} part={part} />
      ))}
    </group>
  );
}

// ─── Grid floor ───────────────────────────────────────────────────────────────
function GridFloor() {
  return (
    <gridHelper
      args={[12, 24, "#003366", "#001a33"]}
      position={[0, -0.65, 0]}
    />
  );
}

// ─── Paint parts list ─────────────────────────────────────────────────────────
const paintedParts = CAR_PARTS.filter((p) => p.hasPaint);
const unpaintedParts = CAR_PARTS.filter((p) => !p.hasPaint);

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [highlighted, setHighlighted] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showPaint, setShowPaint] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [activeTab, setActiveTab] = useState("painted");

  const handleSelect = (id) => {
    setSelected((prev) => (prev === id ? null : id));
    setHighlighted(null);
  };

  const selectedPart = CAR_PARTS.find((p) => p.id === selected);

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "linear-gradient(135deg, #020b1a 0%, #041833 60%, #020b1a 100%)",
      fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
      direction: "rtl",
      color: "#cce6ff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "10px 20px",
        borderBottom: "1px solid #003366",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0,10,30,0.7)",
        backdropFilter: "blur(10px)",
        zIndex: 10,
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#00ccff", letterSpacing: 1 }}>
            🚗 ویوِر سه‌بعدی خودرو
          </div>
          <div style={{ fontSize: 11, color: "#4488aa", marginTop: 2 }}>
            Iranian Car Transparent Viewer
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setShowPaint(p => !p)}
            style={{
              background: showPaint ? "linear-gradient(135deg,#e53935,#ff7043)" : "rgba(0,50,100,0.6)",
              border: `1px solid ${showPaint ? "#ff7043" : "#005588"}`,
              color: showPaint ? "#fff" : "#88ccff",
              borderRadius: 8,
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
              transition: "all .2s",
            }}
          >
            {showPaint ? "🎨 رنگ‌ها فعال" : "🎨 نمایش رنگ"}
          </button>
          <button
            onClick={() => setShowLabels(p => !p)}
            style={{
              background: showLabels ? "rgba(0,80,150,0.6)" : "rgba(0,30,60,0.4)",
              border: "1px solid #005588",
              color: "#88ccff",
              borderRadius: 8,
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
            }}
          >
            {showLabels ? "🏷️ برچسب‌ها" : "🏷️ بدون برچسب"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        {/* 3D Canvas */}
        <div style={{ flex: 1, position: "relative" }}>
          <Canvas
            camera={{ position: [3.5, 2, 5], fov: 45 }}
            shadows
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.4} color="#3366aa" />
            <directionalLight position={[5, 8, 5]} intensity={1.2} color="#88ccff" castShadow />
            <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#0044aa" />
            <pointLight position={[0, 4, 0]} intensity={0.8} color="#00aaff" />

            <Suspense fallback={null}>
              <Car
                highlighted={highlighted}
                selected={selected}
                onSelect={handleSelect}
                showPaint={showPaint}
                showLabels={showLabels}
              />
            </Suspense>

            <GridFloor />

            <OrbitControls
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.7}
              zoomSpeed={0.8}
              minDistance={2.5}
              maxDistance={12}
              autoRotate
              autoRotateSpeed={0.4}
            />
          </Canvas>

          {/* Click hint */}
          <div style={{
            position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,10,30,0.7)", border: "1px solid #003366",
            borderRadius: 20, padding: "5px 16px", fontSize: 11, color: "#4488aa",
            pointerEvents: "none", backdropFilter: "blur(6px)",
          }}>
            🖱️ بچرخان • 🔍 زوم • 👆 روی قطعه کلیک کن
          </div>

          {/* Selected part popup */}
          {selectedPart && (
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: "rgba(0,10,30,0.9)",
              border: `1px solid ${selectedPart.hasPaint ? "#ffaa00" : "#00ccff"}`,
              borderRadius: 12, padding: "12px 16px",
              boxShadow: `0 0 24px ${selectedPart.hasPaint ? "#ffaa0044" : "#00ccff44"}`,
              backdropFilter: "blur(10px)",
              minWidth: 180,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: selectedPart.hasPaint ? "#ffaa00" : "#00ccff", marginBottom: 6 }}>
                {selectedPart.label}
              </div>
              <div style={{ fontSize: 11, color: "#7799bb" }}>
                {selectedPart.labelEn}
              </div>
              <div style={{
                marginTop: 10, padding: "6px 10px",
                background: selectedPart.hasPaint ? "rgba(229,57,53,0.15)" : "rgba(0,100,150,0.15)",
                borderRadius: 8, fontSize: 12,
                color: selectedPart.hasPaint ? "#ffccaa" : "#aaddff",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                {selectedPart.hasPaint ? (
                  <>
                    <span style={{
                      display: "inline-block", width: 12, height: 12,
                      borderRadius: "50%", background: selectedPart.paintColor,
                      boxShadow: `0 0 6px ${selectedPart.paintColor}`,
                    }} />
                    دارای رنگ‌کاری
                  </>
                ) : (
                  <>⚙️ بدون رنگ‌کاری</>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  marginTop: 8, width: "100%",
                  background: "rgba(0,40,80,0.5)", border: "1px solid #003366",
                  color: "#4488aa", borderRadius: 6, padding: "4px 0",
                  cursor: "pointer", fontSize: 11, fontFamily: "inherit",
                }}
              >
                × بستن
              </button>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div style={{
          width: 240, background: "rgba(0,8,24,0.85)",
          borderRight: "1px solid #002244",
          display: "flex", flexDirection: "column",
          overflow: "hidden", flexShrink: 0,
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #002244" }}>
            {[
              { key: "painted", label: `🎨 رنگ‌دار (${paintedParts.length})` },
              { key: "other", label: `⚙️ سایر (${unpaintedParts.length})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1, padding: "10px 4px",
                  background: activeTab === tab.key ? "rgba(0,60,120,0.6)" : "transparent",
                  border: "none",
                  borderBottom: activeTab === tab.key ? "2px solid #00ccff" : "2px solid transparent",
                  color: activeTab === tab.key ? "#00ccff" : "#446688",
                  fontSize: 11, cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Part List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 6px" }}>
            {(activeTab === "painted" ? paintedParts : unpaintedParts).map((part) => {
              const isActive = selected === part.id;
              return (
                <div
                  key={part.id}
                  onMouseEnter={() => setHighlighted(part.id)}
                  onMouseLeave={() => setHighlighted(null)}
                  onClick={() => handleSelect(part.id)}
                  style={{
                    padding: "8px 10px",
                    marginBottom: 4,
                    borderRadius: 8,
                    cursor: "pointer",
                    background: isActive
                      ? "rgba(255,170,0,0.15)"
                      : highlighted === part.id
                      ? "rgba(0,100,200,0.25)"
                      : "rgba(0,20,50,0.4)",
                    border: `1px solid ${isActive ? "#ffaa00" : highlighted === part.id ? "#0088cc" : "#001a3a"}`,
                    transition: "all .15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {part.hasPaint && (
                    <span style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: part.paintColor,
                      boxShadow: `0 0 4px ${part.paintColor}`,
                      flexShrink: 0,
                    }} />
                  )}
                  <div>
                    <div style={{ fontSize: 12, color: isActive ? "#ffcc66" : "#99ccee" }}>
                      {part.label}
                    </div>
                    <div style={{ fontSize: 10, color: "#334466", marginTop: 1 }}>
                      {part.labelEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{
            padding: "10px 12px",
            borderTop: "1px solid #002244",
            fontSize: 10, color: "#334466",
          }}>
            <div style={{ marginBottom: 4, color: "#446688", fontWeight: 600 }}>راهنما</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e53935", display: "inline-block" }} />
              قطعات دارای رنگ
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00aaff", display: "inline-block" }} />
              قطعات بدون رنگ
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffaa00", display: "inline-block" }} />
              قطعه انتخاب‌شده
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}