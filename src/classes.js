import _ from "underscore";

export class Goober {
    constructor(name) {
        this.name = name;
        this.klass = "goober";
        this.foodRequirement = 1;
        this.carryingCapacity = 3;
        this.scavenge = 1;
        this.protect = 1;
        this.description = "Just a normal. Eats 1, carries 3."
    }
}

export class Stud extends Goober {
    constructor(name) {
        super(name);
        this.klass = "stud";
        this.description = "Can have multiple non-stud reproduction partners in same round"
    }
}

export class Explorer extends Goober {
    constructor(name) {
        super(name);
        this.klass = "explorer";
        this.description = "Required to unlock new areas"
    }
}

export class Opener extends Goober {
    constructor(name) {
        super(name);
        this.klass = "opener";
        this.description = "Required to unlock some areas"
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
        this.description = "Reproduces on its own. Might reproduce anything.";
    }
}

export class Buddy extends Goober {
    constructor(name) {
        super(name);
        this.klass = "buddy";
        this.description = "Adds 2 to hand"
    }
}

export class Immortal extends Goober {
    constructor(name) {
        super(name);
        this.klass = "immortal";
        this.description = "Can not die. 5x carry. Halves odds of death."
        this.carryingCapacity = 5;
        this.scavenge = 5;
        this.protect = 2;
    }
}

export class Lugger extends Goober {
    constructor(name) {
        super(name);
        this.klass = "lugger";
        this.carryingCapacity = 20;
        this.description = "Can carry back 20x as much food as normal"
    }
}

export class Scavenger extends Goober {
    constructor(name) {
        super(name);
        this.klass = "scavenger";
        this.scavenge = 10
        this.description = "2x amount of found food"
    }
}

export class Hungry extends Goober {
    constructor(name) {
        super(name);
        this.klass = "hungry";
        this.foodRequirement = 5;
        this.description = "Requires 5x food"
    }
}

export class Protector extends Goober {
    constructor(name) {
        super(name);
        this.klass = "protector";
        this.protect = 2
        this.description = "Halves the odds of any death on adventures"
    }
}

export class Bozo extends Goober {
    constructor(name) {
        super(name);
        this.klass = "bozo";
        this.protect = 2
        this.description = "Dies first"
    }
}

export class Recruiter extends Goober {
    constructor(name) {
        super(name);
        this.klass = "recruiter";
        this.description = "Adds 1 to hand size when in population"
    }
}

export class Replicator extends Goober {
    constructor(name) {
        super(name);
        this.klass = "replicator";
        this.description = "Replicates partner when breeding with one other"
    }
}

const weightedRandomKlass = () => {
    const r = Math.random()
    if (r < 0.3) {
        return "goober"
    } else if (r < 0.6) {
        return "asexual"
    } else {
        return _.sample(["stud", "explorer", "opener", "doctor", "buddy", "immortal", "lugger", "scavenger", "hungry", "protector", "bozo", "recruiter", "replicator"], 1)[0]
    }
}

export const weightedRandomClass = (name) => {
    return makeOneOfKlass(name, weightedRandomKlass())
}

export const makeOneOfKlass = (name, klass) => {
    switch (klass) {
        case "goober":
            return new Goober(name)
        case "stud":
            return new Stud(name)
        case "explorer":
            return new Explorer(name)
        case "opener":
            return new Opener(name)
        case "doctor":
            return new Doctor(name)
        case "asexual":
            return new Asexual(name)
        case "buddy":
            return new Buddy(name)
        case "immortal":
            return new Immortal(name)
        case "lugger":
            return new Lugger(name)
        case "scavenger":
            return new Scavenger(name)
        case "hungry":
            return new Hungry(name)
        case "protector":
            return new Protector(name)
        case "bozo":
            return new Bozo(name)
        case "recruiter":
            return new Recruiter(name)
        case "replicator":
            return new Replicator(name)
    }
}