var { getLastRewards } = require('./js/shuf.js')

var TEMPLATE_WINNER = `
<a href="{{link}}" class="box" id="template-reward" target="_blank">
<p>Address: <span class="eth-address">{{address}}</span></p>
<div class="round">
  <p>Wins</p>
  <span class="shuf-win">{{amount}}</span>
  <div class="b">SHUF</div>
</div>
</a>
`

$(document).ready(function () {
  // ANIMATED LOGO
  $(function () {
    $('#logo').hover(
      function () {
        $('.hat').attr('src', 'assets/img/giflogo.gif')
      },
      function () {
        $(this).attr('src', 'assets/img/hat.svg')
      }
    )
  })
  // MOUSE-FOLLOR MONSTER EYE
  $('body').mousemove(function (event) {
    var eye = $('.eye')
    var x = (eye.offset().left) + (eye.width() / 3)
    var y = (eye.offset().top) + (eye.height() / 3)
    var rad = Math.atan2(event.pageX - x, event.pageY - y)
    var rot = (rad * (180 / Math.PI) * -1) + 70
    eye.css({
      '-webkit-transform': 'rotate(' + rot + 'deg)',
      '-moz-transform': 'rotate(' + rot + 'deg)',
      '-ms-transform': 'rotate(' + rot + 'deg)',
      transform: 'rotate(' + rot + 'deg)'
    })
  })
  // ACCORDION
  $('.faq-btn').attr('aria-expanded', 'false')
  $('.faq-btn').on('click', function () {
    var $this = $(this)
    var $state = $this.attr('aria-expanded')
    $this.attr('aria-expanded', $state === 'true' ? 'false' : 'true')
  })
  // SMOOTH-SCROLL ON CLICK
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault()
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500)
  })
  // MEDIA QUERY
  if ($(window).width() < 580) {
    $('.faq h2').html('FAQ')
  }
  // LOAD LAST REWARDS
  getLastRewards((rewards) => {
    let half = Math.floor(rewards.length / 2)    
    let first = rewards.slice(0, half);
    let second = rewards.slice(half, rewards.length);
    first.forEach((reward) => {
      var child = TEMPLATE_WINNER
        .replace('{{link}}', `https://etherscan.io/tx/${reward.tx}`)
        .replace('{{address}}', `0x${reward.winner.slice(0, 3)}...${reward.winner.slice(-5)}`)
        .replace('{{amount}}', reward.amount / 10 ** 18)
        .replace('#template-reward', '')

      $('#template-container-l').append(child)
    });
    second.forEach((reward) => {
      var child = TEMPLATE_WINNER
        .replace('{{link}}', `https://etherscan.io/tx/${reward.tx}`)
        .replace('{{address}}', `0x${reward.winner.slice(0, 3)}...${reward.winner.slice(-5)}`)
        .replace('{{amount}}', reward.amount / 10 ** 18)
        .replace('#template-reward', '')

      $('#template-container-r').append(child)
    });
  });
});
