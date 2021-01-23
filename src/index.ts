// import * as tf from "@tensorflow/tfjs"

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

function containsNumber(str: string) {
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
    // @ts-ignore
    const model = await tf.loadLayersModel(modelPath)
    const date = new Date()
    // @ts-ignore
    const result = await (await model.predict(tf.tensor2d([[date.getDay(), date.getHours()]])) as tf.Tensor<tf.Rank>).data()
    const h3 = document.querySelector("result") as HTMLHeadingElement

    /* Get the highest probability index */
    let maxIndex = 0
    Array(result).map((value : unknown, index) => {
        if (value as number > result[maxIndex]) {
            maxIndex = index
        }
    })

    /* Format Answer */
    const unsplitServer = regions[maxIndex]
    const serverNameArray: string[] = []
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
