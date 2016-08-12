
// SUM{ (-1)^n/(2n+1)}
function serieLiebniz(rank = 0,vectorApplied = new THREE.Vector3(1,1,1)){

	vectorApplied.x = Math.pow(-1, rank)/(2*rank+1);
	vectorApplied.y = Math.pow(-1, rank)/(2*rank+1);
	vectorApplied.z = Math.pow(-1, rank)/(2*rank+1);
		
	return vectorApplied;
	
}

var lastLiebnizVector;
function vectorSerieLiebnizAutoDraw(firstVector = new THREE.Vector3(1,1,1),maxRank = 100){

	for (n = 0; n < maxRank; n++) { 
		setTimeout(function() {
			var newVector = serieLiebniz(lastLiebnizVector,n);
			drawVector(newVector,lastLiebnizVector);			
			lastLiebnizVector = newVector;
		 
		}, 1000);
	}
}

var liebnizCurrentRank;
function VectorSerieLiebnizStepDraw(){

	liebnizCurrentRank = liebnizCurrentRank+1;
	var newVector = serieLiebniz(lastLiebnizVector,liebnizCurrentRank);
	drawVector(newVector,lastLiebnizVector);
	lastLiebnizVector = newVector;

}