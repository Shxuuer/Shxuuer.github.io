// sm.ms 图床
// 禁止右键、禁止复制、封边图片
function changeCoverImg() {
    document.getElementById("cover-img").src = window.innerWidth < window.innerHeight?"https://s2.loli.net/2024/11/15/8RqvYS3XDmrBfM2.jpg":"https://s2.loli.net/2024/11/15/Yk2fEQilAoq7hpK.jpg"
}
changeCoverImg()
document.oncontextmenu = ()=>false
document.onselectstart = ()=>false
window.onresize = changeCoverImg

// 滚动到下一页
document.getElementById("scroll-down-icon").addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    })
})

// 获取空间信息
fetch("./space.json").then(response => response.json()).then(data => {
    if (!data) { return }
    const space = document.getElementById("space-container")
    data.news.forEach(element => {
        space.innerHTML += `
            <div class="space-card">
                <div><img src="${element.img}" alt=""></div>
                <div><p>${element.title}</p></div>
                <div><span>${element.date}</span></div>
            </div>
        `
    })
})

// 获取Github信息
const svgs = ['./githubInfo/1.svg', './githubInfo/2.svg']
svgs.forEach(svg => {
    fetch(svg).then(response => response.text()).then(data => {
        if (!data) { return }
        document.getElementById("github-container").innerHTML += data
    })
})

// 窗口加载完后图片逐渐拉远
window.onload = function () {
    setTimeout(() => {
        document.getElementById("cover-img").style.transform = "scale(1)"
    }, 500)
}
