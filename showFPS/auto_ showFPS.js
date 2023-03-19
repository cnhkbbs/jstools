(function() {
  // 从CDN加载脚本
  function loadScriptFromCDN() {
    const cdns = [
      'https://cnhkbbs.github.io/staticcdn/showFPS/showFPS.js',
      'https://sboxmcdn.onrender.com/showFPS/showFPS.js',
      'https://cdn.jsdelivr.net/gh/cnhkbbs/staticcdn@main/showFPS/showFPS.js'
    ];
    const cookieName = 'fastestCDN'; // cookie名称
    const cookieMaxAge = 60 * 60 * 24 * 30; // 30天
    const cookiePath = '/'; // cookie路径
    const cookieDomain = 'example.com'; // cookie域名

    const fastestCDN = getFastestCDN(cdns); // 获取最快的CDN
    setCookie(cookieName, fastestCDN, cookieMaxAge, cookiePath, cookieDomain); // 设置cookie

    const script = document.createElement('script'); // 创建script标签
    script.src = `${fastestCDN}?t=${Date.now()}`; // 设置script标签的src属性，并在其后面加上时间戳参数
    document.head.appendChild(script); // 将script标签添加到head标签中
    console.log(`当前调用的CDN为：${fastestCDN}`); // 增加在控制台输出当前调用cdn信息的日志
  }

  // 获取最快的CDN
  function getFastestCDN(cdns) {
    let fastestCDN = cdns[0];
    let fastestTime = Infinity;

    cdns.forEach(cdn => {
      const xhr = new XMLHttpRequest(); // 创建XMLHttpRequest对象
      xhr.open('GET', cdn, false); // 发送GET请求
      xhr.onload = function() {
        if (xhr.status === 200) {
          try {
            const time = Date.now() - new Date(xhr.getResponseHeader('Date')).getTime(); // 获取响应时间
            if (time < fastestTime) {
              fastestTime = time;
              fastestCDN = cdn;
            }
          } catch (e) {
            console.error(e);
          }
        }
      };
      xhr.send(); // 发送请求
    });

    return fastestCDN;
  }

  // 设置cookie
  function setCookie(name, value, maxAge, path, domain) {
    const cookie = `${name}=${value}; max-age=${maxAge}; path=${path}; domain=${domain}`; // cookie字符串
    document.cookie = cookie; // 设置cookie
  }

  // 获取cookie
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  // 从cookie加载脚本
  function loadScriptFromCookie() {
    const cookieName = 'fastestCDN'; // cookie名称
    const fastestCDN = getCookie(cookieName); // 获取cookie中的CDN
    if (fastestCDN) {
      const script = document.createElement('script'); // 创建script标签
      script.src = `${fastestCDN}?t=${Date.now()}`; // 设置script标签的src属性，并在其后面加上时间戳参数
      document.head.appendChild(script); // 将script标签添加到head标签中
      console.log(`当前调用的CDN为：${fastestCDN}`); // 增加在控制台输出当前调用cdn信息的日志
    }
  }

  // 判断是否存在cookie
  if (getCookie('fastestCDN')) {
    loadScriptFromCookie(); // 从cookie加载脚本
  } else {
    loadScriptFromCDN(); // 从CDN加载脚本
  }
})();
