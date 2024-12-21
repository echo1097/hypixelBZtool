const MINION_DATA = {
    minions: {
        SNOW: {
            name: "Snow Minion",
            baseInterval: 13,
            itemsPerAction: 4,
            maxTier: 11,
            products: {
                primary: "SNOW_BALL",
                secondary: "DIAMOND" // From diamond spreading
            },
            tierData: {
                1: { interval: 13.0, items: 4 },
                2: { interval: 13.0, items: 4 },
                3: { interval: 12.0, items: 4 },
                4: { interval: 12.0, items: 4 },
                5: { interval: 11.0, items: 5 },
                6: { interval: 11.0, items: 5 },
                7: { interval: 10.0, items: 5 },
                8: { interval: 10.0, items: 5 },
                9: { interval: 9.0, items: 6 },
                10: { interval: 9.0, items: 6 },
                11: { interval: 8.0, items: 6 }
            }
        },
        SLIME: {
            name: "Slime Minion",
            baseInterval: 26,
            itemsPerAction: 1,
            maxTier: 11,
            products: {
                primary: "SLIME_BALL",
                secondary: "DIAMOND" // From diamond spreading
            },
            tierData: {
                1: { interval: 26.0, items: 1 },
                2: { interval: 24.0, items: 1 },
                3: { interval: 22.0, items: 1 },
                4: { interval: 20.0, items: 1 },
                5: { interval: 18.0, items: 1 },
                6: { interval: 16.0, items: 1 },
                7: { interval: 14.0, items: 1 },
                8: { interval: 12.0, items: 1 },
                9: { interval: 10.0, items: 1 },
                10: { interval: 9.0, items: 1 },
                11: { interval: 8.0, items: 1 }
            }
        }
    },

    fuels: {
        none: {
            name: "No Fuel",
            speedBoost: 0,
            duration: "infinite",
            cost: 0
        },
        coal: {
            name: "Coal",
            speedBoost: 5,
            duration: 24,
            cost: 2000
        },
        enchanted_coal: {
            name: "Enchanted Coal",
            speedBoost: 10,
            duration: 48,
            cost: 32000
        },
        enchanted_lava_bucket: {
            name: "Enchanted Lava Bucket",
            speedBoost: 25,
            duration: "infinite",
            cost: 1200000
        },
        plasma_bucket: {
            name: "Plasma Bucket",
            speedBoost: 35,
            duration: "infinite",
            cost: 50000000
        }
    },

    storage: {
        none: {
            name: "No Storage",
            capacity: 64,
            cost: 0
        },
        small_storage: {
            name: "Small Storage",
            capacity: 128,
            cost: 2000
        },
        medium_storage: {
            name: "Medium Storage",
            capacity: 256,
            cost: 5000
        },
        large_storage: {
            name: "Large Storage",
            capacity: 512,
            cost: 8000
        },
        budget_hopper: {
            name: "Budget Hopper",
            capacity: "infinite",
            cost: 50000
        },
        enchanted_hopper: {
            name: "Enchanted Hopper",
            capacity: "infinite",
            cost: 800000
        }
    },

    automation: {
        none: {
            name: "None",
            effect: "none",
            cost: 0
        },
        auto_smelter: {
            name: "Auto Smelter",
            effect: "smelting",
            cost: 64000
        },
        compactor: {
            name: "Compactor",
            effect: "compression",
            cost: 128000
        },
        super_compactor: {
            name: "Super Compactor 3000",
            effect: "super_compression",
            cost: 600000
        },
        
    },

    diamondSpreading: {
        chancePerAction: 0.1, // 10% chance per action
        amount: 1
    }
};