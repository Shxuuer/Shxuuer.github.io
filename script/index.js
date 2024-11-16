// 禁止右键、禁止复制、封边图片
changeCoverImg = () => document.getElementById("cover-img").src = 
    `https://s2.loli.net/2024/11/15/${window.innerWidth < window.innerHeight?"8RqvYS3XDmrBfM2":"Yk2fEQilAoq7hpK"}.jpg`
changeCoverImg()
document.oncontextmenu = ()=>false
document.onselectstart = ()=>false
window.onresize = changeCoverImg

// 点击箭头滚动到下一页
document.getElementById("scroll-down-icon").addEventListener('click', () => window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
}))

// 窗口加载完后图片逐渐拉远
window.onload = () => document.getElementById("cover-img").style.transform = "scale(1)"

// 获取Github信息
const svgs = ['./githubInfo/1.svg', './githubInfo/2.svg']
svgs.forEach(svg => {
    fetch(svg).then(response => response.text()).then(data => {
        if (!data) { return }
        document.getElementById("github-container").innerHTML += data
    })
})