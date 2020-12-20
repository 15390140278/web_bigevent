$(function () {
  getUserInfo()
  var layer = layui.layer
  $('#btnLogout').on('click',function () {
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      // 清空本地存储中的token
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = 'login.html'
      //关闭confirm询问框
      layer.close(index)
    })
  })
})

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if(res.status !== 0) {
        return layui.layer.msg('获取用户失败')
      }
      // 渲染用户头像
      renderAvatar(res.data)
    }
  })
}

function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if(user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  }else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}