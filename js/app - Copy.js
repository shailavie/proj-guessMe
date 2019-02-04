///////////////////////////////////////
///////////// Controller //////////////
///////////////////////////////////////

'use strict'; 

var gLastRes = null;

$(document).ready(init);

function init() {
    console.log('Ready')
    createQuestsTree();
}

function onStartGuessing() {
    // hide the game-start section
    
    $('.game-start').hide('slow');
    renderQuest();
    // show the quest section
    $('.quest').show('fade');
}

function renderQuest() {
    // Select the <h2> inside quest and update its text by the currQuest text
    var $elQuest = $('.quest > h2')
    var quest = getCurrQuest();
    $elQuest.text(quest.txt) + '?'
    $elQuest.show('fade');

}

function onUserResponse(res) {
    var currQuest = getCurrQuest();
    // console.log('user answered this question : ', currQuest);
    // If this node has no children
    if (isChildless(currQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            // TODO: hide and show new-quest section
            $('.quest').hide('fade')
            $('.new-quest').show('fade')
        }
    } else {
        // update the lastRes global var
        gLastRes = res;
        console.log('C:User respond & gLastRes : ',gLastRes)
        moveToNextQuest(gLastRes);
        renderQuest();
    }
}

function onAddGuess() {
    // Get the inputs' values
    var newQuestTxt = $('#newQuest').val();
    var newGuessTxt = $('#newGuess').val();
    console.log('\n\ncontroller log')
    console.log('new question is: newQuestTxt :',newQuestTxt)
    console.log('new guess should be: newGuessTxt: ',newGuessTxt,'?')
    console.log('last result:',gLastRes)
    console.log('end of controller log')

    // Call the service addGuess
    addGuess(newQuestTxt, newGuessTxt, gLastRes)  //(No?)
    var tree = getQuestTree();
    console.log(tree)
    onRestartGame()
}


function onRestartGame() {
    console.log('\n\nGAME IS RETARTED\n\n')
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gPrevQuest = null;
    gQuestsTree = loadFromStorage(QUEST_TREE_KEY);
    gCurrQuest = gQuestsTree;
}

