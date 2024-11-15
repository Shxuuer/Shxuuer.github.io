const IMG_BED = "https://cdn.jsdelivr.net/gh/Shxuuer/picx-images-hosting@master/"

// 禁止右键、禁止复制、封边图片
document.oncontextmenu = ()=>false
document.onselectstart = ()=>false
document.getElementById("cover-img").src = `${IMG_BED}cover${window.innerWidth < window.innerHeight?"-m":""}.jpg`

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
                <div><img src="${IMG_BED}space/${element.img}" alt=""></div>
                <div><p>${element.title}</p></div>
                <div><span>${element.date}</span></div>
            </div>
        `
    })
})

fetch("./githubInfo/1.svg").then(response => response.text()).then(data => {
    if (!data) { return }
    document.getElementById("github-container").innerHTML += data
})

fetch("./githubInfo/2.svg").then(response => response.text()).then(data => {
    if (!data) { return }
    document.getElementById("github-container").innerHTML += data
})



// 窗口加载完后图片逐渐拉远
window.onload = function () {
    setTimeout(() => {
        document.getElementById("cover-img").style.transform = "scale(1)"
    }, 500)
}