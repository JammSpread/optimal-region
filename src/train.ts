import * as tf from "@tensorflow/tfjs"
import * as path from "path"
import "@tensorflow/tfjs-node"
import * as data from "./data.json"

interface ITrainingData {
  day: number,
  hour: number,
  region: number
}

enum regions {
  USWest2 = 0,
  USNorthwest = 1,
  USSouthwest = 2,
  USMidwest = 3,
  USCentral = 4,
  USEast2 = 5,
  USNortheast = 6,
  USSouth = 7,
  USSouth2 = 8,
  EUWest = 9,
  EUNorthwest = 10,
  EUCentral2 = 11,
  EUCentral3 = 12,
  EUCentral4 = 13,
  EUSoutheast = 14
}

/* Process data */

const trainingData: ITrainingData[] = data.map(value => {
  return { day: value.day, hour: value.hour, region: (regions as any)[value.region] }
})

const trainingInput = tf.tensor2d(
  trainingData.map((value: ITrainingData) => [ 
    value.day, value.hour
  ])
)

const trainingOutput = tf.tensor2d(trainingData.map((value: ITrainingData) => [
  value.region === regions.USWest2 ? 1 : 0,
  value.region === regions.USNorthwest ? 1 : 0,
  value.region === regions.USSouthwest ? 1 : 0,
  value.region === regions.USMidwest ? 1 : 0,
  value.region === regions.USCentral ? 1 : 0,
  value.region === regions.USEast2 ? 1 : 0,
  value.region === regions.USNortheast ? 1 : 0,
  value.region === regions.USSouth ? 1 : 0,
  value.region === regions.USSouth2 ? 1 : 0,
  value.region === regions.EUWest ? 1 : 0,
  value.region === regions.EUNorthwest ? 1 : 0,
  value.region === regions.EUCentral2 ? 1 : 0,
  value.region === regions.EUCentral3 ? 1 : 0,
  value.region === regions.EUCentral4 ? 1 : 0,
  value.region === regions.EUSoutheast ? 1 : 0,
]))

const model = tf.sequential()

/* Add layers */

model.add(tf.layers.dense({
  inputShape: [2],
  activation: "relu",
  units: 5,
}))

model.add(tf.layers.dense({
  inputShape: [5],
  activation: "relu",
  units: 1,
}))

model.add(tf.layers.dense({
  activation: "relu",
  units: 15,
}))

model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(0.6)
})

/* Train */

model.fit(trainingInput, trainingOutput, { epochs: 100 }).then(async (history) => {
  model.save(`file://${path.join(__dirname, "../")}`)
})
