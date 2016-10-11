// comment

var makeRequest = function( url, callback ) {
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.onload = callback;
  request.send();
}


var requestComplete = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var bones = JSON.parse(jsonString);
  console.log(bones);

  var createInfoHeader = function( text ) {
    var infoHeader = document.createElement('h4');
    infoHeader.className = "info_header";
    infoHeader.innerText = text;
    return infoHeader;
  }

  var createInfoImg = function( imgSrc ) {
    var infoImg = document.createElement( "img" );
    infoImg.setAttribute( "src", imgSrc );
    infoImg.setAttribute( "width", 100 );
    return infoImg;
  }

  var createInfoParagraph = function( text ) {
    var infoParagraph = document.createElement('p');
    infoParagraph.className = "info_paragraph";
    infoParagraph.innerText = text;
    return infoParagraph;
  }

  var appendElements = function( div, header, paragraph, img ) {
    div.appendChild( header );
    div.appendChild( img );
    div.appendChild( paragraph );
  }

  var createInfoWindow = function( headerText, paragraphText, imgSrc ) {
    var infoHeader = createInfoHeader( headerText );
    var infoImg = createInfoImg( imgSrc )
    var infoParagraph = createInfoParagraph( paragraphText );
    var infoWindow = document.querySelector("#info_container");
    // var createCloseButton = <a class="close" href="#">[X]<
    infoWindow.innerHTML = "";
    appendElements( infoWindow, infoHeader, infoImg, infoParagraph );
  }

  var overlay = function() {
    overlayDiv = document.getElementById("overlay");
    overlayDiv.style.visibility = (overlayDiv.style.visibility == "visible") ? "hidden" : "visible";
  }

  var handleSkeletonButtonClick = function() {
    var boneIndex = parseInt(this.className);
    var bone = bones[boneIndex];
    console.log(bone);
    createInfoWindow( bone.name, bone.fact, bone.image );
    overlay();
  }

  var addEventListenersToButtons = function() {
    var skeletonButtons = document.querySelectorAll( ".skeleton_button" );
    for ( var i = 0; i < skeletonButtons.length; i++ ) {
      skeletonButtons[i].addEventListener( "click", handleSkeletonButtonClick );
    }
  }

  var handleNavButtonClick = function() {
    var imageContainer = document.querySelector("#image_container");
    console.log(imageContainer);
    // imageContainer.style.backgroundImage = 'url("./images/fibia.png")';
    var bodyImage = window.getComputedStyle(imageContainer).getPropertyValue("background-image");
    console.log(bodyImage);
    bodyImage = 'url("./images/fibia.png")';
    bodyImage = 'url("http://localhost:3000/public/images/flesh.png")';
    console.log(bodyImage);
  }

  var addEventListenersToNavButtons = function() {
    var navButtons = document.querySelectorAll(".nav_button");
    for (var i = 0; i < navButtons.length; i++ ) {
      navButtons[i].addEventListener("click", handleNavButtonClick);
    }
  }

  addEventListenersToButtons();
  addEventListenersToNavButtons();

}


var app = function() {
  var url = "http://localhost:3000/api/bones";
  makeRequest( url, requestComplete );
}

window.onload = app;