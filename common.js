const wrap = document.querySelector("#wrap")
const imgWrap = document.querySelector("#imgWrap")
const imgList= document.querySelector("#imgList")
const list = document.querySelectorAll("#imgList li")
const dir = document.querySelectorAll("#dirWrap a")
const bullets = document.querySelectorAll("#bulletWrap a")
let liWidth = list[0].offsetWidth;
let timer;
// console.log(liWidth)
// console.log(wrap, imgWrap, imgList, list, dir, bullets)
timer = setInterval(moveLeft, 4000);
let imgNames = [
    "image2/ironMan.png",
    "image2/jake.png",
    "image2/koya.png",
    "image2/mummy.png",
    "image2/scream.png",
    "image2/spongebob.png",
    "image2/superMario.png"
]
let imgArr = new Array();
for (let i=0; i<imgNames.length; i++) {
    imgArr[i] = new Image();
    imgArr[i].src = imgNames[i];
}
// console.log(imgArr[0])
for (let j=0; j<imgNames.length; j++) {
    list[j].style.backgroundImage = "url(" + imgNames[j] + ")"
}
let num = 0;
// < 클릭 시
// margin -liWidth px 이동 transition-duration=0s list[6] 이 가장 앞으로
// setTimeout(1) margin = 0px transition-duration=0.5s
dir[0].onclick = function () {
    moveRight();
    clearInterval(timer);
    timer = setInterval(moveLeft, 4000);
}
function moveRight() {
    imgList.style.marginLeft = "-" + liWidth + "px"
    imgList.style.transitionDuration = "0s"
    if (num == 0) num = 7;
    num--;
    imgList.prepend(list[num])
    setTimeout(function() {
        imgList.style.marginLeft = "0px";
        imgList.style.transitionDuration = "0.5s"
        setTimeout(bulletOn, 499)
    }, 1)
}
// > 클릭 시
// margin -liWidth px 이동 transition-duration=0.5s
// setTimeout(500) margin = 0px transition-duration=0s list[0] 이 가장 뒤로
dir[1].onclick = function () {
    moveLeft();
    clearInterval(timer);
    timer = setInterval(moveLeft, 4000);
}
function moveLeft() {
    imgList.style.marginLeft = "-" + liWidth + "px"
    imgList.style.transitionDuration = "0.5s"
    setTimeout(function() {
        imgList.style.marginLeft = "0px"
        imgList.style.transitionDuration = "0s"
        imgList.appendChild(list[num])
        if (num == 6) num = -1;
        num++;
        bulletOn();
    }, 500)
}
bulletOn();
// 이미지 0번일 때 0번 bullet 불 켜기
function bulletOn() {
    for (let a=0; a<bullets.length; a++) {
        if (a == num) bullets[a].style.backgroundImage = "url(image2/bullet20.png)"
        else bullets[a].style.backgroundImage = "url(image2/bullet20_b.png)"
    }
}
// bullet 클릭 시
// 0, 1, 2, 3, 4, 5, 6 클릭 시
// 각 번호대로 현재 번호에다가 liWidth를 곱한만큼 더해야한다.
// num = 0 bullet = 5 num-bNum = -5 -> 먼저 marginLeft = -liWidth*5px만큼 이동 transition-duration=0.5s
// 그 후, list[0] - list[4]까지 0부터 뒤로 보내고, marginLeft = 0px transition-duration=0s

// num = 4 bullet = 1 num-bNum = 3 -> list[1] - list[3]까지 3부터 앞으로 보내고, marginLeft = -liWidth*3px transition-duration=0s
// 그 후, marginLeft = 0px transition-duration=0.5s

for (let b=0; b<bullets.length; b++) {
    bullets[b].onclick = function(e) {
        e.preventDefault();
        clearInterval(timer);
        timer = setInterval(moveLeft, 4000);
        moveImg(b);
    }
}
function moveImg(bNum) {
    let move = liWidth*(num-bNum);
    console.log(num, bNum)
    if (num < bNum) {
        imgList.style.marginLeft = move + "px"
        console.log(imgList.style.marginLeft)
        imgList.style.transitionDuration = "0.5s"
        setTimeout(function() {
            for (let c=num; c<bNum; c++){
                imgList.appendChild(list[c])
            }
            imgList.style.marginLeft = "0px"
            imgList.style.transitionDuration = "0s"
            num = bNum;
            bulletOn();
        }, 500)
    
    }
    else {
        imgList.style.marginLeft = "-" + move + "px"
        console.log(imgList.style.marginLeft)
        imgList.style.transitionDuration = "0s"
        for (let d=(num-1); d>=bNum; d--){
            imgList.prepend(list[d])
        }
        setTimeout(function() {
            imgList.style.marginLeft = "0px"
            imgList.style.transitionDuration = "0.5s"
            num = bNum;
            bulletOn();
        }, 1)
    }
}
