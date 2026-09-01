import React, {useEffect, useRef} from 'react';
import type * as Three from 'three';

import styles from './ProjectGalaxy.module.css';

export type GalaxyProject = {
  title: string;
  label: string;
  category: string;
  signal: string;
  accent: string;
};

type ProjectGalaxyProps = {
  projects: GalaxyProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function ProjectGalaxy({
  projects,
  activeIndex,
  onSelect,
}: ProjectGalaxyProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    let disposed = false;
    let disposeScene = () => {};

    import('three').then((THREE) => {
      if (disposed) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setClearColor(0xffffff, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 10.4);

      const constellation = new THREE.Group();
      scene.add(constellation);

      scene.add(new THREE.AmbientLight(0xffffff, 1.8));

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(2.8, 4.2, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 1.1);
      fillLight.position.set(-4, -2, 3);
      scene.add(fillLight);

      const meshes: Three.Mesh[] = [];
      const rings: Three.Mesh[] = [];
      const projectPositions: Three.Vector3[] = [];

      const coreGeometry = new THREE.IcosahedronGeometry(0.78, 1);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.28,
        transparent: true,
        opacity: 0.72,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      const coreWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(coreGeometry),
        new THREE.LineBasicMaterial({
          color: 0x6552ff,
          transparent: true,
          opacity: 0.24,
        }),
      );
      constellation.add(core);
      constellation.add(coreWire);

      projects.forEach((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2 + index * 0.08;
        const radius = 2.62 + (index % 3) * 0.24;
        const y = (index - (projects.length - 1) / 2) * 0.26;
        const z = Math.sin(index * 0.8) * 0.34;

        const geometry =
          index % 4 === 0
            ? new THREE.IcosahedronGeometry(0.48, 1)
            : index % 4 === 1
              ? new THREE.BoxGeometry(0.72, 0.72, 0.72, 4, 4, 4)
              : index % 4 === 2
                ? new THREE.OctahedronGeometry(0.52, 1)
                : new THREE.DodecahedronGeometry(0.5, 0);

        const material = new THREE.MeshStandardMaterial({
          color: project.accent,
          emissive: project.accent,
          emissiveIntensity: 0.06,
          metalness: 0.22,
          roughness: 0.38,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius + z);
        mesh.rotation.set(index * 0.3, index * 0.24, index * 0.12);
        mesh.userData.projectIndex = index;

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.72, 0.012, 8, 68),
          new THREE.MeshBasicMaterial({
            color: project.accent,
            transparent: true,
            opacity: 0.42,
          }),
        );
        ring.position.copy(mesh.position);
        ring.rotation.set(Math.PI / 2.4, 0.2, angle);

        constellation.add(mesh);
        constellation.add(ring);
        meshes.push(mesh);
        rings.push(ring);
        projectPositions.push(mesh.position.clone());
      });

      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x0e1118,
        transparent: true,
        opacity: 0.18,
      });
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints([
        ...projectPositions,
        projectPositions[0],
      ]);
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      constellation.add(orbitLine);

      const spokeMaterial = new THREE.LineBasicMaterial({
        color: 0x6552ff,
        transparent: true,
        opacity: 0.15,
      });
      projectPositions.forEach((position) => {
        const spoke = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), position]),
          spokeMaterial,
        );
        constellation.add(spoke);
      });

      const particlePositions: number[] = [];
      for (let index = 0; index < 90; index += 1) {
        const angle = index * 1.73;
        const radius = 2.2 + (index % 11) * 0.22;
        particlePositions.push(
          Math.cos(angle) * radius,
          Math.sin(index * 0.62) * 1.9,
          Math.sin(angle) * radius,
        );
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(particlePositions, 3),
      );
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: 0x6552ff,
          size: 0.035,
          transparent: true,
          opacity: 0.45,
        }),
      );
      constellation.add(particles);

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2(10, 10);
      const pointerTilt = {x: 0, y: 0};
      let scrollProgress = 0;
      let animationFrame = 0;
      let tick = 0;

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const updateScrollProgress = () => {
        const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        scrollProgress = window.scrollY / scrollable;
      };

      const updatePointer = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        pointer.set(x * 2 - 1, -(y * 2 - 1));
        pointerTilt.x = pointer.x;
        pointerTilt.y = pointer.y;

        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(meshes)[0];

        if (hit) {
          const nextIndex = hit.object.userData.projectIndex as number;

          if (Number.isInteger(nextIndex) && nextIndex !== activeIndexRef.current) {
            onSelectRef.current(nextIndex);
          }
        }
      };

      const clearPointer = () => {
        pointer.set(10, 10);
        pointerTilt.x = 0;
        pointerTilt.y = 0;
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      window.addEventListener('scroll', updateScrollProgress, {passive: true});
      canvas.addEventListener('pointermove', updatePointer);
      canvas.addEventListener('pointerleave', clearPointer);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const animate = () => {
        tick += reduceMotion ? 0 : 0.012;

        const targetY = scrollProgress * Math.PI * 1.65 + pointerTilt.x * 0.28;
        const targetX = pointerTilt.y * 0.16;
        constellation.rotation.y += (targetY - constellation.rotation.y) * 0.055;
        constellation.rotation.x += (targetX - constellation.rotation.x) * 0.055;
        core.rotation.x += reduceMotion ? 0 : 0.003;
        core.rotation.y -= reduceMotion ? 0 : 0.004;
        coreWire.rotation.copy(core.rotation);

        meshes.forEach((mesh, index) => {
          const selected = index === activeIndexRef.current;
          const targetScale = selected ? 1.38 : 1;
          const scale = mesh.scale.x + (targetScale - mesh.scale.x) * 0.08;
          mesh.scale.setScalar(scale);

          if (!reduceMotion) {
            mesh.rotation.x += 0.004 + index * 0.0004;
            mesh.rotation.y += 0.007 + index * 0.0002;
            mesh.position.y =
              projectPositions[index].y + Math.sin(tick + index * 0.7) * (selected ? 0.06 : 0.035);
            rings[index].position.y = mesh.position.y;
            rings[index].rotation.z += 0.004;
          }
        });

        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(animate);
      };

      resize();
      updateScrollProgress();
      animate();

      disposeScene = () => {
        window.cancelAnimationFrame(animationFrame);
        resizeObserver.disconnect();
        window.removeEventListener('scroll', updateScrollProgress);
        canvas.removeEventListener('pointermove', updatePointer);
        canvas.removeEventListener('pointerleave', clearPointer);

        scene.traverse((object) => {
          if (
            object instanceof THREE.Mesh ||
            object instanceof THREE.Line ||
            object instanceof THREE.Points
          ) {
            object.geometry.dispose();
          }
        });

        [
          orbitMaterial,
          spokeMaterial,
          coreMaterial,
          coreWire.material,
          ...meshes.map((mesh) => mesh.material),
          ...rings.map((ring) => ring.material),
          particles.material,
        ].forEach((material) => {
          if (Array.isArray(material)) {
            material.forEach((entry) => entry.dispose());
          } else {
            material.dispose();
          }
        });

        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      disposeScene();
    };
  }, [projects]);

  return (
    <div className={styles.galaxy} data-active-title={projects[activeIndex]?.title}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        data-testid="project-galaxy-canvas"
        aria-label="Interactive 3D project map"
      />
      <div className={styles.nodeLabels} aria-label="Project nodes">
        {projects.slice(0, 10).map((project, index) => (
          <button
            key={project.title}
            type="button"
            className={`${styles.nodeLabel} ${
              index === activeIndex ? styles.nodeLabelActive : ''
            }`}
            style={{'--node-accent': project.accent} as React.CSSProperties}
            onClick={() => onSelect(index)}
            onFocus={() => onSelect(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{project.title}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
