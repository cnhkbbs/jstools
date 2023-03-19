(function () {
  let ua = navigator.userAgent.toLowerCase();
  if ((ua.match(/MicroMessenger/i) == 'micromessenger') || (ua.match(/QQ/i) == 'qq')) {
    const body = document.querySelector('body');
    if (body) {
      body.innerHTML = `
        <div
          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; background-color: gold; width: 100%; height: 100%;">
          <div style="border: solid;margin: 12%; padding: 3%;text-align: center;">
            <p style="color: black;font-size: 65px;">由于特殊原因，请复制当前网址到浏览器打开</p>
            <div onclick="copyToClipboard()" style="width: 70%;height: 5%; background-color: black; margin: 0 auto;">
              <a style="color: white;font-size: 500%;">复制网址</a>
            </div>
          </div>
        </div>
      `;
      function copyToClipboard(){
        const el = document.createElement('textarea');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('复制成功，请到浏览器地址栏粘贴打开');
      }
    } else {
      console.error('Cannot set properties of null (setting \'innerHTML\')');
    }
  }
})();
