const imgBed = "https://cdn.jsdelivr.net/gh/Shxuuer/picx-images-hosting@master/"

// 禁止右键、禁止复制
document.oncontextmenu = function () { return false }
document.onselectstart = function () { return false }

// 窗口大小改变时更换封面
document.getElementById("cover-img").src = imgBed + (window.innerWidth < window.innerHeight?"cover-m.jpg":"cover.jpg")

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
                    <img src="${imgBed}space/${element.img}" alt="">
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

