const search = document.getElementById("search");
const mathList = document.getElementById("match-list");

// Search State.json and filter it
const searchStates = async (searchText) => {
    const res = await fetch("./data.json");
    const states = await res.json();

    //Get matches to current text input
    let matches = states.filter((state) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if (searchText.length === 0) {
        matches = {};
        mathList.innerHTML = "";
    }

    outputHtml(matches);
};

//show results in html
const outputHtml = (matches) => {
    if (matches.length > 0) {
        const html = matches
            .map(
                (match) => `
        <div class="card card-body mb-4">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `
            )
            .join("");

        mathList.innerHTML = html;
    }
};

search.addEventListener("input", () => searchStates(search.value));
