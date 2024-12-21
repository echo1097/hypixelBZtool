// Configuration
const API_KEY = 'e8779308-425a-4dff-964f-fea955434c4c'; // Replace with your Hypixel API key
const API_BASE_URL = 'https://api.hypixel.net/skyblock/bazaar';
const REFRESH_INTERVAL = 30; // Seconds between refreshes

// DOM Elements
const searchInput = document.getElementById('searchInput');
const itemsGrid = document.getElementById('itemsGrid');
const timerElement = document.getElementById('timer');

// Timer variables
let timeUntilRefresh = REFRESH_INTERVAL;
let timerInterval;

// Fetch bazaar data
async function fetchBazaarData() {
    try {
        const response = await fetch(`${API_BASE_URL}?key=${API_KEY}`);
        const data = await response.json();

        if (data.success) {
            return data.products;
        } else {
            throw new Error('Failed to fetch bazaar data');
        }
    } catch (error) {
        console.error('Error fetching bazaar data:', error);
        return null;
    }
}

// Create item card
function createItemCard(itemData) {
    const card = document.createElement('div');
    card.className = 'item-card';

    const buyPrice = Math.round(itemData.quick_status.buyPrice * 100) / 100;
    const sellPrice = Math.round(itemData.quick_status.sellPrice * 100) / 100;
    const formattedName = formatItemName(itemData.product_id);

    card.innerHTML = `
        <div class="item-name">${formattedName}</div>
        <div class="item-price">Buy: ${buyPrice.toLocaleString()} coins</div>
        <div class="item-price">Sell: ${sellPrice.toLocaleString()} coins</div>
        <div class="item-demand">Demand: ${itemData.quick_status.buyVolume.toLocaleString()}</div>
    `;

    return card;
}

// Format item name
function formatItemName(productId) {
    return productId
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Filter items based on search
function filterItems(items, searchTerm) {
    const term = searchTerm.toLowerCase();
    return Object.entries(items).filter(([productId]) => 
        formatItemName(productId).toLowerCase().includes(term)
    );
}

// Update items display
async function updateDisplay(searchTerm = '') {
    if (!itemsGrid) return;

    itemsGrid.innerHTML = '<div class="loading">Loading bazaar data...</div>';

    const items = await fetchBazaarData();

    if (!items) {
        itemsGrid.innerHTML = '<div class="error-message">Error loading bazaar data. Please try again later.</div>';
        return;
    }

    const filteredItems = filterItems(items, searchTerm);
    itemsGrid.innerHTML = '';

    if (filteredItems.length === 0) {
        itemsGrid.innerHTML = '<div class="error-message">No items found matching your search.</div>';
        return;
    }

    filteredItems.forEach(([_, itemData]) => {
        const card = createItemCard(itemData);
        itemsGrid.appendChild(card);
    });
}

// Timer function
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timeUntilRefresh = REFRESH_INTERVAL;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeUntilRefresh--;
        updateTimerDisplay();

        if (timeUntilRefresh <= 0) {
            timeUntilRefresh = REFRESH_INTERVAL;
            updateDisplay(searchInput ? searchInput.value : '');
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    if (timerElement) {
        timerElement.textContent = timeUntilRefresh;
    }
}

// Event listeners
if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            updateDisplay(e.target.value);
        }, 300);
    });
}

// Initialize
if (window.location.pathname.includes('bazaar.html')) {
    updateDisplay();
    startTimer();
}

// Cleanup
window.addEventListener('beforeunload', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});
