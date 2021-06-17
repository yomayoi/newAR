/********【 ボタン要素のリストを取得 】********/
//モジュール1
var btnList = document.frmodule1.btn;
/********【 関数：ボタンをシャッフルする 】********/
function BtnShuff()
{
    var bigList = [];
    bigList=Shuffle(8, 4);
    Dateswitch(bigList[0], bigList[1], bigList[2], bigList[3]);
    var smallList = [];
    smallList = Shuffle(4, 4);
    JpListCase(smallList[0], smallList[1], smallList[2], smallList[3]);
    document.frmset.xcounter.value = "";
}
//8つから抜き出した4つの単語を保存する
function Dateswitch(a, b, c, d)
{
    JpList[0] = JpnList[a];
    EnList[0] = EngList[a];
    JpList[1] = JpnList[b];
    EnList[1] = EngList[b];
    JpList[2] = JpnList[c];
    EnList[2] = EngList[c];
    JpList[3] = JpnList[d];
    EnList[3] = EngList[d];
}
//シャッフルした4つの単語を保存する
function JpListCase(a,b,c,d)
{
    targetJp = JpList[0];
    targetEn = EnList[0];
    btnList[0].value = EnList[a];
    btnList[1].value = EnList[b];
    btnList[2].value = EnList[c];
    btnList[3].value = EnList[d];
    document.frmodule1.counter.value = targetJp;
}
/********【 関数：正解チェック 】********/
function CheckNum(argNum)
{
    if (argNum == targetEn)
    {
        khi = khi + 1;
        targetJp = JpList[khi];
        targetEn = EnList[khi];
        document.frmodule1.counter.value = targetJp;
    } else
    {
        document.frmset.xcounter.value += "x";
        khi = 0;
        targetJp = JpList[khi];
        targetEn=EnList[khi]
        misscount++;
        document.frmodule1.counter.value = targetJp;
    }
    if (khi ==4)
    {
        khi = 0;
        targetJp = JpList[khi];
        targetEn = EnList[khi];
        document.frmodule1.counter.style.display = "none";
        document.getElementById("redbtn").value = "O";
        document.getElementById("blubtn").value = "  ";
        document.getElementById("yerbtn").value = "  ";
        document.getElementById("grebtn").value = "  ";
        document.getElementById("redbtn").disabled = true;
        document.getElementById("blubtn").disabled = true;
        document.getElementById("yerbtn").disabled = true;
        document.getElementById("grebtn").disabled = true;
        contGame();
        M2game();
    }
    if (misscount == Max_miss) { Gameover(); }
}
//モジュール2
var btn2List = document.frmodule2.btn2;
var btn2subList = [];
var btn2sub2List = [];
var txtvalue;
function M2game()
{
    mo2len = EngList[randmod2].length;
    for (var i = 0; i < mo2len; i++)
    {
        document.frmodule2.anstxt2.value += "?";
    }
    txtvalue = document.frmodule2.anstxt2.value;
    for (var i = 0; i < 20; i++)
    {
        if (i > mo2len || i==0)
        {
            btn2subList[i] = "  ";
        } else
        {
            btn2subList[i] = EngList[randmod2].substr(i-1,1);
        }
    }
    btn2sub2List = Shuffle(20, 20);
    for (var i = 0; i < 20; i++)
    {
        var k = btn2sub2List[i];
        btn2List[i].value = btn2subList[k];
        if (btn2List[i].value != "  ")
        {
            document.getElementById("b" + i).disabled = false;
            document.getElementById("b"+i).style.backgroundColor = "#ffa07a";
        }
    }
}
function Checkkey(argNum ,argId)
{
    if (argNum == EngList[randmod2].substr(substrNum, 1))
    {
        document.frmodule2.anstxt2.value = strIns(document.frmodule2.anstxt2.value,substrNum,argNum);
        substrNum++;
        document.getElementById(argId).disabled = true;
    } else
    {
        document.frmset.xcounter.value += "x";
        misscount++;
    }
    if (substrNum==mo2len)
    {
        //clear
        document.frmodule2.anstxt2.value = EngList[randmod2];
                document.getElementById("blubtn").value = "O";
        Modvisit();
        contGame();
        M3game();
    }
    if (misscount == Max_miss) { Gameover(); }

}
//モジュール3
function M3game()
{
    var srctbox1 = document.getElementById("select1");
    var srctbox2 = document.getElementById("select2");
    for(var i = 0; i <8; i++){
        var option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerHTML = EngShuffleList[i];
        srctbox1.appendChild(option);
    }
    for(var i = 0; i <8; i++){
        var option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerHTML = EngShuffleList[i];
        srctbox2.appendChild(option);
    }
    if(l%2==0){
        Mo3str(0);
        }else{
        Mo3str(1);
        }
}
function Mo3str(Num)
{
    document.frmodule3.mo3tx1.value = JpnList[Num];
    document.frmodule3.mo3tx2.value = JpnList[Num+6];
    document.getElementById("select1").addEventListener('change', function ()
    {
        var idx1 = document.getElementById("select1").selectedIndex;
        if(document.getElementById("select1").options[idx1].text == EngList[Num+2] && flg_mo3==1)
        {
            document.getElementById("select1").disabled = true;
            document.getElementById("select2").disabled = true;
            contGame();
        }else if(document.getElementById("select1").options[idx1].text == EngList[Num+2]){
            flg_mo3++;
        }else{
            document.frmset.xcounter.value += "x";
            misscount++;
            if (misscount == Max_miss) { Gameover(); }
        }
    })
        document.getElementById("select2").addEventListener('change', function ()
    {
        var idx2 = document.getElementById("select2").selectedIndex;
        if(document.getElementById("select2").options[idx2].text == EngList[Num+4] && flg_mo3 ==1)
        {
            document.getElementById("select1").disabled = true;
            document.getElementById("select2").disabled = true;
            contGame();
        }else if(document.getElementById("select2").options[idx2].text == EngList[Num+4]){
            flg_mo3++;
        }else{
            document.frmset.xcounter.value += "x";
            misscount++;
            //gameover
            if (misscount == Max_miss) { Gameover(); }
        }
    })
}

//Shuffle([全体数],[シャッフルした全体から指定数抜き出す])
function Shuffle(big,small)
{
    const listNum = new Array;
    for(var i=0;i<big;i++){
        listNum.push(i);
    }
    const testList = [];
    for (var i = 0; i < small; i++)
    {
        const randtest = Math.floor(listNum.length * Math.random());
        testList[i] = listNum[randtest];
        listNum.splice(randtest, 1);
        }
    return testList;
}
//(example.value,[入れ替えたい場所],[入れ変えたい文字])
function strIns(str, idx, val){
    var res = str.slice(0, idx) + val + str.slice(idx+1);
    return res;
};
