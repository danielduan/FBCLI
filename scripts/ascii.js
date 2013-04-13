function asciifyImage(oImg, oCanvasImg) 
	{
		//console.log('asciifyImage');
		//console.log(oImg);
		//console.log(oCanvasImg);
		var aDefaultCharList = (" .,:;i1tfLCG08@").split("");
		var aDefaultColorCharList = (" CGO08@").split("");
		var strFont = "courier new";
	
		var oCanvas = document.createElement("canvas");
		if (!oCanvas.getContext) {
			//console.log('no context');
			return;
		}
		var oCtx = oCanvas.getContext("2d");
		if (!oCtx.getImageData) {
			//console.log('getImageData');
			return;
		}
		
		var iScale = 5;
		var bColor = true;
		var strResolution = "high";
		var aCharList = aDefaultCharList;

		var fResolution = 1;


		var iWidth = Math.round(parseInt(oImg.width) * fResolution);
		var iHeight = Math.round(parseInt(oImg.height) * fResolution);


		oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
		var oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;
		//console.log(oImgData);
		var strChars = "";

		for (var y=0;y<iHeight;y+=2) {
			for (var x=0;x<iWidth;x++) {
				var iOffset = (y*iWidth + x) * 4;
	
				var iRed = oImgData[iOffset];
				var iGreen = oImgData[iOffset + 1];
				var iBlue = oImgData[iOffset + 2];
				var iAlpha = oImgData[iOffset + 3];
	
				if (iAlpha == 0) {
					var iBrightIdx = 0;
				} else {
					var fBrightness = (0.3*iRed + 0.59*iGreen + 0.11*iBlue) / 255;
					var iCharIdx = (aCharList.length-1) - Math.round(fBrightness * (aCharList.length-1));
				}

				var strThisChar = aCharList[iCharIdx];
				//console.log(strThisChar);
				if (strThisChar == " ") 
					strThisChar = "&nbsp;";

				if (bColor) {
					strChars += "<span style='"
						+ "color:rgb("+iRed+","+iGreen+","+iBlue+");"
						
						
						+ "'>" + strThisChar + "</span>";
				} else {
					strChars += strThisChar;
				}
			//console.log(strChars);
		}
	strChars += "<br/>";
}

		console.log(strChars);
		return strChars;
}

	// load the image file
	function asciifyImageLoad(oImg)
	{
		var oCanvasImg = new Image();
		oCanvasImg.src = oImg.src;
		if (oCanvasImg.complete) {
			//console.log('complete');
			return asciifyImage(oImg, oCanvasImg);
		} else {
			//console.log('onload');
			oCanvasImg.onload = function() {
				return asciifyImage(oImg, oCanvasImg)
			}
		}
	}
	
	function asciifyImageURL(uid)
	{
		var img = new Image();
		var url = "scripts/img.php?url=http://graph.facebook.com/"+uid+"/picture";
		img.src = url;
		return asciifyImageLoad(img);
	}

