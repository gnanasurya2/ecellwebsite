var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true
});

// default bg canvas color //
renderer.setClearColor(0x7b7b7b);

//  use device aspect ratio //
renderer.setPixelRatio(window.devicePixelRatio);
// set size of canvas within window //
renderer.setSize(window.innerWidth, window.innerHeight);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 4;


var geometry = new THREE.SphereGeometry(1, 128, 128);
const material = new THREE.MeshPhongMaterial({
    color: 0x347deb, // red (can also use a CSS color string here)
    flatShading: true,
    shininess: 150
});
var sphere = new THREE.Mesh(geometry, material);
var light = new THREE.AmbientLight(0x404040);
scene.add(light);
scene.add(sphere);



var update = function () {

    // change '0.003' for more aggressive animation
    var time = performance.now() * 0.003;
    //console.log(time)

    //go through vertices here and reposition them

    // change 'k' value for more spikes
    var k = 2;
    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
        var p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(1 + 0.3 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
    }
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
    sphere.geometry.verticesNeedUpdate = true;

}

function animate() {
    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.01;
    update();

    /* render scene and camera */
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);