//-- =============================================================
//-- main.lua - A simple connect-3 style game.
//-- =============================================================
//-- Last Updated: 22 AUG 2013
//-- =============================================================
//
//----------------------------------------------------------------------
//--	1. Requires
//----------------------------------------------------------------------
var physics = require "physics"



//----------------------------------------------------------------------
//--	2. Initialization
//----------------------------------------------------------------------
audio.setVolume( 0.5, { channel: 1 } ); //-- Sound Effects Channel Volume
audio.setVolume( 0.8, { channel: 2 } ); //-- Sound Track Channel Volume

physics.start();

physics.setGravity( 0, 0 );

//----------------------------------------------------------------------
//--	3. Locals
//----------------------------------------------------------------------
//-- Helper Variables (Useful for many games and apps)

var w = display.contentWidth
var h = display.contentHeight
var centerX = display.contentCenterX
var centerY = display.contentCenterY

var gameFont = "Comic Book Commando"

var maxImageNum = 4 //-- Adjust up to 7 to get between 1 and 7 random images (per set)

var lastImageNumber

var sounds = [];

for(var i = 1; i < 5; i++)
{

        sounds[i] =  audio.loadSound("sounds/sound" + i + ".wav");
}




var soundTrack = audio.loadStream("sounds/Itty Bitty 8 Bit.mp3")

audio.play( soundTrack, { channel: 2, loops: -1, fadein: 1000 } )



var pointsPerGem = 25;



var layers

var theBases
var gemGrid
var theBoard
var scoreLabel
var scoreHUD

var touchesAllowed = false

var lastTouchedGem

var consecutiveMatches = 0



//-- Provide some parameters so that we can automatically calculate the size and position of gems
//
//--

var playWidth  = w - 30 -- Maximum width of gem area
var playHeight = h - 60 -- maximum height of gem area
var numCols = 6 -- How many columns of gems?
var numRows = 7 -- How many row of gems?



//-- Calculate the best size for gems so that we can fit the specified number of rows and columns
//
//-- in the play area.
//
//--

var gemSize = playWidth/numCols

if(gemSize > playHeight/numRows) {

	gemSize = playHeight/numRows

}



//-- Calulate the position of the lower-left gem.
//
//--
//
//-- This will be used to lay out the board and to drop replacement gems.
//
//--

var x0 = (w - (numCols * gemSize))/2 + gemSize/2

var y0 = h - (h - (numRows * gemSize))/2 - gemSize/2  + 4



//----------------------------------------------------------------------
//--	4. Forward Declarations
//----------------------------------------------------------------------
var createGem
var calculateIndex
var testForMatches
var handleMatches
var achievementPopup
var swapBack
var settleGems
var replaceGems
var onGemTouch



var createBadges

var onTouch_Badge



//----------------------------------------------------------------------
//--	5. Definitions
//----------------------------------------------------------------------
//
//-- =======================
//
//-- create() - This is the primary function for the whole game.  It has the job of creating the following:
//
//--
//
//--            * Layers - This game uses display groups to organize screen elements in layers.
//
//--            * Interface Objects - These include the background a frame to overlay the play area, the score HUD, some 'credit' badges/buttons,
//
//--                                  and an overlay image that makes sure any excess space (on devices with different aspect ratios from the design ratio) looks good.
//
//--            * The board/grid - This is the actual gem grid and includes a hidden base (bottom) layer of gems and the actual play pieces which 'stack' on top of them.
//
//--
//
//-- =======================

function create( ) {
//	-- 1. Create rendering layers (group)
//
//	--

	layers = display.newGroup()

	layers.back = display.newGroup()
	layers.content = display.newGroup()
	layers.frame = display.newGroup()
	layers.interface = display.newGroup()
	layers.overlay = display.newGroup()
	layers:insert(layers.back)
	layers:insert(layers.content)
	layers:insert(layers.frame)
	layers:insert(layers.interface)
	layers:insert(layers.overlay)



//	-- 2. Add Interface Objects
//	--
//	-- Background image
	var tmp = display.newImage( layers.back, "images/back3.png" )
	tmp.x = centerX
	tmp.y = centerY

	

//	-- Overlay image (covers unused space regardless of screen shape/size)
	var tmp = display.newImage( layers.overlay, "images/overlay.png" )
	tmp.x = centerX
	tmp.y = centerY


//	-- Play Area Frame
	var tmp = display.newImage( layers.frame, "images/frame.png" )
	tmp.x = centerX
	tmp.y = centerY

//	-- Score Background
	var tmp = display.newRoundedRect( layers.interface, 0, 0, 300, 50, 6 )
	tmp.x = centerX
	tmp.y = 37
	tmp:setFillColor( 254,191, 199 )
	tmp.strokeWidth = 3
	tmp:setStrokeColor( 243,95, 179 )

//	-- Score Label
	scoreLabel = display.newText( layers.interface, "SCORE:", 0, 0, gameFont, 42 )
	scoreLabel.x = centerX - scoreLabel.contentWidth/2 + 10
	scoreLabel.y = 36
	scoreLabel:setTextColor(51,16,95)

//	-- Score HUD
	scoreHUD = display.newText( layers.interface, 0, 0, 0, gameFont, 42 )
	scoreHUD.x = scoreLabel.x + scoreLabel.contentWidth/2 + scoreHUD.contentWidth/2 + 10
	scoreHUD.y = scoreLabel.y
	scoreHUD:setTextColor(51,16,95)
	
//	-- Game Title Background
	var tmp = display.newRoundedRect( layers.interface, 0, 0, 200, 30, 6 )
	tmp.x = centerX
	tmp.y = h - 30
	tmp:setFillColor( 254,191, 199 )
	tmp.strokeWidth = 3
	tmp:setStrokeColor( 243,95, 179 )

//	-- Game Title
	var tmp = display.newText( layers.interface, "Corona Candy", 0, 0, gameFont, 24 )
	tmp.x = centerX
	tmp.y = h - 30
	tmp:setTextColor(51,16,95)
	

//	-- 3. Build the game board
//	--
	gemGrid = {}	
	theBases = {}
	theBoard = display.newGroup()	

	-- create a base row to 'hold up' the other gems
	for( var i = 1; i < numCols; i++) {
		var tmp = createGem( layers.content, "static" )
		tmp.x = x0 + (i - 1) * gemSize
		tmp.y = y0 + gemSize
		tmp.isBase = true
		tmp.alpha = 0
		tmp:setFillColor(255,255,255)
	}

	replaceGems()
	timer.performWithDelay( numRows * numCols * 15 * 2, function() touchesAllowed = true end )	
	layers.content:insert( theBoard )	


//	-- 4. Add badges (Hey, everyone needs a little credit!)
//	--
	createBadges()
}


//-- =======================
//
//-- destroy() - This function is designed to destroy all of the game contents.  It is not used in this implementation, but
//
//--             has been provided for users who want to modify the code to work in a framework or as a module.
//
//-- =======================

function destroy() {

//	-- 1. Destroy the layers and everything in them.  Easy!
	layers:removeSelf()

//	-- 2. Clear all local variables referencing objects (so Lua can garbage collect)
	layers = null
	gemGrid = null
	theBases = null
	theBoard = null
	scoreLabel = null
	scoreHUD = null
	lastTouchedGem = null
}


//-- =======================
//
//-- onGemTouch() - This is the event listener for all gems.  It has the job or swapping gems and starting the 'matching' check.
//
//-- =======================

function onGemTouch(self, event) {
	var target  = event.target
	var phase   = event.phase
	var touchID = event.id
	var parent  = target.parent

	if( not touchesAllowed ) { return true }
	if( target.isBase ) { return true }

	if( phase == "began" ) {
		display.getCurrentStage():setFocus( target, touchID )
		target.isFocus = true
	
	} else if( target.isFocus ) {
		if(phase == "ended" or phase == "cancelled") {
			display.getCurrentStage():setFocus( target, null )
			target.isFocus = false

			if( not lastTouchedGem ) {
				lastTouchedGem = target
				lastTouchedGem.xScale = 0.8
				lastTouchedGem.yScale = 0.8

			} else if( target == lastTouchedGem ) {
				lastTouchedGem.xScale = 1
				lastTouchedGem.yScale = 1
				lastTouchedGem = null
			      }

			} else {
				var hits = physics.rayCast( target.x, target.y, lastTouchedGem.x, lastTouchedGem.y, "sorted" )

				if(!hits == 1) {
					//-- Don't allow diagonal swaps
					var dx = math.abs(target.x - lastTouchedGem.x) > 1 //-- Give a little leeway for inexact positions (because of physics)
					var dy = math.abs(target.y - lastTouchedGem.y) > 1 //-- Give a little leeway for inexact positions (because of physics)
					if(dx and dy) {
						//-- Both being off by more than 1 means they are diagonal
					} else {
						transition.to( target, { x = lastTouchedGem.x, y = lastTouchedGem.y, time = 200 } )
						transition.to( lastTouchedGem, { x = target.x, y = target.y, time = 200 } )						
					
						target.swapped = true
						lastTouchedGem.swapped = true

						timer.performWithDelay( 300, function() testForMatches( 0 ) end )
					}
				}

				lastTouchedGem.xScale = 1
				lastTouchedGem.yScale = 1
				lastTouchedGem = null
			}
		}
	}
	return true
}


//-- =======================
//
//-- createGem() - This function creates a single gem using a randomly selected image (from our set of image).  The 'type' argument is used to tell this function whether
//
//--               a gem is a 'base game' or a 'normal' gem.  Base gems are placeholder gems that go at the bottom of each column.
//
//--               They are not placed in the 'gemGrid' and are later used by other functions to do maintenance tasks such as:
//
//--
//
//--               * Settling gems - see settleGems()
//
//--               * Replacing gems - see replaceGems()
//
//--
//
//-- =======================

function createGem( group, type ) {

	var type = type || "dynamic";



	-- Randomly choose a new image number (not the same as last selected)

	var imageNumber = math.random(1,maxImageNum)

	while( imageNumber == lastImageNumber ) do

		imageNumber = math.random(1,maxImageNum)

	end

	lastImageNumber = imageNumber



	var theGem = display.newImageRect(group, "images/candy/" .. imageNumber .. ".png", gemSize, gemSize )

//---[[
//	theGem.fill.effect = "filter.levels"
//	theGem.fill.effect = "filter.scatter"
//	theGem.fill.effect = "filter.crosshatch"
//	theGem.fill.effect = "filter.woodCut"
//	theGem.fill.effect = "filter.zoomBlur"
//	theGem.fill.effect = "filter.pixelate"
//	theGem.fill.effect = "filter.polkaDots"
//	theGem.fill.effect = "filter.sobel"
//	theGem.fill.effect = "filter.wobble"
//	-- wood cut
//	-- local effect = theGem.fill.effect
//	-- effect.grain = 4
//
//	var effect = theGem.fill.effect
//	effect.amplitude = 4
//
//	display.setDrawMode( "forceRender", true )
//--]]


	-- Keep reference to image number for later comparison

	theGem.myImageNumber = imageNumber 



	theGem.touch = onGemTouch

	theGem:addEventListener( "touch", theGem )	
	var halfSize = gemSize/2
	var halfSizeMinus = halfSize - 2
	var bodyShape = { -halfSizeMinus,-halfSize, halfSizeMinus,-halfSize, halfSizeMinus,halfSize, -halfSizeMinus,halfSize }

	physics.addBody( theGem, type, { radius = gemSize/4 } )

	if( type == "dynamic" ) {

		gemGrid[theGem] = theGem

	} else {

		theBases[theGem] = theGem

	}


	return theGem
}



//-- =======================
//
//-- testForMatches() - This function iterates over all of the current gems, and for each gem casts a ray up, down, right, and left.
//
//--                    After each set of casts, the function counts how many consecutive hits are found where the 'hit gems' have the
//
//--                    same image number ('myImageNumber') as the matching gem.  Furthermore, if 3 or more gems (including the current gem) in a row (left,right) or
//
//--                    column (up,down) are found to have the same image number , the current gem is marked as 'matched'.  This means the current gem
//
//--                    is adjacent to 2 or more same colored gems in a row or column respectively.
//
//--
//
//--                    Note: You may wonder why so many ray casts are used and whether there is a better way to do this.  In fact, there are
//
//--                    many ways to do this, chief among the alternatives is to keep gems in a table and to use an algorithm to determine rows and
//
//--                    columns.  This way is faster, but significantly more complex than ray casting.  Whereas, ray casting is simple, and only costs about 4ms
//
//--                    for 48 * 4 == 192 ray casts.  So, even if you budget is only 16 ms (i.e. 60 FPS), you've got plenty of time to do this every frame.
//
//--
//
//--                    In closing, I chose this method because it is short to code and easy to understand and to explain.
//
//-- =======================

function testForMatches( lastMatches )

	var left  = -2000

	var right =  2000

	var up    = -2000

	var down  =  2000



	touchesAllowed = false



	var foundMatch = false



	for k,v in pairs( gemGrid ) do

		var horizontalHits = 0

		var verticalHits = 0

		var leftHits = physics.rayCast( v.x, v.y, v.x + left, v.y, "sorted" ) or {}

		var rightHits = physics.rayCast( v.x, v.y, v.x + right, v.y, "sorted" ) or {}

		var upHits = physics.rayCast( v.x, v.y, v.x, v.y + up, "sorted" ) or {}

		var downHits = physics.rayCast( v.x, v.y, v.x, v.y + down, "sorted" ) or {}





//		-- Count the horizontal hits

		for i = 1, #leftHits do

			if(leftHits[i].object.myImageNumber ~= v.myImageNumber) then

				break

			end

			horizontalHits = horizontalHits + 1

		end

		for i = 1, #rightHits do

			if(rightHits[i].object.myImageNumber ~= v.myImageNumber) then

				break

			end

			horizontalHits = horizontalHits + 1

		end



//		-- Count the vertical hits

		for i = 1, #upHits do

			if(upHits[i].object.myImageNumber ~= v.myImageNumber) then

				break

			end

			verticalHits = verticalHits + 1

		end

		for i = 1, #downHits do

			if(downHits[i].object.myImageNumber ~= v.myImageNumber) then

				break

			end

			verticalHits = verticalHits + 1

		end



		if( horizontalHits >  1 or verticalHits > 1 ) then

			v.matched = true

			foundMatch = true			

		end

	end

	

	if( foundMatch ) then

		lastMatches = lastMatches + 1

		audio.play( sounds[math.random(1,5)], { channel = 1 } )

		handleMatches()

		timer.performWithDelay( 150, function() settleGems() end )

		timer.performWithDelay( 250, function() replaceGems() end )

		timer.performWithDelay( 750, function() testForMatches( lastMatches ) end )

	else

		if( lastMatches >= 2 ) then

			achievementPopup()

		end

		swapBack()

		timer.performWithDelay( 250, function() touchesAllowed = true end )

	end

end



//-- =======================
//
//-- handleMatches() - This function iterates over all of the current gems and checks to see if they were marked as 'matched'.
//
//--                   Each gem that is found to have been marked this way is removed from the board and in its place, a temporary
//
//--                   floating points award is shown.
//
//-- =======================

handleMatches = function()

	for k,v in pairs( gemGrid ) do		

		if(v.matched) then

			var tmp = display.newText( layers.frame, pointsPerGem, 0, 0, gameFont, 36 )

			

			tmp.x = v.x

			tmp.y = v.y

			transition.to( tmp, { y = tmp.y - 75, alpha = 0, time = 1000 } )

			timer.performWithDelay( 1100, function() tmp:removeSelf() end )



			v:removeSelf()

			gemGrid[k] = null



			var tmpScore = tonumber( scoreHUD.text )

			tmpScore = tmpScore + pointsPerGem

			scoreHUD.text = tmpScore

			scoreHUD.x = scoreLabel.x + scoreLabel.contentWidth/2 + scoreHUD.contentWidth/2 + 10
		end

	end

end



//-- =======================
//
//-- swapBack() - This function looks for two gems that were just 'swapped' and then swaps them back.
//
//--              The assumption here is, if we don't find any marked gems, the swap isn't needed.
//
//-- =======================

swapBack = function()

	var swapGems = {}

	for k,v in pairs( gemGrid ) do		

		if(v.swapped) then

			swapGems[#swapGems+1] = v

			v.swapped = false

		end

	end



	if(#swapGems == 2) then

		var gem1 = swapGems[1]

		var gem2 = swapGems[2]
		transition.to( gem1, { x = gem2.x, y = gem2.y, time = 200 } )
		transition.to( gem2, { x = gem1.x, y = gem1.y, time = 200 } )		
	end

end





//-- =======================
//
//-- settleGems() - Iterates over 'base gems' and casts ray upward to see how many gems are in the column.
//
//--                 If fewer than 'numRows' gems are found, the existing gems are 'dropped' to fill empty spaces.
//
//--                 Note: To make dropping nice, we use the transition library.  We could have used physics
//
//--                 gravity, but Box2D tends to have a little flex when objects collide and we don't want
//
//--                 that affect.  Instead, we want a nice solid stop.
//
//-- =======================

settleGems = function()

	var up    = -2000

	var nextX

	var nextY

	for k,v in pairs( theBases ) do

		nextX = v.x

		nextY = v.y - gemSize

		missingGemCount = 0

		var hits = physics.rayCast( v.x, v.y, v.x, v.y + up, "closest" ) or {}



		var moveCount = 0

			

		while(#hits == 1) do

			var object = hits[1].object

			if(object.y < nextY) then

				transition.to( object, { y = nextY, time = 100 + moveCount * 50 } )

				moveCount = moveCount + 1

			end

			nextY = nextY - gemSize

			hits = physics.rayCast( object.x, object.y, object.x, object.y + up, "closest" ) or {}

		end

	end

end



//-- =======================
//
//-- replaceGems() - Iterates over 'base gems' and casts ray upward to see how many gems are in the column.
//
//--                 If fewer than 'numRows' gems are found, new gems are 'dropped' to fill the column.
//
//--                 Note: To make dropping nice, we use the transition library.  We could have used physics
//
//--                 gravity, but Box2D tends to have a little flex when objects collide and we don't want
//
//--                 that affect.  Instead, we want a nice solid stop.
//
//-- =======================

replaceGems = function()

	var up    = -500

	for k,v in pairs( theBases ) do

		missingGemCount = 0

		var hits = physics.rayCast( v.x, v.y, v.x, v.y + up, "sorted" ) or {}



		var missingGems = numRows - #hits

		

		for i = 1, missingGems do

			var tmp  = createGem( layers.content )

			tmp.x = v.x

			tmp.y = 0 - (i * gemSize)

			

			var toY = v.y - (#hits + i) * gemSize

			transition.to( tmp, { y = toY, time  = 250 + 50 * i} )

		end

	end

end

//-- =======================
//
//-- achievementPopup() - This function produces a random 'achievement' popup.  It is used for sequential connections >= 3
//
//-- =======================

achievementPopup = function()



	var group = display.newGroup()

	

	var back = display.newRoundedRect( group, 0, 0, 200, 60, 12 )

	back.strokeWidth = 3

	back:setFillColor( 243, 95, 179 )

	back:setStrokeColor( 254, 191, 199 ) 

	back.x = centerX

	back.y = centerY



	var messages = {}

	messages[#messages+1] = "Awesome!"

	messages[#messages+1] = "Keep Going!"

	messages[#messages+1] = "Rockin' It!"

	messages[#messages+1] = "Woah!"

	messages[#messages+1] = "Super Cool!"



	var tmp = display.newText( group, messages[ math.random( 1, #messages )], 0, 0, gameFont, 32 )

	tmp.x = back.x

	tmp.y = back.y



	transition.to( group, { alpha = 0, time = 1000, delay = 500 } )

	timer.performWithDelay( 1600, function() group:removeSelf() end )

end

//-- =======================
//
//-- createExample() - Adds badges to screen.  Also starts listeners.
//
//-- =======================

createBadges = function()

	var tmp = display.newImageRect( layers.frame, "images/Built_with_Corona_SM.png", 43, 60 )

	tmp.x = 30

	tmp.y = h - 30

	tmp.touch = onTouch_Badge

	tmp.url = "http://www.coronalabs.com/"

	tmp:addEventListener( "touch", tmp )



	var tmp = display.newImageRect( layers.frame, "images/rg.png", 43, 60 )

	tmp.x = w - 30

	tmp.y = h - 30

	tmp.touch = onTouch_Badge

	tmp.url = "http://roaminggamer.com/makegames/"

	tmp:addEventListener( "touch", tmp )

end



//-- =======================
//
//-- onTouch_Badge() - Event listener for 'badge touches'.  Opens web pages.
//
//-- =======================

onTouch_Badge = function( self, event )

	var phase = event.phase

	var target = event.target

	var url = target.url

	if( phase == "ended" ) then

		system.openURL( url ) 

	end

	return true

end

//----------------------------------------------------------------------
//-- 6. Create and Start Game
//----------------------------------------------------------------------
create( display.currentStage ) 