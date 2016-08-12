var camera, controls, sceneAxes,sceneGrid, renderer;
var addedByUser;
var vector1,vector2;


$( document ).ready(function() {
    console.log( "ready!" );
	init();
    animate();
});

function resetCamera(){
	camera.position.set(10, 10,10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
	render();
	
}

function faceX(){
	camera.position.set(10, 0,0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
	render();
	
}

function faceY(){
	camera.position.set(0, 10,0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
	render();
	
}

function faceZ(){
	camera.position.set(0, 0,10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
	render();
	
}

function updateVectors(){
	
	var object = $("#vector").serializeArray();
	
	var vectorArray = parseVectors(object);

	vectorArray.forEach(drawVector);
	render();
}

function parseVectors(object){
 
	var vectorArray = [];
	var vectorElement;
	for (i = 0; i < object.length-2; i=i+3) { 
		vectorElement = {x:parseInt(object[i].value),y:parseInt(object[i+1].value),z:parseInt(object[i+2].value)}
		vectorArray.push(vectorElement);
	}
	
	return vectorArray;

}

function drawVector(element, index, array){
	
	var geometry = new THREE.Geometry();	
    geometry.vertices.push(new THREE.Vector3(element.x, element.y, element.z));
    geometry.vertices.push(new THREE.Vector3(0,0,0));
 
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xffffff,
		fog:true
    }));
	addedByUser.add(line);
	
	
}

function drawThreeVector(newVector,origin = new THREE.Vector3(0,0,0),callback){
	
	var geometry = new THREE.Geometry();
    geometry.vertices.push(newVector);
    geometry.vertices.push(origin);
 
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xffffff,
		fog:true
    }));
	addedByUser.add(line);
	
	callback();
}


function cleanVectors(){
	sceneAxes.remove(addedByUser);
	addedByUser= new THREE.Object3D();
	sceneAxes.add(addedByUser);
	render();
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();


}


function init(){

	/* setting camera */
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(10, 10,10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

	
	/* Setting base vectors */
	var materialX = new THREE.LineBasicMaterial({
        color: 0xff0000,
		fog:true
    });
	var materialY = new THREE.LineBasicMaterial({
        color: 0x00ff00,
		fog:true
    });
	var materialZ = new THREE.LineBasicMaterial({
        color: 0x0000ff,
		fog:true
    });
	
	var geometryX = new THREE.Geometry();
    geometryX.vertices.push(new THREE.Vector3(1, 0, 0));
    geometryX.vertices.push(new THREE.Vector3(0,0, 0)); 
    var lineX = new THREE.Line(geometryX, materialX);


    var geometryY = new THREE.Geometry();
    geometryY.vertices.push(new THREE.Vector3(0, 1, 0));
    geometryY.vertices.push(new THREE.Vector3(0,0, 0)); 
    var lineY = new THREE.Line(geometryY, materialY);
    
    var geometryZ = new THREE.Geometry();
    geometryZ.vertices.push(new THREE.Vector3(0, 0, 0));
    geometryZ.vertices.push(new THREE.Vector3(0,0, 1)); 
    var lineZ = new THREE.Line(geometryZ, materialZ);   
	
	/* Setting Grid object */
	var size = 100;
	var step = 1;
	var gridHelper = new THREE.GridHelper( size, step );	
	
	/* user objects holder */
	addedByUser= new THREE.Object3D();
	
	/* setting scene and objects */
	sceneAxes = new THREE.Scene();	
	sceneAxes.add(lineX);
	sceneAxes.add(lineY);
	sceneAxes.add(lineZ);  
	sceneAxes.add(addedByUser);	
	
    sceneGrid = new THREE.Scene();	
	sceneGrid.fog = new THREE.FogExp2( 0x000000, 0.02  );
	sceneGrid.add( gridHelper );

	
	/* Setting renderer */	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);	
    $("#container").html(renderer.domElement);
	renderer.setClearColor( sceneGrid.fog.color, 1 );
	
	/* Setting orbit camera control */
	controls = new THREE.OrbitControls( camera,renderer.domElement );
	controls.addEventListener( 'change', render );
	
	renderer.autoClear = false;
	renderer.render(sceneGrid, camera);
	renderer.render(sceneAxes, camera);
}

function animate() {

  requestAnimationFrame( animate );
  controls.update();

}

function render() {
	renderer.clear();                    
    renderer.render( sceneGrid, camera );     
    renderer.clearDepth();
    renderer.render( sceneAxes, camera );
}

