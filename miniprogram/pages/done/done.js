// miniprogram/pages/done/done.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doneProcesses: [],
    ready: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDoneProcesses();
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

  getDoneProcesses() {
    wx.cloud.callFunction({
      name: 'getAntProcesses',
      data: {
        operator: getApp().globalData.openId,
        rtx: getApp().globalData.openId,
        status: getApp().globalData.processTypeDone,
      },
      success: (res) => {
        if (res.result.code !== 0) {
          console.error(res.result.msg);
          return;
        }
        const showData = Array.from(res.result.data).slice(0, 50);
        this.setData({
          doneProcesses: showData,
          ready: true,
        });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  },
});
