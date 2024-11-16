let spaceData = null;
let imgIndex = 0;
const spaceImgShow = document.getElementById("img-show")
const spaceImg = spaceImgShow.getElementsByTagName("img")[0]

// 获取空间信息
fetch("./space.json").then(response => response.json()).then(data => {
    if (!data) { return }
    const space = document.getElementById("space-container")
    spaceData = data
    data.news.forEach((element,index) => {
        space.innerHTML += `
            <div class="space-card" spaceCardIndex="${index}">
                <div><img src="${element.img}" alt=""></div>
                <div><p>${element.title}</p></div>
                <div><span>${element.date}</span></div>
            </div>
        `
    })
    // 空间卡片点击事件
    document.querySelectorAll(".space-card").forEach((element,index) => {
        element.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute("spaceCardIndex")
            imgIndex = index
            openImg(data.news[index].img)
        })
    })
})

// 打开图片展示
function openImg(src) {
    spaceImg.src = src
    spaceImg.onload = ()=>spaceImg.style.width = "100%"
    spaceImgShow.style.display = "block"
}

// 关闭图片展示
function closeImg() {
    spaceImg.style.width = "0"
    setTimeout(() => {
        spaceImgShow.style.display = "none"
    }, 200);
}

// 改变img.src
function altImg(num) {
    imgIndex += num
    if (imgIndex < 0) { imgIndex = spaceData.news.length - 1 }
    if (imgIndex >= spaceData.news.length) { imgIndex = 0 }
    openImg(spaceData.news[imgIndex].img)
}