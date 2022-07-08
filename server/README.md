# Usage

### To run

`npm run get-data [operation] [amount] [startFrom]`

The function accepts two operaions

-   `display` - displays the amount of fetched pokemons, and the max id the program was able to obtain.
-   `fetch` - fetching pokemons based on other params like `amount` and `startFrom`. When providing the program with only
    `fetch` it will get the top 100 pokemons

All fetched data is written in the `data.json` file.
