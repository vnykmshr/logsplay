'use strict';

var parser = require('./lib/parser');

var rint = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var menuItems = [
    '', ':: Main Menu ::', 'Please select an option',
    '[1] GET  /api/users/{user_id}/count_pending_messages',
    '[2] GET  /api/users/{user_id}/get_messages',
    '[3] GET  /api/users/{user_id}/get_friends_progress',
    '[4] GET  /api/users/{user_id}/get_friends_score',
    '[5] POST /api/users/{user_id}',
    '[6] GET  /api/users/{user_id}',
    '[0/9] Exit Program'];

var RES_PROMPT = '   >>> []';

var logfile;

if (require.main === module) {
    (function () {
        logfile = process.argv[2] || 'sample.log';
        showMenu();
    })();
}

function showMenu(cb) {
    menuItems.forEach(function (entry) {
        console.log(entry);
    });

    rint.question('choice ? ', processUserInput);
}

function processUserInput(choice) {
    var endpoint;
    switch (choice) {
    case '1':
        endpoint = {
            method: 'GET',
            regex: '/count_pending_messages'
        };

        parser.parse(logfile, endpoint, showSummary);
        break;
    case '2':
        endpoint = {
            method: 'GET',
            regex: '/get_messages'
        };

        parser.parse(logfile, endpoint, showSummary);
        break;
    case '3':
        endpoint = {
            method: 'GET',
            regex: '/get_friends_progress'
        };

        parser.parse(logfile, endpoint, showSummary);
        break;
    case '4':
        endpoint = {
            method: 'GET',
            regex: '/get_friends_score'
        };

        parser.parse(logfile, endpoint, showSummary);
        break;
    case '5':
        endpoint = {
            method: 'POST',
            regex: '/users'
        };

        parser.parse(logfile, endpoint, showSummary);
        break;
    case '6':
        endpoint = {
            method: 'GET',
            regex: '/users'
        };

        parser.parse(logfile, endpoint, showSummary);
        break;
    case '0':
    case '9':
        console.log(RES_PROMPT, 'Goodbye!');
        process.exit(1);
        break;
    default:
        console.log(RES_PROMPT, 'Invalid option', choice);
        showMenu();
    }
}

function showSummary(err, result) {
    console.log(err || result);
    showMenu();
}
