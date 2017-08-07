"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var bom_position_1 = require("./bom-position");
var position_attribute_value_1 = require("./position-attribute-value");
var position_error_list_1 = require("./position-error-list");
var position_error_1 = require("./position-error");
var PositionStoreService = (function () {
    function PositionStoreService(_http) {
        this._http = _http;
        this.BASE_URL = 'api/positions';
    }
    PositionStoreService.prototype.addPosition = function (newPosition) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var result = new Subject_1.Subject();
        console.log('PositionStoreService -- addPosition -- JSON.stringify(newPosition): ' + JSON.stringify(newPosition)); //TODO remove
        this._http.put(this.BASE_URL, JSON.stringify(newPosition), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (pos) {
            result.next(_this.mapPosition(pos));
        }, function (err) {
            if (err["status"] === 500) {
                result.error({ message: JSON.parse(err["_body"])["ExceptionMessage"] });
            }
            else {
                result.error(err);
            }
        });
        return result.asObservable();
    };
    PositionStoreService.prototype.addPositionList = function (newPositions) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var result = new Subject_1.Subject();
        return this._http.put(this.BASE_URL + "/multiple", JSON.stringify(newPositions), options)
            .map(function () { return _this.emptyError(); })
            .catch(function (res) { return _this.mapError(res); });
    };
    PositionStoreService.prototype.editPosition = function (modifiedPosition) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var result = new Subject_1.Subject();
        this._http.post(this.BASE_URL, JSON.stringify(modifiedPosition), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next(_this.mapPosition(res));
        }, function (err) {
            if (err["status"] === 500) {
                result.error({ message: JSON.parse(err["_body"])["ExceptionMessage"] });
            }
            else {
                result.error(err);
            }
        });
        return result.asObservable();
    };
    PositionStoreService.prototype.mapError = function (errorResponse) {
        var list = new position_error_list_1.PositionErrorList();
        console.log("position-store.service -- mapError -- errorResponse: " + errorResponse); //TODO: remove
        console.log("position-store.service -- mapError -- errorResponse.json(): " + errorResponse.json()); //TODO: remove
        var parsedJson = errorResponse.json();
        list.message = parsedJson.message;
        console.log("position-store.service -- mapError -- parsedJson: " + parsedJson); //TODO: remove
        console.log("position-store.service -- mapError -- parsedJson.message: " + parsedJson.message); //TODO: remove
        list.errorObject = this.mapPositionErrors(parsedJson.errorObject);
        console.log("position-store.service -- mapError -- parsedJson.errorObject: " + parsedJson.errorObject); //TODO: remove
        return Observable_1.Observable.throw(list);
    };
    PositionStoreService.prototype.emptyError = function () {
        var list = new position_error_list_1.PositionErrorList();
        list.message = "";
        list.errorObject = new Array();
        var result = new Subject_1.Subject();
        result.next(list);
        return result.asObservable();
    };
    PositionStoreService.prototype.mapPositionErrors = function (parsedPositionErrors) {
        var result = new Array();
        var index;
        var currentError;
        for (index = 0; index < parsedPositionErrors.length; index += 1) {
            currentError = new position_error_1.PositionError();
            console.log("position-store.service -- mapPositionErrors -- parsedPositionErrors[index].Index: " + parsedPositionErrors[index].Index); //TODO: remove
            currentError.index = parsedPositionErrors[index].Index;
            currentError.message = parsedPositionErrors[index].Message;
            result.push(currentError);
        }
        return result;
    };
    PositionStoreService.prototype.selectPage = function (nodeId, pageNumber, pageSize) {
        var _this = this;
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/node/" + nodeId + "/page/" + pageNumber + "/" + pageSize)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next(res.map(function (pos) { return _this.mapPosition(pos); }));
        });
        return result.asObservable();
    };
    PositionStoreService.prototype.selectNode = function (nodeId) {
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/node/" + nodeId + '/count')
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next(res);
        });
        return result.asObservable();
    };
    PositionStoreService.prototype.deletePosition = function (deletedPosition) {
        var _this = this;
        var result = new Subject_1.Subject();
        this._http
            .delete(this.BASE_URL + "/" + deletedPosition.id)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next(_this.mapPosition(res));
        });
        return result.asObservable();
    };
    PositionStoreService.prototype.clearNode = function (nodeId) {
        var result = new Subject_1.Subject();
        this._http
            .delete(this.BASE_URL + "/node/" + nodeId)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next();
        });
        return result.asObservable();
    };
    PositionStoreService.prototype.pasteNode = function (sourceNodeId, targetNodeId) {
        var result = new Subject_1.Subject();
        this._http
            .post(this.BASE_URL + "/node/" + sourceNodeId + "/paste-to-node/" + targetNodeId, "")
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next();
        });
        return result.asObservable();
    };
    PositionStoreService.prototype.mapPosition = function (res) {
        var resultPosition = new bom_position_1.BomPosition();
        resultPosition.id = res.id;
        resultPosition.nodeId = res.nodeId;
        resultPosition.materialId = res.materialId;
        resultPosition.partId = res.partId;
        resultPosition.groupCode = res.groupCode;
        resultPosition.partCode = res.partCode;
        resultPosition.commodityCode = res.commodityCode;
        resultPosition.tag = res.tag;
        resultPosition.description = res.description;
        resultPosition.quantity = res.quantity;
        resultPosition.isTwm = res.isTwm;
        resultPosition.description2 = res.description2;
        resultPosition.unit = res.unit;
        resultPosition.attributes = this.mapAttributes(res.attributes);
        return resultPosition;
    };
    PositionStoreService.prototype.mapPositions = function (res) {
        var resultArray = new Array();
        var i;
        for (i = 0; i < res.length; i += 1) {
            resultArray.push(this.mapPosition(res[i]));
        }
        return resultArray;
    };
    PositionStoreService.prototype.mapAttributes = function (attrs) {
        var _this = this;
        var result = new Array();
        if (attrs) {
            result = attrs.map(function (attr) { return _this.mapSingleAttribute(attr); });
        }
        return result;
    };
    PositionStoreService.prototype.mapSingleAttribute = function (attr) {
        return new position_attribute_value_1.PositionAttributeValue(attr.attribute, attr.value);
    };
    PositionStoreService.prototype.getTag = function (tag, projectDisciplineId) {
        var _this = this;
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/projectDiscipline/" + projectDisciplineId.toString() + "/tag/?tag=" + encodeURIComponent(tag))
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next(res.map(function (pos) { return _this.mapPosition(pos); }));
        });
        return result.asObservable();
    };
    return PositionStoreService;
}());
PositionStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PositionStoreService);
exports.PositionStoreService = PositionStoreService;
//# sourceMappingURL=position-store.service.js.map