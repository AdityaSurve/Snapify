import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
const ParticlesComponent = () => {
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(tsParticles);
  };
  const particlesLoaded = (container) => {};
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          zIndex: 0,
        },
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#0492c2",
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 5,
              opacity_min: 0,
              sync: false,
            },
          },
          size: {
            value: 5.5,
            random: true,
            anim: {
              enable: false,
              speed: 4,
              size_min: 0.3,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 100,
            color: "#fff",
            opacity: 0.1,
            width: 0.4,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: true,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },

        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};
export default ParticlesComponent;
