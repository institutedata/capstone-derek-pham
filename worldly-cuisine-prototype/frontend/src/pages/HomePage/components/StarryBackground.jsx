import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function StarryBackground() {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "#000000", // Dark sky background
                },
            },
            fullScreen: {
                enable: true,
                zIndex: -1 // Ensure stars are in the background
            },
            fpsLimit: 60,
            particles: {
                color: {
                    value: ["#ffffff", "#ffe9c4", "#d4fbff"], // Range of star colors
                },
                links: {
                    enable: false, // Disable particle linking
                },
                move: {
                    enable: true,
                    speed: 0.2, // Slow movement for the stars
                    direction: "none",
                    random: true,
                    straight: false,
                    outMode: "out",
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 100,
                },
                opacity: {
                    value: 0.8,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.3,
                        sync: false,
                    },
                },
                shape: {
                    type: "star",
                    options: {
                        sides: 4, // Default value for a star
                    },
                },
                size: {
                    value: { min: 1, max: 3 }, // Adjust size for visibility
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 0.5,
                        sync: false,
                    },
                },
                shadow: {
                    enable: true,
                    color: "#e8f4f8",
                    blur: 15, // Adjust for glow effect
                },
            },
            detectRetina: true,
        }),
        [],
    );





    if (init) {
        return <Particles id="tsparticles" className="starry-background" particlesLoaded={particlesLoaded} options={options} />;
    }

    return <></>;
}