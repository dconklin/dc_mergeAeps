﻿var ProjectData = function() {    this.projectItems = {        comps: [],        footage: [],        solids: [],        folders: []    }    this.folderObjects = [];}ProjectData.prototype.run = function() {    app.beginUndoGroup("dc_mergeProjectFolders.jsx");    this.filterProject();    this.makeFolderObjects();    this.sortFolderObjects();    this.mergeFolders();    this.clearEmptyFolders();    app.endUndoGroup();}ProjectData.prototype.filterProject = function() {    /*    This function sorts the project items into their respective types.    */    for (var i = 1; i <= app.project.numItems; i++) {        var itm = app.project.item(i);        if (itm instanceof CompItem) {            this.projectItems.comps.push(itm); // item is a comp.        } else if (itm instanceof FolderItem) {            this.projectItems.folders.push(itm); // item is a folder.        } else {            if (itm.mainSource instanceof SolidSource) {                this.projectItems.solids.push(itm); // item is a solid.            } else {                this.projectItems.footage.push(itm); // item is footage.            }        }    }}ProjectData.prototype.getDepth = function(itm) {    var dpth = 0;    var calcDepth = function(myItm) {        if (myItm.parentFolder.name !== "Root") {            dpth++;            calcDepth(myItm.parentFolder);        }    }    calcDepth(itm);    return dpth;};ProjectData.prototype.makeFolderObjects = function() {    for (var i = 0; i < this.projectItems.folders.length; i++) {        var fldr = this.projectItems.folders[i];        this.folderObjects.push(new ProjectFolder(fldr, this.getDepth(fldr)));    }}ProjectData.prototype.sortFolderObjects = function() {    var folderHolder = this.folderObjects.slice(0);    var newOrder = folderHolder.sort(function(a, b) {        if (a.depth < b.depth) {            return -1;        }        if (a.depth > b.depth) {            return 1;        }        return 0;    });    this.projectItems.folders = newOrder;}ProjectData.prototype.mergeFolders = function() {    var folderHolder = this.folderObjects.slice(0);    var copyContents = function(s, d) {        if (s == d) {            return true;        }        if (d instanceof FolderItem) {            if (s instanceof FolderItem) {                for (var i = s.numItems - 1; i >= 0; i--) {                    s.item(i + 1).parentFolder = d;                }                return true;            } else if (s instanceof FootageItem) {                d.parentFolder = s;                return true;            } else {                return true;            }        } else {            return false;        }    }    for (var i = folderHolder.length - 1; i >= 0; i--) {        for (var j = 0; j < i; j++) { // only check up to index i (since we're going backwards in the i loop and fwds in j loop).            if (folderHolder[i].name == folderHolder[j].name) {                copyContents(folderHolder[i].folder, folderHolder[j].folder);                break;            }        }    }}ProjectData.prototype.clearEmptyFolders = function() {    var fldrs = this.projectItems.folders;    for (var i = fldrs.length - 1; i >= 0; i--) {        if (fldrs[i].folder.numItems == 0) {            fldrs[i].folder.remove();        }    }}