
function serieLiebniz(rank = 0,vectorApplied = new THREE.Vector3(1,1,1)){

	vectorApplied.x = Math.pow(1, rank)/(rank);
	vectorApplied.y = Math.pow(1, rank+1)/(rank+1);
	vectorApplied.z = Math.pow(1, rank+2)/(rank+2);
		
	return vectorApplied;
	
}

function serieLiebnizRecurse(rank = 0,vectorApplied = new THREE.Vector3(1,1,1)){

	vectorApplied.x = vectorApplied.x*Math.pow(-1, rank)/(rank);
	vectorApplied.y = vectorApplied.y*Math.pow(-1, rank+1)/(rank+1);
	vectorApplied.z = vectorApplied.z*Math.pow(-1, rank+2)/(rank+2);
		
	return vectorApplied;
	
}

function serieLiebnizSum(rank = 0,vectorApplied = new THREE.Vector3(1,1,1)){

	vectorApplied.x = serieDiv(rank);
	vectorApplied.y = serieDiv(5*rank);
	vectorApplied.z = serieDiv(10*rank);
		
	return vectorApplied;
	
}

function serieDiv(rank){
	var sum;
	for (n = 0; n < rank; n++) { 
		sum = Math.pow(-1, rank)*Math.log(rank);
	}

	return sum;
}



var liebnizVector,maxRank;
function vectorSerieLiebnizAutoDraw(){
	
	initVector();	
	maxRank = parseInt($('#maxRank').value)|| 100; 	
	delayDraw(0,liebnizVector);

}
function delayDraw(n,vector) {
  setTimeout(function() {
			var lastVector = vector.clone()||( new THREE.Vector3(0,0,0)).clone();
			serieLiebnizSum(n,vector);
			drawThreeVector(vector,lastVector,render);
			if(n >= maxRank)return;
			delayDraw(n+1,vector)			
		 
		}, 100);
}

var liebnizRank = 1 ;
function vectorSerieLiebnizStepDraw(){

	initVector();

	var lastVector = liebnizVector.clone();
	serieLiebnizSum(liebnizRank,liebnizVector);
	drawThreeVector(liebnizVector,lastVector,stepWrap);


}

function initVector(){

	if(liebnizVector == null){
		var object = $("#vector").serializeArray();
		
		if(parseVectors(object)[0] == null)
			alert("Please enter valid vector dimensions!")
		
		var vector = parseVectors(object);
		liebnizVector = new THREE.Vector3(vector[0].x,vector[0].y,vector[0].z);		
		
	}

}

function stepWrap(){

	render();	
	liebnizRank ++;

}
var deg_to_rad = Math.PI / 180.0;
var depth3D = 10;
var dteta1 , dteta2;
var sink;

function initTreeVector(){

	drawTreeVector(new THREE.Vector3(0,1,0), 90,90, depth3D);
	render();
}
function drawTreeVector(vector,teta,phi,depth3D){	
	if (depth3D !== 0){
		var newVector = new THREE.Vector3(0,1,0);
		
		newVector.x = vector.x+(vector.length()*depth3D/10)*Math.cos(teta * deg_to_rad)*Math.cos(phi * deg_to_rad);
		newVector.z = vector.z+(vector.length()*depth3D/10)*Math.sin(teta * deg_to_rad)*Math.cos(phi * deg_to_rad);
		newVector.y = vector.y+(vector.length()*depth3D/10)*Math.sin(phi * deg_to_rad);
		
		drawThreeVector(newVector, vector);
		drawTreeVector(newVector, teta +65,phi-20, depth3D - 1);
		drawTreeVector(newVector, teta -65,phi-20, depth3D - 1);

	}

}



function initTree(){

	drawTree(0, 0, 90, depth);
}
var depth = 9;
function drawTree(x1, y1, angle, depth){
  if (depth !== 0){
    var x2 = x1 + (Math.cos(angle * deg_to_rad));
    var y2 = y1 + (Math.sin(angle * deg_to_rad));
    drawLine(x1, y1, x2, y2, depth);
    drawTree(x2, y2, angle - 20, depth - 1);
    drawTree(x2, y2, angle + 20, depth - 1);
  }
}

function drawLine(x1,y1,x2,y2){

	var geometry = new THREE.Geometry();	
    geometry.vertices.push(new THREE.Vector3(x1, y1, 0));
    geometry.vertices.push(new THREE.Vector3(x2,y2,0));
 
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xffff00,
		fog:true
    }));
	
	addedByUser.add(line);


}
