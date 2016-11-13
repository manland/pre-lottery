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

implementations.forEach((implementation) => {

    describe(implementation.language, () => {

        let eventIsCreated = false;

        beforeAll((onDone) => {
            // inactive token request because not used today

            //const token = getParameterByName('token');
            //if(token) {
            //    fetch(`https://www.eventbriteapi.com/v3/events/search/?organizer.id=1464915124&token=${token}`)
            //        .then(data => data.json())
            //        .then(data => {
            //            eventIsCreated = data.events.length > 0;
            //            onDone();
            //        })
            //        .catch((err) => expect(err).toBeNull())
            //        .catch(onDone);
            //} else {
            //    window.alert('Add a token in url please!')
            //}

            onDone();
        });

        it(`should return 1 winner :: ${implementation.url}/winners?nb=1`, onDone => {
            fetch(`${implementation.url}/winners?nb=1`)
                .then(data => {
                    expect(data.status).toBe(200);
                    return data.json();
                })
                .then(data => {
                    expect(data.length).toBe(1);
                    onDone();
                })
                .catch((err) => expect(err).toBeNull())
                .catch(onDone);
        });

        it(`should return 1 winner well formatted :: ${implementation.url}/winners?nb=1`, onDone => {
            fetch(`${implementation.url}/winners?nb=1`)
                .then(data => {
                    expect(data.status).toBe(200);
                    return data.json();
                })
                .then(data => {
                    expect(data.length).toBe(1);
                    expect(data[0].last_name).not.toBeUndefined();
                    expect(data[0].first_name).not.toBeUndefined();
                    expect(data[0].email).toBeUndefined();
                    onDone();
                })
                .catch((err) => expect(err).toBeNull())
                .catch(onDone);
        });

        it(`should return n winners :: ${implementation.url}/winners?nb=N`, onDone => {
            const nb = Math.floor((Math.random() * 5) + 1);
            fetch(`${implementation.url}/winners?nb=${nb}`)
                .then(data => {
                    expect(data.status).toBe(200);
                    return data.json();
                })
                .then(data => {
                    expect(data.length).toBe(nb);
                    onDone();
                })
                .catch((err) => expect(err).toBeNull())
                .catch(onDone);
        });

        it(`should return an empty array when nb param is 0 :: ${implementation.url}/winners?nb=0`, onDone => {
            fetch(`${implementation.url}/winners?nb=0`)
                .then(data => {
                    expect(data.status).toBe(200);
                    return data.json();
                })
                .then((data) => {
                    expect(data.length).toBe(0);
                    onDone();
                })
                .catch((err) => expect(err).toBeNull())
                .catch(onDone);
        });

        it(`should return all winners when nb param is big :: ${implementation.url}/winners?nb=10000`, onDone => {
            fetch(`${implementation.url}/winners?nb=10000`)
                .then(data => {
                    expect(data.status).toBe(200);
                    return data.json();
                })
                .then(data => {
                    expect(data.length).toBeGreaterThan(0);
                    onDone();
                })
                .catch((err) => expect(err).toBeNull())
                .catch(onDone);
        });

        it(`should return an http 400 error when no param nb :: ${implementation.url}/winners`, onDone => {
            fetch(`${implementation.url}/winners`)
                .then(data => {
                    expect(data.status).toBe(400);
                    onDone();
                })
                .catch((err) => expect(err).toBeNull())
                .catch(onDone);
        });

        it(`should return an http 400 error when param nb is not a number :: ${implementation.url}/winners?nb=nb`, onDone => {
            fetch(`${implementation.url}/winners?nb=nb`)
                .then(data => {
                    expect(data.status).toBe(400);
                    onDone();
                })
                .catch((err) => expect(err).toBeNull())
                .catch(onDone);
        });

        it(`should return an http 400 error when nb param is negative :: ${implementation.url}/winners?nb=-1`, onDone => {
            fetch(`${implementation.url}/winners?nb=-1`)
                .then(data => {
                    expect(data.status).toBe(400);
                    onDone();
                })
                .catch((err) => expect(err).toBeNull())
                .catch(onDone);
        });

    });
});

const startWithoutEvent = () => {

    implementations.forEach((implementation) => {

        it(`should return an http 502 error when no event found :: ${implementation.url}/winners?nb=1`, onDone => {
            fetch(`${implementation.url}/winners?nb=1`).then(data => {
                expect(data.status).toBe(502);
                onDone();
            }, onDone);
        });
    });

};
