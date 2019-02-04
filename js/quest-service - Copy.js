///////////////////////////////////////
/////////////   Service   /////////////
///////////////////////////////////////

 
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLocalStorageHasTree = false;
const QUEST_TREE_KEY = 'questTree'

function createQuestsTree() {
    // debugger;
    if (gLocalStorageHasTree) {
        console.log('Local storage is חבר אמת');
        var tree = loadFromStorage(QUEST_TREE_KEY);
        // console.log(tree)
        console.log('Local storage TREE : ',localStorage.getItem(QUEST_TREE_KEY))
        gQuestsTree = tree;
    } else {
        gQuestsTree = createQuest('Male');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    // console.log('node has yes :',node.yes)
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // debugger;
    // console.log('res is : ',res)
    // update the prev, curr global vars
    gPrevQuest = gCurrQuest;
    console.log('S: The previous question (gPrevQuest) now points to  : ', gPrevQuest)
    gCurrQuest = gCurrQuest[res];
    console.log('S: The current question (gCurrQuest) now points to: ', gCurrQuest)

}

function addGuess(newQuestTxt, newGuessTxt, res) {
    //newQuestTxt = queen
    //newGuessTxt - cleo
    // var currGuess = 
    console.log('gPrevQuest (the last question) : ',gPrevQuest)
    console.log('\n\n\nUser answered :', res)
    console.log('CurrQuest (the current question): ',gCurrQuest)
    var newQuest = createQuest(newQuestTxt);
    newQuest['no'] = gCurrQuest
    newQuest['yes'] = createQuest(newGuessTxt)
    gPrevQuest[res] = newQuest;
    
    var strPrev = JSON.stringify(gPrevQuest);

    console.log('\n\nService: gPrevQuest[res] : ',strPrev)
    // debugger;
    //kaka code below
    // gPrevQuest[res] = createQuest(newQuestTxt);
    // gPrevQuest[res]['no'] = gCurrQuest
    // gPrevQuest[res]['yes'] = createQuest(newGuessTxt)
    var strTree = JSON.stringify(gQuestsTree);
    console.log('S: New TREE is :',strTree)
    console.log('Should we save it to local storage?')



    saveToStorge(QUEST_TREE_KEY,gQuestsTree);



    // gPrevQuest[res] = createQuest(newQuestTxt) // should 
    // gCurrQuest['yes'] = createQuest(newGuessTxt)
    // console.log('POTATO here, over :)')
    // console.log('gPrevQuest[yes]: ',gPrevQuest['yes'])
    // console.log('gPrevQuest[no] : ',gPrevQuest['no'])
    // TODO: Create and Connect the 2 Quests to the quetsions tree

    /*
        gQuestsTree = createQuest('Male');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    */

}

function getCurrQuest() {
    return gCurrQuest;
}

function getQuestTree() {
    return gQuestsTree;
}

function saveToStorge(key,value) {
    var str = JSON.stringify(value);
    console.log('\n\nthis is what i want to save to local STORAGE : ',str)
    gLocalStorageHasTree = true;
    localStorage.setItem(key, str)
    return;
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    console.log('I\'VE BEEN SUMMONED')
    console.log('str TREE : ', str)
    console.log('paesed TREE : ', JSON.parse(str))
    return JSON.parse(str);
}



