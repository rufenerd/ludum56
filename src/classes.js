export class Goober {
    constructor(name) {
        this.name = name;
        this.klass = "goober";
        this.foodRequirement = 1;
        this.carryingCapacity = 1;
        this.scavenge = 1;
        this.protect = 0;
    }
}

export class Packer extends Goober {
    constructor(name) {
        super(name);
        this.klass = "packer";
        this.carryingCapacity = 2;
    }
}

export class Hungry extends Goober {
    constructor(name) {
        super(name);
        this.klass = "hungry";
        this.foodRequirement = 30;
    }
}