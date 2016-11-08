const implementations = [{
    language: 'NodeJs',
    url: 'https://lottery-js.jug-montpellier.org'///winners?nb=1'
}, {
    language: 'Scala',
    url: 'https://lottery-scala.jug-montpellier.org'///winners?n=1'
}, {
    language: 'Go',
    url: 'https://lottery-go.jug-montpellier.org'
}];

let eventIsCreated = false;

describe('Init', () => {

    const token = getParameterByName('token');

    it(`should have query param token in url`, () => expect(token).not.toBeNull());

    if(token) {
        it(`should have an event created or not`, onDone => {
            fetch(`https://www.eventbriteapi.com/v3/events/search/?organizer.id=1464915124&token=${token}`).then(data => {
                eventIsCreated = data.json().events.length > 0;
                oneDone();
            }, onDone);
        });
    }

});

implementations.forEach((implementation) => {

    describe(implementation.language, () => {

        if(eventIsCreated) {

            it(`should return 1 winner :: ${implementation.url}/winners?nb=1`, onDone => {
                fetch(`${implementation.url}/winners?nb=1`).then(data => {
                    expect(data.status).toBe(200);
                    expect(data.json().length).toBe(1);
                    onDone();
                }, onDone);
            });

            it(`should return n winners :: ${implementation.url}/winners?nb=N`, onDone => {
                const nb = Math.floor((Math.random() * 10) + 1);
                fetch(`${implementation.url}/winners?nb=${nb}`).then(data => {
                    expect(data.status).toBe(200);
                    expect(data.json().length).toBe(nb);
                    onDone();
                }, onDone);
            });

            it(`should return an empty array when nb param is 0 :: ${implementation.url}/winners?nb=0`, onDone => {
                fetch(`${implementation.url}/winners?nb=0`).then(data => {
                    expect(data.status).toBe(200);
                    expect(data.json().length).toBe(0);
                    onDone();
                }, onDone);
            });

            it(`should return all winners when nb param is big :: ${implementation.url}/winners?nb=10000`, onDone => {
                fetch(`${implementation.url}/winners?nb=10000`).then(data => {
                    expect(data.status).toBe(200);
                    expect(data.json().length).toBeGreaterThan(0);
                    onDone();
                }, onDone);
            });

            it(`should return an http 400 error when no param nb :: ${implementation.url}/winners`, onDone => {
                fetch(`${implementation.url}/winners`).then(data => {
                    expect(data.status).toBe(400);
                    onDone();
                }, onDone);
            });

            it(`should return an http 400 error when param nb is not a number :: ${implementation.url}/winners?nb=nb`, onDone => {
                fetch(`${implementation.url}/winners?nb=nb`).then(data => {
                    expect(data.status).toBe(400);
                    onDone();
                }, onDone);
            });

            it(`should return an http 400 error when nb param is negative :: ${implementation.url}/winners?nb=-1`, onDone => {
                fetch(`${implementation.url}/winners?nb=-1`).then(data => {
                    expect(data.status).toBe(400);
                    onDone();
                }, onDone);
            });

        } else { // no event created

            it(`should return an http 502 error when no event found :: ${implementation.url}/winners?nb=1`, onDone => {
                fetch(`${implementation.url}/winners?nb=1`).then(data => {
                    expect(data.status).toBe(502);
                    onDone();
                }, onDone);
            });

        }

    });

});
