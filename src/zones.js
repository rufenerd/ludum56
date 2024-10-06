export const zones = [
    {
        name: "zone1-1",
        risk: 1,
        bounty: 10,
        remaining: 100,
        unlocked: true,
        room: "start",
    },
    {
        name: "zone1-2",
        risk: 2,
        bounty: 20,
        remaining: 200,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("opener"),
        room: "start",
        requires: "opener"
    },
    {
        name: "Vent",
        risk: 3,
        bounty: 100,
        remaining: 100,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer"),
        room: "start",
        unlocksRoom: 2,
        x: 603,
        y: 152,
        requires: "explorer"
    },
    {
        name: "zone-2-1",
        risk: "start",
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