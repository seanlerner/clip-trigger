module.exports = {
  'sp refresh' : /Access token refreshed/             ,
  'sp vol'     : /\d\d?\d?| not available/            ,
  'sp ?'       : /.+ by .+ from the album .+|Nothing currently playing/ ,
  'sp sk'      : /Track skipped/                      ,
  'sp u'       : /Volume set to|Volume at maximum/    ,
  'sp *'       : /added to Starred|is already on your Starred list|Nothing currently playing/ ,
  'sp p'       : /play|paused/                        ,
  'sp p'       : /play|paused/                        ,
  'sp r dw'    : /DW/                                 ,
  'sp d'       : /Volume set to|Volume at minimum/    ,
}
