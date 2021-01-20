const date = new Date()
const modelPath = `${location.protocol}//${location.hostname}/model.json`
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
    const model = await tf.loadLayersModel(modelPath)
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
    unsplitServer.slice(2, -1)

    if (containsNumber(unsplitServer)) {
        serverNameArray.push(unsplitServer.substr(2, unsplitServer.length - 3))
        serverNameArray.push(unsplitServer.substr(-1, 1))
    }
    else {
        serverNameArray.push(unsplitServer.substr(2, unsplitServer.length - 2))
    }
    
    h3.innerText = h3.innerText.replace("Processing...", serverNameArray.join(" "))
}

window.onload = ready
