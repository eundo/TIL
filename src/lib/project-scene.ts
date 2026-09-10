import * as THREE from "three";
import type { Project } from "./content";

export type ProjectScene = {
  select: (index: number) => void;
  destroy: () => void;
};

export async function createProjectScene(
  canvas: HTMLCanvasElement,
  projects: Project[],
  onSelect: (index: number) => void,
): Promise<ProjectScene> {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const world = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.z = 11;
  const loader = new THREE.TextureLoader();
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];
  const screens: THREE.Group[] = [];
  try {
    const results = await Promise.allSettled(
      projects.map(async (project, index) => {
        if (!project.cover) return;
        const texture = await loader.loadAsync(project.cover.src);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(
          renderer.capabilities.getMaxAnisotropy(),
          4,
        );
        textures.push(texture);
        const height = 3.8;
        // Long page captures use their first phone-sized viewport in the stage.
        const viewportHeight = Math.min(
          project.cover.height,
          (project.cover.width * 844) / 390,
        );
        texture.repeat.y = viewportHeight / project.cover.height;
        texture.offset.y = 1 - texture.repeat.y;
        const width = (height * project.cover.width) / viewportHeight;
        const group = new THREE.Group();
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const frameMaterial = new THREE.MeshBasicMaterial({ color: 0x222328 });
        materials.push(material, frameMaterial);
        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(width + 0.07, height + 0.07, 0.055),
          frameMaterial,
        );
        const screen = new THREE.Mesh(
          new THREE.PlaneGeometry(width, height),
          material,
        );
        screen.position.z = 0.035;
        screen.userData.index = index;
        group.add(frame, screen);
        screens[index] = group;
        world.add(group);
      }),
    );
    const failed = results.find((result) => result.status === "rejected");
    if (failed?.status === "rejected") throw failed.reason;
  } catch (error) {
    world.traverse((object) => {
      if (object instanceof THREE.Mesh) object.geometry.dispose();
    });
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
    renderer.dispose();
    throw error;
  }
  let active = 0,
    frame = 0,
    inView = true,
    destroyed = false,
    lastTime = 0;
  let width = 1,
    height = 1;
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const positions = [
    new THREE.Vector3(-2.6, 0.6, -0.3),
    new THREE.Vector3(0.05, 0.15, 0.65),
    new THREE.Vector3(2.5, 0.55, -0.1),
  ];
  const rotations = [
    new THREE.Euler(-0.06, 0.16, 0.17),
    new THREE.Euler(0.03, -0.09, -0.07),
    new THREE.Euler(-0.03, -0.18, -0.12),
  ];
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.position.z = width < 760 ? 14 : 10.2;
    camera.updateProjectionMatrix();
    render(0, true);
  };
  const render = (time: number, snap = false) => {
    frame = 0;
    if (destroyed || !inView || document.hidden) return;
    if (!snap && time - lastTime < (width < 760 ? 32 : 16)) {
      frame = requestAnimationFrame(render);
      return;
    }
    lastTime = time;
    const scroll = Math.max(
      -1,
      Math.min(1, canvas.getBoundingClientRect().top / Math.max(height, 1)),
    );
    screens.forEach((group, index) => {
      const slot = (index - active + screens.length) % screens.length;
      group.visible = slot < 3;
      if (!group.visible) return;
      const target = positions[slot].clone();
      if (width < 760) {
        target.x *= 0.72;
        target.y += 0.55;
      }
      if (!reduced.matches) {
        target.y += scroll * 0.18;
        target.x += pointer.x * 0.07;
      }
      group.position.lerp(target, snap || reduced.matches ? 1 : 0.12);
      group.rotation.x +=
        (rotations[slot].x +
          (reduced.matches ? 0 : pointer.y * 0.055) -
          group.rotation.x) *
        (snap || reduced.matches ? 1 : 0.12);
      group.rotation.y +=
        (rotations[slot].y +
          (reduced.matches ? 0 : pointer.x * 0.075) -
          group.rotation.y) *
        (snap || reduced.matches ? 1 : 0.12);
      group.rotation.z +=
        (rotations[slot].z - group.rotation.z) *
        (snap || reduced.matches ? 1 : 0.12);
    });
    renderer.render(world, camera);
    if (!reduced.matches) frame = requestAnimationFrame(render);
  };
  const requestRender = () => {
    if (!frame && !destroyed) frame = requestAnimationFrame(render);
  };
  const move = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - bounds.left) / width) * 2 - 1,
      -((event.clientY - bounds.top) / height) * 2 + 1,
    );
    requestRender();
  };
  const leave = () => {
    pointer.set(0, 0);
    requestRender();
  };
  const choose = (event: PointerEvent) => {
    move(event);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster
      .intersectObjects(world.children, true)
      .find(
        (item) =>
          item.object.userData.index !== undefined &&
          item.object.parent?.visible,
      );
    if (hit) onSelect(hit.object.userData.index as number);
  };
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else requestRender();
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (inView) requestRender();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: "40px" },
  );
  const sizes = new ResizeObserver(resize);
  observer.observe(canvas);
  sizes.observe(canvas);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("click", choose);
  document.addEventListener("visibilitychange", visibility);
  reduced.addEventListener("change", requestRender);
  resize();
  return {
    select(index) {
      active = index;
      requestRender();
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizes.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("click", choose);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", requestRender);
      world.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    },
  };
}
