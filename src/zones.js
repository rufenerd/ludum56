export const zones = [
    {
        name: "Cheep-o Animal Feed",
        risk: 1,
        bounty: 10,
        remaining: 100,
        unlocked: true,
        room: "start",
        x: 9285,
        y: 1316
    },
    {
        name: "Locker",
        risk: 1,
        bounty: 20,
        remaining: 200,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("opener"),
        room: "start",
        requires: "opener",
        x: 9052,
        y: 1146
    },
    {
        name: "Standard Moustrap",
        risk: 4,
        bounty: 80,
        remaining: 80,
        unlocked: true,
        room: "start",
        requires: "opener",
        x: 8461,
        y: 1338
    },
    {
        name: "Vent",
        risk: 2,
        bounty: 0,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        room: "start",
        unlocksRoom: "breakroom",
        x: 8873,
        y: 233,
        requires: "explorer"
    },
    {
        name: "Containment Room Door",
        risk: 2,
        bounty: 0,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        room: "start",
        unlocksRoom: "hall",
        x: 8484,
        y: 985,
        requires: "explorer"
    },
    {
        name: "Food Cabinet",
        risk: 1,
        bounty: 10,
        remaining: 100,
        unlocked: true,
        room: "breakroom",
        x: 6662,
        y: 584
    },
    {
        name: "Microwave",
        risk: 2,
        bounty: 20,
        remaining: 200,
        unlocked: true,
        room: "breakroom",
        x: 6670,
        y: 949
    },
    {
        name: "Table",
        risk: 1,
        bounty: 20,
        remaining: 60,
        unlocked: true,
        room: "breakroom",
        x: 7050,
        y: 983
    },
    {
        name: "Gun Mouse Trap",
        risk: 5,
        bounty: 100,
        remaining: 100,
        unlocked: true,
        room: "breakroom",
        x: 6838,
        y: 1334
    },
    {
        name: "Breakroom Door",
        risk: 1,
        bounty: 100,
        remaining: 100,
        unlocked: true,
        unlocksRoom: "hall",
        room: "breakroom",
        x: 6838,
        y: 1334
    }
]