export class Goober {
    constructor(name) {
        this.name = name;
        this.foodRequirement = 1;
        this.carryingCapacity = 1;
    }
}

export class Packer extends Goober {
    constructor(name) {
        super(name);
        this.carryingCapacity = 2;
    }
}

export class Hungry extends Goober {
    constructor(name) {
        super(name);
        this.foodRequirement = 30;
    }
}