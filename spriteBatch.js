//MATRIX4###########################################################################################
function Vector() {

    if(!arguments.length) {
        throw "There must be at least one element."
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


//VECTOR###########################################################################################
function Vector() {

    if(!arguments.length) {
        throw "There must be at least one element."
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

//SPRITEBATCH###########################################################################################
/** 
 * Structure that holds info about sprites
 * @constructor
 * @param {WebGLTexture} Texture - A texture for the sprite
 * @param {Vector} Source - (left,top,right,bottom) - The rectangel in texels defining the region to draw on the image.
 * @param {Vector} Destination -(left,top,right,bottom) The rectangle defining the in screen coordinates of the sprite we are going to draw. 
 * @param {Uint8Array} Color - [r,g,b,a]
 * @param {Vector} OriginRotationDepth - (x,y,angleInRadians,depth)
 * @param {Vector} TextureSize - (width,height)
 */
function SpriteInfo(Texture,Source,Destination,Color,OriginRotationDepth,TextureSize) {
    this.texture = Texture;
    this.source = Source;
    this.destination = Destination;
    this.color = Color;
    this.originRotationDepth = OriginRotationDepth;
    this.textureSize = TextureSize;
}

/**
 * Enum that defines the various sorting modes for sprites in SpriteBatch
 * @readonly
 * @enum {number}
 */
var SpriteSortMode = {
    /**Sprites are sorted by depth in back to front order before drawing. */
    BackToFront: 0,
    /**Sprites are not drawn until end is called. */
    Deferred: 1,
    /**Sprites are sorted by depth in front to back order before drawing. */
    FrontToBack: 2,
    /**Sprites are drawn immediatly when draw is called */
    Immediate: 3,
    /**Sprites are sorted by texture prior to drawing. */
    Texture: 4
};



/**
 * Draws a group of sprites with the same settings.
 * @constructor
 * @param {WebGLRenderingContext} context - The context for this SpriteBatch
 */
function SpriteBatch(game) {
    this.gl = game.gl;
    this.game = game;

    this.MaxBatchSize = 200;
    this.MinBatchSize = 20;
    
    //holds all the sprites that are to be drawn
    this.spriteInfoArray = new Array(this.MaxBatchSize);
    for(var i = 0; i<this.MaxBatchSize; i++) {
        this.spriteInfoArray[i] = new SpriteInfo();
        this.spriteInfoArray[i].source = new Vector(0,0,0,0);
        this.spriteInfoArray[i].destination = new Vector(0,0,0,0);
        this.spriteInfoArray[i].color =  new Uint8ClampedArray([0,0,0,0]);
        this.spriteInfoArray[i].originRotationDepth = new Vector(0,0,0,0);
        this.spriteInfoArray[i].textureSize = new Vector(0,0);
    }

    //holds the number of sprites queued that need to be drawn
    this.queueCount = 0;


    

    /**
     * Holds the sort mode for this sprite batch.
     * @var {number}
     * @default [Deferred]
     */
    this.spriteSortMode = SpriteSortMode.Deferred;


    this.vertexBufferPosition = 0;

    this.blendState = this.gl.FUNC_ADD;

    this.shaderProgram = null;

    
    
    
    
    var indices = new Uint16Array(this.MaxBatchSize*6); //6 is how many indices per sprite





    this.transformMatrix = Matrix.CreateIdentity();



    var vertexShader = game.loadShader(this.gl.VERTEX_SHADER, shaders.spriteVertex);
    var fragmentShader = game.loadShader(this.gl.FRAGMENT_SHADER, shaders.spriteFrag);

    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);

    if(!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
        var info = this.gl.getProgramInfoLog(this.shaderProgram);
        throw "ERROR: " + info;
    }    


    //get the location id for the input to the shaders
    this.aPosition = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
    this.aTextCoord = this.gl.getAttribLocation(this.shaderProgram, "aTextCoord");
    this.aColor = this.gl.getAttribLocation(this.shaderProgram, "aColor");
    this.aRotation = this.gl.getAttribLocation(this.shaderProgram, "aRotation");
    this.aOrigin = this.gl.getAttribLocation(this.shaderProgram, "aOrigin");
   
    this.uniformSamplerLoc = this.gl.getUniformLocation(this.shaderProgram, "uSampler");
    this.transformMatLoc = this.gl.getUniformLocation(this.shaderProgram,"model");
    this.viewportSizeLoc = this.gl.getUniformLocation(this.shaderProgram,"viewportSize");

    /* Vertex Buffer Map In Bytes
      --------------------------------------------
      |Position |Texture C|Color  |Rot |Origin   |
      --------------------------------------------
      |x   |y   |t   |s   |R|G|B|A|0   |x   |y   |
      --------------------------------------------
 Bytes|   4|   4|   4|   4|1|1|1|1|   4|   4|   4| 
      --------------------------------------------

      Total Bytes = 32
      Total Floats = 8

    */

    //vertex stuff
    var vertex =  new ArrayBuffer(this.MaxBatchSize*128); //numberOfSprites * verticesPerSprite  * vertexSizeInBytes

    this.storage = new ArrayBuffer(128); //Holds data for one sprite.

    this.vSizeInBytes = 32;

    this.positionView = new Float32Array(this.storage);
    this.colorView = new Uint8Array(this.storage);

    this.positionOffset = 0;
    this.textCOffset = 8;
    this.colorOffset = 16;
    this.rotationOffset = 20;
    this.originOffset = 24;

    

    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertex, this.gl.DYNAMIC_DRAW);

    
    //index buffer
    var inc = 0;
    for(var i = 0; i<indices.length; i += 6) {
        
        indices[i] = inc;
        indices[i+1] = inc + 1;
        indices[i+2] = inc + 2;

        indices[i+3] = inc + 1;
        indices[i+4] = inc + 3;
        indices[i+5] = inc + 2;

        inc += 4;
    }

    this.indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);


}

/**
 * @param {SpriteSortMode} sortMode
 * @param {blendEquation} blendEquation
 */
SpriteBatch.prototype.begin = function(sortMode, blendEquation) {

    //TODO:ADD MORE BLENDING CAPABILITIES

    this.spriteSortMode = sortMode;
    this.blendState = blendEquation;
    //TODO: depth, stencil raster

    if(this.spriteSortMode == SpriteSortMode.Immediate) {
        this.prepare();
    }

};

/**
 * @param {WebGLTexture} texture
 * @param {Vector} textureSize - (width,height) Make sure and minus one from texture size!! Zero based index.
 * @param {Vector} destination - (left,top,right,bottom) or (x,y) destination in screen coordinates.
 * @param {Uint8Array} color - [r,g,b,a]
 * @param {Object} options - Information about how you want to draw your sprite. This object must be here even if it is empty!!
 * @param {Vector} [options.source] - (left,top,right,bottom) Source in texels. (0,0) is top left.
 * If undefined, use whole texture !!!Make sure source size is greater than zero!!!!
 * @param {Vector} [options.originRotDepth]  - (x,y,rotInRadians,depth) If undefined, then origin will be upper left corner (0,0).
 * Origin is set relative to the destination rectangle.
 * @param {Vector} [options.scale] - (scaleX,scaleY) 
 */
SpriteBatch.prototype.draw = function(texture, textureSize, destination, color, options) {

    if(this.queueCount >= this.spriteInfoArray.length) {
        throw "You need to increase the MaxBatchSize.";
    }

    this.spriteInfoArray[this.queueCount].texture = texture;
    this.spriteInfoArray[this.queueCount].textureSize.set(textureSize);
    this.spriteInfoArray[this.queueCount].color.set(color);
    

    var sx, sy, sz, sw;
    if(options && options.source) {
        this.spriteInfoArray[this.queueCount].source.set(options.source);
    } else {
        this.spriteInfoArray[this.queueCount].source.set(0,0,textureSize.x,textureSize.y);
    }

    if(destination.z) {
        this.spriteInfoArray[this.queueCount].destination.set(destination);
    } else {
        sx = (this.spriteInfoArray[this.queueCount].source.z-this.spriteInfoArray[this.queueCount].source.x);
        sy = (this.spriteInfoArray[this.queueCount].source.w-this.spriteInfoArray[this.queueCount].source.y);
        this.spriteInfoArray[this.queueCount].destination.set(destination.x,destination.y,sx+destination.x,sy+destination.y);
    }

    if(options && options.scale) {
        sz =  (this.spriteInfoArray[this.queueCount].destination.z - destination.x)*options.scale.x;
        sw =  (this.spriteInfoArray[this.queueCount].destination.w - destination.y)*options.scale.y;
        sx = destination.x;
        sy = destination.y;
        this.spriteInfoArray[this.queueCount].destination.set(sx,sy,sx+sz,sy+sw);
    } 

    if(options && options.originRotDepth) {

        sx = options.originRotDepth.x;
        sy = options.originRotDepth.y;
        
        this.spriteInfoArray[this.queueCount].destination.subtract(sx,sy,sx,sy);

        sz = this.spriteInfoArray[this.queueCount].destination.x;
        sw = this.spriteInfoArray[this.queueCount].destination.y;

        this.spriteInfoArray[this.queueCount].originRotationDepth.set(sz+sx,sw+sy,options.originRotDepth.z,options.originRotDepth.w);
    } 



    if(this.spriteSortMode != SpriteSortMode.Immediate) {
        //queue the sprite for sorting and batched drawing
        this.queueCount++; 
    } else {
        //draw the sprite now!
        this.renderBatch(texture,this.queueCount, 1);
    }


};

SpriteBatch.prototype.end = function() {

    if(this.spriteSortMode != SpriteSortMode.Immediate) {
        this.prepare();
        this.flush();
    }

};

SpriteBatch.prototype.flush = function() {
    this.sortSprites();

    //look for adjacent elements in sprites that share the same texture to call draw once for both
    var bs = 0;
    var bt = null;
    for(var i = 0; i < this.queueCount; i++) {
        
        if(this.spriteInfoArray[i].texture != bt) {
            if(i > bs) {
                
                this.renderBatch(bt,bs,i-bs);
                
            }
            bt = this.spriteInfoArray[i].texture;
            bs = i;
        }
    }

    this.renderBatch(bt,bs,this.queueCount - bs);

    this.queueCount = 0;
};

SpriteBatch.prototype.prepare = function() {
    //set shaders
    this.gl.useProgram(this.shaderProgram);
    //set blend state
    //this.gl.blendEquation(this.blendState);
    //set vertex and index buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

    //describe how the attributes are mapped in the buffer
    this.gl.vertexAttribPointer(this.aPosition, 2, this.gl.FLOAT,false,this.vSizeInBytes,this.positionOffset);
    this.gl.vertexAttribPointer(this.aTextCoord, 2, this.gl.FLOAT,false,this.vSizeInBytes,this.textCOffset);
    this.gl.vertexAttribPointer(this.aColor, 4, this.gl.UNSIGNED_BYTE,true,this.vSizeInBytes,this.colorOffset);
    this.gl.vertexAttribPointer(this.aRotation, 1, this.gl.FLOAT,false,this.vSizeInBytes,this.rotationOffset);
    this.gl.vertexAttribPointer(this.aOrigin, 2, this.gl.FLOAT,false,this.vSizeInBytes,this.originOffset);
    
    this.gl.enableVertexAttribArray(this.aPosition);
    this.gl.enableVertexAttribArray(this.aTextCoord);
    this.gl.enableVertexAttribArray(this.aColor);
    this.gl.enableVertexAttribArray(this.aRotation);
    this.gl.enableVertexAttribArray(this.aOrigin);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
    //set the global transformMatrix
    this.gl.uniformMatrix4fv(this.transformMatLoc, false, this.transformMatrix.data);
    //set the viewport size
    this.gl.uniform2fv(this.viewportSizeLoc, [this.gl.drawingBufferWidth,this.gl.drawingBufferHeight]);


};

SpriteBatch.prototype.renderBatch = function(texture,startIndex,count) {
    //set the texture
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

    this.gl.uniform1i(this.uniformSamplerLoc,0);
    
    

    while(count > 0) {

        var batchSize = count;

        var remainingSpace = this.MaxBatchSize - this.vertexBufferPosition;

        if(batchSize > remainingSpace) {

            if(remainingSpace < this.MinBatchSize) {
                this.vertexBufferPosition = 0; //out of room and batch is small wrap to beginning
                batchSize = Math.min(count,this.MaxBatchSize);
            } else {
                //take however many sprites fit in what's left of the vertex buffer
                batchSize = remainingSpace;
            }

        }

        for(var i = 0; i < batchSize; i++) {
            this.renderSprite(this.spriteInfoArray[startIndex+i],i);
        }

        this.gl.drawElements(this.gl.TRIANGLES,batchSize*6,this.gl.UNSIGNED_SHORT,this.vertexBufferPosition*12);
    
        //advance the vertexBufferPosition
        this.vertexBufferPosition += batchSize;

        //sprites += batchSize
        count -= batchSize;
        
    }
    


};

SpriteBatch.prototype.renderSprite = function(sprite, offset) {
    

    //flip y to convert from HTML DOM coords to Webgl coords
    sprite.source.multiply(1.0/sprite.textureSize.x,1.0/sprite.textureSize.y,1.0/sprite.textureSize.x,1.0/sprite.textureSize.y);
    sprite.source.y = 1.0 - sprite.source.y;
    sprite.source.w = 1.0 - sprite.source.w;

    //if the destination size is relative to the source region, convert it to pixels


    var c = this.colorOffset;

    this.positionView[0] = sprite.destination.x;
    this.positionView[1] = sprite.destination.y;
    this.positionView[2] = sprite.source.x;
    this.positionView[3] = sprite.source.y;
    this.colorView[c] = sprite.color[0];
    this.colorView[c+1] = sprite.color[1];
    this.colorView[c+2] = sprite.color[2];
    this.colorView[c+3] = sprite.color[3];
    this.positionView[5] = sprite.originRotationDepth.z;
    this.positionView[6] = sprite.originRotationDepth.x;
    this.positionView[7] = sprite.originRotationDepth.y;

    c += this.vSizeInBytes;

    this.positionView[8] = sprite.destination.x;
    this.positionView[9] = sprite.destination.w;
    this.positionView[10] = sprite.source.x;
    this.positionView[11] = sprite.source.w;
    this.colorView[c] = sprite.color[0];
    this.colorView[c+1] = sprite.color[1];
    this.colorView[c+2] = sprite.color[2];
    this.colorView[c+3] = sprite.color[3];
    this.positionView[13] = sprite.originRotationDepth.z;
    this.positionView[14] = sprite.originRotationDepth.x;
    this.positionView[15] = sprite.originRotationDepth.y;

    c += this.vSizeInBytes;

    this.positionView[16] = sprite.destination.z;
    this.positionView[17] = sprite.destination.y;
    this.positionView[18] = sprite.source.z;
    this.positionView[19] = sprite.source.y;
    this.colorView[c] = sprite.color[0];
    this.colorView[c+1] = sprite.color[1];
    this.colorView[c+2] = sprite.color[2];
    this.colorView[c+3] = sprite.color[3];
    this.positionView[21] = sprite.originRotationDepth.z;
    this.positionView[22] = sprite.originRotationDepth.x;
    this.positionView[23] = sprite.originRotationDepth.y;

    c += this.vSizeInBytes;

    this.positionView[24] = sprite.destination.z;
    this.positionView[25] = sprite.destination.w;
    this.positionView[26] = sprite.source.z;
    this.positionView[27] = sprite.source.w;
    this.colorView[c] = sprite.color[0];
    this.colorView[c+1] = sprite.color[1];
    this.colorView[c+2] = sprite.color[2];
    this.colorView[c+3] = sprite.color[3];
    this.positionView[29] = sprite.originRotationDepth.z;
    this.positionView[30] = sprite.originRotationDepth.x;
    this.positionView[31] = sprite.originRotationDepth.y;

    //this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertexBuffer);
    var start = (this.vertexBufferPosition+offset)*4*this.vSizeInBytes; //numberOfVerticesPerSprite * bytesPerVertex
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, start, this.storage);



};

SpriteBatch.prototype.sortSprites = function() {
    
    switch(this.spriteSortMode)
    {
        case SpriteSortMode.Texture:
        //dont know if this is usefull in webgl
        break;
        case SpriteSortMode.BackToFront:
            this.sortFB(this.spriteInfoArray,this.queueCount - 1);
        break;
        case SpriteSortMode.FrontToBack:
            this.sortBF(this.spriteInfoArray,this.queueCount - 1);
        break;
    }  

};

SpriteBatch.prototype.sortFB = function(inArray, end) {
    //this needs to be changed to sort from 0-1 floats
    //not 0 to infinity
    var x = 0, w = 0, h;
    while(w<end) {
        for(var i = w; i <= end; i++) {
            if(inArray[i].originRotationDepth.w == x) {
                h = inArray[w].originRotationDepth.w;
                inArray[w++].originRotationDepth.w = inArray[i].originRotationDepth.w;
                inArray[i].originRotationDepth.w = h;
            }
        }
        x++;
    }

    throw "needs to be changed";

};

SpriteBatch.prototype.sortBF = function(inArray, end) {
    var x = 0, w = 0, h;
    for(var i = w; i <= end; i++) {
        x = Math.max(x,inArray[i].originRotationDepth.w);
    }

    while(w<end) {
        for(var i = w; i <= end; i++) {
            if(inArray[i].originRotationDepth.w == x) {
                h = inArray[w].originRotationDepth.w;
                inArray[w++].originRotationDepth.w = inArray[i].originRotationDepth.w;
                inArray[i].originRotationDepth.w = h;
            }
        }
        x--;
    }

    throw "needs to be changed";

};


/**
 * Utility function that reduces many sprites into one sprite. It saves draw calls.
 * 
 * @param {Vector} rectangle - (left,top,right,bottom)
 * @param {WebGLTexture} 
 */
SpriteBatch.reduce = function(box,texture) {

    var width = box.x - box.z;
    var height = box.y - box.bottom;
    var data = new Uint8Array(width*height*4);

    box.y = this.gl.drawingBufferHeight - box.y;

    this.gl.readPixels(box.x,box.y,width,height,this.gl.RGBA,this.gl.UNSIGNED_BYTE,data);
    this.gl.bindTexture(this.gl.TEXTURE_2D,texture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
    this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,width,height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,data);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.bindTexture(this.gl.TEXTURE_2D,null);

    return texture;

};
//###########################################################################################


