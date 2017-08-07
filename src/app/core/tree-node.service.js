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
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var tree_node_reducer_1 = require("../lazy-loaded-tree-view/tree-node-reducer");
var tree_node_reducer_single_1 = require("../lazy-loaded-tree-view/tree-node-reducer-single");
var TreeNodeService = (function () {
    function TreeNodeService(_http) {
        var _this = this;
        this._http = _http;
        this.dispatcher = new Subject_1.Subject();
        this.treeNodes = {};
        this.nodePositionUpdateSubject = new Subject_1.Subject();
        this.nodePositionsUpdate = this.nodePositionUpdateSubject.asObservable();
        this.nodes = {};
        this.BASE_URL = 'api/Nodes';
        this.dispatcher.subscribe(function (action) { return _this.handleAction(action); });
    }
    TreeNodeService.prototype.getChildNodesUrl = function (id, projectDisciplineId) {
        //return this.BASE_URL + '/' + id + '/nodes.json';
        //return this.BASE_URL + '/' + id + '/nodes.json';
        return this.BASE_URL + '/' + id + '/' + projectDisciplineId + '/nodes';
    };
    TreeNodeService.prototype.getNodeUrl = function (id) {
        return this.BASE_URL + '/' + id;
    };
    TreeNodeService.prototype.handleAction = function (action) {
        var _this = this;
        if (action.name === 'LOAD_NODES') {
            if (this.nodes[action.id]) {
                this.treeNodes[action.id].next(this.nodes[action.id]);
            }
            else {
                this._http
                    .get(action.url)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.nodes[action.id] = tree_node_reducer_1.treeNodeReducer(res);
                    _this.treeNodes[action.id].next(_this.nodes[action.id]);
                });
            }
        }
        if (action.name === "STORE_NODE") {
            console.log("tree-node.service -- STORE_NODE -- action.node.projectDisciplineId: " + action.node.projectDisciplineId); //TODO:remove
            this._http.post(action.url, action.node)
                .subscribe(function (res) {
                _this.nodes[action.id] = null;
                _this.handleAction.bind(_this, { name: 'LOAD_NODES', url: 'api/Nodes/' + action.id + '/' + action.node.projectDisciplineId + '/nodes', id: action.id });
            }, function (error) { throw (error); });
        }
        if (action.name === "EDIT_NODE") {
            this._http.put(action.url, action.node)
                .subscribe(function (res) {
                _this.nodes[action.id] = null;
                _this.handleAction.bind(_this, { name: 'LOAD_NODES', url: 'api/Nodes/' + action.id + '/' + action.node.projectDisciplineId + '/nodes', id: action.id });
            });
        }
        if (action.name === "DELETE_NODE") {
            console.log('tree-node.service -- handleAction -- action.url: ' + action.url); //TODO:remove
            this._http.delete(action.url)
                .subscribe(function (res) {
                _this.nodes[action.id] = null;
                _this.handleAction.bind(_this, { name: 'LOAD_NODES', url: 'api/Nodes/' + action.id + '/' + action.node.projectDisciplineId + '/nodes', id: action.id });
            });
        }
    };
    TreeNodeService.prototype.getTreeNodes = function (id) {
        if (!this.treeNodes.hasOwnProperty(id)) {
            this.treeNodes[id] = new Subject_1.Subject();
        }
        return this.treeNodes[id].asObservable();
    };
    TreeNodeService.prototype.persistNode = function (action) {
        console.log('tree-node.service -- persistNode -- action.name: ' + action.name); //TODO:remove
        console.log('tree-node.service -- persistNode -- action.url: ' + action.url); //TODO:remove
        if (action.name === "STORE_NODE") {
            return this._http.post(action.url, action.node)
                .map(function (res) { return null; })
                .catch(this.handleError);
        }
        if (action.name === "EDIT_NODE") {
            return this._http.put(action.url, action.node)
                .map(function (res) { return null; });
        }
        if (action.name === "DELETE_NODE") {
            return this._http.delete(action.url)
                .map(function (res) { return null; });
        }
    };
    TreeNodeService.prototype.dispatchAction = function (action) {
        this.dispatcher.next(action);
    };
    TreeNodeService.prototype.getSingleNode = function (id) {
        return this._http
            .get(this.getNodeUrl(id))
            .map(function (res) { return tree_node_reducer_single_1.treeNodeReducerSingle(res.json()); });
    };
    TreeNodeService.prototype.fetchTreeNodes = function (id, projectDisciplineId) {
        console.log('tree-node.service -- fetchTreeNodes -- this.getChildNodesUrl(id): ' + this.getChildNodesUrl(id, projectDisciplineId)); //TODO:remove
        return this._http
            .get(this.getChildNodesUrl(id, projectDisciplineId))
            .map(function (res) { return tree_node_reducer_1.treeNodeReducer(res.json()); });
    };
    TreeNodeService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        var status = 0;
        var message = '';
        if (error instanceof http_1.Response) {
            status = error.status;
            message = error.text();
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw({ message: message, status: status });
    };
    TreeNodeService.prototype.updateNodePositions = function (id) {
        var _this = this;
        this._http
            .get(this.BASE_URL + '/' + id.toString() + '/node-update')
            .map(function (res) { return res.json(); })
            .subscribe(function (upd) { return _this.nodePositionUpdateSubject.next(upd); });
    };
    return TreeNodeService;
}());
TreeNodeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TreeNodeService);
exports.TreeNodeService = TreeNodeService;
//# sourceMappingURL=tree-node.service.js.map