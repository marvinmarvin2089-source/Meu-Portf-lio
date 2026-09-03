/* ========================================
   MARCUS.DEV — PORTFÓLIO 2026
======================================== */


/* ========================================
   01. ELEMENTOS GERAIS
======================================== */

const header = document.getElementById("header");
const topBtn = document.getElementById("topBtn");

const heroVisual = document.getElementById("heroVisual");
const photoStage = document.getElementById("photoStage");
const heroPhoto = document.querySelector(".hero-photo");

const virtualCursor = document.getElementById("virtualCursor");
const cursorClick = document.querySelector(".cursor-click");

const photoPulse = document.querySelector(".photo-pulse");

const techOrbit = document.getElementById("techOrbit");
const orbitLines = document.querySelectorAll(".orbit-line");
const orbitTechs = document.querySelectorAll(".orbit-tech");

const experienceCard = document.querySelector(".experience-card");


/* ========================================
   02. UTILITÁRIO DE TEMPO
======================================== */

function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}


/* ========================================
   03. HEADER AO ROLAR
======================================== */

function updateHeader() {
    if (!header) {
        return;
    }

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader, {
    passive: true,
});

updateHeader();


/* ========================================
   04. BOTÃO VOLTAR AO TOPO
======================================== */

function updateTopButton() {
    if (!topBtn) {
        return;
    }

    if (window.scrollY > 450) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }
}

window.addEventListener("scroll", updateTopButton, {
    passive: true,
});

updateTopButton();


if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}


/* ========================================
   05. CONTROLE DA ANIMAÇÃO DA HERO
======================================== */

let technologyAnimationRunning = false;


/* ========================================
   06. RESET DA HERO INTERATIVA
======================================== */

function resetTechnologyAnimation() {
    orbitLines.forEach((line) => {
        line.getAnimations().forEach((animation) => {
            animation.cancel();
        });

        line.style.opacity = "0";
    });


    orbitTechs.forEach((tech) => {
        tech.classList.remove("is-active");

        tech.getAnimations().forEach((animation) => {
            animation.cancel();
        });

        tech.style.opacity = "0";
        tech.style.visibility = "hidden";

        tech.style.transform =
            "scale(0.45) translateY(12px)";
    });


    if (photoPulse) {
        photoPulse
            .getAnimations()
            .forEach((animation) => {
                animation.cancel();
            });

        photoPulse.style.opacity = "0";

        photoPulse.style.transform =
            "translate(-50%, -50%) scale(0.2)";
    }


    if (virtualCursor) {
        virtualCursor
            .getAnimations()
            .forEach((animation) => {
                animation.cancel();
            });

        virtualCursor.style.opacity = "0";
        virtualCursor.style.visibility = "hidden";
    }


    if (cursorClick) {
        cursorClick
            .getAnimations()
            .forEach((animation) => {
                animation.cancel();
            });

        cursorClick.style.opacity = "0";
    }
}


/* ========================================
   07. CURSOR VIRTUAL ENTRANDO
======================================== */

async function moveVirtualCursorToPhoto() {
    if (
        !virtualCursor ||
        !photoStage ||
        !heroVisual
    ) {
        return;
    }


    virtualCursor
        .getAnimations()
        .forEach((animation) => {
            animation.cancel();
        });


    virtualCursor.style.visibility = "visible";
    virtualCursor.style.opacity = "1";


    const cursorRect =
        virtualCursor.getBoundingClientRect();

    const photoRect =
        photoStage.getBoundingClientRect();


    /*
       Ponto em que o cursor virtual
       toca a fotografia.
    */

    const targetX =
        photoRect.left +
        photoRect.width * 0.67;

    const targetY =
        photoRect.top +
        photoRect.height * 0.58;


    const cursorCenterX =
        cursorRect.left +
        cursorRect.width / 2;

    const cursorCenterY =
        cursorRect.top +
        cursorRect.height / 2;


    const x =
        targetX - cursorCenterX;

    const y =
        targetY - cursorCenterY;


    /*
       O cursor não vem em linha reta.
       Ele faz uma pequena trajetória.
    */

    const movement =
        virtualCursor.animate(
            [
                {
                    opacity: 0,

                    transform:
                        "translate3d(160px, -100px, 0) scale(0.65)",
                },

                {
                    opacity: 1,

                    transform:
                        "translate3d(80px, 40px, 0) scale(0.85)",

                    offset: 0.16,
                },

                {
                    transform:
                        `translate3d(${x - 140}px, ${y - 100}px, 0) scale(1)`,

                    offset: 0.43,
                },

                {
                    transform:
                        `translate3d(${x + 45}px, ${y - 35}px, 0) scale(1.08)`,

                    offset: 0.66,
                },

                {
                    transform:
                        `translate3d(${x - 20}px, ${y + 15}px, 0) scale(0.98)`,

                    offset: 0.82,
                },

                {
                    opacity: 1,

                    transform:
                        `translate3d(${x}px, ${y}px, 0) scale(1)`,
                },
            ],
            {
                duration: 820,

                easing:
                    "cubic-bezier(0.22, 1, 0.36, 1)",

                fill: "forwards",
            }
        );


    try {
        await movement.finished;
    } catch {
        // A animação pode ser cancelada pelo reset.
    }
}


/* ========================================
   08. CLIQUE DO CURSOR VIRTUAL
======================================== */

async function virtualClick() {
    if (!virtualCursor) {
        return;
    }


    /*
       Fazemos o clique usando a propriedade
       scale para não destruir a posição
       calculada anteriormente pelo transform.
    */

    const cursorAnimation =
        virtualCursor.animate(
            [
                {
                    scale: "1",
                },

                {
                    scale: "0.78",
                    offset: 0.45,
                },

                {
                    scale: "1",
                },
            ],
            {
                duration: 260,
                easing: "ease-out",
            }
        );


    if (cursorClick) {
        cursorClick.animate(
            [
                {
                    opacity: 0.9,
                    transform: "scale(0.4)",
                },

                {
                    opacity: 0,
                    transform: "scale(2.8)",
                },
            ],
            {
                duration: 480,
                easing: "ease-out",
            }
        );
    }


    if (heroPhoto) {
        heroPhoto.animate(
            [
                {
                    transform: "scale(1)",
                },

                {
                    transform: "scale(0.985)",
                },

                {
                    transform: "scale(1.015)",
                },

                {
                    transform: "scale(1)",
                },
            ],
            {
                duration: 450,
                easing: "ease-out",
            }
        );
    }


    try {
        await cursorAnimation.finished;
    } catch {
        // Evita erro caso a animação seja cancelada.
    }
}


/* ========================================
   09. PULSO DE ENERGIA
======================================== */

async function createPhotoPulse() {
    if (!photoPulse) {
        return;
    }


    const pulseAnimation =
        photoPulse.animate(
            [
                {
                    opacity: 0,

                    transform:
                        "translate(-50%, -50%) scale(0.15)",
                },

                {
                    opacity: 0.95,
                    offset: 0.16,
                },

                {
                    opacity: 0.5,
                    offset: 0.45,
                },

                {
                    opacity: 0,

                    transform:
                        "translate(-50%, -50%) scale(6)",
                },
            ],
            {
                duration: 1100,

                easing:
                    "cubic-bezier(0.16, 1, 0.3, 1)",
            }
        );


    if (heroVisual) {
        heroVisual.animate(
            [
                {
                    filter: "brightness(1)",
                },

                {
                    filter: "brightness(1.2)",
                    offset: 0.18,
                },

                {
                    filter: "brightness(1)",
                },
            ],
            {
                duration: 800,
                easing: "ease-out",
            }
        );
    }


    await wait(250);

    return pulseAnimation;
}


/* ========================================
   10. MOSTRAR ÓRBITAS
======================================== */

function showOrbitLines() {
    orbitLines.forEach((line, index) => {
        line.animate(
            [
                {
                    opacity: 0,

                    transform:
                        index === 0
                            ? "translate(-50%, -50%) rotate(-22deg) scale(0.7)"
                            : "translate(-50%, -50%) rotate(32deg) scale(0.7)",
                },

                {
                    opacity: 0.32,

                    transform:
                        index === 0
                            ? "translate(-50%, -50%) rotate(-12deg) scale(1)"
                            : "translate(-50%, -50%) rotate(22deg) scale(1)",
                },
            ],
            {
                duration: 800,

                easing:
                    "cubic-bezier(0.22, 1, 0.36, 1)",

                fill: "forwards",
            }
        );
    });
}


/* ========================================
   11. TECNOLOGIA APARECENDO
======================================== */

async function showTechnology(
    technology,
    index
) {
    if (!technology) {
        return;
    }


    technology.style.visibility = "visible";

    technology.classList.add("is-active");


    const entrance =
        technology.animate(
            [
                {
                    opacity: 0,

                    transform:
                        "scale(0.35) translateY(18px)",

                    filter:
                        "blur(8px)",
                },

                {
                    opacity: 1,
                    offset: 0.68,

                    transform:
                        "scale(1.08) translateY(-3px)",

                    filter:
                        "blur(0)",
                },

                {
                    opacity: 1,

                    transform:
                        "scale(1) translateY(0)",

                    filter:
                        "blur(0)",
                },
            ],
            {
                duration: 520,

                easing:
                    "cubic-bezier(0.16, 1, 0.3, 1)",

                fill: "forwards",
            }
        );


    try {
        await entrance.finished;
    } catch {
        return;
    }


    /*
       Depois de aparecer,
       cada tecnologia flutua suavemente.
    */

    const direction =
        index % 2 === 0
            ? 1
            : -1;


    technology.animate(
        [
            {
                transform:
                    "translate3d(0, 0, 0) rotate(0deg)",
            },

            {
                transform:
                    `translate3d(${5 * direction}px, -7px, 0) rotate(${1.5 * direction}deg)`,
            },

            {
                transform:
                    `translate3d(${-4 * direction}px, 4px, 0) rotate(${-1 * direction}deg)`,
            },

            {
                transform:
                    "translate3d(0, 0, 0) rotate(0deg)",
            },
        ],
        {
            duration:
                2800 + index * 170,

            iterations: Infinity,

            easing: "ease-in-out",
        }
    );
}


/* ========================================
   12. MOSTRAR TODAS AS TECNOLOGIAS
======================================== */

async function revealTechnologies() {
    showOrbitLines();


    for (
        let index = 0;
        index < orbitTechs.length;
        index++
    ) {
        await showTechnology(
            orbitTechs[index],
            index
        );

        await wait(115);
    }
}


/* ========================================
   13. ESCONDER TECNOLOGIAS
======================================== */

async function hideTechnologies() {
    const technologies =
        Array
            .from(orbitTechs)
            .reverse();


    for (const technology of technologies) {
        technology
            .getAnimations()
            .forEach((animation) => {
                animation.cancel();
            });


        const exit =
            technology.animate(
                [
                    {
                        opacity: 1,

                        transform:
                            "scale(1) translateY(0)",

                        filter:
                            "blur(0)",
                    },

                    {
                        opacity: 0,

                        transform:
                            "scale(0.55) translateY(-12px)",

                        filter:
                            "blur(7px)",
                    },
                ],
                {
                    duration: 340,
                    easing: "ease-in",
                    fill: "forwards",
                }
            );


        try {
            await exit.finished;
        } catch {
            // Continua mesmo se cancelada.
        }


        technology.classList.remove(
            "is-active"
        );

        technology.style.visibility =
            "hidden";


        await wait(80);
    }


    orbitLines.forEach((line) => {
        line.animate(
            [
                {
                    opacity: 0.32,
                },

                {
                    opacity: 0,
                },
            ],
            {
                duration: 600,
                easing: "ease-out",
                fill: "forwards",
            }
        );
    });
}


/* ========================================
   14. CURSOR SAINDO
======================================== */

async function removeVirtualCursor() {
    if (!virtualCursor) {
        return;
    }


    const exit =
        virtualCursor.animate(
            [
                {
                    opacity: 1,
                    translate: "0 0",
                    rotate: "0deg",
                },

                {
                    opacity: 1,

                    translate:
                        "-70px 35px",

                    rotate:
                        "-12deg",

                    offset: 0.3,
                },

                {
                    opacity: 1,

                    translate:
                        "-180px -25px",

                    rotate:
                        "-22deg",

                    offset: 0.65,
                },

                {
                    opacity: 0,

                    translate:
                        "-520px 90px",

                    rotate:
                        "-35deg",

                    scale:
                        "0.7",
                },
            ],
            {
                duration: 720,

                easing:
                    "cubic-bezier(0.4, 0, 0.2, 1)",

                fill: "forwards",
            }
        );


    try {
        await exit.finished;
    } catch {
        // Evita erro se cancelada.
    }


    virtualCursor.style.visibility =
        "hidden";
}


/* ========================================
   14.1 SEGUNDA PASSAGEM DO CURSOR
======================================== */

async function cursorSecondPass() {
    if (
        !virtualCursor ||
        !photoStage
    ) {
        return;
    }


    virtualCursor
        .getAnimations()
        .forEach((animation) => {
            animation.cancel();
        });


    virtualCursor.style.visibility =
        "visible";

    virtualCursor.style.opacity =
        "1";


    const photoRect =
        photoStage.getBoundingClientRect();

    const cursorRect =
        virtualCursor.getBoundingClientRect();


    const targetX =
        photoRect.left +
        photoRect.width * 0.35;

    const targetY =
        photoRect.top +
        photoRect.height * 0.35;


    const cursorX =
        cursorRect.left +
        cursorRect.width / 2;

    const cursorY =
        cursorRect.top +
        cursorRect.height / 2;


    const x =
        targetX - cursorX;

    const y =
        targetY - cursorY;


    /*
       Segunda passagem:
       ele aparece da esquerda,
       atravessa a cena
       e desaparece pela direita.
    */

    const fly =
        virtualCursor.animate(
            [
                {
                    opacity: 0,

                    transform:
                        "translate3d(-620px, 120px, 0) scale(0.65)",
                },

                {
                    opacity: 1,

                    transform:
                        "translate3d(-420px, 30px, 0) scale(0.85)",

                    offset: 0.18,
                },

                {
                    transform:
                        `translate3d(${x - 100}px, ${y + 60}px, 0) scale(1)`,

                    offset: 0.48,
                },

                {
                    transform:
                        `translate3d(${x}px, ${y}px, 0) scale(1.08)`,

                    offset: 0.63,
                },

                {
                    transform:
                        `translate3d(${x + 160}px, ${y - 70}px, 0) scale(0.95)`,

                    offset: 0.78,
                },

                {
                    opacity: 0,

                    transform:
                        `translate3d(${x + 650}px, ${y + 40}px, 0) scale(0.65)`,
                },
            ],
            {
                duration: 1050,

                easing:
                    "cubic-bezier(0.22, 1, 0.36, 1)",

                fill: "forwards",
            }
        );


    try {
        await fly.finished;
    } catch {
        // Evita erro caso a animação seja cancelada.
    }


    virtualCursor.style.visibility =
        "hidden";
}


/* ========================================
   15. SEQUÊNCIA COMPLETA DA HERO
======================================== */

async function playTechnologyAnimation(
    showVirtualCursor = true
) {
    if (technologyAnimationRunning) {
        return;
    }


    technologyAnimationRunning = true;


    resetTechnologyAnimation();


    try {
        /*
           Quando ativada automaticamente,
           mostramos o cursor virtual.
        */

        if (showVirtualCursor) {
            await moveVirtualCursorToPhoto();

            await wait(250);

            await virtualClick();
        } else if (heroPhoto) {
            /*
               Clique real do visitante.
            */

            heroPhoto.animate(
                [
                    {
                        transform: "scale(1)",
                    },

                    {
                        transform: "scale(0.98)",
                    },

                    {
                        transform: "scale(1.015)",
                    },

                    {
                        transform: "scale(1)",
                    },
                ],
                {
                    duration: 430,
                    easing: "ease-out",
                }
            );
        }


        await createPhotoPulse();


        /*
           Agora aguardamos realmente
           todas as tecnologias aparecerem.
        */

        await revealTechnologies();


        /*
           Tempo em que ficam visíveis
           depois que todas apareceram.
        */

        await wait(1700);


        await hideTechnologies();


        await wait(300);


        if (showVirtualCursor) {
            await removeVirtualCursor();

            await wait(900);

            await cursorSecondPass();
        }
    } finally {
        /*
           Mesmo que alguma animação seja
           interrompida, liberamos o controle.
        */

        resetTechnologyAnimation();

        technologyAnimationRunning = false;
    }
}


/* ========================================
   16. ANIMAÇÃO AUTOMÁTICA
======================================== */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

const projectRevealCards = document.querySelectorAll(
    ".projects-section .featured-project, .projects-section .card"
);

if (projectRevealCards.length) {
    document.body.classList.add("js-project-reveal");

    projectRevealCards.forEach((card, index) => {
        card.style.setProperty("--project-delay", `${Math.min(index, 5) * 75}ms`);
    });

    if (reducedMotion) {
        projectRevealCards.forEach((card) => {
            card.classList.add("is-project-visible");
        });
    } else {
        const projectRevealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-project-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -6%" }
        );

        projectRevealCards.forEach((card) => {
            projectRevealObserver.observe(card);
        });
    }
}


/*
   A animação automática acontece
   apenas quando o usuário não solicitou
   redução de movimento.
*/

if (!reducedMotion) {
    window.addEventListener(
        "load",
        async () => {
            await wait(1800);

            playTechnologyAnimation(true);
        },
        {
            once: true,
        }
    );
}


/* ========================================
   17. CLIQUE REAL NA FOTO
======================================== */

if (photoStage) {
    photoStage.addEventListener(
        "click",
        () => {
            playTechnologyAnimation(false);
        }
    );
}


/* ========================================
   18. TECLADO / ACESSIBILIDADE
======================================== */

if (photoStage) {
    photoStage.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();

                playTechnologyAnimation(false);
            }
        }
    );
}


/* ========================================
   19. PARALLAX DAS PELÍCULAS
======================================== */

const filmStage =
    document.getElementById("filmStage");

const filmOne =
    document.querySelector(".film-one");

const filmTwo =
    document.querySelector(".film-two");

const filmThree =
    document.querySelector(".film-three");


if (
    filmStage &&
    filmOne &&
    filmTwo &&
    filmThree
) {
    filmStage.addEventListener(
        "mousemove",
        (event) => {
            const rect =
                filmStage.getBoundingClientRect();


            const mouseX =
                (event.clientX - rect.left) /
                    rect.width -
                0.5;

            const mouseY =
                (event.clientY - rect.top) /
                    rect.height -
                0.5;


            filmOne.style.setProperty(
                "--parallax-x",
                `${mouseX * 20}px`
            );

            filmOne.style.setProperty(
                "--parallax-y",
                `${mouseY * 14}px`
            );


            filmTwo.style.setProperty(
                "--parallax-x",
                `${mouseX * -28}px`
            );

            filmTwo.style.setProperty(
                "--parallax-y",
                `${mouseY * -18}px`
            );


            filmThree.style.setProperty(
                "--parallax-x",
                `${mouseX * 24}px`
            );

            filmThree.style.setProperty(
                "--parallax-y",
                `${mouseY * -15}px`
            );
        }
    );


    filmStage.addEventListener(
        "mouseleave",
        () => {
            const films = [
                filmOne,
                filmTwo,
                filmThree,
            ];


            films.forEach((film) => {
                film.style.setProperty(
                    "--parallax-x",
                    "0px"
                );

                film.style.setProperty(
                    "--parallax-y",
                    "0px"
                );
            });
        }
    );
}


/* ========================================
   20. HISTÓRIA DAS PELÍCULAS PELO SCROLL
======================================== */

const aboutScroll =
    document.querySelector(".about-scroll");

const filmStageScroll =
    document.getElementById("filmStage");

const scrollFilms =
    document.querySelectorAll(".film-card");


if (
    aboutScroll &&
    filmStageScroll &&
    scrollFilms.length === 3
) {
    filmStageScroll.classList.add(
        "is-scroll-controlled"
    );


    function clearActiveFilm() {
        scrollFilms.forEach((film) => {
            film.classList.remove(
                "is-scroll-active"
            );
        });


        filmStageScroll.classList.remove(
            "has-scroll-active"
        );
    }


    function activateFilm(index) {
        clearActiveFilm();


        const film =
            scrollFilms[index];


        if (!film) {
            return;
        }


        film.classList.add(
            "is-scroll-active"
        );


        filmStageScroll.classList.add(
            "has-scroll-active"
        );
    }


    function updateFilmScroll() {
        const rect =
            aboutScroll.getBoundingClientRect();


        const viewportHeight =
            window.innerHeight;


        const scrollableDistance =
            aboutScroll.offsetHeight -
            viewportHeight;


        if (scrollableDistance <= 0) {
            return;
        }


        const travelled =
            Math.min(
                Math.max(
                    -rect.top,
                    0
                ),
                scrollableDistance
            );


        const progress =
            travelled /
            scrollableDistance;


        /*
           --------------------------------
           LINHA DO TEMPO DAS PELÍCULAS
           --------------------------------

           0.00 → 0.12 = normal

           0.12 → 0.34 = película 01

           0.34 → 0.42 = transição

           0.42 → 0.64 = película 02

           0.64 → 0.72 = transição

           0.72 → 0.92 = película 03

           0.92 → 1.00 = normal
        */

        if (
            progress >= 0.12 &&
            progress < 0.34
        ) {
            activateFilm(0);
        } else if (
            progress >= 0.42 &&
            progress < 0.64
        ) {
            activateFilm(1);
        } else if (
            progress >= 0.72 &&
            progress < 0.92
        ) {
            activateFilm(2);
        } else {
            clearActiveFilm();
        }
    }


    window.addEventListener(
        "scroll",
        updateFilmScroll,
        {
            passive: true,
        }
    );


    window.addEventListener(
        "resize",
        updateFilmScroll
    );


    updateFilmScroll();
}


/* ========================================
   21. CAMINHO DE APRENDIZADO PELO SCROLL
======================================== */

const skillsSection =
    document.querySelector(".skills-section");

const learningProgress =
    document.querySelector(
        ".learning-path-progress"
    );

const learningPoints =
    document.querySelectorAll(
        ".learning-point"
    );

const skillCards =
    document.querySelectorAll(".skill");


/* ========================================
   21.1 ORDEM REAL DA JORNADA
======================================== */

/*
   IMPORTANTE:

   No HTML os cards estão nesta ordem:

   0  HTML
   1  CSS
   2  JavaScript
   3  React
   4  Node
   5  Express

   6  PostgreSQL
   7  MongoDB
   8  Git
   9  GitHub
   10 Docker
   11 REST APIs


   Porém o CAMINHO desenhado percorre:

   HTML
   ↓
   CSS
   ↓
   JavaScript
   ↓
   React
   ↓
   Node
   ↓
   Express

   depois desce pela direita:

   REST APIs
   ↓
   Docker
   ↓
   GitHub
   ↓
   Git
   ↓
   MongoDB
   ↓
   PostgreSQL


   Por isso a segunda linha precisa ser
   percorrida na ordem inversa.
*/

const learningSkillOrder = [
    0,  // HTML
    1,  // CSS
    2,  // JavaScript
    3,  // React
    4,  // Node.js
    5,  // Express

    11, // REST APIs
    10, // Docker
    9,  // GitHub
    8,  // Git
    7,  // MongoDB
    6,  // PostgreSQL
];


/* ========================================
   21.2 CONTROLE DO CAMINHO
======================================== */

if (
    skillsSection &&
    learningProgress &&
    learningPoints.length &&
    skillCards.length
) {
    const pathLength =
        learningProgress.getTotalLength();


    learningProgress.style.strokeDasharray =
        `${pathLength}`;

    learningProgress.style.strokeDashoffset =
        `${pathLength}`;


    function clearLearningStates() {
        learningPoints.forEach((point) => {
            point.classList.remove(
                "is-active",
                "is-passed",
                "is-current"
            );
        });


        skillCards.forEach((skill) => {
            skill.classList.remove(
                "is-learning-active",
                "is-learning-past",
                "is-learning-current"
            );
        });
    }


    function updateLearningPath() {
        const rect =
            skillsSection.getBoundingClientRect();


        const viewportHeight =
            window.innerHeight;


        /*
           Início da animação:
           quando a seção começa a aparecer.

           Final:
           somente depois que uma boa parte
           da seção já atravessou a tela.

           Isso mantém a trilha mais lenta
           e cinematográfica.
        */

        const start =
            viewportHeight * 0.92;

        const end =
            -viewportHeight * 0.55;


        const rawProgress =
            (start - rect.top) /
            (start - end);


        const progress =
            Math.min(
                Math.max(
                    rawProgress,
                    0
                ),
                1
            );


        /* ========================================
           21.3 REVELAÇÃO DA LINHA
        ======================================== */

        const offset =
            pathLength *
            (1 - progress);


        learningProgress.style.strokeDashoffset =
            `${offset}`;


        /* ========================================
           21.4 DESCOBRIR TECNOLOGIA ATUAL
        ======================================== */

        const totalSteps =
            Math.min(
                learningPoints.length,
                learningSkillOrder.length
            );


        /*
           Quantidade de etapas totalmente
           ultrapassadas pelo progresso.
        */

        const reachedSteps =
            Math.floor(
                progress *
                totalSteps
            );


        /*
           Em progress === 1,
           todas já foram concluídas e
           nenhuma precisa ficar como "atual".
        */

        const currentStep =
            progress > 0 &&
            progress < 1
                ? Math.min(
                    reachedSteps,
                    totalSteps - 1
                )
                : -1;


        clearLearningStates();


        /* ========================================
           21.5 ESTADOS DOS PONTOS E CARDS
        ======================================== */

        for (
            let index = 0;
            index < totalSteps;
            index++
        ) {
            const point =
                learningPoints[index];


            const skillIndex =
                learningSkillOrder[index];


            const skill =
                skillCards[skillIndex];


            /*
               Tecnologia já percorrida.

               Mantemos também as classes
               antigas por compatibilidade
               até atualizarmos o styles.css.
            */

            if (
                index < reachedSteps ||
                progress === 1
            ) {
                point.classList.add(
                    "is-active",
                    "is-passed"
                );


                if (skill) {
                    skill.classList.add(
                        "is-learning-active",
                        "is-learning-past"
                    );
                }
            }


            /*
               Tecnologia que a energia está
               tocando NESTE momento.
            */

            if (
                index === currentStep
            ) {
                point.classList.remove(
                    "is-passed"
                );

                point.classList.add(
                    "is-active",
                    "is-current"
                );


                if (skill) {
                    skill.classList.remove(
                        "is-learning-past"
                    );

                    skill.classList.add(
                        "is-learning-active",
                        "is-learning-current"
                    );
                }
            }
        }
    }


    window.addEventListener(
        "scroll",
        updateLearningPath,
        {
            passive: true,
        }
    );


    window.addEventListener(
        "resize",
        updateLearningPath
    );


    updateLearningPath();
}


/* ========================================
   24. SHOWREEL CONTROLADO PELO SCROLL
======================================== */

const showreelSection = document.querySelector(".showreel-section");
const showreelVideo = document.querySelector(".showreel-video");
const showreelProgress = document.querySelector(".showreel-progress");
const showreelReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;
const showreelCompact = window.matchMedia("(max-width: 900px)").matches;
const showreelNarrow = window.matchMedia("(max-width: 600px)").matches;

if (showreelSection && showreelVideo) {
    let showreelTicking = false;

    function updateShowreel() {
        showreelTicking = false;

        const rect = showreelSection.getBoundingClientRect();
        const scrollableDistance = Math.max(
            1,
            showreelSection.offsetHeight - window.innerHeight
        );
        const travelled = Math.min(
            Math.max(-rect.top, 0),
            scrollableDistance
        );
        const progress = travelled / scrollableDistance;

        if (showreelReducedMotion) {
            showreelSection.style.setProperty("--showreel-progress", "1");
            showreelSection.style.setProperty("--showreel-scale", "1");
            if (showreelProgress) showreelProgress.textContent = "100%";
            return;
        }

        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const scaleStart = showreelNarrow ? 0.88 : showreelCompact ? 0.82 : 0.48;
        const scale = scaleStart + easedProgress * (1 - scaleStart);

        showreelSection.style.setProperty(
            "--showreel-progress",
            progress.toFixed(3)
        );
        showreelSection.style.setProperty(
            "--showreel-scale",
            scale.toFixed(3)
        );

        if (showreelProgress) {
            showreelProgress.textContent = `${String(
                Math.round(progress * 100)
            ).padStart(2, "0")}%`;
        }

    }

    function requestShowreelUpdate() {
        if (!showreelTicking) {
            showreelTicking = true;
            window.requestAnimationFrame(updateShowreel);
        }
    }

    window.addEventListener("scroll", requestShowreelUpdate, {
        passive: true,
    });
    window.addEventListener("resize", requestShowreelUpdate);
    showreelVideo.addEventListener("loadedmetadata", requestShowreelUpdate);

    if (!showreelReducedMotion) {
        const showreelObserver = new IntersectionObserver(
            (entries) => {
                const isVisible = entries[0].isIntersecting;

                if (isVisible) {
                    showreelVideo.play().catch(() => {});
                } else {
                    showreelVideo.pause();
                }
            },
            { threshold: 0.2 }
        );
        showreelObserver.observe(showreelSection);
    }

    if (showreelReducedMotion) {
        const showreelObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    showreelVideo.play().catch(() => {});
                    showreelObserver.disconnect();
                }
            },
            { threshold: 0.35 }
        );
        showreelObserver.observe(showreelSection);
    }

    updateShowreel();
}

const contactSection = document.querySelector(".contact-section");
const contactBackgroundVideo = document.querySelector(
    ".contact-background-video"
);

if (contactSection && contactBackgroundVideo) {
    if (reducedMotion) {
        contactSection.classList.add("is-video-visible");
        contactBackgroundVideo.pause();
        contactBackgroundVideo.currentTime = 0;
    } else {
        const contactVideoObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    contactSection.classList.add("is-video-visible");
                    contactBackgroundVideo.play().catch(() => {});
                } else {
                    contactSection.classList.remove("is-video-visible");
                    contactBackgroundVideo.pause();
                }
            },
            { threshold: 0.08 }
        );

        contactVideoObserver.observe(contactSection);
    }
}
