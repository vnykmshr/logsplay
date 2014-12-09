logsplay
========

Parses log and displays short summary about different requests on command line.

Getting Started
---------------

```
git clone git@github.com:vnykmshr/logsplay.git

cd logsplay

npm install

node main
```

Command Line Menu
-----------------

```
:: Main Menu ::
Please select an option
[1] GET  /api/users/{user_id}/count_pending_messages
[2] GET  /api/users/{user_id}/get_messages
[3] GET  /api/users/{user_id}/get_friends_progress
[4] GET  /api/users/{user_id}/get_friends_score
[5] POST /api/users/{user_id}
[6] GET  /api/users/{user_id}
[0/9] Exit Program
choice ?
```

Sample Output Response
----------------------

```
9 Dec 22:29:06 - Finished parsing: sample.log, 178ms
9 Dec 22:29:06 - processed results: 12ms
{ count: 6577,
  stata: { '200': 57418911, '304': 0 },
  maxdyno: [ 'web.8' ],
  maxfwd: [ '75.81.192.127' ],
  mean: 93.93294815265318,
  median: 35,
  mode: [ 11 ],
  range: 6620 }
```

Where, count is number of times the request was called. `mean`, `median`, `mode` and `range` is calculated on the response times (connect time + service time). The "dyno" that responded most is indicated as `maxdyno`. The field `stata` holds total data transferred in bytes with the http response code as the key. In the example above 57418911 bytes were transferred with http status code 200.

Sample Input Logfile
--------------------

```
2014-01-09T06:16:53.748849+00:00 heroku[router]: at=info method=POST path=/api/online/platforms/facebook_canvas/users/100002266342173/add_ticket host=services.pocketplaylab.com fwd="94.66.255.106" dyno=web.12 connect=12ms service=21ms status=200 bytes=78
2014-01-09T06:16:53.742892+00:00 heroku[router]: at=info method=GET path=/api/users/100002266342173/count_pending_messages host=services.pocketplaylab.com fwd="94.66.255.106" dyno=web.8 connect=9ms service=9ms status=304 bytes=0
2014-01-09T06:16:53.766841+00:00 heroku[router]: at=info method=POST path=/logs/save_personal_data host=services.pocketplaylab.com fwd="5.13.87.91" dyno=web.10 connect=1ms service=42ms status=200 bytes=16
2014-01-09T06:16:53.772938+00:00 heroku[router]: at=info method=POST path=/api/users/100002844291023 host=services.pocketplaylab.com fwd="46.195.178.244" dyno=web.6 connect=2ms service=43ms status=200 bytes=52
2014-01-09T06:16:53.765430+00:00 heroku[router]: at=info method=GET path=/api/users/100005936523817/get_friends_progress host=services.pocketplaylab.com fwd="5.13.87.91" dyno=web.11 connect=1ms service=47ms status=200 bytes=7498
2014-01-09T06:16:53.760472+00:00 heroku[router]: at=info method=POST path=/api/users/1770684197 host=services.pocketplaylab.com fwd="74.139.217.81" dyno=web.5 connect=1ms service=17ms status=200 bytes=681
2014-01-09T06:15:15.893505+00:00 heroku[router]: at=info method=GET path=/api/users/1686318645/get_friends_progress host=services.pocketplaylab.com fwd="1.125.42.139" dyno=web.3 connect=8ms service=90ms status=200 bytes=7534
2014-01-09T06:16:53.768188+00:00 heroku[router]: at=info method=GET path=/api/users/100005936523817/get_friends_score host=services.pocketplaylab.com fwd="5.13.87.91" dyno=web.13 connect=2ms service=46ms status=200 bytes=9355
2014-01-09T06:15:17.858874+00:00 heroku[router]: at=info method=POST path=/api/users/1145906359 host=services.pocketplaylab.com fwd="107.220.72.53" dyno=web.14 connect=2ms service=362ms status=200 bytes=52
2014-01-09T06:16:53.797975+00:00 heroku[router]: at=info method=GET path=/api/users/100000622081059/count_pending_messages host=services.pocketplaylab.com fwd="174.239.6.42" dyno=web.12 connect=1ms service=20ms status=200 bytes=33
```
