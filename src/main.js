import './styles.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);

const root = document.querySelector('#root');
root.innerHTML = `
  <div class="loader" id="loader">
    <div class="loader-content">
      <h1 class="loader-text">LOADING</h1>
      <div class="progress-bar-container">
        <div class="progress-bar" id="progress-bar"></div>
      </div>
      <p class="loader-note">Powered by Frosted Tech</p>
    </div>
  </div>

  <div class="app-main" id="app-main">
    <nav class="navbar">
      <div class="logo">AETHER</div>
      <div class="nav-links">
        <a href="#store">Store</a>
        <a href="#featured">Featured Tech</a>
        <a href="#grid">New Arrivals</a>
      </div>
      <div class="cart">
        <button class="btn-icon">&#128722; Cart (2)</button>
      </div>
    </nav>

    <section class="store-hero" id="store">
      <div class="store-hero-content">
        <h1>Redefine Your Stride.</h1>
        <p>Explore the latest drops and the pinnacle of footwear engineering.</p>
        <button class="btn-primary" id="explore-button">Explore Our Universe</button>
      </div>
    </section>

    <section class="scrolly-container" id="featured">
      <div class="shoes-pin-wrapper" id="shoes-pin-wrapper">
        <canvas id="three-stage" aria-hidden="true"></canvas>
      </div>

      <div class="sections-wrapper">
        <section class="section intro">
          <h1 class="intro-title" id="intro-title">ENGINEERED PERFORMANCE</h1>
        </section>

        <section class="section empty-slide">
          <div class="center-copy">
            <h1 class="swap-title">AETHER V1 - PHANTOM OBSIDIAN</h1>
            <p>Presenting you with the V1 of our Masterpiece.</p>
          </div>
        </section>

        <section class="section">
          <div class="section-text right-align">
            <h2>Aerodynamic Design</h2>
            <p>Engineered for maximum velocity with minimal drag. The Aether V1 slices through the air like nothing before. Our wind-tunnel tested silhouette is proven to reduce drag by up to 14% compared to standard racing shoes.</p>
            <p>Every curve and contour has been meticulously analyzed to optimize airflow, ensuring that your energy translates directly into forward momentum without fighting the elements.</p>
            <div class="specs">
              <div><strong>DRAG REDUCTION</strong><span>14% Efficiency Gain</span></div>
              <div><strong>TESTING</strong><span>500+ Hours Wind Tunnel</span></div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-text left-align">
            <h2>Zero Gravity Foam</h2>
            <p>Our proprietary midsole foam returns 98% of your energy. Feel weightless with every step. Developed in partnership with aerospace engineers, the foam micro-structure absorbs impact perfectly.</p>
            <p>The foam is injected with nitrogen to create a hyper-responsive bounce that maintains its structural integrity even after thousands of miles of heavy compression.</p>
            <div class="specs">
              <div><strong>ENERGY RETURN</strong><span>98% Kinetic Transfer</span></div>
              <div><strong>DURABILITY</strong><span>1,500 Miles Guaranteed</span></div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-text right-align">
            <h2>Carbon Fiber Plate</h2>
            <p>A full-length carbon fiber plate propels you forward, reducing fatigue and maximizing efficiency. The plate acts like a rigid lever, stabilizing the ankle joint and shifting the workload to your calves.</p>
            <p>It's not just about stiffness; it's about the precision curve. The dynamic arc is tailored to the exact biomechanics of elite runners, offering an unprecedented snap-back mechanism.</p>
            <div class="specs">
              <div><strong>MATERIAL</strong><span>Aero-Grade Carbon</span></div>
              <div><strong>THICKNESS</strong><span>1.2mm Tapered Core</span></div>
            </div>
          </div>
        </section>

        <section class="section swap-section">
          <div class="center-copy">
            <h1 class="swap-title">AETHER V2 - CRIMSON NEBULA</h1>
            <p>The evolution of perfection.</p>
          </div>
        </section>

        <section class="section">
          <div class="section-text left-align">
            <h2>Next Gen Traction</h2>
            <p>The Aether V2 features an AI-designed outsole pattern for grip in all conditions. By feeding millions of data points into a neural network, we generated an organic traction matrix that bites the asphalt.</p>
            <p>Whether it's a torrential downpour or a slick corner, the micro-tread variations expand under pressure, essentially giving you active grip that adapts dynamically to your environment.</p>
            <div class="specs">
              <div><strong>GRIP MATRIX</strong><span>AI Generative Design</span></div>
              <div><strong>ALL-WEATHER</strong><span>Hydrophobic Rubber</span></div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-text right-align">
            <h2>Quantum Lacing</h2>
            <p>Lock down your fit with a single pull. The quantum lacing system distributes tension evenly across the midfoot, completely eliminating pressure points that plague traditional runners.</p>
            <p>Using ultra-high molecular weight polyethylene fibers, the cables are 15x stronger than steel by weight. Your foot remains locked in perfectly during aggressive lateral movements.</p>
            <div class="specs">
              <div><strong>TENSILE STRENGTH</strong><span>15x Stronger Than Steel</span></div>
              <div><strong>FIT SYSTEM</strong><span>Zero-Pressure Even Distribution</span></div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-text left-align">
            <h2>Sustainable Materials</h2>
            <p>Crafted from 100% recycled ocean plastics. Performance that doesn't cost the earth. We've revolutionized the supply chain to ensure every pair removes 2 pounds of waste from marine ecosystems.</p>
            <p>The upper mesh is knit using advanced 3D techniques to ensure zero fabric waste during production, creating a shoe that performs impeccably while adhering to strict carbon-neutral standards.</p>
            <div class="specs">
              <div><strong>OCEAN PLASTIC</strong><span>2 lbs Removed Per Pair</span></div>
              <div><strong>CARBON OFFSET</strong><span>100% Neutral Certified</span></div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-text right-align">
            <h2>Reactive Cushioning</h2>
            <p>The cushioning adapts to your stride in real-time, providing bespoke support and feedback on every run. Embedded with smart-polymers, the density shifts based on the force of your footstrike.</p>
            <p>This means you get plush, soft landings when jogging, and explosive, rigid takeoffs when sprinting. It is a dual-personality shoe that understands exactly what you demand from it.</p>
            <div class="specs">
              <div><strong>ADAPTABILITY</strong><span>Smart-Polymer Matrix</span></div>
              <div><strong>RESPONSE TIME</strong><span>&lt;0.01 Seconds</span></div>
            </div>
          </div>
        </section>

        <section class="section intro final-cta">
          <h2 class="intro-title">Own The Future.</h2>
          <button class="btn-primary">Shop The V2</button>
        </section>
      </div>
    </section>

    <section class="product-grid-section" id="grid">
      <h2 class="section-title">New Arrivals</h2>
      <div class="product-grid" id="product-grid"></div>
    </section>

    <footer class="footer">
      <h2>AETHER FOOTWEAR</h2>
      <p>&copy; 2026 Aether Engineering. Built by Frosted Tech.</p>
    </footer>
  </div>
`;

const products = [
  { name: 'Aether V1 - Phantom', price: '$220', img: '/shoe1.png' },
  { name: 'Aether V2 - Crimson', price: '$250', img: '/shoe2.png' },
  { name: 'Aether V1 - Ghost', price: '$220', img: '/shoe1.png', filter: 'hue-rotate(90deg)' },
  { name: 'Aether V2 - Neon', price: '$250', img: '/shoe2.png', filter: 'hue-rotate(180deg) saturate(1.5)' },
];

document.querySelector('#product-grid').innerHTML = products.map((product) => `
  <div class="product-card">
    <div class="product-img-wrapper">
      <img src="${product.img}" alt="${product.name}" style="filter:${product.filter || 'none'}" />
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button class="btn-secondary">Add to Cart</button>
    </div>
  </div>
`).join('');

document.querySelector('#explore-button').addEventListener('click', () => {
  document.querySelector('#featured').scrollIntoView({ behavior: 'smooth' });
});

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const loaderEl = document.querySelector('#loader');
const progressBar = document.querySelector('#progress-bar');
const appMain = document.querySelector('#app-main');
let assetProgress = 0;

const manager = new THREE.LoadingManager();
manager.onProgress = (_url, loaded, total) => {
  assetProgress = total ? (loaded / total) * 100 : 100;
};
manager.onLoad = () => {
  assetProgress = 100;
};

const canvas = document.querySelector('#three-stage');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 8);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
keyLight.position.set(10, 10, 5);
scene.add(keyLight);

const shaderUniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0, 0) },
};

const shaderPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.ShaderMaterial({
    depthWrite: false,
    depthTest: false,
    uniforms: shaderUniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float d = length(p - uMouse * 0.5);
        vec3 col = vec3(0.04, 0.06, 0.12);
        vec3 accent = vec3(0.22, 0.74, 0.97);
        float wave = sin(p.x * 5.0 + uTime) * cos(p.y * 5.0 + uTime * 0.5);
        col = mix(col, accent, wave * 0.2 * exp(-d * 1.5));
        float grid = max(
          step(0.98, fract(p.x * 10.0)),
          step(0.98, fract(p.y * 10.0))
        );
        col += vec3(grid * 0.02);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  }),
);
shaderPlane.position.z = -5;
scene.add(shaderPlane);

const pointerTarget = new THREE.Vector2(0, 0);
window.addEventListener('pointermove', (event) => {
  pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const shoeScale = window.innerWidth < 768 ? 1.8 : 3;
const shoeOne = new THREE.Group();
const shoeTwo = new THREE.Group();
scene.add(shoeOne, shoeTwo);

function colorizeModel(object, color) {
  const tint = new THREE.Color(color);
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;
    child.material = child.material.clone();
    child.material.color = tint;
    child.material.roughness = 0.34;
    child.material.metalness = 0.12;
  });
}

function cloneShoe(source, color) {
  const clone = source.clone(true);
  colorizeModel(clone, color);
  clone.scale.setScalar(shoeScale);
  return clone;
}

function setupScrollAnimation() {
  gsap.set(shoeOne.position, { x: 0, y: 10, z: 0 });
  gsap.set(shoeOne.rotation, { x: 0.5, y: -Math.PI, z: 0 });
  gsap.set(shoeTwo.position, { x: 10, y: 0, z: 0 });
  gsap.set(shoeTwo.scale, { x: 0, y: 0, z: 0 });

  const introTitle = document.querySelector('#intro-title');
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#featured',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      snap: {
        snapTo: 1 / 10,
        duration: { min: 0.3, max: 0.5 },
        delay: 0,
        ease: 'power2.inOut',
      },
    },
  });

  timeline.to({}, { duration: 10 }, 0);
  timeline.to(introTitle, { opacity: 0, scale: 0.9, duration: 1 }, 0);
  timeline.to(shoeOne.position, { y: 0, ease: 'bounce.out', duration: 1 }, 0);
  timeline.to(shoeOne.rotation, { y: Math.PI * 0.2, duration: 1 }, 0);
  timeline.to(shoeOne.position, { x: -4, duration: 1 }, 1);
  timeline.to(shoeOne.rotation, { y: -Math.PI / 4, x: -0.2, duration: 1 }, 1);
  timeline.to(shoeOne.position, { x: 4, duration: 1 }, 2);
  timeline.to(shoeOne.rotation, { y: Math.PI / 4, x: 0.2, duration: 1 }, 2);
  timeline.to(shoeOne.position, { x: -4, duration: 1 }, 3);
  timeline.to(shoeOne.rotation, { y: -Math.PI / 4, x: -0.2, duration: 1 }, 3);
  timeline.to(shoeOne.position, { x: -10, y: 5, duration: 1 }, 4);
  timeline.to(shoeTwo.position, { x: 0, duration: 1 }, 4);
  timeline.to(shoeTwo.scale, { x: 1, y: 1, z: 1, duration: 1 }, 4);
  timeline.to(shoeTwo.rotation, { y: Math.PI * 2.2, duration: 1 }, 4);
  timeline.to(shoeTwo.position, { x: 4, duration: 1 }, 5);
  timeline.to(shoeTwo.rotation, { y: Math.PI / 4, duration: 1 }, 5);
  timeline.to(shoeTwo.position, { x: -4, duration: 1 }, 6);
  timeline.to(shoeTwo.rotation, { y: -Math.PI / 4, duration: 1 }, 6);
  timeline.to(shoeTwo.position, { x: 4, duration: 1 }, 7);
  timeline.to(shoeTwo.rotation, { y: Math.PI / 4, duration: 1 }, 7);
  timeline.to(shoeTwo.position, { x: -4, duration: 1 }, 8);
  timeline.to(shoeTwo.rotation, { y: -Math.PI / 4, duration: 1 }, 8);
  timeline.to(shoeTwo.position, { x: 0, y: 1, duration: 1 }, 9);
  timeline.to(shoeTwo.rotation, { y: 0, x: 0.3, duration: 1 }, 9);
}

const loader = new GLTFLoader(manager);
loader.load('/Shoe.glb', (gltf) => {
  shoeOne.add(cloneShoe(gltf.scene, '#38bdf8'));
  shoeTwo.add(cloneShoe(gltf.scene, '#ff4500'));
  setupScrollAnimation();
});

let visibleProgress = 0;
let loaderDone = false;
const loadStartedAt = performance.now();

function updateLoader() {
  if (loaderDone) return;
  const elapsed = performance.now() - loadStartedAt;
  const timedProgress = Math.min((elapsed / 5000) * 100, 100);
  const target = Math.min(assetProgress || 0, timedProgress);
  visibleProgress += (target - visibleProgress) * 0.1;
  if (target === 100 && visibleProgress > 99.8) visibleProgress = 100;

  progressBar.style.width = `${visibleProgress}%`;
  loaderEl.style.backgroundColor = `rgb(${Math.floor(visibleProgress / 100 * 11)}, ${Math.floor(visibleProgress / 100 * 17)}, ${Math.floor(visibleProgress / 100 * 32)})`;

  if (visibleProgress >= 100) {
    loaderDone = true;
    window.setTimeout(() => {
      loaderEl.classList.add('is-hidden');
      appMain.classList.add('is-visible');
      ScrollTrigger.refresh();
    }, 600);
    return;
  }

  requestAnimationFrame(updateLoader);
}

function animate() {
  shaderUniforms.uTime.value = performance.now() * 0.001;
  shaderUniforms.uMouse.value.lerp(pointerTarget, 0.05);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  ScrollTrigger.refresh();
});

updateLoader();
animate();
