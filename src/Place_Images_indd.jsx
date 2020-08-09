#target indesign
var myDialogResult = CreateDialog();
if (myDialogResult == undefined) exit();
CheckIfChosenFoldersExist();
var myIndFiles = [];
var mySubFolders = [];
CheckFolder(myDialogResult.indFolder);
if (myIndFiles.length == 0) err("No InDesign files have been found in the selected folder and its subfolders.");
var myStartFolder = myDialogResult.imagesFolder;

mySubFolders = getSubFolders(myStartFolder);

WriteToFile("\r--------------------- Script started -- " + GetDate() + "---------------------\n");
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract;

for (f = 0; f < myIndFiles.length; f++) {
	WriteToFile(f + " " + myIndFiles[f]+ "\n");
	ProcessIndFile(myIndFiles[f]);
}

app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
app.findGrepPreferences = app.changeGrepPreferences = null;
WriteToFile("--------------------- Script finished -- " + GetDate() + "---------------------\r\r");
alert("All done!");
// ------------------------------------------------- FUNCTIONS ------------------------------------------------- 
function PlaceImages() {
	WriteToFile("PlaceImages" + "\n");
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = '([0-9A-Za-z_?.]*)';
	var myFoundItems = app.activeDocument.findGrep();
	WriteToFile("app.activeDocument "+app.activeDocument+ "\n");
	WriteToFile("PlaceImages Length "+myFoundItems.length+ "\n");
	for (i = 0; i < myFoundItems.length; i++) {
		var myName = myFoundItems[i].contents.replace (/@/g, "");		
		var myFile = new File(myDialogResult.imagesFolder + "/" + myName);
		var myFrame = myFoundItems[i].parentTextFrames[0];
		
		if (myFile.exists) {
			WriteToFile("myFile.exists "+ myFrame+" "+myFile+"\n");
			PlaceIntoFrame(myFrame, myFile);
			continue;
		}

		if (!SearchInSubfolders(myName, myFrame)) {
			WriteToFile("\tNOT FOUND  -- " + myFile.fsName + "\n");
		}
	}
}
//--------------------------------------------------------------------------------------------------------------
function SearchInSubfolders(myName, myFrame) {
	for (j = 0; j < mySubFolders.length; j++) {
		var myFolder = mySubFolders[j];
		var myFile = new File(myFolder + "/" + myName);
		if (myFile.exists) {
			PlaceIntoFrame(myFrame, myFile);
			return true;
		}
	}
	return false;
}
//-------------------------------------------------------------------------------------------------------------- 
function PlaceIntoFrame(myFrame, myFile) {
	try {
		if (myFrame.characters.length < 100) {
			myFrame.getElements()[0].place(myFile);
			
			switch(myDialogResult.myRadSelected)	{
				case 2:
					myFrame.fit(FitOptions.CENTER_CONTENT);
				break;

				case 3:
					myFrame.fit(FitOptions.FRAME_TO_CONTENT);
				break;
				
				case 4:
					myFrame.fit(FitOptions.PROPORTIONALLY);
                      myFrame.fit(FitOptions.CENTER_CONTENT);
				break;
				
				default:
				// do nothing
			}
		}
		
		WriteToFile("\tPlaced -- " + myFile.fsName+ "\n");
	}
	catch(e) {
		WriteToFile("\tSome error occured while placing -- " + myFile.fsName + "\n");
	}
}
//--------------------------------------------------------------------------------------------------------------
function CheckFolder(folder) {
	var fileList = folder.getFiles()
	for (var i = 0; i < fileList.length; i++) {
		var file = fileList[i];
		if (file instanceof File && file.name.match(/\.indd$/i)) {
			myIndFiles.push(file);
		}
		else if (file instanceof Folder) {
			CheckFolder(file);
		}
	}
}
//--------------------------------------------------------------------------------------------------------------
function getSubFolders(theFolder) {
	var myFileList = theFolder.getFiles();
	for (var i = 0; i < myFileList.length; i++) {
		var myFile = myFileList[i];
		if (myFile instanceof Folder){
			mySubFolders.push(myFile.absoluteURI);
			getSubFolders(myFile);
		}
	}
	return mySubFolders;
}
//--------------------------------------------------------------------------------------------------------------
function err(e, icon){
	alert(e, "Place Images Script", icon);
	exit();
}

function ProcessIndFile(myFile) {
	WriteToFile("ProcessIndFile" + "\n");
	try {
		var myDoc = app.open(myFile);
		WriteToFile(myDoc.name + "\n");
		var myNewFile = new File(myFile.fsName.replace(/\.indd$/i, ".indd.bak"));
		myFile.copy(myNewFile);
	}
	catch(e) {
		WriteToFile("Cannot open file -- " + myFile.fsName + "\nError: " + e.message + " (Error# " + e.number  + ")\n");
	}
	WriteToFile("~ProcessIndFile" + "\n");
	PlaceImages();
	myDoc = myDoc.save();
	myDoc.close();
	WriteToFile("~~ProcessIndFile" + "\n");
}
//--------------------------------------------------------------------------------------------------------------
function CreateDialog() {
	var myIndFolder, myImagesFolder;
	if (app.extractLabel("Kas_PlaceImages_IndFolderPath") != "") {
		var myIndFolderPath = app.extractLabel("Kas_PlaceImages_IndFolderPath");
	}
	else {
		var myIndFolderPath = "No folder has been selected";
	}
	if (app.extractLabel("Kas_PlaceImages_ImageFolderPath") != "") {
		var myImageFolderPath = app.extractLabel("Kas_PlaceImages_ImageFolderPath");
	}
	else {
		var myImageFolderPath = "No folder has been selected";
	}
	var myDialog = new Window('dialog', 'Place Images');
	myDialog.orientation = 'row';
	myDialog.alignChildren = 'top';
	var myPanel = myDialog.add('panel', undefined, 'Choose folders for:');
	var myIndFolderStTxt = myPanel.add('statictext', undefined, myIndFolderPath);
	var myButtonInd = myPanel.add('button', undefined, 'InDesign files', {name:'indd'});
	var myImagesFolderStTxt = myPanel.add('statictext', undefined, myImageFolderPath);
	var myButtonImages = myPanel.add('button', undefined, 'Image files', {name:'images'});
	
	var myGroup = myDialog.add('group');
	myGroup.orientation = 'column';
	var myRadioPanel = myGroup.add('panel', undefined, 'After placing:');
	myRadioPanel.alignChildren = 'left';
	var myRadioBtn1 = myRadioPanel.add('radiobutton', undefined, 'do nothing');
	var myRadioBtn2 = myRadioPanel.add('radiobutton', undefined, 'center content');
	var myRadioBtn3 = myRadioPanel.add('radiobutton', undefined, 'fit frame to content');
	var myRadioBtn4 = myRadioPanel.add('radiobutton', undefined, 'fit content proportionally');
	
	if (app.extractLabel("Kas_PlaceImages_RadioSelected") != "") {
		eval("myRadioBtn" + app.extractLabel("Kas_PlaceImages_RadioSelected") + ".value= true");
	}
	else {
		myRadioBtn1.value = true;
	}
	
	var myOkCancelGroup = myGroup.add('group');
	myOkCancelGroup.orientation = 'row';
	var myOkBtn = myOkCancelGroup.add('button', undefined, 'Place', {name:'ok'});
	var myCancelBtn = myOkCancelGroup.add('button', undefined, 'Quit', {name:'cancel'});

	myButtonInd.onClick = function() {
		myIndFolder = Folder.selectDialog ('Chose a folder for InDesign documents');
		if (myIndFolder != null) {
			myIndFolderStTxt.text = myIndFolder.fsName;
		}
	}
	myButtonImages.onClick = function() {
		myImagesFolder = Folder.selectDialog ('Chose a folder for Images');
		if (myImagesFolder != null) {
			myImagesFolderStTxt.text = myImagesFolder.fsName;
		}
	}
	var myShowDialog = myDialog.show();

	if (myIndFolder == undefined) {
		if (myIndFolderStTxt.text == "No folder has been selected") {
			myIndFolder = null;
		}
		else {
			myIndFolder = new Folder(myIndFolderStTxt.text);
		}
	}

	if (myImagesFolder == undefined) {
		if (myImagesFolderStTxt.text == "No folder has been selected") {
			myImagesFolder = null;
		}
		else {
			myImagesFolder = new Folder(myImagesFolderStTxt.text);
		}
	}

	var myRadSelected;
	if (myRadioBtn1.value) {
		myRadSelected = 1;
	}
	else if(myRadioBtn2.value) {
		myRadSelected = 2;
	}
	else if(myRadioBtn3.value) {
		myRadSelected = 3;
	}
	else if(myRadioBtn4.value) {
		myRadSelected = 4;
	}

	app.insertLabel("Kas_PlaceImages_RadioSelected", myRadSelected + "");
	app.insertLabel("Kas_PlaceImages_IndFolderPath", myIndFolderStTxt.text);
	app.insertLabel("Kas_PlaceImages_ImageFolderPath", myImagesFolderStTxt.text);
	
	if (myShowDialog== 1) {
		var myResult = {};
		myResult.indFolder = myIndFolder;
		myResult.imagesFolder = myImagesFolder;
		myResult.myRadSelected = myRadSelected;
	}
	return myResult;
}
//--------------------------------------------------------------------------------------------------------------
function WriteToFile(myText) {
	myFile = new File(myDialogResult.indFolder+"/PlaceImagesReport.txt");
	if ( myFile.exists ) {
		myFile.open("e");
		myFile.seek(0, 2);
	}
	else {
		myFile.open("w");
	}
	myFile.write(myText); 
	myFile.close();
}
//--------------------------------------------------------------------------------------------------------------
function GetDate() {
	var myDate = new Date();
	if ((myDate.getYear() - 100) < 10) {
		var myYear = "0" + new String((myDate.getYear() - 100));
	} else {
		var myYear = new String ((myDate.getYear() - 100));
	}
	var myDateString = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myYear + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
	return myDateString;
 }
//--------------------------------------------------------------------------------------------------------------
function CheckIfChosenFoldersExist() {
	 if (myDialogResult.indFolder == null) {
		err("No folder has been chosen for InDesign files.", true);
	}
	else if (myDialogResult.indFolder.constructor.name == "Folder") {
		if (!myDialogResult.indFolder.exists) {
			err("Folder \"" + myDialogResult.indFolder.fsName + "\" chosen for InDesign files does not exist.", true);
		}
	}

	if (myDialogResult.imagesFolder == null) {
		err("No folder has been chosen for pictures.", true);
	}
	else if (myDialogResult.imagesFolder.constructor.name == "Folder") {
		if (!myDialogResult.imagesFolder.exists) {
			err("Folder \"" + myDialogResult.imagesFolder.fsName + "\" chosen for images does not exist.", true);
		}
	}
}