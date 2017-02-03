//LoadImageForTexture###############################################################################
function loadImageForTexture(url,textures,callback) {
        var image = new Image();
        image.src = url;

        image.onload = function() {

            gl.bindTexture(gl.TEXTURE_2D, textures);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true); //weird
            gl.texImage2D(gl.TEXTURE_2D,0, gl.RGBA,gl.RGBA, gl.UNSIGNED_BYTE,image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            //self.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            //self.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D,null);
            
            callback(textures);
            
        };
    }
//SPRITEBATCH SHADERS###############################################################################
var sbshaders = {"spriteFrag":"precision mediump float;\r\n\r\nuniform sampler2D uSampler;\r\n\r\nvarying vec4 vColor;\r\nvarying vec2 vTexCoords;\r\n\r\nvoid main() {\r\n\r\n    gl_FragColor = texture2D(uSampler, vTexCoords) * vColor;\r\n    //gl_FragColor = vColor;\r\n}","spriteVertex":"attribute vec2 aPosition;\r\nattribute vec2 aTextCoord;\r\nattribute vec4 aColor;\r\nattribute float aRotation;\r\nattribute vec2 aOrigin;\r\n\r\nuniform mat4 model;\r\nuniform vec2 viewportSize;\r\n\r\nvarying vec2 vTexCoords;\r\nvarying vec4 vColor;\r\n\r\nvoid main() {\r\n\r\n    vec2 pos = aPosition - aOrigin;\r\n    float s = pos.x;\r\n    pos.x = s*cos(aRotation) - pos.y*sin(aRotation);\r\n    pos.y = s*sin(aRotation) + pos.y*cos(aRotation);\r\n    pos += aOrigin;\r\n\r\n\r\n    gl_Position = model * vec4(pos, 0.0, 1.0);\r\n    \r\n\r\n    gl_Position.xy /= viewportSize;\r\n    gl_Position.xy *= vec2(2.0,-2.0);\r\n    gl_Position.xy -= vec2(1.0,-1.0);\r\n\r\n    vTexCoords = aTextCoord;\r\n    vColor = aColor;\r\n    \r\n}" };

//LOAD SHADER######################################################################################


function loadShader(type, shaderSource) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        throw new Error("UNABLE TO COMPILE SHADER");   
    }
    return shader;
}

//Vector###########################################################################################
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


//Matrix###########################################################################################
//stored in row major order
function Matrix4() {
    var fillNumber = 0.0;
    
    //function overload
    if(typeof arguments[0] == "number") {
        fillNumber = arguments[0];
    }
    
    this.data = new Float32Array(16);
    this.store = new Float32Array(16);
    for(let i = 0; i<16; i++) {
        this.data[i]=fillNumber;
        this.store[i]=fillNumber;
    } 


}


Matrix4.prototype.scalarMultiplication = function(scalar) {
    for(let i=0; i<16; this.data[i]*=scalar,i++);
};

Matrix4.prototype.Transpose = function() {
    var h = this.data[1];
    this.data[1] = this.data[4];
    this.data[4] = h;
    h = this.data[2];
    this.data[2] = this.data[8];
    this.data[8] = h;
    h = this.data[6];
    this.data[6] = this.data[9];
    this.data[9] = h;
    h = this.data[3];
    this.data[3] = this.data[12];
    this.data[12] = h;
    h = this.data[7];
    this.data[7] = this.data[13];
    this.data[13] = h;
    h = this.data[11];
    this.data[11] = this.data[14];
    this.data[14] = h; 
};

//rotPoint = (vec2)
Matrix4.prototype.RotateSprite = function(angleInRads,rotPoint) {





};

//takes matrices as paramaters and multiplies them all together with this matrix instance
Matrix4.prototype.Multiply = function() {

    for(var i = 0; i<arguments.length; i++) {

        this.store[0] = this.data[0]*arguments[i][0]+this.data[1]*arguments[i][4]+this.data[2]*arguments[i][8]+this.data[3]*arguments[i][12];
        this.store[1] = this.data[0]*arguments[i][1]+this.data[1]*arguments[i][5]+this.data[2]*arguments[i][9]+this.data[3]*arguments[i][13];
        this.store[2] = this.data[0]*arguments[i][2]+this.data[1]*arguments[i][6]+this.data[2]*arguments[i][10]+this.data[3]*arguments[i][14];
        this.store[3] = this.data[0]*arguments[i][3]+this.data[1]*arguments[i][7]+this.data[2]*arguments[i][11]+this.data[3]*arguments[i][15];

        this.store[4] = this.data[4]*arguments[i][0]+this.data[5]*arguments[i][4]+this.data[6]*arguments[i][8]+this.data[7]*arguments[i][12];
        this.store[5] = this.data[4]*arguments[i][1]+this.data[5]*arguments[i][5]+this.data[6]*arguments[i][9]+this.data[7]*arguments[i][13];
        this.store[6] = this.data[4]*arguments[i][2]+this.data[5]*arguments[i][6]+this.data[6]*arguments[i][10]+this.data[7]*arguments[i][14];
        this.store[7] = this.data[4]*arguments[i][3]+this.data[5]*arguments[i][7]+this.data[6]*arguments[i][11]+this.data[7]*arguments[i][15];

        this.store[8] = this.data[8]*arguments[i][0]+this.data[9]*arguments[i][4]+this.data[10]*arguments[i][8]+this.data[11]*arguments[i][12];
        this.store[9] = this.data[8]*arguments[i][1]+this.data[9]*arguments[i][5]+this.data[10]*arguments[i][9]+this.data[11]*arguments[i][13];
        this.store[10] = this.data[8]*arguments[i][2]+this.data[9]*arguments[i][6]+this.data[10]*arguments[i][10]+this.data[11]*arguments[i][14];
        this.store[11] = this.data[8]*arguments[i][3]+this.data[9]*arguments[i][7]+this.data[10]*arguments[i][11]+this.data[11]*arguments[i][15];

        this.store[12] = this.data[12]*arguments[i][0]+this.data[13]*arguments[i][4]+this.data[14]*arguments[i][8]+this.data[15]*arguments[i][12];
        this.store[13] = this.data[12]*arguments[i][1]+this.data[13]*arguments[i][5]+this.data[14]*arguments[i][9]+this.data[15]*arguments[i][13];
        this.store[14] = this.data[12]*arguments[i][2]+this.data[13]*arguments[i][6]+this.data[14]*arguments[i][10]+this.data[15]*arguments[i][14];
        this.store[15] = this.data[12]*arguments[i][3]+this.data[13]*arguments[i][7]+this.data[14]*arguments[i][11]+this.data[15]*arguments[i][15];

        for(var j = 0; j<16; this.data[j]=this.store[j], j++);
    }


};

//static things----------------------------------

Matrix4.EPSILON = Math.pow(2,-52);


Matrix4.CreateIdentity = function() {
    var m = new Matrix4(0);
    m.data[0] = 1.0;
    m.data[5] = 1.0;
    m.data[10] = 1.0;
    m.data[15] = 1.0;
    return m;
};



Matrix4.CreateRotationX = function(x) {
    var m = new Matrix4(0);
    m.data[0] = 1.0;
    m.data[5] = Math.cos(x);
    m.data[6] = -Math.sin(x);
    m.data[9] = Math.sin(x);
    m.data[10] = Math.cos(x);
    m.data[15] = 1.0;
    return m;
};

Matrix4.CreateRotationY = function(y) {
    var m = new Matrix4(0);
    m.data[0] = Math.cos(y);
    m.data[2] = Math.sin(y);
    m.data[5] = 1.0;
    m.data[8] = -Math.sin(y);
    m.data[10] = Math.cos(y);
    m.data[15] = 1.0;
    return m;
};

Matrix4.CreateRotationZ = function(z) {
    var m = new Matrix4(0);
    m.data[0] = Math.cos(z);
    m.data[1] = -Math.sin(z);
    m.data[4] = Math.sin(z);
    m.data[5] = Math.cos(z);
    m.data[10] = 1.0;
    m.data[15] = 1.0;
    return m;
};

Matrix4.CreateScale = function(x,y,z) {
    x = x || 1.0; y = y || 1.0; z = z || 1.0;
    var m = new Matrix4(0);
    m.data[0] = x;
    m.data[5] = y;
    m.data[10] = z;
    m.data[15] = 1.0;
    return m;
};

Matrix4.CreateTranslation = function(x,y,z) {
    x = x || 0; y = y || 0; z = z || 0;
    var m = new Matrix4(0);
    m.data[0] = 1.0;
    m.data[5] = 1.0;
    m.data[10] = 1.0;
    m.data[3] = x;
    m.data[7] = y;
    m.data[11] = z;
    m.data[15] = 1.0;
    return m;
};

Matrix4.CreateOrthographicProjection = function(left, right, bottom, top, near, far) {
    var rl = 1.0/(right - left);
    var tb = 1.0/(top-bottom);
    var fn = 1.0/(far - near);
    var m = new Matrix4(0);
    m.data[0] = 2.0*rl;
    m.data[3] = -(right+left)*rl;
    m.data[5] = 2.0*tb;
    m.data[7] = -(top+bottom)*tb;
    m.data[10] = -2.0* fn;
    m.data[11] = -(far+near)*fn;
    m.data[15] = 1;
    return m;
}


//ascpectRatio is = width/height
//FOV(Field of View) = vertical angle(in radians) of the camera through which we are looking at the world
//zNear = location of the near Z plane
//zFar = location of the far Z plane
Matrix4.CreatePerspectiveProjection = function(aspectRatio, FOV, zNear, zFar) {
    var m = new Matrix4(0);

    var f = 1.0 / Math.tan(FOV/2);
    var rangeInv = 1 / (zNear - zFar);
    m.data[0] = f / aspectRatio;
    m.data[5] = f;
    m.data[10] = (zFar + zNear) * rangeInv; 
    m.data[11] = zNear * zFar * rangeInv * 2;
    m.data[14] = -1;
    

    return m;
};

//eye(Vector3) = camera position
//target(Vector3) = point camera is looking at
//up(Vector3) = direction that is "up" from the camera's point of view
//inMatrix = optional matrix that gets set and returned
Matrix4.CreateView = function(eye,target,up,inMatrix) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye.data[0], eyey = eye.data[1], eyez = eye.data[2],
        upx = up.data[0], upy = up.data[1], upz = up.data[2],
        targetx = target.data[0], targety = target.data[1], targetz = target.data[2];
    
    if (Math.abs(eyex - targetx) < Matrix4.EPSILON &&
        Math.abs(eyey - targety) < Matrix4.EPSILON &&
        Math.abs(eyez - targetz) < Matrix4.EPSILON) {
        return Matrix4.CreateIdentity();
    }

    //z = forward Vector x = right vector y = up vector
    
    //normal(eye - target)
    z0 = eyex - targetx;
    z1 = eyey - targety;
    z2 = eyez - targetz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    //normal(cross(up,z))
    x0 = upy * z2 - upz * z1;    
    x1 = upz * z0 - upx * z2;    
    x2 = upx * z1 - upy * z0;

    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    //cross(z, x)
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }
    

    var m = null;

    if(inMatrix) {
        m = inMatrix;
    } else {
        m = new Matrix4(0);
    }

    m.data[0] = x0;
    m.data[1] = y0;
    m.data[2] = z0;
    //m.data[3] = 0;
    m.data[4] = x1;
    m.data[5] = y1;
    m.data[6] = z1;
    //m.data[7] = 0;
    m.data[8] = x2;
    m.data[9] = y2;
    m.data[10] = z2;
    //m.data[11] = 0;
    m.data[12] = -(x0 * eyex + x1 * eyey + x2 * eyez); //-dot(x,eye)
    m.data[13] = -(y0 * eyex + y1 * eyey + y2 * eyez); //-dot(y,eye)
    m.data[14] = -(z0 * eyex + z1 * eyey + z2 * eyez); //-dot(z,eye)
    m.data[15] = 1;

    if(!inMatrix) {
        return m;
    }
      

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
function SpriteBatch(gl) {
    this.gl = gl;


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





    this.transformMatrix = Matrix4.CreateIdentity();



    var vertexShader = loadShader(this.gl.VERTEX_SHADER, sbshaders.spriteVertex);
    var fragmentShader = loadShader(this.gl.FRAGMENT_SHADER, sbshaders.spriteFrag);

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


