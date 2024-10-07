export const zones = [
    {
        name: "Cheep-o Animal Feed",
        risk: 0,
        bounty: 1,
        remaining: 50,
        unlocked: true,
        room: "start",
        x: 9285,
        y: 1316
    },
    {
        name: "Locker",
        risk: 0,
        bounty: 2,
        remaining: 40,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("opener"),
        requires: ["opener"],
        room: "start",
        x: 9052,
        y: 1146
    },
    {
        name: "Standard Moustrap",
        risk: 4,
        bounty: 10,
        remaining: 80,
        unlocked: true,
        room: "start",
        requires: ["opener"],
        x: 8461,
        y: 1338
    },
    {
        name: "Vent",
        risk: 0,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        room: "start",
        unlocksRoom: "breakroom",
        x: 8873,
        y: 233,
        requires: ["explorer"]
    },
    {
        name: "Containment Room Door",
        risk: 1,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        room: "start",
        unlocksRoom: "hall",
        x: 8484,
        y: 985,
        requires: ["explorer"]
    },
    {
        name: "Food Cabinet",
        risk: 1,
        bounty: 1,
        remaining: 80,
        unlocked: true,
        room: "breakroom",
        x: 6662,
        y: 584
    },
    {
        name: "Microwave",
        risk: 2,
        bounty: 2,
        remaining: 40,
        unlocked: true,
        room: "breakroom",
        x: 6670,
        y: 949
    },
    {
        name: "Table",
        risk: 1,
        bounty: 2,
        remaining: 50,
        unlocked: true,
        room: "breakroom",
        x: 7050,
        y: 983
    },
    {
        name: "Gun Mouse Trap",
        risk: 5,
        bounty: 20,
        remaining: 100,
        unlocked: true,
        room: "breakroom",
        x: 6838,
        y: 1334
    },
    {
        name: "Breakroom Door",
        risk: 1,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        requires: ["explorer"],
        unlocksRoom: "hall",
        room: "breakroom",
        x: 7465,
        y: 921
    },
    {
        name: "Poison",
        risk: 5,
        bounty: 1,
        remaining: 0,
        unlocked: true,
        room: "breakroom",
        x: 7236,
        y: 290
    },
    {
        name: "Suspicious Smoothie",
        risk: 2,
        bounty: 1,
        remaining: 80,
        unlocked: true,
        room: "kitchen",
        x: 4453,
        y: 770
    },
    {
        name: "Discarded Soup",
        risk: 1,
        bounty: 1,
        remaining: 30,
        unlocked: true,
        room: "kitchen",
        x: 5177,
        y: 847
    },
    {
        name: "Mouse Trap",
        risk: 5,
        bounty: 10,
        remaining: 100,
        unlocked: true,
        room: "kitchen",
        x: 5487,
        y: 1323
    },
    {
        name: "Freezer",
        risk: 2,
        bounty: 3,
        remaining: 90,
        unlocked: true,
        room: "kitchen",
        x: 3950,
        y: 733
    },
    {
        name: "Leftovers",
        risk: 1,
        bounty: 2,
        remaining: 40,
        unlocked: true,
        room: "kitchen",
        x: 4797,
        y: 843
    },
    {
        name: "Biohazardous Waste",
        risk: 3,
        bounty: 3,
        remaining: 30,
        unlocked: true,
        room: "hall",
        x: 8420,
        y: 2290
    },
    {
        name: "Walbert Flingerstein",
        risk: 2,
        bounty: 1,
        remaining: 10,
        unlocked: true,
        room: "hall",
        x: 8133,
        y: 2250,
    },
    {
        name: "Frozen Tissue",
        risk: 2,
        bounty: 2,
        remaining: 40,
        unlocked: true,
        room: "hall",
        x: 7250,
        y: 2000,
    },
    {
        name: "Test Kitchen Door",
        risk: 1,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        requires: ["explorer"],
        unlocksRoom: "kitchen",
        room: "hall",
        x: 6410,
        y: 2030,
    },
    {
        name: "Elevator",
        risk: 2,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("opener"),
        requires: ["opener"],
        unlocksRoom: "office",
        room: "hall",
        x: 5760,
        y: 1993,
    },
    {
        name: "Basement Door",
        risk: 3,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer") && team.map(x => x.klass).includes("opener"),
        requires: ["explorer", "opener"],
        unlocksRoom: "hall2",
        room: "office",
        x: 6100,
        y: 3190,
    },
    {
        name: "Gumball Bowl",
        risk: 3,
        bounty: 1,
        remaining: 80,
        unlocked: true,
        room: "office",
        x: 3520,
        y: 3213,
    },
    {
        name: "Ted's Desk",
        risk: 3,
        bounty: 1,
        remaining: 100,
        unlocked: true,
        room: "office",
        x: 4486,
        y: 3477,
    },
    {
        name: "Lobby Door",
        risk: 3,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        unlocksRoom: "lobby",
        canUnlock: (team) => team.map(x => x.klass).includes("opener"),
        requires: ["opener"],
        room: "office",
        x: 2997,
        y: 3147,
    },
    {
        name: "Security Guard",
        risk: 3,
        bounty: 2,
        remaining: 40,
        unlocked: true,
        room: "lobby",
        x: 1350,
        y: 3177,
    },
    {
        name: "Exit to Freedom (Win Game)",
        risk: 5,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        room: "lobby",
        canUnlock: (team) => team.length >= 5,
        requires: ["goober", "goober", "goober", "goober", "goober"],
        x: 690,
        y: 3180,
    },
    {
        name: "Supply Closet Door",
        risk: 2,
        bounty: 1,
        remaining: 0,
        unlocked: false,
        unlocksRoom: "experiment",
        canUnlock: (team) => team.map(x => x.klass).includes("explorer") && team.map(x => x.klass).includes("opener"),
        requires: ["explorer", "opener"],
        room: "hall2",
        x: 7227,
        y: 14907,
    },
    {
        name: "Large Specimen",
        risk: 1,
        bounty: 1,
        remaining: 20,
        unlocked: true,
        room: "experiment",
        x: 8527,
        y: 14873,
    },
    {
        name: "Tony's Discount Organs",
        risk: 1,
        bounty: 1,
        remaining: 10,
        unlocked: true,
        room: "experiment",
        x: 8930,
        y: 15283,
    },
    {
        name: "Amazon Rainforest Animal Parts",
        risk: 1,
        bounty: 1,
        remaining: 10,
        unlocked: true,
        room: "experiment",
        x: 8424,
        y: 15270,
    },
    {
        name: "Box of Blood",
        risk: 1,
        bounty: 1,
        remaining: 10,
        unlocked: true,
        room: "experiment",
        x: 8634,
        y: 15227,
    },
    {
        name: "Box of Body Parts",
        risk: 1,
        bounty: 1,
        remaining: 10,
        unlocked: true,
        room: "experiment",
        x: 9260,
        y: 15253,
    },
    {
        name: "Jarred Specimens",
        risk: 1,
        bounty: 1,
        remaining: 10,
        unlocked: true,
        room: "experiment",
        x: 8683,
        y: 14517,
    },
    {
        name: "Desk Drawer",
        risk: 1,
        bounty: 5,
        remaining: 500,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("opener"),
        requires: ["opener"],
        room: "experiment",
        x: 9827,
        y: 15027,
    },
    {
        name: "Desk Cabinet",
        risk: 1,
        bounty: 1,
        remaining: 10,
        unlocked: true,
        room: "experiment",
        x: 9680,
        y: 14623,
    },
]
