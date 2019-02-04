///////////////////////////////////////
///////////// Controller //////////////
///////////////////////////////////////

'use strict';

var gLastRes = null;
var gNewQuestAns = null;
const SPEAKER = 'I asked'

$(document).ready(init);

function init() {
    console.log('Game is Ready')
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide('slow');
    $('.game-success').hide('fade');
    renderQuest();
    $('.quest').show('fade');
}

function renderQuest() {
    // Select the <h2> inside quest and update its text by the currQuest text
    var $elQuest = $('.quest > h2')
    var guess = getCurrQuest();
    // console.log(guess.txt)
    // var quest;
    if (isChildless(guess)) {
        var quest = `Is it ${guess.txt}?`;
    } else {
        var quest = `Is your character a ${guess.txt}?`;
    }
    $elQuest.text(quest);
    saveLog(SPEAKER,quest);
    $elQuest.show('fade');
    renderBender('any');

}

function renderBender(rule) {
    var randNum = getRandomInt(1, 9);
    // var newImg;
    switch (rule) {
        case 'success' :
        var newImg = `<img class="bender-img" src="img/success.gif" />`;
        break;
        case 'fail' :
        var newImg = `<img class="bender-img" src="img/giveup.png" />`;
        break;
        case 'any':
        default :
            var newImg = `<img class="bender-img" src="img/${randNum}.png" />`;
            break;
    }
    $('.bender-container').html(newImg);

}

function onUserResponse(res) {
    var currQuest = getCurrQuest();
    saveLog('You answered',res);
    // If this node has no children
    if (isChildless(currQuest)) {
        if (res === 'yes') {
            renderBender('success');
            $('.quest').hide('slow')
            $('.game-success').show('fade')
        } else {
            renderBender('fail');
            var log = getGameLog();
            console.log(log)
            $('.quest').hide('fade')
            $('.new-quest').show('fade')
        }
    } else {
        // update the lastRes global var
        gLastRes = res;
        moveToNextQuest(gLastRes);
        renderQuest();
    }
}

function onAddGuess() {
    // Get the inputs' values
    var newQuestTxt = getProperGuess($('#newQuest').val());
    var newGuessTxt = getProperGuess($('#newGuess').val());
    renderBender('any')
    // Call the service addGuess
    addGuess(newQuestTxt, newGuessTxt, gLastRes, gNewQuestAns)
    var tree = getQuestTree();
    console.log(tree)
    onRestartGame()
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-success').hide();
    $('.game-start').show();

    restartGlobalVars()
}


function onNewQuestAnswer(ans) {
    gNewQuestAns = ans;
    console.log(`I was clicked (${ans})`)
    return;
}

function getGameLog(){
    return gGameLog;
}

function onShowLog(){
    var gameLog = getGameLog();
    var logHtml = `<h6>${gameLog}</h6>`
    $('.log-modal').html(logHtml);
    $('.log-modal').toggle('fade')
}


 