module.exports = class {

  constructor() {
    this.trigger            = 'sp'
    this.AddToStarred       = require(CT.dir + 'lib/triggers/spotify/add_to_starred'      )
    this.StarredPlaylist    = require(CT.dir + 'lib/triggers/spotify/starred_playlist'    )
    this.Device             = require(CT.dir + 'lib/triggers/spotify/device'              )
    this.ChangeVolume       = require(CT.dir + 'lib/triggers/spotify/change_volume'       )
    this.CurrentlyPlaying   = require(CT.dir + 'lib/triggers/spotify/currently_playing'   )
    this.OnStarred          = require(CT.dir + 'lib/triggers/spotify/on_starred'          )
    this.Next               = require(CT.dir + 'lib/triggers/spotify/next'                )
    this.Pause              = require(CT.dir + 'lib/triggers/spotify/pause'               )
    this.Play               = require(CT.dir + 'lib/triggers/spotify/play'                )
    this.PlayerRequest      = require(CT.dir + 'lib/triggers/spotify/player_request'      )
    this.Playing            = require(CT.dir + 'lib/triggers/spotify/playing'             )
    this.PlayOrPause        = require(CT.dir + 'lib/triggers/spotify/play_or_pause'       )
    this.PlayRandomPlaylist = require(CT.dir + 'lib/triggers/spotify/play_random_playlist')
    this.RandomPlaylist     = require(CT.dir + 'lib/triggers/spotify/random_playlist'     )
    this.RefreshAccessToken = require(CT.dir + 'lib/triggers/spotify/refresh_access_token')
    this.Setup              = require(CT.dir + 'lib/triggers/spotify/setup'               )
    this.ShuffleState       = require(CT.dir + 'lib/triggers/spotify/shuffle_state'       )
    this.ToggleShuffle      = require(CT.dir + 'lib/triggers/spotify/toggle_shuffle'      )
    this.TransferDevice     = require(CT.dir + 'lib/triggers/spotify/transfer_device'     )
    this.TryRefreshTry      = require(CT.dir + 'lib/triggers/spotify/try_refresh_try'     )
    this.TurnOffShuffle     = require(CT.dir + 'lib/triggers/spotify/turn_off_shuffle'    )
    this.TurnOnShuffle      = require(CT.dir + 'lib/triggers/spotify/turn_on_shuffle'     )
    this.Volume             = require(CT.dir + 'lib/triggers/spotify/volume'              )
    this.VolumeDown         = require(CT.dir + 'lib/triggers/spotify/volume_down'         )
    this.VolumeUp           = require(CT.dir + 'lib/triggers/spotify/volume_up'           )
  }

  run(resolve, reject) {
    const spotify_command = CT.clipboard.content.split(' ')[0]

    switch (spotify_command) {
      case 'setup'  : new this.Setup(                                 resolve, reject); break
      case 'refresh': new this.RefreshAccessToken(                    resolve, reject); break
      case '*'      : new this.TryRefreshTry(this.AddToStarred,       resolve, reject); break
      case '?'      : new this.TryRefreshTry(this.CurrentlyPlaying,   resolve, reject); break
      case 'dev'    : new this.TryRefreshTry(this.Device,             resolve, reject); break
      case '-'      : new this.TryRefreshTry(this.VolumeDown,         resolve, reject); break
      case 'p'      : new this.TryRefreshTry(this.PlayOrPause,        resolve, reject); break
      case 'pl'     : new this.TryRefreshTry(this.Playing,            resolve, reject); break
      case 'r'      : new this.TryRefreshTry(this.PlayRandomPlaylist, resolve, reject); break
      case 'sh'     : new this.TryRefreshTry(this.ToggleShuffle,      resolve, reject); break
      case 'sh?'    : new this.TryRefreshTry(this.ShuffleState,       resolve, reject); break
      case 'shoff'  : new this.TryRefreshTry(this.TurnOffShuffle,     resolve, reject); break
      case 'shon'   : new this.TryRefreshTry(this.TurnOnShuffle,      resolve, reject); break
      case 'sk'     : new this.TryRefreshTry(this.Next,               resolve, reject); break
      case 'st'     : new this.TryRefreshTry(this.StarredPlaylist,    resolve, reject); break
      case '='      : new this.TryRefreshTry(this.VolumeUp,           resolve, reject); break
      case '+'      : new this.TryRefreshTry(this.VolumeUp,           resolve, reject); break
      case 'vol'    : new this.TryRefreshTry(this.Volume,             resolve, reject); break
      default       : reject(`Unrecognized spotify command: ${spotify_command}`)
    }
  }

}
