const mockDoneProcess =
{
  process_id: "202201040950207463",
  operator: "xiaoming",
  app: "app1",
  title: "能力上线 - 数据服务测试",
  steps: [
    {
      name: "接口人审核",
      handlers: "xiaoming;xiaohong",
      callback: ""
    }
  ],
  info: [
    {
      key: "标题",
      value: "能力上线"
    },
    {
      key: "功能名称",
      value: "数据服务测试"
    },
    {
      key: "版本",
      value: "v1.0.0"
    },
    {
      key: "描述",
      value: "数据服务测试"
    },
  ],
  callback: "",
  created_time: "2022-01-04 09:50:20",
  cur_step: -1,
  results: [
    {
      action: 1,
      remark: "",
      operator: "xiaoming",
      updated_time: "2022-01-04 09:50:30"
    },
  ],
  status: 1,
  creator: "xiaoming"
};

const mockToDoProcess = {
  process_id: "202201040950207464",
  operator: "xiaoming",
  app: "app1",
  title: "能力上线 - 明星识别",
  steps: [
    {
      name: "接口人审核",
      handlers: "xiaoming;xiaohong",
      callback: ""
    }
  ],
  info: [
    {
      key: "标题",
      value: "能力上线"
    },
    {
      key: "功能名称",
      value: "数据服务测试"
    },
    {
      key: "版本",
      value: "v1.0.0"
    },
    {
      key: "描述",
      value: "识别人物是否为明星"
    },
  ],
  callback: "",
  created_time: "2022-01-04 09:50:20",
  cur_step: 1,
  results: [],
  status: 0,
  creator: "xiaoming"
};

exports.main = async (event, context) => {
  if (event.processID === '202201040950207464') {
    return {
      code: 0,
      msg: '',
      data: mockToDoProcess,
    };
  }
  return {
    code: 0,
    msg: '',
    data: mockDoneProcess,
  }
};
