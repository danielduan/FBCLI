/*
 * Edited by DBOnline for Facebook SoCal Hackathon 2013
 *
 * jsAscii 0.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
 */

var jsAscii = (function() {

	var aDefaultCharList = (" .,:;i1tfLCG08@").split("");
	var aDefaultColorCharList = (" CGO08@").split("");
	var strFont = "courier new";


	// convert img element to ascii
	function asciifyImage(oImg, oCanvasImg) 
	{
		var oCanvas = document.createElement("canvas");
		if (!oCanvas.getContext) {
			return;
		}
		var oCtx = oCanvas.getContext("2d");
		if (!oCtx.getImageData) {
			return;
		}
		
		var iScale = 5;
		var strResolution = "high";
		var aCharList = aDefaultCharList;

		var fResolution = 1;


		var iWidth = Math.round(parseInt(oImg.offsetWidth) * fResolution);
		var iHeight = Math.round(parseInt(oImg.offsetHeight) * fResolution);


		oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
		var oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;
	
		var strChars = "";

		for (var y=0;y<iHeight;y+=2) {
			for (var x=0;x<iWidth;x++) {
				var iOffset = (y*iWidth + x) * 4;
	
				var iRed = oImgData[iOffset];
				var iGreen = oImgData[iOffset + 1];
				var iBlue = oImgData[iOffset + 2];
				var iAlpha = oImgData[iOffset + 3];
	

				var fBrightness = (0.3*iRed + 0.59*iGreen + 0.11*iBlue) / 255;
				var iCharIdx = (aCharList.length-1) - Math.round(fBrightness * (aCharList.length-1));

				var strThisChar = aCharList[iCharIdx];

				if (strThisChar == " ") 
					strThisChar = "&nbsp;";

					strChars += strThisChar;
			}
			//strChars += "<br/>";
			console.log(strChars);
			strChars = "";
		}


		// can't get a span or div to flow like an img element, but a table works?
		//console.log(strChars);

	}

	// load the image file
	function asciifyImageLoad(oImg)
	{
		var oCanvasImg = new Image();
		oCanvasImg.src = oImg.src;
		if (oCanvasImg.complete) {
			asciifyImage(oImg, oCanvasImg);
		} else {
			oCanvasImg.onload = function() {
				asciifyImage(oImg, oCanvasImg)
			}
		}
	}

	return function() {
		var aImg = document.getElementsByTagName("img");
		var aImages = [];
		for (var i=0;i<aImg.length;i++) {
			aImages[i] = aImg[i];
		}

		for (var i=0;i<aImages.length;i++) {
			if (aImages[i].getAttribute("asciify") == "true") {
				asciifyImageLoad(aImages[i]);
			}
		}
	}
	
})();


if (window.addEventListener) { 
	window.addEventListener("load", jsAscii, false); 
} else if (window.attachEvent) { 
	window.attachEvent("onload", jsAscii); 
}

