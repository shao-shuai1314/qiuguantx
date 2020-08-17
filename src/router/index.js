import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import index from '@/components/index'
import lotteryTicket from '@/components/zucai'
import video from '@/components/video'
import app from '@/components/app'

// 新闻
import news from '@/components/news/news'
import writeNews from '@/components/news/writeNews '

// 足球中心
import soccer from '@/components/soccerHome/soccer'
import soccerHome from '@/components/soccerHome/soccerHome'
import league from '@/components/soccerHome/league'
import injured from '@/components/soccerHome/injured'
import scorer from '@/components/soccerHome/scorer'
import headCoach from '@/components/soccerHome/headCoach'
// 让球盘
import concedePoints from '@/components/soccerHome/concedePoints'
import concedePointsSubpage from '@/components/soccerHome/concedePointsSubpage'
// 大小球
import teamTotalScore from '@/components/soccerHome/teamTotalScore'
import teamTotalScoreSubpage from '@/components/soccerHome/teamTotalScoreSubpage'

// 球路盘路
import qiulu from '@/components/soccerHome/qiulu'
import panlu from '@/components/soccerHome/panlu'


// 比赛信息
import matchHome from '@/components/soccerHome/match/matchHome'
import history from '@/components/soccerHome/match/history'
import odds from '@/components/soccerHome/match/odds'
import subPanel from '@/components/soccerHome/match/subPanel'
import coachConfrontation from '@/components/soccerHome/match/coachConfrontation'
import diskDrive from '@/components/soccerHome/match/diskDrive'
import statistics from '@/components/soccerHome/match/statistics'
import exchanges from '@/components/soccerHome/match/exchanges'
import exponent from '@/components/soccerHome/match/exponent'
import TeamPosition from '@/components/soccerHome/match/TeamPosition'
import linuepStatistics from '@/components/soccerHome/match/linuepStatistics'
import analyse from '@/components/soccerHome/match/analyse'
import PlayerTransfer from '@/components/soccerHome/match/PlayerTransfer'
import textLive from '@/components/soccerHome/match/textLive'



// 欧赔变动子页
import oddsSubpage from '@/components/soccerHome/match/oddsSubpage'
// 球队信息
import teamHome from '@/components/soccerHome/team/teamHome'
import information from '@/components/soccerHome/team/information'
import coachResults from '@/components/soccerHome/team/coachResults'
import transfer from '@/components/soccerHome/team/transfer'
import teamSchedule from '@/components/soccerHome/team/teamSchedule'
import lineup from '@/components/soccerHome/team/lineup'
import place from '@/components/soccerHome/team/place'
import OverTheYears_qiulu from '@/components/soccerHome/team/OverTheYears_qiulu'



// 球员教练详细信息
import playerDetails from '@/components/soccerHome/playerDetails/playerDetails'

// 用户
import register from '@/components/user/register'
import login from '@/components/user/user'






Vue.use(Router)

const router = new Router({
  // mode: 'history',

  routes: [

    {
      path: '/writeNews',
      component: writeNews,
      meta: {
        title: '管理员新闻页'
      }
    },



    {
      path: '/users',
      component: login,
      meta: {
        title: '球冠登录',
        keepAlive: false
      }
    }, {
      path: '/users',
      component: register,
      meta: {
        title: '球冠注册'
      }
    },

    {
      path: '/',
      component: home,
      redirect: "/index",
      children: [{
          path: '/index',
          component: index,
          meta: {
            title: '球冠首页',
          }
        }, {
          path: '/zucai',
          component: lotteryTicket,
          meta: {
            title: '球冠足彩'
          }
        },
        // 足球数据
        {
          path: '/soccerHome',
          component: soccerHome,
          redirect: "/soccer",
          children: [{
              path: '/soccer',
              component: soccer,
              meta: {
                title: '球冠足球中心'
              }
            }, {
              path: '/soccer/league/:sclassID',
              name: 'league',
              component: league,
              meta: {
                title: '赛季积分榜'
              }
            }, {
              path: '/soccer/league/headCoach/:sclassID',
              name: 'headCoach',
              component: headCoach,
              meta: {
                title: '赛季主教练'
              }
            }, {
              path: '/soccer/league/injured/:sclassID',
              name: 'injured',
              component: injured,
              meta: {
                title: '最新伤停'
              }
            }, {
              path: '/soccer/league/scorer/:sclassID',
              name: 'scorer',
              component: scorer,
              meta: {
                title: '球员信息统计'
              }
            },
            {
              path: '/soccer/league/concedePoints/:sclassID',
              name: 'concedePoints',
              component: concedePoints,
              meta: {
                title: '让球盘统计'
              }
            }, {
              path: '/soccer/team/HandicapDetail',
              name: 'concedePointsSubpage',
              component: concedePointsSubpage,
              meta: {
                title: '全场盘路'
              }
            },
            {
              path: '/soccer/league/teamTotalScore/:sclassID',
              name: 'teamTotalScore',
              component: teamTotalScore,
              meta: {
                title: '大小球统计'
              }
            },
            {
              path: '/soccer/team/OuHandicap',
              name: 'teamTotalScoreSubpage',
              component: teamTotalScoreSubpage,
              meta: {
                title: '全场大小球盘路'
              }
            },
            {
              path: '/soccer/league/qiulu/:sclassID',
              name: 'qiulu',
              component: qiulu,
              meta: {
                title: '赛季球路'
              }
            },
            {
              path: '/soccer/league/panlu/:sclassID',
              name: 'panlu',
              component: panlu,
              meta: {
                title: '赛季盘路'
              }
            },
            // 比赛数据
            {
              path: '/soccer/match',
              component: matchHome,
              name: 'matchHome',
              redirect: "/soccer/match/history:scheduleID",
              children: [{
                  path: '/soccer/match/history/:scheduleID',
                  name: 'history',
                  component: history,
                  meta: {
                    title: '比赛历史'
                  }
                },
                {
                  path: '/soccer/match/odds/:scheduleID',
                  component: odds,
                  name: 'odds',
                  meta: {
                    title: '欧赔'
                  }
                },
                {
                  path: '/soccer/match/subPanel/:scheduleID',
                  component: subPanel,
                  name: 'subPanel',
                  meta: {
                    title: '亚盘'
                  }
                },
                {
                  path: '/soccer/match/coachConfrontation/:scheduleID',
                  component: coachConfrontation,
                  name: 'coachConfrontation',
                  meta: {
                    title: '教练对阵'
                  }
                },
                {
                  path: '/soccer/match/diskDrive/:scheduleID',
                  component: diskDrive,
                  name: 'diskDrive',
                  meta: {
                    title: '球路盘路'
                  }
                },
                {
                  path: '/soccer/match/statistics/:scheduleID',
                  component: statistics,
                  name: 'statistics',
                  meta: {
                    title: '技术统计'
                  }
                },
                {
                  path: '/soccer/match/linuepStatistics/:scheduleID',
                  component: linuepStatistics,
                  name: 'linuepStatistics',
                  meta: {
                    title: '对阵伤停'
                  }
                },
                {
                  path: '/soccer/match/textLive/:scheduleID',
                  component: textLive,
                  name: 'textLive',
                  meta: {
                    title: '文字直播'
                  }
                },
                {
                  path: '/soccer/match/exchanges/:scheduleID',
                  component: exchanges,
                  name: 'exchanges',
                  meta: {
                    title: '交易盈亏'
                  }
                },
                {
                  path: '/soccer/match/exponent/:scheduleID',
                  component: exponent,
                  name: 'exponent',
                  meta: {
                    title: '球冠指数'
                  }
                },
                {
                  path: '/soccer/match/TeamPosition/:scheduleID',
                  component: TeamPosition,
                  name: 'TeamPosition',
                  meta: {
                    title: '球队位置'
                  }
                },
                {
                  path: '/soccer/match/analyse/:scheduleID',
                  component: analyse,
                  name: 'analyse',
                  meta: {
                    title: '赛前分析'
                  }
                },
                {
                  path: '/soccer/match/PlayerTransfer/:scheduleID',
                  component: PlayerTransfer,
                  name: 'PlayerTransfer',
                  meta: {
                    title: '球员转会'
                  }
                }
              ]
            },
            // 欧赔子页
            {
              path: '/soccer/match/odds/change/:oddsID',
              component: oddsSubpage,
              name: 'oddsSubpage',
              meta: {
                title: '欧赔'
              }
            },
            // 球队信息
            {
              path: '/soccer/team',
              component: teamHome,
              redirect: "/soccer/team/information/:teamID",
              children: [{
                  path: '/soccer/team/information/:teamID',
                  name: 'information',
                  component: information,
                  meta: {
                    title: '球队简介'
                  }
                },
                {
                  path: '/soccer/team/lineup/:teamID',
                  component: lineup,
                  name: "lineup",
                  meta: {
                    title: '球队阵容'
                  }
                },
                {
                  path: '/soccer/team/coachResults/:teamID',
                  component: coachResults,
                  name: "coachResults",
                  meta: {
                    title: '教练成绩'
                  }
                },
                {
                  path: '/soccer/team/transfer/:teamID',
                  component: transfer,
                  name: "transfer",
                  meta: {
                    title: '球员转会'
                  }
                },
                {
                  path: '/soccer/team/teamSchedule/:teamID',
                  component: teamSchedule,
                  name: "teamSchedule",
                  meta: {
                    title: '球队赛程'
                  }
                },
                {
                  path: '/soccer/team/place/:teamID',
                  component: place,
                  name: "place",
                  meta: {
                    title: '地理位置'
                  }
                },
                {
                  path: '/soccer/team/OverTheYears_qiulu/:teamID',
                  component: OverTheYears_qiulu,
                  name: "OverTheYears_qiulu",
                  meta: {
                    title: '历年球路'
                  }
                },
              ]
            },

            // 球员教练详细信息
            {
              path: '/soccer/team/player/:playerID',
              name: 'playerDetails',
              component: playerDetails,
              meta: {
                title: '球员详细信息'
              }
            },

          ]
        },


        {
          path: '/news',
          component: news,
          meta: {
            title: '球冠新闻'
          }
        }, {
          path: '/video',
          component: video,
          meta: {
            title: '球冠视频'
          }
        }, {
          path: '/app',
          component: app,
          meta: {
            title: '球冠app'
          }
        }
      ]
    },
  ]
})

// 挂载导航守卫
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') return next();
  // // 获取token
  // const tokenStr = window.sessionStorage.getItem('token')
  // if (!tokenStr) return next('/login')
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
