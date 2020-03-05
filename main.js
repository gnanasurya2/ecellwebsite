var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true
});

renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 4;

var geometry = new THREE.SphereGeometry(1, 100, 100);
const material = new THREE.MeshPhongMaterial({
    color: 0x547deb,
    shininess: 70
});
var sphere = new THREE.Mesh(geometry, material);
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(1, 1, 10);
scene.add(light);
scene.add(sphere);

var update = function () {
    var time = performance.now() * 0.002;
    var k = 1.6;
    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
        var p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(
            0.5 + 0.1 * noise.perlin3(p.x * k + time, p.y * k, p.z * k)
        );
    }
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
    sphere.geometry.verticesNeedUpdate = true;
};

function animate() {
    update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);