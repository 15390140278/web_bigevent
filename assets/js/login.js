$(function () {
//  点击去注册账号
  $('#link_reg').on('click',function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去登录
  $('#link_login').on('click',function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
//  从layui中获取form对象
  var form = layui.form
  //获取layer对象
  var layer = layui.layer
//  通过 form.verify()自定义校验规则
  form.verify({
    // 自定义的密码校验规则
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      //value是确认密码输入框的值
      var pwd = $('.reg-box [name=password]').val()
      if(pwd !== value) {
        return '两次密码不一致'
      }
    }
  })
//  监听注册表单提交事件
  $('#form_reg').on('submit',function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser',data,function (res) {
      if(res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg('注册成功')
      $('#link_login').click()
    })
  })
//  监听登录事件
  $('#form_login').on('submit',function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      //快速获取表单数据
      data: $(this).serialize(),
      success: function (res) {
        if(res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        localStorage.setItem('token',res.token)
        location.href = 'index.html'
      }
    })
  })
})
