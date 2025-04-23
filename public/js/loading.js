// window.addEventListener("load", () => {
//   // 一旦 DOM の描画が終わってから実行する
//   setTimeout(() => {
//     const split = new SplitText(".loading-text", { type: "chars" });
//     const chars = split.chars;

//     const tl = gsap.timeline();

//     // 初期状態にしておく
//     gsap.set(chars, { opacity: 0, y: 20 });

//     // アニメーション
//     tl.to(chars, {
//       duration: 0.6,
//       opacity: 1,
//       y: 0,
//       ease: "power2.out",
//       stagger: 0.05,
//     })
//       .to(chars, {
//         duration: 0.6,
//         opacity: 0,
//         y: -20,
//         delay: 0.5,
//         ease: "power2.in",
//         stagger: 0.05,
//       })
//       .to("#loading", {
//         duration: 1,
//         y: "-100%",
//         ease: "power2.inOut",
//         onComplete: () => {
//           document.getElementById("loading").style.display = "none";
//         },
//       });
//   }, 100); // ほんのちょっと待ってからSplitText
// });
