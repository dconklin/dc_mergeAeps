﻿var ProjectData = function(){
    helper.print("ProjectData.run() called. Starting main logic of script.");

    app.beginUndoGroup("dc_mergeProjectFolders.jsx");
        this.filterProject();
        this.makeFolderObjects();
        this.sortFolderObjects();
        this.mergeFolders();
        this.clearEmptyFolders();
    app.endUndoGroup();


    helper.print("ProjectData.filterProject() called. Beginning to loop through project.");

        var itm = app.project.item(i);
        helper.print("Looking at project item " + itm.name);
        if(itm instanceof CompItem){
            helper.print(itm.name + " is a Comp.");
            this.projectItems.comps.push(itm);  // item is a comp.
            helper.print(itm.name + " is a Folder.");
            this.projectItems.folders.push(itm);  // item is a folder.
                helper.print(itm.name + " is a Solid.");
                this.projectItems.solids.push(itm);  // item is a solid.
                helper.print(itm.name + " is a piece of footage.");
                this.projectItems.footage.push(itm);  // item is footage.
    helper.print("Running ProjectData.getDepth() on " + itm.name)
    var dpth = 0;
    helper.print(itm.name + " is at a depth of " + dpth);
    return dpth;

    // helper.print("Running ProjectData.makeFolderObjects() on " + this.projectItems.folders.length + " folders stored in projectItems");
    helper.print("Listing folders: 1:" + this.projectItems.folders[0].name);

    //     var fldr = this.projectItems.folders[i];
    //     helper.print("Adding " + fldr + " to this.folderObjects as a new Folder Object");
    //     this.folderObjects.push(new ProjectFolder(fldr, this.getDepth(fldr)));
    // }


    var folderHolder = this.folderObjects.slice(0);

    helper.print("Starting order: " + folderHolder);
    var newOrder = folderHolder.sort(function(a,b){
        if(a.depth < b.depth){
            return -1;
        }
        if(a.depth > b.depth){
            return 1;
        }
        return 0;
    });
    helper.print("Ending order: " + newOrder);
    this.projectItems.folders = newOrder;
}
    helper.print("Running projectFoler.mergeFolders()");

    var folderHolder = this.folderObjects.slice(0);
    var copyContents = function(s,d){
        if(s==d){
            if(s instanceof FolderItem){
                helper.print("Both s and d are Folders. Merging items.");
                for(var i = 1; i <= s.numItems; i++){
                    s.item(i).parentFolder = d;
                }
                helper.print("s is a piece of footage. Moving to d.");
                d.parentFolder = s;