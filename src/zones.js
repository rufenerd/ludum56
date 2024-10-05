export const zones = [
    {
        name: "zone1-1",
        risk: 1,
        bounty: 10,
        remaining: 100,
        unlocked: true,
        room: 1,
    },
    {
        name: "zone1-2",
        risk: 2,
        bounty: 20,
        remaining: 200,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("opener"),
        room: 1,
        requires: "opener"
    },
    {
        name: "Vent",
        risk: 3,
        bounty: 0,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        room: 1,
        unlocksRoom: 2,
        x: 600,
        y: 150,
        requires: "explorer"
    },
    {
        name: "zone-2-1",
        risk: 1,
        bounty: 10,
        remaining: 100,
        unlocked: true,
        room: 2
    },
    {
        name: "zone2-2",
        risk: 2,
        bounty: 0,
        remaining: 0,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        room: 2,
        unlocksRoom: 3,
        requires: "explorer"
    },
    {
        name: "zone3-1",
        risk: 3,
        bounty: 400,
        remaining: 1000,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer") && team.map(x => x.klass).includes("opener"),
        room: 3,
        requires: "explorer and opener"
    }
]