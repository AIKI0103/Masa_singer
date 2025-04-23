  Promise.all([
    fetch("header.html").then(res => res.text()),
    fetch("footer.html").then(res => res.text())
  ]).then(([headerData, footerData]) => {
    document.getElementById("header-placeholder").innerHTML = headerData;
    document.getElementById("footer-placeholder").innerHTML = footerData;

    // HTMLが挿入された後にJS発火！
    initAnimationsAndMenu();
  });

  function initAnimationsAndMenu() {
    // ✅ ここで実行してOK（もうDOMは読み込まれてる）

    // ハンバーガー
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
    }

    gsap.registerPlugin(SplitText, ScrollTrigger);

    // メインビジュアル画像
    if (document.querySelector(".mv img")) {
      gsap.from(".mv img", {
        opacity: 0,
        x: 100,
        scale: 1.1,
        duration: 2,
        ease: "power2.out"
      });
    }

    // NEWSセクションのタイトル
    if (document.querySelector(".news__title")) {
      gsap.from(".news__title", {
        scrollTrigger: {
          trigger: ".news__title",
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
      });
    }

    // NEWSの各アイテム
    if (document.querySelector(".news__item")) {
      gsap.from(".news__item", {
        scrollTrigger: {
          trigger: ".news__item",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // YouTubeセクション
    if (document.querySelector("#youtube-splide")) {
      gsap.from("#youtube-splide", {
        scrollTrigger: {
          trigger: "#youtube-splide",
          start: "top 70%",
        },
        opacity: 0,
        y: 100,
      });
    }

    // Aboutセクションタイトル
    if (document.querySelector(".about_content_title")) {
      gsap.from(".about_content_title", {
        scrollTrigger: {
          trigger: ".about_content_title",
          start: "top 70%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Latest Release セクション
    if (document.querySelector(".latest-release-wrapper")) {
      gsap.from(".latest-release", {
        scrollTrigger: {
          trigger: ".latest-release-wrapper",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.6
      });
    }

    // CONTACT セクション
    if (document.querySelector(".contact_wrapper")) {
      // 初期状態セット
      gsap.set(".contact_title h2", { opacity: 0, scale: 0.8 });
      gsap.set(".form_group", { opacity: 0, y: 30 });
      gsap.set(".form_buttons", { opacity: 0, y: 50 });

      // タイトル
      gsap.to(".contact_title h2", {
        scrollTrigger: {
          trigger: ".contact_wrapper",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // フォーム項目
      gsap.to(".form_group", {
        scrollTrigger: {
          trigger: ".contact_wrapper",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2,
      });

      // ボタン
      gsap.to(".form_buttons", {
        scrollTrigger: {
          trigger: ".contact_wrapper",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.2,
      });
    }
  }

