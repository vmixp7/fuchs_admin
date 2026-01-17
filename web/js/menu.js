// header
// $(window).scroll(function () {
//   if ($(this).scrollTop() > 100) {
//     $('.formosalube-header').addClass('s-height');
//     $('#sub-menu1').css({"top":"57px"});
//     $('#sub-menu2').css({"top":"57px"});
//   } else {
//     $('.formosalube-header').removeClass('s-height');
//     $('#sub-menu1').css({"top":"95px"});
//     $('#sub-menu2').css({"top":"95px"});
//   }
// });

// $(function () {
//   $(".dropdown").hover(function(){
//       $(this).find(".megamenu").show();
//   },function(){
//       $(this).find(".megamenu").hide();
//   });
// });

$(document).ready(function() {
  // 點擊 tab 按鈕切換 tab
  $('.tab-button').click(function() {
    var tabId = $(this).data('tab');
    
  // 移除所有 tab 按鈕的 active 樣式
  $('.tab-button').removeClass('active');
    
  // 添加當前點擊的 tab 按鈕 active 樣式
  $(this).addClass('active');
    
  // 隱藏所有 tab 內容
  $('.tab-content').removeClass('active');
  
  // 顯示點擊的 tab 內容
  $('#' + tabId).addClass('active');
  });
});
