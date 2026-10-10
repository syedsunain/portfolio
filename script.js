
import * as THREE from "three";

const canvas = document.querySelector("#three-canvas");

if (canvas) {
  try {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      1,
      0.1,
      100
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    scene.add(new THREE.AmbientLight(0xffffff, 1.8));

    const light = new THREE.PointLight(0xb7a3ff, 45);
    light.position.set(3, 3, 4);
    scene.add(light);

    const sphereGeometry = new THREE.SphereGeometry(
      1.15,
      64,
      64
    );

    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x7961ed,
      metalness: 0.45,
      roughness: 0.23
    });

    const sphere = new THREE.Mesh(
      sphereGeometry,
      sphereMaterial
    );

    scene.add(sphere);

    const ringGeometry = new THREE.TorusGeometry(
      1.55,
      0.025,
      16,
      120
    );

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xb4a6ff,
      metalness: 0.65,
      roughness: 0.3
    });

    const ring = new THREE.Mesh(
      ringGeometry,
      ringMaterial
    );

    ring.rotation.x = 1.1;
    ring.rotation.y = 0.35;
    scene.add(ring);

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];

    for (let i = 0; i < 250; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5 - 1
      );
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );

    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xc7c0ff,
        size: 0.025
      })
    );

    scene.add(stars);

    let targetX = 0;
    let targetY = 0;

    canvas.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();

      targetY =
        ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;

      targetX =
        ((event.clientY - rect.top) / rect.height - 0.5) * 0.5;
    });

    canvas.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
    });

    function resize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) return;

      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resize);
    resize();

    function animate() {
      requestAnimationFrame(animate);

      sphere.rotation.y += 0.004;
      sphere.rotation.x += 0.0015;

      ring.rotation.z += 0.003;

      sphere.rotation.x +=
        (targetX - sphere.rotation.x) * 0.015;

      sphere.rotation.y +=
        (targetY - sphere.rotation.y) * 0.015;

      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    }

    animate();
  } catch (error) {
    console.error("3D animation could not start:", error);
    canvas.replaceWith(
      document.createTextNode(
        "The 3D animation could not start in this browser."
      )
    );
  }
}
