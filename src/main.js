import './styles.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  v1: '#38bdf8',
  v2: '#ff4500',
};

const root = document.querySelector('#root');
root.innerHTML = `
  <div class="loader" id="loader">
    <div class="loader-content">
      <div class="loader-logo">AETHER</div>
      <div class="loader-status-row">
        <div class="loader-dot"></div>
        <p class="loader-status" id="loader-status">RETRIEVING ASSETS...</p>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" id="progress-bar"></div>
      </div>
      <p class="loader-percent" id="loader-percent">0%</p>
    </div>
  </div>

  <div class="cart-overlay" id="cart-overlay"></div>
  <aside class="cart-drawer" id="cart-drawer">
    <div class="cart-drawer-header">
      <h3>Your Cart</h3>
      <button class="cart-close-btn" id="cart-close-btn" aria-label="Close cart">&times;</button>
    </div>
    <ul class="cart-items">
      <li class="cart-item">
        <div class="cart-item-img-wrap">
          <img src="/shoe1.png" alt="Aether V1" />
        </div>
        <div class="cart-item-info">
          <span class="cart-item-name">Aether V1 - Phantom Obsidian</span>
          <span class="cart-item-price">$220</span>
          <div class="cart-item-qty">
            <button class="qty-btn">-</button>
            <span>1</span>
            <button class="qty-btn">+</button>
          </div>
        </div>
      </li>
      <li class="cart-item">
        <div class="cart-item-img-wrap">
          <img src="/shoe2.png" alt="Aether V2" />
        </div>
        <div class="cart-item-info">
          <span class="cart-item-name">Aether V2 - Crimson Nebula</span>
          <span class="cart-item-price">$250</span>
          <div class="cart-item-qty">
            <button class="qty-btn">-</button>
            <span>1</span>
            <button class="qty-btn">+</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="cart-footer">
      <div class="cart-subtotal">
        <span>Subtotal</span>
        <span>$470</span>
      </div>
      <button class="btn-primary cart-checkout-btn">Proceed to Checkout</button>
      <p class="cart-note">Taxes and shipping calculated at checkout</p>
    </div>
  </aside>

  <div class="app-main" id="app-main">
    <nav class="navbar">
      <div class="logo">AETHER</div>
      <div class="nav-links">
        <a href="#store">Store</a>
        <a href="#featured">Featured Tech</a>
        <a href="#grid">New Arrivals</a>
      </div>
      <div class="cart">
        <button class="btn-icon" id="cart-toggle-btn">
          <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
          Cart <span class="cart-badge">2</span>
        </button>
      </div>
    </nav>

    <section class="store-hero" id="store">
      <div class="store-hero-content">
        <div class="hero-eyebrow">NEW SEASON COLLECTION</div>
        <h1>Redefine<br/>Your Stride.</h1>
        <p>Explore the latest drops and the pinnacle of footwear engineering, rendered in real-time 3D.</p>
        <div class="hero-actions">
          <button class="btn-primary" id="explore-button">Explore Universe</button>
          <button class="btn-ghost">View Lookbook</button>
        </div>
      </div>
      <div class="hero-scroll-hint">
        <div class="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>

    <section class="scrolly-container" id="featured">
      <div class="shoes-pin-wrapper" id="shoes-pin-wrapper">
        <canvas id="three-stage" aria-hidden="true"></canvas>
        
        <div class="customizer-panel" id="customizer-panel">
          <div class="customizer-label">CUSTOMIZE</div>
          <div class="customizer-section">
            <p>V1 Color</p>
            <div class="swatch-group" id="v1-swatches">
              <button class="swatch active" data-color="#38bdf8" style="--c:#38bdf8" title="Stealth Blue"></button>
              <button class="swatch" data-color="#a855f7" style="--c:#a855f7" title="Nebula Purple"></button>
              <button class="swatch" data-color="#22c55e" style="--c:#22c55e" title="Volt Green"></button>
              <button class="swatch" data-color="#f8fafc" style="--c:#f8fafc" title="Arctic White"></button>
            </div>
          </div>
          <div class="customizer-section">
            <p>V2 Color</p>
            <div class="swatch-group" id="v2-swatches">
              <button class="swatch active" data-color="#ff4500" style="--c:#ff4500" title="Infrared Red"></button>
              <button class="swatch" data-color="#eab308" style="--c:#eab308" title="Neon Volt"></button>
              <button class="swatch" data-color="#ec4899" style="--c:#ec4899" title="Nebula Pink"></button>
              <button class="swatch" data-color="#f97316" style="--c:#f97316" title="Inferno Orange"></button>
            </div>
          </div>
        </div>
      </div>

      <div class="sections-wrapper">
        <section class="section intro">
          <h1 class="intro-title" id="intro-title">ENGINEERED PERFORMANCE</h1>
        </section>

        <section class="section empty-slide">
          <div class="center-copy">
            <div class="model-tag">MODEL 01</div>
            <h1 class="swap-title">AETHER V1<br/>PHANTOM OBSIDIAN</h1>
            <p>Presenting you with the V1 of our Masterpiece.</p>
          </div>
        </section>

        <section class="section">
          <div class="section-text right-align">
            <div class="spec-badge">AERODYNAMICS</div>
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
            <div class="spec-badge">MIDSOLE</div>
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
            <div class="spec-badge">PROPULSION</div>
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
            <div class="model-tag">MODEL 02</div>
            <h1 class="swap-title">AETHER V2<br/>CRIMSON NEBULA</h1>
            <p>The evolution of perfection.</p>
          </div>
        </section>

        <section class="section">
          <div class="section-text left-align">
            <div class="spec-badge">TRACTION</div>
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
            <div class="spec-badge">LACING</div>
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
            <div class="spec-badge">SUSTAINABILITY</div>
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
            <div class="spec-badge">CUSHIONING</div>
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
      <div class="section-header">
        <div class="section-eyebrow">LATEST DROPS</div>
        <h2 class="section-title">New Arrivals</h2>
        <p class="section-subtitle">The most advanced footwear engineering, available now.</p>
      </div>
      <div class="product-grid" id="product-grid"></div>
    </section>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <h2>AETHER</h2>
          <p>The frontier of footwear engineering.</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4>Collection</h4>
            <a href="#">Aether V1</a>
            <a href="#">Aether V2</a>
            <a href="#">Accessories</a>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Technology</a>
            <a href="#">Sustainability</a>
          </div>
          <div class="footer-col">
            <h4>Support</h4>
            <a href="#">FAQ</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Aether Engineering. All rights reserved.</p>
      </div>
    </footer>
  </div>
`;

const products = [
  { name: 'Aether V1 - Phantom', price: '$220', img: '/shoe1.png', tag: 'BESTSELLER' },
  { name: 'Aether V2 - Crimson', price: '$250', img: '/shoe2.png', tag: 'NEW' },
  { name: 'Aether V1 - Ghost', price: '$220', img: '/shoe1.png', filter: 'hue-rotate(90deg)', tag: 'LIMITED' },
  { name: 'Aether V2 - Neon', price: '$250', img: '/shoe2.png', filter: 'hue-rotate(180deg) saturate(1.5)', tag: 'NEW' },
];

document.querySelector('#product-grid').innerHTML = products.map((product) => `
  <div class="product-card">
    <div class="product-tag">${product.tag}</div>
    <div class="product-img-wrapper">
      <img src="${product.img}" alt="${product.name}" style="filter:${product.filter || 'none'}" />
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <div class="product-price-row">
        <p class="product-price">${product.price}</p>
        <button class="btn-icon-round" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </div>
      <button class="btn-secondary">Add to Cart</button>
    </div>
  </div>
`).join('');

document.querySelector('#explore-button').addEventListener('click', () => {
  document.querySelector('#featured').scrollIntoView({ behavior: 'smooth' });
});

// Cart drawer
const cartDrawer = document.querySelector('#cart-drawer');
const cartOverlay = document.querySelector('#cart-overlay');
const cartToggleBtn = document.querySelector('#cart-toggle-btn');
const cartCloseBtn = document.querySelector('#cart-close-btn');

function openCart() {
  cartDrawer.classList.add('is-open');
  cartOverlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('is-open');
  cartOverlay.classList.remove('is-visible');
  document.body.style.overflow = '';
}

cartToggleBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Lenis
const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Three.js setup
const loaderEl = document.querySelector('#loader');
const progressBar = document.querySelector('#progress-bar');
const loaderStatus = document.querySelector('#loader-status');
const loaderPercent = document.querySelector('#loader-percent');
const appMain = document.querySelector('#app-main');
let assetProgress = 0;

const LOADER_STAGES = [
  { threshold: 0,  message: 'RETRIEVING ASSETS...' },
  { threshold: 25, message: 'PARSING 3D GEOMETRY...' },
  { threshold: 50, message: 'INITIALIZING GRAPHICS SCENE...' },
  { threshold: 75, message: 'COMPILING GLSL SHADERS...' },
  { threshold: 99, message: 'SYSTEMS ONLINE' },
];

const manager = new THREE.LoadingManager();
manager.onProgress = (_url, loaded, total) => {
  assetProgress = total ? (loaded / total) * 100 : 100;
};
manager.onLoad = () => { assetProgress = 100; };

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
const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.5);
rimLight.position.set(-10, -5, -5);
scene.add(rimLight);

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
        vec3 accent2 = vec3(0.42, 0.21, 0.72);
        float wave = sin(p.x * 5.0 + uTime) * cos(p.y * 5.0 + uTime * 0.5);
        float wave2 = sin(p.x * 3.0 - uTime * 0.7) * cos(p.y * 3.0 + uTime * 0.3);
        col = mix(col, accent, wave * 0.2 * exp(-d * 1.5));
        col = mix(col, accent2, wave2 * 0.1 * exp(-d * 2.0));
        float grid = max(
          step(0.98, fract(p.x * 10.0)),
          step(0.98, fract(p.y * 10.0))
        );
        col += vec3(grid * 0.025);
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

let shoeOneMeshes = [];
let shoeTwoMeshes = [];

function colorizeModel(object, color, meshList) {
  const tint = new THREE.Color(color);
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;
    if (!meshList.includes(child)) meshList.push(child);
    child.material = child.material.clone();
    child.material.color = tint;
    child.material.roughness = 0.34;
    child.material.metalness = 0.12;
  });
}

function applyColorToGroup(group, color) {
  group.traverse((child) => {
    if (!child.isMesh) return;
    gsap.to(child.material.color, {
      r: new THREE.Color(color).r,
      g: new THREE.Color(color).g,
      b: new THREE.Color(color).b,
      duration: 0.6,
      ease: 'power2.out',
    });
  });
}

function cloneShoe(source, color, meshList) {
  const clone = source.clone(true);
  colorizeModel(clone, color, meshList);
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
  shoeOne.add(cloneShoe(gltf.scene, COLORS.v1, shoeOneMeshes));
  shoeTwo.add(cloneShoe(gltf.scene, COLORS.v2, shoeTwoMeshes));
  setupScrollAnimation();

  // Swatch interaction
  document.querySelectorAll('#v1-swatches .swatch').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#v1-swatches .swatch').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      COLORS.v1 = btn.dataset.color;
      applyColorToGroup(shoeOne, COLORS.v1);
    });
  });
  document.querySelectorAll('#v2-swatches .swatch').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#v2-swatches .swatch').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      COLORS.v2 = btn.dataset.color;
      applyColorToGroup(shoeTwo, COLORS.v2);
    });
  });
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
  loaderPercent.textContent = `${Math.floor(visibleProgress)}%`;

  const stage = [...LOADER_STAGES].reverse().find((s) => visibleProgress >= s.threshold);
  if (stage && loaderStatus.textContent !== stage.message) {
    loaderStatus.style.opacity = '0';
    setTimeout(() => {
      loaderStatus.textContent = stage.message;
      loaderStatus.style.opacity = '1';
    }, 200);
  }

  if (visibleProgress >= 100) {
    loaderDone = true;
    window.setTimeout(() => {
      loaderEl.classList.add('is-hidden');
      appMain.classList.add('is-visible');
      ScrollTrigger.refresh();
    }, 800);
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
