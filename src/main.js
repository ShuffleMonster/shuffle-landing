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

function formatAmount(amount, maxDigits = 6)  {
  if (amount.toString().length <= maxDigits) {
      return amount.toString();
  }
  var intDigits = amount.toFixed(0).toString().length;
  var decDigits = maxDigits - intDigits;
  var decimals = (decDigits > 0) ? decDigits : 0;
  return Number(amount.toFixed(decimals)).toString();
}

$(document).ready(function () {
  // ANIMATED LOGO
  $(function () {
    $('#logo').hover(
      function () {
        Array.from(
          document.querySelector("#hat-obj").contentDocument.querySelectorAll('animate,animateTransform')
        ).forEach((a) => a.beginElement())
      },
      function () {}
    )
  })
  // 2% ANIMATED
  var percentLocation = $("#percent-obj")[0].getBoundingClientRect();
  var percentAnimated = false;
  document.addEventListener("scroll", () => {
    if (percentAnimated) return;

    let viewBottom = window.scrollY + window.innerHeight;
    if (viewBottom > percentLocation.y) {
      percentAnimated = true;
      Array.from(
        document.querySelector("#percent-obj").contentDocument.querySelectorAll('animate,animateTransform')
      ).forEach((a) => a.beginElement())
    }
  });
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
        .replace('{{amount}}', formatAmount(reward.amount / 10 ** 18))
        .replace('#template-reward', '')

      $('#template-container-l').append(child)
    });
    second.forEach((reward) => {
      var child = TEMPLATE_WINNER
        .replace('{{link}}', `https://etherscan.io/tx/${reward.tx}`)
        .replace('{{address}}', `0x${reward.winner.slice(0, 3)}...${reward.winner.slice(-5)}`)
        .replace('{{amount}}', formatAmount(reward.amount / 10 ** 18))
        .replace('#template-reward', '')

      $('#template-container-r').append(child)
    });
  });
});
