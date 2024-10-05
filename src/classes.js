export class Goober {
    constructor(name) {
        this.name = name;
        this.klass = "goober";
        this.foodRequirement = 1;
        this.carryingCapacity = 5;
        this.scavenge = 1;
        this.protect = 1;
    }
}

export class Packer extends Goober {
    constructor(name) {
        super(name);
        this.klass = "packer";
        this.carryingCapacity = 20;
    }
}

export class Hungry extends Goober {
    constructor(name) {
        super(name);
        this.klass = "hungry";
        this.foodRequirement = 30;
    }
}

export class Protector extends Goober {
    constructor(name) {
        super(name);
        this.klass = "protector";
        this.foodRequirement = 2;
        this.protect = 2
    }
}