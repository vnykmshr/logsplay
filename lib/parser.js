'use strict';

var fs = require('fs');
var util = require('util');
var stream = require('stream');
var es = require('event-stream');
var _s = require('underscore.string');

var findMean = require('./find-mean');
var findModes = require('./find-modes');
var findMedian = require('./find-median');
var findRange = require('./find-range');

var parser = {
    parse: function (logfile, endpoint, cb) {
        var data = {
            count: 0,
            fwds: [],
            dynos: [],
            responseTimes: [],
            stata: {}
        };

        var stime = Date.now();

        var s = fs.createReadStream(logfile).pipe(es.split()).pipe(es.mapSync(
            parseLine)).on('error', handleError).on('end', respond);

        function parseLine(line) {
            s.pause();

            (function () {
                if (!line) {
                    return;
                }

                var parts = line.split(' ');

                var payload = {
                    timestamp: new Date(parts.shift()),
                    source: parts.shift()
                };

                var regex = new RegExp(endpoint.regex);

                parts.forEach(function (entry) {
                    var entryParts = entry.split('=');
                    payload[entryParts[0]] = _s.unquote(entryParts[1]);
                });

                if (payload.method && payload.method === endpoint.method &&
                    payload.path.match(regex)) {

                    data.count++;

                    data.dynos.push(payload.dyno);

                    data.responseTimes.push(getResponseTime(payload));

                    data.fwds.push(payload.fwd);

                    if (!data.stata[payload.status]) {
                        data.stata[payload.status] = 0;
                    }

                    data.stata[payload.status] += Number(payload.bytes);
                }

                s.resume();
            })();
        }

        function respond() {
            var ptime = Date.now() - stime;
            util.log(util.format('Finished parsing: %s, %sms', logfile, ptime));

            // max dyno
            data.maxdyno = findModes(data.dynos);

            // max fwds
            data.maxfwd = findModes(data.fwds);

            // sort response times
            data.responseTimes.sort(compareNumbers);

            // mean
            data.mean = findMean(data.responseTimes);

            //median
            data.median = findMedian(data.responseTimes);

            // mode
            data.mode = findModes(data.responseTimes);

            // range
            data.range = findRange(data.responseTimes);

            delete data.responseTimes;
            delete data.dynos;
            delete data.fwds;

            util.log(util.format('processed results: %sms', Date.now() - stime -
                ptime));
            cb(null, data);
        }

        function handleError() {
            cb(new Error('Error parsing file: ' + logfile));
        }
    }
};

function getResponseTime(payload) {
    var responseTime = 0;
    ['connect', 'service'].forEach(function (entry) {
        responseTime += Number(payload[entry].replace(/ms/, ''));
    });

    return responseTime;
}

function compareNumbers(a, b) {
    return a - b;
}

module.exports = parser;

//payload
// { timestamp: Thu Jan 09 2014 12:03:04 GMT+0545 (NPT),
//   source: 'heroku[router]:',
//   at: 'info',
//   method: 'POST',
//   path: '/version_api/files',
//   host: 'services.pocketplaylab.com',
//   fwd: '81.152.126.250',
//   dyno: 'web.13',
//   connect: '1ms',
//   service: '35ms',
//   status: '200',
//   bytes: '69' }
