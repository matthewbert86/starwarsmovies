/*****    STAR WARS MOVIE FINDER APP    *****/
// The objective of this app is for the user to enter in the name or number of a Star Wars movie, and information about that movie will return to the user.

// Step 1 - grab any DOM elements we are working with
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
// Were using the fetch api, which returns a promise
// were using async await when dealing with promises
const searchStates = async searchText => {
    const res = await fetch('../data/movies.json');
    // Were telling the fetch api that we are using json
    // const states is going to give us the array data
    const movies = await res.json();

    // We want to filter through the array and match what is being typed in
    // Get matches to current text input
    // filter() - loops through and returns an array based on a condition
    let matches = movies.filter(state => {
        const regex = new RegExp(`${searchText}`, 'gi');
        // return array that matches input
        return state.title.match(regex) || state.episode_number.match(regex);
    });
    // lets prevent all movies from showing up once you delete letters/words
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    // lets output out matches to the html
    outputHtml(matches);
};

const outputHtml = matches => {
    if (matches.length > 0) {
        // .map() returns an array from an array
        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <span class="text-primary"><h4>${match.title}</h4></span><br></h4>
            <small><h6>About:</h6><br> ${match.description}</small>
        </div>
        `).join('');
        //.join('') turns the array into a string, and it returns the html

        matchList.innerHTML = html;
    }
}

// We need an event that calls off a function anytime we use the search bar
search.addEventListener('input', () => searchStates(search.value));