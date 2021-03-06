"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AssetWrapper = void 0;
var react_1 = __importDefault(require("react"));
var asset_1 = require("./asset");
var utils_1 = require("../utils");
var text_1 = require("./text");
var __1 = require("..");
var notion_utils_1 = require("notion-utils");
var AssetWrapper = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var blockId = _a.blockId, block = _a.block;
    var value = block;
    var _h = (0, __1.useNotionContext)(), components = _h.components, mapPageUrl = _h.mapPageUrl;
    var isURL = false;
    if (((_c = (_b = value === null || value === void 0 ? void 0 : value.properties) === null || _b === void 0 ? void 0 : _b.caption) === null || _c === void 0 ? void 0 : _c.length) > 0) {
        var caption = (_d = value === null || value === void 0 ? void 0 : value.properties) === null || _d === void 0 ? void 0 : _d.caption[0][0];
        var id = (0, notion_utils_1.parsePageId)(caption, { uuid: true });
        var isPage = caption.charAt(0) === '/' && id;
        if ((block.type == 'image' && validURL(caption)) || isPage) {
            isURL = true;
        }
    }
    var figure = (react_1["default"].createElement("figure", { className: (0, utils_1.cs)('notion-asset-wrapper', "notion-asset-wrapper-" + block.type, ((_e = value.format) === null || _e === void 0 ? void 0 : _e.block_full_width) && 'notion-asset-wrapper-full', blockId) },
        react_1["default"].createElement(asset_1.Asset, { block: value }, ((_f = value === null || value === void 0 ? void 0 : value.properties) === null || _f === void 0 ? void 0 : _f.caption) && !isURL && (react_1["default"].createElement("figcaption", { className: 'notion-asset-caption' },
            react_1["default"].createElement(text_1.Text, { value: value.properties.caption, block: block }))))));
    //allows for an image to be a link
    if (isURL) {
        var caption = (_g = value === null || value === void 0 ? void 0 : value.properties) === null || _g === void 0 ? void 0 : _g.caption[0][0];
        var id = (0, notion_utils_1.parsePageId)(caption, { uuid: true });
        var isPage = caption.charAt(0) === '/' && id;
        return (react_1["default"].createElement(components.pageLink, { style: { width: '100%' }, href: isPage ? mapPageUrl(id) : caption }, figure));
    }
    return react_1["default"].createElement(react_1["default"].Fragment, null, figure);
};
exports.AssetWrapper = AssetWrapper;
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
//# sourceMappingURL=asset-wrapper.js.map