(function dc_mergeAeps() {  //@include json2.js  //@include DcProgressBar.js  //@include ProjectFolder.js  //@include ProjectComp.js  //@include ProjectData.js  //@include FolderMerger.js  //@include CompMerger.js  app.beginUndoGroup("dc_mergeAeps.jsx");  // Make a ProjectData object to handle things like sorting.    var pd = new ProjectData();    pd.run();  app.endUndoGroup();  /*    // Make a CompMerger object to merge comps.    var cm = new CompMerger(pd.projectItems);    cm.run();    // Make a FolderMerger object to merge the folders.    var fm = new FolderMerger(pd.projectItems);    fm.run();    // Clean up the project.    cm.removeUnusedComps();    fm.clearEmptyFolders();  */})();