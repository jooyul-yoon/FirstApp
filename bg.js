const body = document.querySelector("body")

const IMG_NUMBER = 3;

function handleImgLoad() {
    console.log("Finish laoding")

}
function paintImage(imgNumber){
    const image = new Image();
    image.src = `img/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
    
}

function genRandom() {
    const number = 1 + Math.floor(Math.random() * 3);
    return number
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();