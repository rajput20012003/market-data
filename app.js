document.addEventListener("DOMContentLoaded", () => {
  const apiUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
  const tableBody = document.querySelector("#cryptoTable tbody");
  let cryptoData = [];

  // Fetch data using .then
  function fetchDataThen() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        cryptoData = data;
        renderTable(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Fetch data using async/await
  async function fetchDataAsync() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      cryptoData = data;
      renderTable(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Render table
  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach((coin) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${coin.image}" alt="${
        coin.name
      }" width="20" height="20"></td>
                <td>${coin.name}</td>
                <td>${coin.symbol.toUpperCase()}</td>
                <td>$${coin.current_price}</td>
                <td>${coin.total_volume}</td>
            `;
      tableBody.appendChild(row);
    });
  }

  // Search functionality
  document.getElementById("searchButton").addEventListener("click", () => {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const filteredData = cryptoData.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData);
  });

  // Sort by market cap
  document.getElementById("sortMarketCap").addEventListener("click", () => {
    const sortedData = [...cryptoData].sort(
      (a, b) => b.market_cap - a.market_cap
    );
    renderTable(sortedData);
  });

  // Sort by percentage change (dummy sort as percentage change is not in the given API data)
  document
    .getElementById("sortPercentageChange")
    .addEventListener("click", () => {
      const sortedData = [...cryptoData].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
      renderTable(sortedData);
    });

  // Fetch data initially using .then
  fetchDataThen();
  // fetchDataAsync();
});