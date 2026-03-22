// gsap-animations.js
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {
  
  // 1. Initial Page Loader animation with Complex Scene
  if (document.querySelector(".loader-overlay")) {
      const tlLoader = gsap.timeline();
      
      const truckEl = document.querySelector("#scene-truck");
      const truckOffset = truckEl ? truckEl.offsetLeft : 0;
      
      gsap.set("#truck-flag", { transformOrigin: "right center" });

      // 1a. TIMELESS appears first
      tlLoader.to(".loader-text", {
          duration: 0.8,
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power4.out"
      })
      // Pause slightly for emphasis
      .to({}, { duration: 0.5 })
      
      // 1b. Scene Appears
      .to("#loader-scene", { opacity: 1, duration: 0.5 })

      // 1c. Labourer loads boxes
      // Labourer picks up box 1
      .to("#labourer", { x: -20, duration: 0.4, ease: "power1.inOut" })
      .to("#s-box2", { y: -20, x: 20, duration: 0.2 }) // labourer lifts box
      .to(["#labourer", "#s-box2"], { x: truckOffset - 50, duration: 0.6, ease: "power1.inOut" }) // walks to truck
      .to("#s-box2", { x: truckOffset + 20, y: -40, opacity: 0, duration: 0.4, ease: "bounce.out" }) // throws in truck
      
      // Labourer fetches box 2
      .to("#labourer", { x: -20, duration: 0.6, ease: "power1.inOut" })
      .to("#s-box1", { y: -20, x: 20, duration: 0.2 })
      .to(["#labourer", "#s-box1"], { x: truckOffset - 50, duration: 0.6, ease: "power1.inOut" })
      .to("#s-box1", { x: truckOffset + 40, y: -40, opacity: 0, duration: 0.4, ease: "bounce.out" })
      
      // Labourer steps back
      .to("#labourer", { x: truckOffset - 120, duration: 0.4 })

      // 1d. Truck Drives & Flag Flies
      tlLoader.addLabel("drive")
      .to("#truck-flag", { scaleX: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }, "drive")
      .to(".wheel", { rotation: 1080, duration: 3, ease: "power1.inOut" }, "drive")
      // House A and Labourer slide left (out of view) to simulate camera panning with truck
      .to(["#house-a", "#labourer"], { x: -500, opacity: 0, duration: 2, ease: "power1.in" }, "drive")
      // Road lines move
      .to(".road-lines", { x: -300, duration: 0.5, repeat: 5, ease: "none" }, "drive")
      // House B comes into view from right
      .to("#house-b", { x: 0, opacity: 1, duration: 2, ease: "power1.out" }, "drive+=1")

      // 1e. Unloading at House B
      // Stop flag
      .to("#truck-flag", { scaleX: 0, opacity: 0, duration: 0.3 }, "drive+=2.8")
      
      // Unload boxes to House B
      .to("#s-box1", { x: truckOffset + 350, y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" })
      .to("#s-box2", { x: truckOffset + 350, y: -30, opacity: 1, duration: 0.5, ease: "bounce.out" }, "-=0.2")

      // 1f. Finish loader array (Fade everything)
      tlLoader.to(".loader-text", {
                 duration: 0.6,
                 y: -50,
                 opacity: 0,
                 stagger: 0.1,
                 ease: "power4.in",
                 delay: 0.5
             })
       .to("#loader-scene", { opacity: 0, duration: 0.5 }, "-=0.5")
       .to(".loader-overlay", {
                 duration: 1,
                 height: 0,
                 ease: "expo.inOut"
             })
       .from(".hero-content > *", {
                 duration: 1,
                 y: 50,
                 opacity: 0,
                 stagger: 0.2,
                 ease: "power3.out"
             }, "-=0.5")
       .from(".header-nav", {
                 y: -100,
                 opacity: 0,
                 duration: 1,
                 ease: "power3.out"
             }, "-=1");
  } else {
      // Direct hero load for pages without loader
      gsap.timeline()
        .from(".hero-content > *", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out" })
        .from(".header-nav", { y: -100, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");
  }

  // 2. Parallax Hero Image mapping
  gsap.to(".parallax-img", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // 3. Horizontal Scroll Section for Services
  const horizontalSection = document.querySelector(".horizontal-scroll-container");
  if(horizontalSection) {
      let cards = gsap.utils.toArray(".service-card");
      
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-scroll-section",
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          // base vertical scrolling on how wide the container is so it feels more natural.
          end: () => "+=" + document.querySelector(".horizontal-scroll-container").offsetWidth
        }
      });
  }

  // 4. Stagger Texts Reveal (Why choose us/Stats)
  gsap.utils.toArray('.reveal-up').forEach(elem => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
  });

  // 5. Statistics Counter
  gsap.utils.toArray('.stat-counter').forEach(counter => {
      gsap.from(counter, {
          scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              once: true
          },
          textContent: 0,
          duration: 2,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          onUpdate: function() {
              counter.innerHTML = Math.ceil(counter.textContent) + (counter.dataset.suffix || "");
          }
      });
  });



});
