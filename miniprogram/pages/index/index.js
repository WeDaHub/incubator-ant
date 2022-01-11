// index.js
const app = getApp();

Page({
  data: {
    username: '同学',
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false
    list: [{
      text: '待处理',
    }],
    todoProcesses: [],
    showData: [],
    todoNum: 0,
    doneNum: 0,
    ready: false,
    haveGetOpenId: false,
    openId: '',
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.cloud.callFunction({
      name: 'login',
    }).then((resp) => {
      if (!this.isInnerUser(resp.result.openId)) {
        wx.redirectTo({
          url: '../outsider/outsider',
        });
      }
      this.setData({
        haveGetOpenId: true,
        openId: resp.result.openid,
      });
      getApp().globalData.openId = resp.result.openid;
      this.getTodoProcesses(resp.result.openid);
      this.getDoneProcesses(resp.result.openid);
    }).catch((e) => {
      wx.showToast({
        title: '获取OpenID失败',
      })
    });
  },

  isInnerUser(openId) {
    // 判断司内用户的处理逻辑
    return true;
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          username: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
        getApp().globalData.username = res.userInfo.nickName;
      },
      fail: (err) => {
        console.error(err);
      }
    })
  },

  getTodoProcesses(openId) {
    wx.cloud.callFunction({
      name: 'getAntProcesses',
      data: {
        operator: openId,
        rtx: openId,
        status: app.globalData.processTypeToDo,
      },
      success: (res) => {
        if (res.result.code !== 0) {
          console.error(res.result.msg);
          return;
        }
        const showData = Array.from(res.result.data).slice(0, 50)
          .map((x) => {
            x.avatarUrl = '/images/ant-flow.png';
            return x;
          });
        this.setData({
          todoNum: res.result.data.length,
          todoProcesses: showData,
          ready: true,
        });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  },

  getDoneProcesses(openId) {
    wx.cloud.callFunction({
      name: 'getAntProcesses',
      data: {
        operator: openId,
        rtx: openId,
        status: app.globalData.processTypeDone,
      },
      success: (res) => {
        if (res.result.code !== 0) {
          console.error(res);
          return;
        }
        this.setData({
          doneNum: res.result.data.length,
        });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  },

  async getProcessAvatar() {
  },

  onShow() { },
});
