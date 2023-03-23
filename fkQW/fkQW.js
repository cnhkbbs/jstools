(function() {
  const ua = navigator.userAgent.toLowerCase();
  const isWeChat = ua.indexOf('micromessenger') !== -1;
  const isQQ = ua.indexOf('qq') !== -1;

  if (isWeChat || isQQ) {
    const body = document.querySelector('body');
    if (body) {
      const overlay = document.createElement('QWdiv');
      overlay.style.position = 'absolute';
      overlay.style.top = '50%';
      overlay.style.left = '50%';
      overlay.style.transform = 'translate(-50%, -50%)';
      overlay.style.textAlign = 'center';
      overlay.style.backgroundColor = 'gold';
      overlay.style.width = '100%';
      overlay.style.height = '100%';

      const content = document.createElement('QWdiv');
      content.style.border = 'solid';
      content.style.margin = '12%';
      content.style.padding = '3%';
      content.style.textAlign = 'center';

      const message = document.createElement('QWp');
      message.style.color = 'black';
      message.style.fontSize = '65px';
      message.textContent = '由于我们没有对当前浏览器适配，请复制当前网址到其它浏览器打开';

      const button = document.createElement('QWdiv');
      button.style.width = '70%';
      button.style.height = '5%';
      button.style.backgroundColor = 'black';
      button.style.margin = '0 auto';
      button.onclick = copyToClipboard;

      const link = document.createElement('QWa');
      link.style.color = 'white';
      link.style.fontSize = '500%';
      link.textContent = '复制网址';

      body.appendChild(overlay);
      overlay.appendChild(content);
      content.appendChild(message);
      content.appendChild(button);
      button.appendChild(link);

      function copyToClipboard() {
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
