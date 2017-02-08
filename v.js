function Vector() {

    if(!arguments.length) {
        throw new Error("There must be at least one element.");
    }

    this.data = new Float32Array(arguments.length);

    for(var i=0; i<arguments.length; this.data[i]=arguments[i],i++); 
    this.length = arguments.length;

    //IF this next piece of code works the way i think it does, this is freaking sweet 
    switch(arguments.length) {
        case 4:
            Object.defineProperty(this,"w", { get: function() { return this.data[3]; }, set: function(input) { this.data[3] = input; } });
        case 3:
            Object.defineProperty(this,"z", { get: function() { return this.data[2]; }, set: function(input) { this.data[2] = input; } }); 
        case 2:
            Object.defineProperty(this,"y", { get: function() { return this.data[1]; }, set: function(input) { this.data[1] = input; } });
        case 1:
            Object.defineProperty(this,"x", { get: function() { return this.data[0]; }, set: function(input) { this.data[0] = input; } }); 
    }

}


//WARNING: none of these functions test for division by 0, isNaN, isFinite!!!!!!
//Public Methods------------------------------------------------------------

Vector.prototype.length = function() {
    var sum = 0;
    for(var i=0; i<this.length; i++) {
        sum += this.data[i]*this.data[i];
    }
    return Math.sqrt(sum);         
};

Vector.prototype.normalize = function() {
    var l = this.Length();
    for(var i=0; i<this.length; i++) {
        this.data[i] = this.data[i]/l;
    }    
};

//WARNING: this does not check if inVector is the same length as this vector!!!!!
//if the input is shorter, then just do this: input:(x,y) , this:(a,b,c,d) => this:(x,y,c,d)
//this will take a vector or args(x,y,z,w,....)
Vector.prototype.set = function(inVector) {
    if(inVector.data) { //is this inVector a Vector or number
        for(var i=0; i<inVector.length; this.data[i]=inVector.data[i], i++);
    } else {
        for(var i=0; i<arguments.length; i++) {
            this.data[i] = arguments[i];
        }
    }
    
};


Vector.prototype.scale = function(scalar) {
    for(var i=0; i<this.length; this.data[i]*=scalar, i++);
};

//adds input vector to "this" vector
Vector.prototype.add = function(inVector) {
    if(inVector.data) {
        for(var i=0; i<this.length; i++) {
            this.data[i] += inVector.data[i];
        }
    } else {
        for(var i=0; i<arguments.length; i++) {
            this.data[i] += arguments[i];
        }
    }
};

Vector.prototype.subtract = function(inVector) {
    if(inVector.data) {
        for(var i=0; i<this.length; i++) {
            this.data[i] -= inVector.data[i];
        }
    } else {
        for(var i=0; i<arguments.length; i++) {
            this.data[i] -= arguments[i];
        }
    }

};

Vector.prototype.multiply = function(inVector) {
    if(inVector.data) { //is this inVector a Vector or number
        for(var i=0; i<inVector.length; this.data[i] *= inVector.data[i], i++);
    } else {
        for(var i=0; i<arguments.length; i++) {
            this.data[i] *= arguments[i];
        }
    }

};

Vector.prototype.toString = function() {
    var s = "(";
    for(var i = 0; i < this.length; i++) {
        s += this.data[i];
        if( (i+1) !== this.length ) {
            s += ",";
        } else {
            s += ")";
        }
    }
    return s;
}




//Static Methods---------------------------------------------------------------

// All parameters to these functions are Vector instances.
//no length checking
Vector.add = function(one,two,out) {
    for(var i=0; i<one.length; i++) {
        out.data[i] = one.data[i] + two.data[i]
    }
};

Vector.subtract = function(one,two,out) {
    for(var i=0; i<one.length; i++) {
        out.data[i] = one.data[i] - two.data[i]
    }
};
Vector.Multiply = function(one,two,out) {
    for(var i=0; i<one.length; i++) {
        out.data[i] = one.data[i] * two.data[i];
    }
};
//two is a scalar
Vector.Scale = function(one,two,out) {
    for(var i=0; i<one.length; i++) {
        out.data[i] *= two;
    }
};

Vector.dot = function(inOne,inTwo) {
    var sum = 0;
    for(var i=0; i<inOne.length; i++) {
        sum += inOne.data[i]*inTwo.data[i];
    }
    return sum;
};

Vector.distance = function(inOne,inTwo) {
    var sum = 0;
    for(var i=0; i<inOne.length; i++) {
        sum += ((inOne.data[i]-inTwo.data[i])*(inOne.data[i]-inTwo.data[i]));
    }
    return Math.sqrt(sum);
};

Vector.distanceSquared = function(inOne,inTwo) {
    var sum = 0;
    for(var i=0; i<inOne.length; i++) {
        sum += ((inOne.data[i]-inTwo.data[i])*(inOne.data[i]-inTwo.data[i]));
    }
    return sum;
};

//Only works for vector3's
Vector.crossProduct = function(inOne, inTwo, outThree) {
    outThree[0] = (inOne.data[1]*inTwo.data[2]) - (inTwo.data[1]*inOne.data[2]);
    outThree[1] = -((inOne.data[0]*inTwo.data[2]) - (inTwo.data[0]*inOne.data[2]));
    outThree[2] = (inOne.data[0]*inTwo.data[1]) - (inTwo.data[0]*inOne.data[1]);
};
