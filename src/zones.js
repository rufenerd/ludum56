export const zones = [
    {
        name: "zone1",
        risk: 1,
        bounty: 1,
        remaining: 100,
        unlocked: true
    },
    {
        name: "zone2",
        risk: 2,
        bounty: 2,
        remaining: 200,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer")
    },
    {
        name: "zone3",
        risk: 3,
        bounty: 4,
        remaining: 1000,
        unlocked: false,
        canUnlock: (team) => team.map(x => x.klass).includes("explorer") && team.map(x => x.klass).includes("opener")
    }
]