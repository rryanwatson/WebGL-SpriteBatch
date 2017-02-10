# WebGL-SpriteBatch
SpriteBatch implementation based off of Microsoft's [SpriteBatch](https://github.com/Microsoft/DirectXTK/blob/master/Src/SpriteBatch.cpp).
Images provided by [Ravenmore](http://dycha.net/resources/).

# Use
---
See index.html for example.

# Interface
---

#### SpriteSortMode
Enumeration that defines the diffrent sorting modes for drawing sprites.
---

Name  |Description
------|-----------
BackToFront | Sprites are sorted by depth in back to front order before drawing.
FrontToBack | Sprites are sorted by depth in front to back order before drawing.
Deferred | Sprites are batched and not drawn until end is called.
Immediate | Sprites are drawn immediatly when draw is called.


### SpriteBatch 
Object that controls the batching and drawing of sprites.
---

### Methods:

##### init(context)
Initializes all the things.

Parameters:

Name|Type|Description
----|----|-----------
context|WebGLRenderingContext|Context returned from canvas.getContext('webgl')

##### begin(sortMode, blendEquation)
Parameters (Work in Progress):

Name|Type|Description
----|----|-----------


##### draw(options)
Draws your sprite. Call this between begin and end function calls.

The options parameter has the following properites:

Name|Type|Description
----|----|-----------
texture|WebGLTexture|If your texture was loaded with SpriteBatch.loadSprites(), you do not need to set this.
textureSize|Vector|(width,height) If your texture was loaded with SpriteBatch.loadSprites, you do not need to set this.
destination|Vector|(left,top,right,bottom) or (x,y) destination in screen coordinates.
color|Uint8Array| OPTIONAL [r,g,b,a] default color: [255,255,255,255]
source|Vector| OPTIONAL (left,top,right,bottom) Source in texels. (0,0) is top left. If undefined, use whole texture !!!Make sure source size is greater than zero!!!!
origin|Vector| OPTIONAL (x,y) If undefined, then origin will be upper left corner (0,0) of the sprite. Origin is set relative to the destination rectangle.
rotation|number| OPTIONAL Specify an angle in radians.
depth|number| OPTIONAL Specify an integer >= 0 to define the drawing order.
scale|Vector| OPTIONAL (scaleX,scaleY)

##### end()
Call this method after you are finished drawing all your sprites.

##### loadSprites(spriteInfo,onload)
Load your sprites textures with this function.

Name|Type|Description
----|----|-----------
spriteInfo|Array<object>|object| This is either an array of objects or a single object.
The object must have a propery
onload|function|This function will be called when your textures are loaded.

### Vector
Create vector objects with this class. 
---

### Contructor:

##### new Vector(...number)
The length of the vector created depends on the number of arguments supplied.

### Methods:

##### length()
Returns the length of the Vector instance.

##### normalize()
Normalizes the Vector instance. Does not check for division by zero.

##### set(inVector|...number)
Assigns the component values of the vector with a Vector instance or a variable number of Number arguments.

##### scale(scalar)
Scales the vector by the supplied scalar(Number) argument.

##### add(inVector|...number)
Adds the inVector to the Vector instance.

##### subtract(inVector|...number)
Subtracts the inVector from the Vector instance.

##### multiply(inVector|...number)
Multiplies each component of the Vector instance by the inVector.

##### toString()
Returns a string representation of the vector.

### Static Methods:

##### add(one,two,out)
##### subtract(one,two,out)
##### Multiply(one,two,out)
##### Scale(one,two,out)
##### dot(inOne,inTwo)
##### distance(inOne,inTwo)
##### distanceSquared(inOne,inTwo)
##### crossProduct(inOne,inTwo,outThree)


###Matrix4
Create 4x4 matrices with this class.
---
### Constructors:

##### new Matrix4(fillNumber)
The fillNumber argument is an optional number to fill the matrix with. Default fill number is 0.

### Properties:

##### data
This property returns the 4x4 matrix as an array with the matrix stored in row major order.

### Methods:

##### scalarMultiplication(scalar)
##### Transpose()
##### Multiply(...inMatrix4)

### Static Methods:

##### CreateIdentity()
##### CreateRotationX(x)
##### CreateRotationY(y)
##### CreateRotationZ(z)
##### CreateScale(x,y,z)
##### CreateTranslation(x,y,z)
##### CreateOrthographicProjection(left,right,bottom,top,near,far)
##### CreatePerspectiveProjection(ascpectRatio,FOV,zNear,zFar)
##### CreateView(eye,target,up,outMatrix4)

















