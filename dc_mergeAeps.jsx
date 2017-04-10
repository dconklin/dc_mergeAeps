/*
Goals:
    Script should merge folders in an after effects project.
Criteria for merging:
    1. Folders have same name.
    2. Deep folders get merged with shallow folders.
    3. Hierarchy should be maintained.
Questions:
    1. What if project intnetionally has 2 folders named the
    same name? Does this happen?
Steps:
    1. Collect names of folders.
    2. Collect nested depth of folders
    3. Merge contents of deep folders into shallow folders
    4. Delete empty folders.
*/

//@include ProjectFolder.js
//@include ProjectData.js

// Make a project data object. The pd object
// handles almost the entirety of the script.
var pd = new ProjectData();
pd.run();
