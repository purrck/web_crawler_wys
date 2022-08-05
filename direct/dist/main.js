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
var _a = require('../action/index'), getChapterData = _a.getChapterData, getActData = _a.getActData; //获取对应的数据
var fs = require('fs');
var createProto = require('../lib/proto');
createProto(); // 可以用babel profil 代替
var _b = require('../utils/download'), downloadAllImg = _b.downloadAllImg, downloadText = _b.downloadText, downloadVideoUrl = _b.downloadVideoUrl;
var _c = require('../config'), SITE_URL = _c.SITE_URL, SPIDER_TYPE = _c.SPIDER_TYPE;
var logger = require('../lib/logger');
function mkmydir(type, dir) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('mkmydir query', type, dir);
            if (!fs.existsSync("_dist")) {
                fs.mkdirSync("_dist");
            }
            if (!fs.existsSync("_dist/" + type)) {
                fs.mkdirSync("_dist/" + type);
            }
            if (!fs.existsSync("_dist/" + type + "/" + dir)) {
                fs.mkdirSync("_dist/" + type + "/" + dir);
            }
            return [2 /*return*/];
        });
    });
}
function init(startPage, endPage, type) {
    if (type === void 0) { type = 'TEXT'; }
    return __awaiter(this, void 0, Promise, function () {
        var _a, site, target, dir, fixedFile, tarDir, _loop_1, pageNum;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = SPIDER_TYPE[type], site = _a.site, target = _a.target, dir = _a.dir, fixedFile = _a.fixedFile;
                    return [4 /*yield*/, mkmydir(type, dir)];
                case 1:
                    _b.sent();
                    logger('-------start-------', "\u4ECE\u7B2C" + endPage + "\u5230" + startPage, true);
                    logger("\u4E00\u5171 " + (Math.abs(endPage - startPage) + 1) + "\u9875", true);
                    logger('参数记录', { endPage: endPage, startPage: startPage, type: type }, true);
                    tarDir = "_dist/" + type + "/" + dir;
                    logger('目标目录tarDir', tarDir, true);
                    _loop_1 = function (pageNum) {
                        var pageUrl, chapterList, _loop_2, i;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    pageUrl = "" + site + (pageNum != 1 ? "-" + pageNum : '') + ".html";
                                    logger("\u5F53\u524D" + pageNum + "\u5206\u9875-\u5F00\u59CB", 'pageUrl', true);
                                    return [4 /*yield*/, getChapterData(pageUrl, target)];
                                case 1:
                                    chapterList = _a.sent();
                                    logger("\"\u5F53\u524D\u7B2C" + pageNum + "\u5206\u9875\u7AE0\u8282\u6570\u91CF", chapterList.length, true);
                                    if (type === 'TEXT')
                                        chapterList.reverse();
                                    //循环章节获取内容
                                    logger("\"\u5FAA\u73AF\u7B2C" + pageNum + "\u5206\u9875\u7AE0\u8282\u5185\u5BB9", true);
                                    _loop_2 = function (i) {
                                        var item, res, length, file1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    item = chapterList[i];
                                                    return [4 /*yield*/, getActData(item.path, type)];
                                                case 1:
                                                    res = _a.sent();
                                                    logger("\"\u5F97\u5230\u7B2C" + pageNum + "\u5206\u9875\u7B2C" + i + "\u7AE0\u8282\u5185\u5BB9,\u5F00\u59CB\u4E0B\u8F7D", true);
                                                    switch (type) {
                                                        case 'VIDEO':
                                                            downloadVideoUrl(res, item.title, tarDir, fixedFile).then(function () {
                                                                if (i == chapterList.length - 1) {
                                                                    logger(tarDir + "\u3011,\u5F53\u524D" + pageNum + "\u5206\u9875\u4E0B\u8F7D\u5B8C\u6BD5---", '', true);
                                                                }
                                                            });
                                                            break;
                                                        case 'TEXT':
                                                            downloadText(res, item.title, tarDir).then(function () {
                                                                if (i == chapterList.length - 1) {
                                                                    logger(tarDir + "\u3011,\u5F53\u524D" + pageNum + "\u5206\u9875\u4E0B\u8F7D\u5B8C\u6BD5---", '', true);
                                                                }
                                                            });
                                                            break;
                                                        case 'IMAGE':
                                                            length = res.length;
                                                            if (!length)
                                                                return [2 /*return*/, "continue"];
                                                            if (fs.existsSync(tarDir + "/" + item.title)) {
                                                                logger('该文件夹存在了');
                                                                file1 = fs.readdirSync(tarDir + "/" + item.title);
                                                                if (file1.length == res.length) {
                                                                    logger('并且文件数目齐全');
                                                                    return [2 /*return*/, "continue"];
                                                                }
                                                            }
                                                            else {
                                                                fs.mkdirSync(tarDir + "/" + item.title);
                                                            }
                                                            downloadAllImg(res, item.title, tarDir);
                                                            break;
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    i = 0;
                                    _a.label = 2;
                                case 2:
                                    if (!(i < chapterList.length)) return [3 /*break*/, 5];
                                    return [5 /*yield**/, _loop_2(i)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    i++;
                                    return [3 /*break*/, 2];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    pageNum = endPage;
                    _b.label = 2;
                case 2:
                    if (!(pageNum > startPage)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1(pageNum)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    pageNum--;
                    return [3 /*break*/, 2];
                case 5:
                    // console.timeEnd('mkmydir')
                    logger('-------end-------', '', true);
                    return [2 /*return*/];
            }
        });
    });
}
// init(1, 1, 'TEXT') //设置页数 类型
// init(1, 1, 'IMAGE') //设置页数
init(0, 1, 'TEXT'); //设置页数
//
