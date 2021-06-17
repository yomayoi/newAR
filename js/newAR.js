//three.jsの各設定
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setClearColor(new THREE.Color("black"), 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0px";
renderer.domElement.style.left = "0px";
document.body.appendChild(renderer.domElement);
var onRenderFcts = [];

//カメラ作成
var camera = new THREE.Camera();
scene.add(camera);

//arToolkitSource
var source = new THREEx.ArToolkitSource({
  sourceType: "webcam"
});
source.init(function onReady() {
  //onReady関数
  onResize();
});

// atToolkitContext
var context = new THREEx.ArToolkitContext({
  cameraParametersUrl: "camera_para.dat",
  detectionMode: "mono",
  imageSmoothingEnabled: true,
  maxDetectionRate: 30,
  canvasWidth: source.parameters.sourceWidth
});
context.init(function onCompleted() {
  camera.projectionMatrix.copy(context.getProjectionMatrix());
});
// update artoolkit on every frame
onRenderFcts.push(function() {
  if (source.ready === false) return;
  context.update(source.domElement);
});

//リサイズ
window.addEventListener("resize", function() {
  onResize();
});

function onResize() {
  source.onResizeElement();
  source.copyElementSizeTo(renderer.domElement);
  if (context.arController !== null) {
    source.copyElementSizeTo(context.arController.canvas);
  }
}

//////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
//////////////////////////////////////////////////////////////////////////////////
// render the scene
onRenderFcts.push(function() {
  renderer.render(scene, camera);
});
// run the rendering loop
var lastTimeMsec = null;
requestAnimationFrame(function animate(nowMsec) {
  // keep looping
  requestAnimationFrame(animate);
  // measure time
  lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
  var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
  lastTimeMsec = nowMsec;
  // call each update function
  onRenderFcts.forEach(function(onRenderFct) {
    onRenderFct(deltaMsec / 1000, nowMsec / 1000);
  });
});

////////////////////////////////////////////////////////////////////////////////
//          Create a ArMarkerControls
////////////////////////////////////////////////////////////////////////////////

var markerRoot_Axis = new THREE.Group();
var artoolkitMarker = new THREEx.ArMarkerControls(context, markerRoot_Axis, {
  type: "pattern",
  patternUrl: "pattern/patt.hiro"
});
// build a smoothedControls
var smoothedRoot_Axis = new THREE.Group();
scene.add(smoothedRoot_Axis);
var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot_Axis, {
  lerpPosition: 0.4,
  lerpQuaternion: 0.3,
  lerpScale: 1
});
onRenderFcts.push(function(delta) {
  smoothedControls.update(markerRoot_Axis);
});
//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////
var lightobj = [];
var axisArray = [];
var object=[];
var gridArray = [];
var markerScene = new THREE.Scene();
smoothedRoot_Axis.add(markerScene);

////環境光表示
//平行光源
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 100, 0);
markerScene.add(light);
lightobj.push(light); //no0
//自然光
var ambient = new THREE.AmbientLight(0x666666);
markerScene.add(ambient);
lightobj.push(ambient); //no1
////環境光表示（終）

/////////////////////////////////////
///要素の作成
/////////////////////////////////////
var object = [];
var cube_size = 0.5;
var geometry = new THREE.BoxGeometry( cube_size, cube_size, cube_size );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(cube_size,0,0);
cube.name = 'cube1';
cube.visible = false;
markerScene.add(cube);
object.push(cube);

var cube2 = cube.clone();
cube2.name = 'cube2';
cube2.position.set(0,0,- cube_size);
cube2.visible = false;
markerScene.add(cube2);
object.push(cube);