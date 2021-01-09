const listImages = [
    "browser.svg",
    "chrome.svg",
    "firefox.svg",
    "globe.svg",
    "ie.svg",
    "opera.svg",
    "safari.svg",
    "safari2.svg",
    "share.svg",
    "tor.svg"
];

export function getRandomListImage(number) {
    
    let randomList = [];

    if(number < 2 || number > listImages.length) {
        console.error("Parameter 'numberImage' on grid-image is too lower or too high");
    }

    while(randomList.length < number) {
        let chooseImage = listImages[Math.floor(Math.random()*listImages.length)];
        if(randomList.indexOf(chooseImage) === -1) {
            randomList.push(chooseImage);
        }
    }

    return randomList;
}