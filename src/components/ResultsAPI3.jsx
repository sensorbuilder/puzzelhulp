import React from "react";

//const baseURL = 'https://www.mijnwoordenboek.nl/puzzelwoordenboek/';
//const selector2 = 'body > div.main-holder > div > div > div > div > div > div.span8.right > div > div:nth-child(n) > table > tbody > tr:nth-child(n) > td > div:nth-child(n)';
const kvURL = 'https://puzzelhulp-worker.0nu2sngw3778.workers.dev/?searchword=';

export default function Results(props) {
    const { searchword, solution, setSolution, setSolutionSource } = props;
    let solutionArr = [];

    React.useEffect(() => {
        const trimmedSearchword = searchword?.trim();
        if (!trimmedSearchword) {
            setSolution([]);
            return;
        }

        const normalizedSearchword = trimmedSearchword.toUpperCase();
        const controller = new AbortController();

        setSolution([]);
        solutionArr = [];

        async function makeApiCalls() {
            try {
                const cacheResponse = await fetch(kvURL + encodeURIComponent(normalizedSearchword), {
                    method: 'GET',
                    cache: 'no-store',
                    signal: controller.signal,
                });

                const cacheData = await cacheResponse.json();

                if (controller.signal.aborted) return;

                if (cacheData?.source) {
                    setSolutionSource(cacheData.source);
                }

                if (cacheData?.found && cacheData.solution) {
                    setSolution(JSON.parse(cacheData.solution));
                } else {
                    setSolution([]);
                }
            } catch (error) {
                if (controller.signal.aborted) return;
                console.log({ error });
            }
        }

        makeApiCalls();

        return () => {
            controller.abort();
        };
    }, [searchword, setSolution]);

    const results = solution.map((e) => (
        <div key={e.letters}>
            <p className="letters">{e.letters} - letters</p>
            <p className="results">
                {e.woorden.reduce((acc, word, index) => {
                    acc.push(
                        <span key={word} className="result"> • {word} </span>
                    );
                    if (index === e.woorden.length - 1) {
                        acc.push(<span key={`separator-${index}`}>•</span>);
                    }
                    return acc;
                }, [])}
            </p>
        </div>
    ));

    return (
        <div className="results--form">
            {searchword && results}
        </div>
    );
}
