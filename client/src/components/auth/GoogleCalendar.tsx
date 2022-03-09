
/* 
Google Auth Info 
*/
var CLIENT_ID = "188067316307-dhskcqlelqnegeipfdu2n9hetjj1r215.apps.googleusercontent.com"
var API_KEY = "AIzaSyAyF2lxdDJ1gzx4tirumsw1zpcxCcrO-w4"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"

declare global {
    interface Window {
        gapi:any;
    }
  }

const onGoogleCalendarSync = () => {

window.gapi = window.gapi || {};

var gapi = window.gapi;

    if(typeof gapi !== 'undefined') {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('Calendar synced!'))

            gapi.auth2.getAuthInstance().signIn()
            .then(() => {

                var event = {
                'summary': 'Awesome Event!',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'Really great refreshments',
                'start': {
                    'dateTime': '2020-06-28T09:00:00-07:00',
                    'timeZone': 'America/Los_Angeles'
                },
                'end': {
                    'dateTime': '2020-06-28T17:00:00-07:00',
                    'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                    'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                    { 'email': 'lpage@example.com' },
                    { 'email': 'sbrin@example.com' }
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 }
                    ]
                }
                }

                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                })

                request.execute(event => {
                    console.log(event)
                    window.open(event.htmlLink)
                })


                /*
                    Uncomment the following block to get events
                */

                // get events
                gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                    }).then(response => {
                    const events = response.result.items
                    console.log('EVENTS: ', events)
                })



            })
        })
    } else {
        console.log('gapi is undefined!!');
    }

    
}

export default onGoogleCalendarSync;
