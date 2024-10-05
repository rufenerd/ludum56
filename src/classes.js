export class Goober {
    constructor(name) {
        this.name = name;
        this.klass = "goober";
        this.foodRequirement = 1;
        this.carryingCapacity = 5;
        this.scavenge = 1;
        this.protect = 1;
        this.description = "Just a normal"
    }
}

export class Stud extends Goober {
    constructor(name) {
        super(name);
        this.klass = "stud";
        this.foodRequirement = 3;
        this.description = "Produces 1 offspring per non-Stud mate"
    }
}

export class Explorer extends Goober {
    constructor(name) {
        super(name);
        this.klass = "explorer";
        this.description = "Required to unlock new zones"
    }
}

export class Opener extends Goober {
    constructor(name) {
        super(name);
        this.klass = "opener";
        this.description = "Required to unlock advanced zones"
    }
}

export class Doctor extends Goober {
    constructor(name) {
        super(name);
        this.klass = "doctor";
        this.description = "Prevents 1 death each adventure"
    }
}

export class Asexual extends Goober {
    constructor(name) {
        super(name);
        this.klass = "asexual";
        this.description = "Can breed on its own"
    }
}

export class Packer extends Goober {
    constructor(name) {
        super(name);
        this.klass = "packer";
        this.carryingCapacity = 20;
        this.description = "Can carry back 20x as much food as normal"
    }
}

export class Scavenger extends Goober {
    constructor(name) {
        super(name);
        this.klass = "scavenger";
        this.scavenge = 10
        this.description = "10x amount of found food"
    }
}

export class Hungry extends Goober {
    constructor(name) {
        super(name);
        this.klass = "hungry";
        this.foodRequirement = 30;
        this.description = "Requires 30x food"
    }
}

export class Protector extends Goober {
    constructor(name) {
        super(name);
        this.klass = "protector";
        this.foodRequirement = 2;
        this.protect = 2
        this.description = "Halves the odds of death on adventures"
    }
}

export class Bozo extends Goober {
    constructor(name) {
        super(name);
        this.klass = "bozo";
        this.foodRequirement = 2;
        this.protect = 2
        this.description = "Dies first"
    }
}