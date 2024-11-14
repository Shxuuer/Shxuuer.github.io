// 封面自适应
window.onresize = function () {
    height = document.body.clientHeight;
    width = document.body.clientWidth;
    const cover = document.getElementById("cover");
    cover.style.height = height + "px";
    cover.style.width = width + "px";

    const title = document.getElementById("title");
    title.style.height = height + "px";
    title.style.backgroundColor = "red";
}
