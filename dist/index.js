"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var regions = [
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
];
function containsNumber(str) {
    return /\d/.test(str);
}
function ready() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, predict()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function predict() {
    return __awaiter(this, void 0, void 0, function () {
        var url, basePath, modelPath, model, date, result, h3, maxIndex, unsplitServer, serverNameArray, len;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = location.href;
                    basePath = location.pathname.search(".html") === -1 ? url
                        : url.substr(0, url.lastIndexOf('/') + 1);
                    modelPath = basePath + "dist/model.json";
                    return [4, tf.loadLayersModel(modelPath)];
                case 1:
                    model = _a.sent();
                    date = new Date();
                    return [4, model.predict(tf.tensor2d([[date.getDay(), date.getHours()]]))];
                case 2: return [4, (_a.sent()).data()];
                case 3:
                    result = _a.sent();
                    h3 = document.querySelector("result");
                    maxIndex = 0;
                    Array(result).map(function (value, index) {
                        if (value > result[maxIndex]) {
                            maxIndex = index;
                        }
                    });
                    unsplitServer = regions[maxIndex];
                    serverNameArray = [];
                    serverNameArray.push(unsplitServer.substr(0, 2));
                    len = unsplitServer.length;
                    if (containsNumber(unsplitServer)) {
                        serverNameArray.push(unsplitServer.substr(2, len - 3));
                        serverNameArray.push(unsplitServer.substr(-1, 1));
                    }
                    else {
                        serverNameArray.push(unsplitServer.substr(2, len - 2));
                    }
                    h3.innerText = h3.innerText.replace("Processing...", serverNameArray.join(" "));
                    return [2];
            }
        });
    });
}
window.onload = ready;
