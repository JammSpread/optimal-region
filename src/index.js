const regions = [
    "USWest2",
    "USNorthwest",
    "USSouthwest",
    "USMidwest",
    "USCentral",
    "USEast2",
    "USNortheast",
    "USSouth",
    "USSouth2",
    "EUWest",
    "EUNorthwest",
    "EUCentral2",
    "EUCentral3",
    "EUCentral4",
    "EUSoutheast"
]

function containsNumber(str) {
    return /\d/.test(str)
}

async function ready() {
    await predict()
}

async function predict() {
    const url = location.href
    const basePath = location.pathname.search(".html") === -1 ? url
        : url.substr(0, url.lastIndexOf('/') + 1)
    const modelPath = `${basePath}dist/model.json`
    const model = await tf.loadLayersModel(modelPath)
    const date = new Date()
    const result = await model.predict(tf.tensor2d([[date.getDay(), date.getHours()]])).data()
    const h3 = document.querySelector("result")

    /* Get the highest probability index */
    let maxIndex = 0
    Array.from(result).map((value, index) => {
        if (value > result[maxIndex]) {
            maxIndex = index
        }
    })

    /* Format Answer */
    const unsplitServer = regions[maxIndex]
    const serverNameArray = []
    serverNameArray.push(unsplitServer.substr(0, 2))

    const len = unsplitServer.length
    if (containsNumber(unsplitServer)) {
        serverNameArray.push(unsplitServer.substr(2, len - 3))
        serverNameArray.push(unsplitServer.substr(-1, 1))
    }
    else {
        serverNameArray.push(unsplitServer.substr(2, len - 2))
    }
    
    h3.innerText = h3.innerText.replace("Processing...", serverNameArray.join(" "))
}

window.onload = ready
