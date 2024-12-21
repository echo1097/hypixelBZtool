// Constants and DOM Elements
const API_KEY = 'e8779308-425a-4dff-964f-fea955434c4c'; // Replace with your Hypixel API key
const API_BASE_URL = 'https://api.hypixel.net/skyblock/bazaar';

// DOM Elements
const elements = {
    minionType: document.getElementById('minion-type'),
    minionTier: document.getElementById('minion-tier'),
    durationValue: document.getElementById('duration-value'),
    durationUnit: document.getElementById('duration-unit'),
    fuel: document.getElementById('fuel'),
    storage: document.getElementById('storage'),
    automation: document.getElementById('automation'),
    calculateBtn: document.getElementById('calculate'),
    results: document.getElementById('results'),
    hourlyProfit: document.getElementById('hourly-profit'),
    dailyProfit: document.getElementById('daily-profit'),
    totalProfit: document.getElementById('total-profit'),
    itemsProduced: document.getElementById('items-produced'),
    rawIncome: document.getElementById('raw-income'),
    upgradeCosts: document.getElementById('upgrade-costs'),
    fuelCosts: document.getElementById('fuel-costs')
};

// Initialize the calculator
function initialize() {
    populateTierOptions();
    elements.minionType.addEventListener('change', populateTierOptions);
    elements.calculateBtn.addEventListener('click', calculateProfit);
}

// Populate tier options based on selected minion
function populateTierOptions() {
    const selectedMinion = MINION_DATA.minions[elements.minionType.value];
    elements.minionTier.innerHTML = '';

    for (let i = 1; i <= selectedMinion.maxTier; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Tier ${i}`;
        elements.minionTier.appendChild(option);
    }
}

// Calculate production rate
function calculateProductionRate(minionType, tier, fuel) {
    const minionData = MINION_DATA.minions[minionType].tierData[tier];
    const fuelData = MINION_DATA.fuels[fuel];

    const baseInterval = minionData.interval;
    const itemsPerAction = minionData.items;
    const speedBoost = fuelData.speedBoost / 100;

    const actualInterval = baseInterval * (1 - speedBoost);
    const actionsPerHour = 3600 / actualInterval;

    return {
        itemsPerHour: actionsPerHour * itemsPerAction,
        actionsPerHour: actionsPerHour
    };
}

// Calculate diamond spreading
function calculateDiamondProduction(actionsPerHour, duration) {
    const chance = MINION_DATA.diamondSpreading.chancePerAction;
    const amount = MINION_DATA.diamondSpreading.amount;
    return actionsPerHour * chance * amount * duration;
}

// Calculate total costs
function calculateCosts(fuel, storage, automation, duration) {
    const fuelData = MINION_DATA.fuels[fuel];
    const storageData = MINION_DATA.storage[storage];
    const automationData = MINION_DATA.automation[automation];

    let totalCosts = {
        fuelCost: 0,
        upgradeCost: storageData.cost + automationData.cost
    };

    // Calculate fuel costs if not infinite duration
    if (fuelData.duration !== 'infinite' && fuelData.duration > 0) {
        const hoursNeeded = getDurationInHours(duration);
        const fuelUnitsNeeded = Math.ceil(hoursNeeded / (fuelData.duration));
        totalCosts.fuelCost = fuelData.cost * fuelUnitsNeeded;
    } else if (fuelData.duration !== 'infinite') {
        totalCosts.fuelCost = fuelData.cost; // One-time fuel cost
    }

    return totalCosts;
}

// Convert duration to hours
function getDurationInHours(duration) {
    const value = parseInt(elements.durationValue.value);
    const unit = elements.durationUnit.value;

    const multipliers = {
        'hours': 1,
        'days': 24,
        'weeks': 168
    };

    return value * multipliers[unit];
}

// Format number with commas
function formatNumber(num) {
    return Math.round(num).toLocaleString();
}

// Main calculation function
async function calculateProfit() {
    try {
        const minionType = elements.minionType.value;
        const tier = parseInt(elements.minionTier.value);
        const duration = getDurationInHours();
        const fuel = elements.fuel.value;
        const storage = elements.storage.value;
        const automation = elements.automation.value;

        // Get production rates
        const production = calculateProductionRate(minionType, tier, fuel);
        const totalItems = production.itemsPerHour * duration;
        const diamondProduction = calculateDiamondProduction(production.actionsPerHour, duration);

        // Get current prices
        const minion = MINION_DATA.minions[minionType];
        const prices = await fetchPrices([minion.products.primary, 'DIAMOND']);

        // Calculate income
        const primaryIncome = totalItems * prices[minion.products.primary];
        const diamondIncome = diamondProduction * prices['DIAMOND'];
        const totalIncome = primaryIncome + diamondIncome;

        // Calculate costs
        const costs = calculateCosts(fuel, storage, automation, duration);
        const totalCosts = costs.fuelCost + costs.upgradeCost;

        // Calculate profits
        const netProfit = totalIncome - totalCosts;
        const hourlyProfit = netProfit / duration;
        const dailyProfit = hourlyProfit * 24;

        // Display results
        elements.results.classList.remove('hidden');
        elements.hourlyProfit.textContent = `${formatNumber(hourlyProfit)} coins`;
        elements.dailyProfit.textContent = `${formatNumber(dailyProfit)} coins`;
        elements.totalProfit.textContent = `${formatNumber(netProfit)} coins`;
        elements.itemsProduced.textContent = formatNumber(totalItems);
        elements.rawIncome.textContent = `${formatNumber(totalIncome)} coins`;
        elements.upgradeCosts.textContent = `${formatNumber(costs.upgradeCost)} coins`;
        elements.fuelCosts.textContent = `${formatNumber(costs.fuelCost)} coins`;

    } catch (error) {
        console.error('Calculation error:', error);
        alert('Error calculating profit. Please check the console for details.');
    }
}

// Fetch prices from bazaar
async function fetchPrices(products) {
    try {
        const response = await fetch(`${API_BASE_URL}?key=${API_KEY}`);
        const data = await response.json();

        if (!data.success) throw new Error('Failed to fetch bazaar data');

        const prices = {};
        products.forEach(product => {
            prices[product] = data.products[product].quick_status.sellPrice;
        });

        return prices;
    } catch (error) {
        console.error('Error fetching prices:', error);
        throw error;
    }
}

// Initialize calculator on page load
document.addEventListener('DOMContentLoaded', initialize);