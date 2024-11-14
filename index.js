let height = window.innerHeight
console.log(height);
let width = window.innerWidth
// 封面自适应
window.onresize = function () {
    height = window.innerHeight
    width = window.innerWidth
    const cover = document.getElementById("cover");
    cover.style.height = height + "px";
    cover.style.width = width + "px";
}


document.addEventListener('scroll', function (e) {
    let scroll = window.scrollY;
    const title = document.getElementById("title");
    title.style.transform = "scale(" + (1 - scroll / height) + ")";
    title.style.marginTop = (height * 0.3 + height * 0.7 * (scroll / height)) + "px";
})