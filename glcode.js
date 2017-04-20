Qt.include("three.js")
Qt.include("OrbitControls.js")
Qt.include("planet.js")
Qt.include("solarsystem.js")

var camera, scene, renderer;
var speedsCoef={ earthSpeed: 1, moonSpeed: 0.037, sunSpeed: 0.0027};
var speeds={ earthSpeed: 0, moonSpeed: 0, sunSpeed: 0};
var arrowHelper;
var controls;
var earth;
var moon;
var sun;

var commonGeometry = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(1, 64, 64));
commonGeometry.rotateX(Math.PI / 2);

function initializeGL(canvas,eventSource,timer) {


    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 20000000);
    camera.up = new THREE.Vector3( 0, 0, 1 );
    camera.position.y = 15;
    camera.position.z = 15;
    camera.position.x = 15;

    scene.add(new THREE.AmbientLight(0x111111,5));

   var starfield = createStarfield(8500000);
    scene.add(starfield);

    var scaleSunRadius = 10; // иначе его почти не видно
    var SUN_RADIUS = scaleSunRadius*694.439;
    var SUN_DISTANCE = 1496000;
    sun = createSun(SUN_RADIUS);
    sun.translateX(SUN_DISTANCE);
    sun.position= sun.position
    .applyAxisAngle(new THREE.Vector3(0 ,1, 0),THREE.Math.degToRad(23.5));
    scene.add(sun);

    var EARTH_RADIUS=6.34;
    earth = createPlanet(EARTH_RADIUS, 0.05, '/images/earthmap1k.jpg',
                        '/images/earthbump1k.jpg', '/images/earthspec1k.jpg');
    createEarthCloud(earth);
    scene.add(earth);


    var MOON_RADIUS=1.5424;
    var MOON_DISTANCE = 384.4;
    moon = createPlanet(MOON_RADIUS,0.05,'/images/moonmap1k.jpg','/images/moonbump1k.jpg');
    moon.translateX(MOON_DISTANCE);
    moon.rotateY(THREE.Math.degToRad(5));
    moon.position= moon.position
    .applyAxisAngle(new THREE.Vector3(0 , 1, 0),THREE.Math.degToRad(23.5));
    scene.add(moon);


    var dir = new THREE.Vector3( 0, 1, 0 );
    var origin = new THREE.Vector3( 0, 0, 0 );
    var length = 10;
    var hex = 0xffff00;

    arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    var angle=THREE.Math.degToRad(23.5);
    arrowHelper.rotateY(angle);
    scene.add( arrowHelper );

    scene.add( new THREE.AxisHelper( 10 ) );
    controls = new THREE.OrbitControls( camera, eventSource );

    renderer = new THREE.Canvas3DRenderer(
                { canvas: canvas, antialias: true, devicePixelRatio: canvas.devicePixelRatio });
    renderer.setSize(canvas.width, canvas.height);


}

function resizeGL(canvas) {
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(canvas.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);
}



function paintGL(canvas) {
    controls.update();
    earth.rotation.z += speeds.earthSpeed;
    moveMoon(speeds.moonSpeed);
    moveSun (speeds.sunSpeed);
    renderer.render(scene, camera);
}



moveMoon.axisToMove=new THREE.Vector3( 0, 0 , 1 )
.applyAxisAngle( new THREE.Vector3(0 , 1, 0),THREE.Math.degToRad(23.5)).normalize();

function moveMoon(speed)
{
    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle( moveMoon.axisToMove, speed );
    moon.position = moon.position.applyQuaternion(quaternion);
}

moveSun.axisToMove=new THREE.Vector3( 0, 0, 1 )
.applyAxisAngle( new THREE.Vector3(0 , 1, 0),THREE.Math.degToRad(23.5)).normalize();


function moveSun(speed)
{
    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle( moveSun.axisToMove, speed );
    sun.position = sun.position.applyQuaternion(quaternion);
}



function updateRotationSpeed(dayPefFrame)
{

    speeds.earthSpeed = THREE.Math.degToRad(360 * dayPefFrame * speedsCoef.earthSpeed);
    speeds.moonSpeed = THREE.Math.degToRad(360 * dayPefFrame * speedsCoef.moonSpeed);
    speeds.sunSpeed = THREE.Math.degToRad(360 * dayPefFrame * speedsCoef.sunSpeed);

}


function moveCameraX()
{
    camera.position.x = camera.position.x+1;
}

function moveCameraY()
{
    camera.position.y = camera.position.y+1;
}

function moveCameraZ()
{
    camera.position.z = camera.position.z+1;
}




function rotateArrow()
{
    arrowHelper.rotateOnAxis(new THREE.Vector3( 0, 0, 1 ), 0.5);
}



