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
    
Name  |Description
------|-----------
BackToFront | Sprites are sorted by depth in back to front order before drawing.
FrontToBack | Sprites are sorted by depth in front to back order before drawing.
Deferred | Sprites are batched and not drawn until end is called.
Immediate | Sprites are drawn immediatly when draw is called.


### SpriteBatch 
Object that controls the batching and drawing of sprites.
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
Draws your sprite. Call this between a begin and end call.
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











