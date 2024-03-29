/*
 * FILE: ulilith.js
 * Original FILE: itunes.js
 * Original FILE URL: https://github.com/ryutorion/vim-itunes/blob/master/autoload/itunes.js
 * Modified Auther: raa0121 <raa0121@gmail.com>
 * Version: 0.1
 */

var Locator = new ActiveXObject("WbemScripting.SWbemLocator");
var Service = Locator.ConnectServer(".", "/root/CIMV2");
var QfeSet = Service.ExecQuery("Select * From Win32_Process Where Caption='uLilith.exe'");
var DDE = new ActiveXObject("WScript.Shell");
var Ret;
var vol_out = new Array();
var i = 0;

var enumItems = new Enumerator(QfeSet);
for (; !enumItems.atEnd(); enumItems.moveNext()) {
  Ret = enumItems.item().ExecutablePath;
}

DDEPath = Ret.replace("uLilith.exe","DDEClientC.exe");
commands = {
  'play' : function(){
              DDE.Run(DDEPath + " /play", 0);
            },
  'stop' : function(){
              DDE.Run(DDEPath + " /stop", 0);
            },
  'next' : function(){
              DDE.Run(DDEPath + " /next", 0);
            },
  'prev' : function(){
              DDE.Run(DDEPath + " /back", 0);
            },
  'pause': function(){
              DDE.Run(DDEPath + " /pause", 0);
            },
  'repeat': function(){
              DDE.Run(DDEPath + " /playmode repeat", 0);
            },
  'loop' : function(){
              DDE.Run(DDEPath + " /playmode repeat", 0);
            },
  'volume_up' : function(value){
              vol = DDE.exec(DDEPath + " XTYP_REQUEST /volume");
              while (!vol.StdErr.AtEndOfStream) {
                vol_out[i]=vol.StdErr.readLine();
                i++;
              }
              DDE.Run(DDEPath + " /volume " + (Number(vol_out[3])+value), 0);
            },
  'volume_down': function(value){
              vol = DDE.exec(DDEPath + " XTYP_REQUEST /volume");
              while (!vol.StdErr.AtEndOfStream) {
                vol_out[i]=vol.StdErr.readLine();
                i++;
              }
              DDE.Run(DDEPath + " /volume " + (Number(vol_out[3])-value), 0);
            }
};
var args = WScript.Arguments;
if(args.length == 1 && commands[args(0)]){
  commands[args(0)]();
}
if(args.length == 2 && commands[args(0)]){
  commands[args(0)](Number(args(1)));
}

