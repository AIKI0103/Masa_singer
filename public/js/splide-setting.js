document.addEventListener('DOMContentLoaded', function () {
    new Splide('#youtube-splide', {
      type: 'loop',
      perPage: 3,         // ★1画面に3枚表示！
      perMove: 1,         // スライド時に何枚動くか（1枚ずつにする）
      gap: '0.5rem',        // スライドの間に少し余白
      autoplay: true,
      interval: 5000,
      speed: 1000,
      pauseOnHover: true,
      arrows: true,
      pagination: false,
  
      breakpoints: {
        768: {
          perPage: 1,      // ★スマホなら1枚表示に切り替え
          height: 400
        },
        1024: {
          perPage: 2       // ★タブレットは2枚表示
        }
      }
    }).mount();
  });
