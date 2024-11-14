// 禁止右键、禁止复制
document.oncontextmenu = function () { return false }
document.onselectstart = function () { return false }

if (window.innerWidth < window.innerHeight) {
    document.getElementById("cover-img").src="./img/cover-m.jpg"
}

// 窗口大小改变时
window.onresize = function () {
    if (window.innerWidth < window.innerHeight) {
        document.getElementById("cover-img").src="./img/cover-m.jpg"
    } else {
        document.getElementById("cover-img").src="./img/cover.jpg"
    }
}

// 滚动到下一页
document.getElementById("scroll-down-icon").addEventListener('click', function () {
    window.scrollTo({
        top: window.innerHeight,
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

