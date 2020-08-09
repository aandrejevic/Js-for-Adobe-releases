#target indesign;


//global variables
var set = new Object();
var myObjectList = new Array;

var myGutter = 2;

main();

////////////////////////// F U N C T I O N S //////////////////////////
function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	if (app.documents.length != 0){
		if (app.selection.length != 0){
			for(var myCounter = 0;myCounter < app.selection.length; myCounter++){
				switch (app.selection[myCounter].constructor.name){
					case "Rectangle":
					case "TextFrame":
					case "Oval":
					case "Polygon":
					case "GraphicLine":
					case "Group":
					case "PageItem":
					myObjectList.push(app.selection[myCounter]);
					break;
				}
			}
            if (myObjectList.length != 0){
				displayDialog(myObjectList);
            }
            else{
				alert ("Select a rectangle or text frame and try again.");
			}
		}
		else{
			alert ("Select a frame and try again.");
		}
	}
	else{
		alert ("Open a document, select a frame and try again.");
	}
}

function displayDialog(myObjectList){
	//dialog
	var myWindow = new Window ("dialog","Frame divider");
	myWindow.orientation = "row";
	myWindow.alignChildren = "top";
		var td00 = myWindow.add ("group");
			td00.orientation = "column";
			td00.alignChildren = "right";
			var tr00 = td00.add ("statictext", undefined, "Devision:");
				tr00.minimumSize = [0,20];
			var tr01 = td00.add ("statictext", undefined, "Horizontal");
				tr01.minimumSize = [0,20];
			var tr02 = td00.add ("statictext", undefined, "Vertical");
				tr02.minimumSize = [0,20];
		//	var tr03 = td00.add ("statictext", undefined, "Size:");
		//		tr03.minimumSize = [0,20];
		//	var tr04 = td00.add ("statictext", undefined, "Horizontal");
		//		tr04.minimumSize = [0,20];
		//	var tr05 = td00.add ("statictext", undefined, "Vertical");
		//		tr05.minimumSize = [0,20];

		var td20 = myWindow.add ("group");
			td20.orientation = "column";
			var tr20 = td20.add ("statictext", undefined, "Max");
			var hmax = td20.add ("edittext", undefined, String( Math.floor(Math.random()*25)+1 ) );
				hmax.characters = 4;
			var vmax = td20.add ("edittext", undefined, String( Math.floor(Math.random()*25)+1 ) );
				vmax.characters = 4;
		//	var tr23 = td20.add ("statictext", undefined, "Max");
		//	var hsmax = td20.add ("edittext", undefined, 0);
		//		hsmax.characters = 4;
		//	var vsmax = td20.add ("edittext", undefined, 0);
		//		vsmax.characters = 4;

		var td10 = myWindow.add ("group");
			td10.orientation = "column";
			var tr10 = td10.add ("statictext", undefined, "Min");
			var hmin = td10.add ("edittext", undefined, String( Math.floor(Math.random()*25)+1 ) );
				hmin.characters = 4;
			var vmin = td10.add ("edittext", undefined, String( Math.floor(Math.random()*25)+1 ) );
				vmin.characters = 4;
		//	var tr13 = td10.add ("statictext", undefined, "Min");
		//	var hsmin = td10.add ("edittext", undefined, 0);
		//		hsmin.characters = 4;
		//	var vsmin = td10.add ("edittext", undefined, 0);
		//		vsmin.characters = 4;

		var td30 = myWindow.add ("group");
			td30.orientation = "column";
			td30.alignChildren = "center";
			var tr30 = td30.add ("statictext", undefined, "Noise");
				tr30.minimumSize = [0,20];
			var slideH31 = td30.add ("slider", undefined, 0, 0, 100);
				slideH31.minimumSize = [0,20];
			var slideV32 = td30.add ("slider", undefined, 0, 0, 100);
				slideV32.minimumSize = [0,20];
			var checkShuffle = td30.add ("checkbox", undefined, "Shuffle");
				//checkShuffle.value = true;

		var td40 = myWindow.add ("group");
			td40.orientation = "column";
			var tr40 = td40.add ("statictext", undefined, " ");
				tr40.minimumSize = [0,20];
			var tr41 = td40.add ("statictext", undefined, "0%");
				tr41.characters = 4;
			var tr42 = td40.add ("statictext", undefined, "0%");
				tr42.characters = 4;

		var td50 = myWindow.add ("group");
			td50.orientation = "column";
			td50.alignChildren = "center";
			var tr50 = td50.add ("statictext", undefined, "Content Shift");
				tr50.minimumSize = [0,20];
			var slideH51 = td50.add ("slider", undefined, 0, 0, 100);
				slideH51.minimumSize = [0,20];
			var slideV52 = td50.add ("slider", undefined, 0, 0, 100);
				slideV52.minimumSize = [0,20];
		//	var checkShuffle = td50.add ("checkbox", undefined, "Shuffle");
		//		checkShuffle.value = true;

		var td60 = myWindow.add ("group");
			td60.orientation = "column";
			var tr60 = td60.add ("statictext", undefined, " ");
				tr60.minimumSize = [0,20];
			var tr61 = td60.add ("statictext", undefined, "0%");
				tr61.characters = 4;
			var tr62 = td60.add ("statictext", undefined, "0%");
				tr62.characters = 4;

		var td70 = myWindow.add ("group");
			td70.orientation = "column";
			var tr70 = td70.add ("statictext", undefined, "Gutter");
				tr70.minimumSize = [0,20];
			var tr71 = td70.add ("edittext", undefined, "0");
				tr71.characters = 4;
			var tr72 = td70.add ("edittext", undefined, "0");
				tr72.characters = 4;

		var td80 = myWindow.add ("group");
			td80.orientation = "column";
			td80.add ("button", undefined, "OK");
			td80.add ("button", undefined, "Cancel");

		//dialog functions
		slideH31.onChange = function () {tr41.text = slideH31.value + "%";} //devision
		slideV32.onChange = function () {tr42.text = slideV32.value + "%";} //devision
		slideH51.onChange = function () {tr61.text = this.value + "%"; tr62.text = this.value + "%"; slideV52.value = this.value;} //shift
		slideV52.onChange = function () {tr62.text = this.value + "%"; tr61.text = this.value + "%"; slideH51.value = this.value;} //shift

	function reverse(){
		var textfields = [hmax,hmin,vmax,vmin];
		var len = textfields.length;
		//compare
		for(i=0; i<len; i++){
			if(i%2){ //field count
				var a = NaN20(parseInt(textfields[i].text)); //min
				var b = NaN20(parseInt(textfields[i-1].text)); //max
				if (a >= b) {
					textfields[i].text = b;
					textfields[i-1].text = a;
				} else {
					textfields[i].text = a;
					textfields[i-1].text = b;
				}
			}
		}
	}

	reverse(); // Makes sure random numbers are on the correct spot.
	var myReturn = myWindow.show();

	if (myReturn == true){
		reverse(); // Makes sure random numbers are on the correct spot.
		//Get the values from the dialog box.
		var minHdivide = parseInt(hmin.text),
			maxHdivide = parseInt(hmax.text),
			minVdivide = parseInt(vmin.text),
			maxVdivide = parseInt(vmax.text),
			imgOffset = slideH51.value;
			myShuffle = checkShuffle.value;
		set.noiH = slideH31.value;
		set.noiV = slideV32.value;
		set.vDev = randomXToY(minVdivide,maxVdivide);
		set.hDev = randomXToY(minHdivide,maxHdivide);
		set.hGut = parseFloat(tr71.text)/2;
		set.vGut = parseFloat(tr72.text)/2;

		//let’s do it!
		var total = myObjectList.length-1;
		for(var t=total; t>=0; t--){
			var cake = getDetails(myObjectList[t]);
			var cakesize = percentOf(cake.w, imgOffset);

			var VertSlices = divide(getDetails(myObjectList[t]),set,true); //cake
			if(myObjectList[t].contentType == ContentType.GRAPHIC_TYPE){
				if(myObjectList[t].graphics.length > 0){
					contentshift(VertSlices, false, cakesize);
				}
			}

			//Before we start cutting vertically, lets calculate the cuts
			var cuts = divide(getDetails(myObjectList[t]),set,false);
			var slicecount = VertSlices.length-1;
			for(var sc=slicecount; sc>=0; sc--){
				var HorzSlices = slice(getDetails(VertSlices[sc]), cuts, false, myShuffle);
				if(myObjectList[t].contentType == ContentType.GRAPHIC_TYPE){
					if(myObjectList[t].graphics.length > 0){
						contentshift(HorzSlices, true, cakesize);
					}
				}
			}
		}
	}
}


function sortCake(cake,X){
    // sort function
    var sort = function (prop, bound, arr) {
        prop = prop.split('.');
        var len = prop.length;
        arr.sort(function (a, b) {
            var i = 0;
            while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
            if (a[bound] < b[bound]) {
                return -1;
            } else if (a[bound] > b[bound]) {
                return 1;
            } else {
                return 0;
            }
        });
        return arr;
    };
    if(X){
        return sort("geometricBounds",1,cake);
    } else {
        return sort("geometricBounds",0,cake);
    }
}

function contentshift(cake, X, cakesize){
    // Make slices are sorted on either X or Y
    sortCake(cake, X);
	var slices = cake.length;

	var turnpoint = Math.floor(slices/2);
    var step = cakesize/slices;
	var move = step;

	//do one side
	for (var slice = turnpoint-1; slice >= 0; slice--){
		var img = cake[slice].graphics[0];
		shift(img, -move, X);
		move+=step;
	}

	//then the other
	move = step; //clean
	for (var slice = turnpoint+1; slice < slices; slice++){
		var img = cake[slice].graphics[0];
		shift(img, move, X);
		move+=step;
	}
}

function shift(img, offset, X){ //PARAMS: image (GRAPHIC), offset (FLOAT), X or Y (BOOLEAN)
	if(X){
		x = img.geometricBounds[1] + offset;
		y = img.geometricBounds[0];
	} else { //Y
		x = img.geometricBounds[1];
		y = img.geometricBounds[0] + offset;
	}
	img.move([x,y]);
}

function divide(item, set, cutHorizontal){
	if(cutHorizontal === true){
		var myBounds1 = 0,
			myBounds2 = 2,
			myItemLength = item.h,
			mydivide = set.vDev,
			myNoise = set.noiV;
	}else{ //false //cut vertical
		var myBounds1 = 1;
			myBounds2 = 3;
			myItemLength = item.w,
			mydivide = set.hDev,
			myNoise = set.noiH;
	}
	//start with deviding vertically
	var cuts = new Array;
	var neatcut = myItemLength/mydivide;
	cuts.push(item.bounds[myBounds1]);
	cuts.push(item.bounds[myBounds2]);

	len = mydivide-1
	for(var i=len; i>=1; i--){
		var noise = percentOf(neatcut, myNoise)/2;
		var cut = randomXToY(neatcut-noise,neatcut+noise);
		//always cut from the biggest piece
		var bigCut = getBigCut(cuts);
		if(bigCut-cut > item.bounds[myBounds1] && bigCut-cut < item.bounds[myBounds2]){
			cuts.push(bigCut-cut);
		} else if(bigCut+cut > item.bounds[myBounds1] && bigCut+cut < item.bounds[myBounds2]){
			cuts.push(bigCut+cut);
		}
	}
	//make sure cuts are sorted! *important* makes sure cuts[0] && cuts[-1] are the outer edges
	cuts.sort(function(a,b){return a - b});
	//cut or not but return the slices
	if(cutHorizontal === true){
		cuts = juggleCuts(cuts);
		return slice(item,cuts,cutHorizontal, true);
	}else{
		cuts = juggleCuts(cuts);
		return(cuts); //only calculate so we can cut them all the same or not
	}
}

function slice(item, cuts, cutHorizontal, shufflenow){

	if(shufflenow == true){
		cuts = juggleCuts(cuts);
	}
	var cake = new Array(),
		TLy = item.bounds[0], //top left y
		TLx = item.bounds[1], //top left x
		BRy = item.bounds[2], //bottom right y
		BRx = item.bounds[3]; //bottom right x
	//do first one
	if(cutHorizontal === true){
		var myArray = [TLy+set.hGut,TLx,doRound(cuts[1],3)-set.hGut,BRx];
	} else {
		var myArray = [TLy,TLx+set.vGut,BRy,doRound(cuts[1],3)-set.vGut];
	}
	item.obj.geometricBounds = myArray; // Coordinates of the top-left and bottom-right corners of the bounding box.

	cake.push(item.obj); //push first slice to cake

	var cutCount = cuts.length-2;
	for(var i=cutCount; i>=1; i--){
		var slice = item.obj.duplicate();
		if( doRound(cuts[i],3) != doRound(cuts[i+1],3) ){
			if(cutHorizontal === true){
				myArray = [doRound(cuts[i],3)+set.hGut,doRound(TLx,3),doRound(cuts[i+1],3)-set.hGut,doRound(BRx,3)];
			} else { //cut vertical
				myArray = [doRound(TLy,3),doRound(cuts[i],3)+set.vGut,doRound(BRy,3),doRound(cuts[i+1],3)-set.vGut];
			}
			try{
				slice.geometricBounds = myArray;
			} catch(e){
				alert(e.description);
				alert(myArray);
			}
		}
		cake.push(slice);
	}
	return cake;
}

function getBigCut(cuts){
	//returns the endmarker of the biggest slice
	cuts.sort(function(a,b){return a - b});
	len = cuts.length-1;
	var piece = 0;
	var sliceEnd = 0;
	for(var i=len; i>0; i--){
		var sliceStart = cuts[i];
		var sliceEnds = cuts[i-1];
		var dist = sliceStart - sliceEnds;
		if(dist > piece){ piece = dist; sliceEnd = sliceStart}
	}
	if(piece < cuts[1]-cuts[0]){ //don’t forget to include the first one
		return cuts[1];
	} else {
		return sliceEnd;
	}
}

function getDetails(myObject){
	item = new Object();
	item.obj = myObject;
	item.bounds = item.obj.geometricBounds;
	//[y1, x1, y2, x2] Coordinates of the top-left and bottom-right corners of the bounding box.
	item.w = item.bounds[3]-item.bounds[1];
	item.h = item.bounds[2]-item.bounds[0];
	item.x = item.bounds[1];
	item.y = item.bounds[0];
	return item;
}

function juggleCuts(cuts){
	//normalise cuts then juggle then normalise and return
	var cutCount = cuts.length;
	if(cutCount > 4){
		//get widthvalues
		var slices = new Array();
		for(var i = 0; i <= cutCount-2; i++){
			slices.push(cuts[i+1]-cuts[i]);
		}
		shuffle(slices);

		//let’s recalculate the cuts
		var juggledCuts = new Array();
		var keypoint = cuts[0];
		juggledCuts.push(keypoint); //first one (edge)
		for(var i = 1; i <= cutCount-2; i++){
			keypoint += slices[i];
			juggledCuts.push(keypoint);
		}
		juggledCuts.push(cuts[cutCount-1]); //last one (edge)
		juggledCuts.sort(function(a,b){return a - b});
		return juggledCuts;
	}
	return cuts;
}

//-------------------- TRANSFORM
function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

//------------------- CONVERSION

function NaN20(no){
    if(isNaN(no)){
        return 0;
    } else {
        return no;
    }
}
//------------------- MATH

function doRoundArray(myArray, roundDec) {
	var len = myArray.length-1;
	for (var i=len; i >= 0; i--){
		myArray[i] = doRound(myArray[i],roundDec);
	}
	return myArray;
}
function doRound(myNum, roundDec) {
	var roundMulit = Math.pow(10,roundDec);
	return Math.round(myNum*roundMulit)/roundMulit;
}
function randomXToY(minVal,maxVal,floatVal) {
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}
function percentOf(num, percentage){
  return (percentage / 100) * num;
}
