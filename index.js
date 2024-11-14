let height = window.innerHeight
let width = window.innerWidth

// 禁止右键、禁止复制
document.oncontextmenu = function () { return false }
document.onselectstart = function () { return false }

// 封面自适应
window.onresize = function () {
    height = window.innerHeight
    width = window.innerWidth
    const cover = document.getElementById("cover")
    // cover.style.height = height + "px"
    // cover.style.width = width + "px"
}

// 滚动到下一页
document.getElementById("scroll-down-icon").addEventListener('click', function () {
    window.scrollTo({
        top: height,
        behavior: 'smooth'
    })
})

// 获取空间信息
const space = document.getElementById("space-container")
fetch("./space.json").then(response => response.json()).then(data => {
    if (!data) { return }
    const space = document.getElementById("space-container")
    data.news.forEach(element => {
        space.innerHTML += `
            <div class="space-card">
                <div>
                    <img src="./img/space/${element.img}" alt="">
                </div>
                <div>
                    <p>${element.title}</p>
                </div>
                <div>
                    <span>${element.date}</span>
                </div>
            </div>
        `
    });
})

