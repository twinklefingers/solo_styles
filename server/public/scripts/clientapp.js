$(document).ready(function() {
    console.log('jQuery linked'); // this is really important! :P

    // //button listeners
    $('.optionsButton').on('click', toggleOptions);

}); // end doc ready

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                              Global Variables                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
var pickedColor = "black";



//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                     Function which Shows/Hides Grid Form                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function toggleOptions() {
    console.log('toggleOptions() triggered');
    $('.chooseGrid-hide').removeClass('chooseGrid-hide').addClass('chooseGrid');
    $('.chooseGrid').hide();
    $('.chooseGrid').slideToggle(1500);
}

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                           Function to Reset Page                                 //
//                                                                                  //
// //////////////////////////////////////////////////////////////////////////////////////

function refreshPage() {
    window.location.reload();
}

function printPage() {
    window.print();
}


//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                       Function to Capture Custom Grid Specs                      //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function submitGridSpecs() {
    console.log('submitGridSpecs() triggered');
    event.preventDefault();

    // bundle user inputs into a Grid object
    var Grid = {
        sts: $('#gridStitches').val(),
        rows: $('#gridRows').val(),
        horizontal: $('#horizontalGauge').val(),
        vertical: $('#verticalGauge').val()
    };


    // ToggleClass to make Create Grid say Reset
    $('.optionsButton').removeClass('optionsButton').addClass('resetButton');
    $('.resetButton').text('Reset').click(function() {
        window.location.reload();
    });

    $('input').val(''); // clear inputs
    $('.chooseGrid').hide(); // hide form

    // append user-defined sts & rows to DOM
    var stsByRows = document.getElementById('stsByRows');
    var gauge = document.getElementById('gauge');
    // var input = $('yourGrid').html();
    stsByRows.innerHTML = stsByRows.innerHTML + Grid.sts + ' x ' + Grid.rows;
    gauge.innerHTML = gauge.innerHTML + Grid.horizontal + ' x ' + Grid.vertical;

    newGrid(Grid); // must be placed after var assignments
    console.log("Grid: ", Grid);


    //if - onclick Submit, input is 200 < # < 1, throw alert
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                     Function to Append Custom Grid to DOM                        //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function newGrid(Grid) {
    console.log('newGrid() triggered');
    console.log("newGrid() Grid: ", Grid);
    // draw
    var i = 1;
    var j = 1;

    // logic to establish # of columns containing 1 div each
    for (j; j <= Grid.sts; j++) {
        $('#gridCanvas').append("<div class='pixelCol' id='pixelCol" + j + "'><div class='pixel' id='pixelCol" + j + " " + 'pixelRow' + 1 + "'onclick='drawColor()'></div></div>");
    }

    // this adds divs to each column per the # of inputted rows
    //each column
    for (c = 1; c <= Grid.sts; c++) {
        //each inputted row
        for (i; i <= Grid.rows - 1; i++) {
            $('.pixelCol').append("<div class='pixel' id='pixel" + i + "'onclick='drawColor()'></div>");
            console.log('row st created');
        }
    }
}



//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                Function to Choose Color with which to Draw                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
//user clicks on .color in #colorPalette to activate this function
function pickColor(color) {
    pickedColor = color;
    return pickedColor;
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                Function to Color BG Color of Individual Divs                     //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function drawColor() {
    var mousingDown = false;

    window.addEventListener('mousedown', switchMouseState);
    window.addEventListener('mouseup', switchMouseState);

    $('#gridCanvas').mouseover(function() {
        setPixelColor(event);
    });
    $('#gridCanvas').click(function() {
        setPixelColor(event);
    });

    function switchMouseState(event) {
        mousingDown = event.type === 'mousedown';
        console.log("swicthMouseState() activated");
    }

    function setPixelColor(event) {
        if (event.type === 'click' && $(event.target).attr('class').match(/pixel/)) {
            var thisPixel = event.target;
            $(thisPixel).addClass(pickedColor);
            console.log("this in setPixelColor(): ", thisPixel);
        } else if (mousingDown && $(event.target).attr('class').match(/pixel/)) {
            var thisPixel = event.target;
            $(thisPixel).addClass(pickedColor);
            console.log("this in setPixelColor(): ", thisPixel);
        }
    }
}
