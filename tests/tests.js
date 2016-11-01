const implementations = [{
    language: 'NodeJs',
    url: 'http://lottery-js.jug-montpellier.org'///winners?nb=1'
}, {
    language: 'Scala',
    url: 'http://lottery-scala.jug-montpellier.org'///winners?n=1'
}, {
    language: 'Go',
    url: 'http://lottery-go.jug-montpellier.org'
}];

implementations.forEach((implementation) => {

    describe(implementation.language, function() {

        it(`should return 1 winner :: ${implementation.url}/winners?nb=1`, function(onDone) {
            fetch(`${implementation.url}/winners?nb=1`).then((data) => {
                expect(data.status).toBe(200);
                return data.json();
            }).then((json) => {
                expect(json.length).toBe(1);
                onDone();
            });
        });

        it(`should return n winners :: ${implementation.url}/winners?nb=N`, function(onDone) {
            const nb = Math.floor((Math.random() * 10) + 1);
            fetch(`${implementation.url}/winners?nb=${nb}`).then((data) => {
                expect(data.status).toBe(200);
                return data.json();
            }).then((json) => {
                expect(json.length).toBe(nb);
                onDone();
            });
        });

        it(`should return an empty array when nb param is 0 :: ${implementation.url}/winners?nb=0`, function(onDone) {
            fetch(`${implementation.url}/winners?nb=0`).then((data) => {
                expect(data.status).toBe(200);
                return data.json();
            }).then((json) => {
                expect(json.length).toBe(0);
                onDone();
            });
        });

        it(`should return all winners when nb param is big :: ${implementation.url}/winners?nb=10000`, function(onDone) {
            fetch(`${implementation.url}/winners?nb=10000`).then((data) => {
                expect(data.status).toBe(200);
                return data.json();
            }).then((json) => {
                expect(json.length).toBeGreaterThan(0);
                onDone();
            });
        });

        it(`should return an http 400 error when no param nb :: ${implementation.url}/winners`, function(onDone) {
            fetch(`${implementation.url}/winners`).then((data) => {
                expect(data.status).toBe(400);
                onDone();
            });
        });

        it(`should return an http 400 error when param nb is not a number :: ${implementation.url}/winners?nb=nb`, function(onDone) {
            fetch(`${implementation.url}/winners?nb=nb`).then((data) => {
                expect(data.status).toBe(400);
                onDone();
            });
        });

        it(`should return an http 400 error when nb param is negative :: ${implementation.url}/winners?nb=-1`, function(onDone) {
            fetch(`${implementation.url}/winners?nb=-1`).then((data) => {
                expect(data.status).toBe(400);
                onDone();
            });
        });

    });

});
    

