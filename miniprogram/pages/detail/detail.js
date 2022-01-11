// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    process: {
      process_id: '',
      app: '',
      title: '',
      created_time: '',
      creator: '',
      ready: false,
    },
    statusMap: ['审核中', '已通过', '已驳回', '已终止'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAntProcess(options.process_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getAntProcess(processId) {
    wx.cloud.callFunction({
      name: 'getAntProcess',
      data: {
        operator: getApp().globalData.username,
        processID: processId,
      },
      success: (res) => {
        if (res.result.code !== 0) {
          console.error(res.result.msg);
          wx.redirectTo({
            url: `../404/404?process_id=${processId}`,
          });
          return;
        }
        this.setData({
          process: res.result.data,
          ready: true,
        });
      },
      fail: (err) => {
        console.error(err);
        wx.redirectTo({
          url: `../404/404?process_id=${processId}`,
        });
      },
    });
  },

  passAntProcess(e) {
    const processId = e.target.id;
    wx.cloud.callFunction({
      name: 'passAntProcess',
      data: {
        operator: getApp().globalData.username,
        processID: processId,
        remark: '',
      },
      success: (res) => {
        if (res.result.code !== 0) {
          console.error(res.result.msg);
          return;
        }
        this.getAntProcess(processId);
        wx.navigateTo({
          url: `./feedback?process_id=${processId}`,
        });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  },

  rejectAntProcess(e) {
    const processId = e.target.id;
    wx.cloud.callFunction({
      name: 'rejectAntProcess',
      data: {
        operator: getApp().globalData.username,
        processID: processId,
        remark: '',
      },
      success: (res) => {
        if (res.result.code !== 0) {
          console.error(res.result.msg);
          return;
        }
        this.getAntProcess(processId);
        wx.navigateTo({
          url: `./feedback?process_id=${processId}`,
        });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  },
});
