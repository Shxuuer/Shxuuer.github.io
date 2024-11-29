// 禁止右键、禁止复制、封边图片自适应
changeCoverImg = () => document.getElementById("cover-img").src =
    `https://s2.loli.net/2024/11/15/${window.innerWidth < window.innerHeight ? "8RqvYS3XDmrBfM2" : "Yk2fEQilAoq7hpK"}.jpg`
changeCoverImg()
document.oncontextmenu = () => false
document.onselectstart = () => false
window.onresize = changeCoverImg

// 点击箭头滚动到下一页
document.getElementById("scroll-down-icon").addEventListener('click', () => window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
}))

// 窗口加载完后图片逐渐拉远
window.onload = () => document.getElementById("cover-img").style.transform = "scale(1)"

// 缓存Github信息
let github = "", svgs = ['./githubInfo/1.svg', './githubInfo/2.svg']
const githubContainerTop = document.getElementById("github-container").getBoundingClientRect().top + window.scrollY || window.pageYOffset
let loaded = false
function loadGithubInfo() {
    if ((githubContainerTop - window.innerHeight < window.scrollY || window.scrollY < githubContainerTop) && !loaded) {
        document.getElementById("github-container").innerHTML = github
        loaded = true
    } else if (githubContainerTop - window.innerHeight > window.scrollY && loaded) {
        document.getElementById("github-container").innerHTML = ""
        loaded = false
    }
}

Promise.all(
    svgs.map(svg => fetch(svg).then(response => response.text()))
).then(data => {
    data.forEach(svg => github += svg)
    loadGithubInfo()
    window.onscroll = loadGithubInfo
})

// 加载技术栈
fetch('./githubInfo/3.svg').then(response => response.text()).then(data =>{
    document.getElementById("skill-container").innerHTML = data
})