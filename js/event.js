////aマーカ読み取り時のイベント
smoothedControls.addEventListener('becameVisible', function ()
{
    ///環境光
    for (var i = 0; i < 2; i++)
    {
        lightobj[i].visible = true;
    }
    ///object
        cube.visible = true;
})

document.addEventListener('click', function ()
{
    if (cube.visible == true)
    {
        cube.visible = false;
        cube2.visible = true;
    }
    else{
        cube2.visible = false;
        cube.visible = true;
    }
})

////aマーカ非読み取り時のイベント
smoothedControls.addEventListener('becameUnVisible', function ()
{
    for (var i = 0; i < 2; i++)
    {
        lightobj[i].visible = false;
    }
        cube.visible = false;
})
