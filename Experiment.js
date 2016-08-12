
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

