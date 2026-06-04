/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState, Suspense, useCallback } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  cardTextureSrc?: string;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  cardTextureSrc,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-full">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          alpha: transparent,
          powerPreference: 'high-performance',
          antialias: !isMobile,
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          const canvas = gl.domElement;
          canvas.addEventListener('webglcontextlost', (e) => e.preventDefault());
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} cardTextureSrc={cardTextureSrc} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * Creates a professional ID badge CanvasTexture with the given photo.
 */
function useCardTexture(photoSrc?: string) {
  const [canvasTexture, setCanvasTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (!photoSrc) return;

    const canvas = document.createElement('canvas');
    const W = 512;
    const H = 720;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // ── Background gradient ──
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0c1929');
      bg.addColorStop(1, '#162033');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Subtle top accent line ──
      const accent = ctx.createLinearGradient(0, 0, W, 0);
      accent.addColorStop(0, 'transparent');
      accent.addColorStop(0.3, '#6366f1');
      accent.addColorStop(0.7, '#3b82f6');
      accent.addColorStop(1, 'transparent');
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, W, 4);

      // ── Photo (circular clipped) ──
      const photoSize = 180;
      const photoX = W / 2;
      const photoY = 185;

      // White ring
      ctx.beginPath();
      ctx.arc(photoX, photoY, photoSize / 2 + 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Clip and draw photo
      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX, photoY, photoSize / 2, 0, Math.PI * 2);
      ctx.clip();

      // Draw photo centered and covering the circle
      const srcSize = Math.min(img.width, img.height);
      const sx = (img.width - srcSize) / 2;
      const sy = (img.height - srcSize) / 2;
      ctx.drawImage(img, sx, sy, srcSize, srcSize, photoX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize);
      ctx.restore();

      // ── Name ──
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Inter, system-ui, sans-serif';
      ctx.fillText('SULTHAN RAGHIB', W / 2, photoY + photoSize / 2 + 50);
      ctx.fillText('FILLAH', W / 2, photoY + photoSize / 2 + 85);

      // ── Title ──
      ctx.fillStyle = '#818cf8';
      ctx.font = '500 18px Inter, system-ui, sans-serif';
      ctx.fillText('Full Stack Web Developer', W / 2, photoY + photoSize / 2 + 120);

      // ── Separator ──
      const sepY = photoY + photoSize / 2 + 145;
      const sepGrad = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
      sepGrad.addColorStop(0, 'transparent');
      sepGrad.addColorStop(0.5, 'rgba(99,102,241,0.5)');
      sepGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sepGrad;
      ctx.fillRect(W * 0.15, sepY, W * 0.7, 1);

      // ── Details ──
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '14px Inter, system-ui, sans-serif';
      ctx.fillText('S.Kom • STT Terpadu Nurul Fikri', W / 2, sepY + 30);
      ctx.fillText('Jakarta, Indonesia', W / 2, sepY + 55);

      // ── Bottom accent ──
      ctx.fillStyle = accent;
      ctx.fillRect(0, H - 4, W, 4);

      // Create Three.js texture
      const tex = new THREE.CanvasTexture(canvas);
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      setCanvasTexture(tex);
    };
    img.src = photoSrc;

    return () => {
      if (canvasTexture) canvasTexture.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoSrc]);

  return canvasTexture;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  cardTextureSrc?: string;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, cardTextureSrc }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = useRef(new THREE.Vector3()).current;
  const ang = useRef(new THREE.Vector3()).current;
  const rot = useRef(new THREE.Vector3()).current;
  const dir = useRef(new THREE.Vector3()).current;

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF('/assets/lanyard/card.glb') as any;
  const texture = useTexture('/assets/lanyard/lanyard.png');
  const customCardTexture = useCardTexture(cardTextureSrc);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current || !band.current) return;
    try {
      if (dragged && typeof dragged !== 'boolean') {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
        dir.copy(vec).sub(state.camera.position).normalize();
        vec.add(dir.multiplyScalar(state.camera.position.length()));
        [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
        card.current?.setNextKinematicTranslation({
          x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z
        });
      }
      if (fixed.current) {
        [j1, j2].forEach(ref => {
          if (!ref.current) return;
          const t = ref.current.translation();
          if (!t) return;
          if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3(t.x, t.y, t.z);
          const lerpTarget = new THREE.Vector3(t.x, t.y, t.z);
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(lerpTarget)));
          ref.current.lerped.lerp(lerpTarget, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
        });
        const j3t = j3.current.translation();
        const ft = fixed.current.translation();
        if (j3t && ft && j1.current?.lerped && j2.current?.lerped) {
          curve.points[0].set(j3t.x, j3t.y, j3t.z);
          curve.points[1].copy(j2.current.lerped);
          curve.points[2].copy(j1.current.lerped);
          curve.points[3].set(ft.x, ft.y, ft.z);
          band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
        }
        const ca = card.current.angvel();
        const cr = card.current.rotation();
        if (ca && cr) {
          ang.set(ca.x, ca.y, ca.z);
          rot.set(cr.x, cr.y, cr.z);
          card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
      }
    } catch {
      // Silently handle frame errors during physics initialization
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const handlePointerDown = useCallback((e: any) => {
    e.target.setPointerCapture(e.pointerId);
    if (card.current) {
      const t = card.current.translation();
      if (t) drag(new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(t.x, t.y, t.z)));
    }
  }, []);

  // Determine which texture to use for the card face
  const cardMap = customCardTexture || materials.base.map;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
            onPointerDown={handlePointerDown}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={isMobile ? [1000, 2000] : [1000, 1000]} useMap map={texture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}
