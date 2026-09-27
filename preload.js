window.addEventListener("DOMContentLoaded", () => {
  const preloader      = document.getElementById("preloader");
  const sceneKapkanov  = document.getElementById("scene-kapkanov");
  const sceneCode      = document.getElementById("scene-code");
  const sceneCon       = document.getElementById("scene-console");

  const kapkanovText   = document.getElementById("kapkanov-text");
  const codeEl         = document.getElementById("typed-code");
  const cursorEl       = document.getElementById("cursor");
  const consoleLine    = document.getElementById("console-line");
  const consoleCur     = document.getElementById("console-cursor");

  sceneKapkanov.style.display = "flex";
  sceneCode.style.display     = "none";
  sceneCon.style.display      = "none";

  kapkanovText.classList.add("show");

  setTimeout(() => {
    sceneKapkanov.classList.add("hide");
    setTimeout(() => {
      sceneKapkanov.style.display = "none";
      sceneCode.style.display     = "flex";
      startCodeTyping();
    }, 600);
  }, 2000);

  const codeTokens = [
    { t: "const", c: "kw" }, { t: " name", c: "obj" },
    { t: " = ", c: "punc" }, { t: "'Stanislav Kapkanov'", c: "str" },
    { t: ";\n\n", c: "punc" },

    { t: "function", c: "kw" }, { t: " bio", c: "fn" },
    { t: "() {\n", c: "punc" },

    { t: "    loadModules", c: "fn" }, { t: "([", c: "punc" },
    { t: "'Node.js'", c: "str" }, { t: ", ", c: "punc" },
    { t: "'Dart'", c: "str" }, { t: ", ", c: "punc" },
    { t: "'Go'", c: "str" }, { t: ", ", c: "punc" },
    { t: "'Python'", c: "str" }, { t: ", ", c: "punc" },
    { t: "'TypeScript'", c: "str" }, { t: "]);\n\n", c: "punc" },

    { t: "    kapkanov", c: "obj" }, { t: ".", c: "punc" },
    { t: "create", c: "fn" }, { t: "({ ", c: "punc" },
    { t: "name", c: "obj" }, { t: ", ", c: "punc" },
    { t: "role", c: "obj" }, { t: ": ", c: "punc" },
    { t: "'Fullstack'", c: "str" }, { t: " });\n\n", c: "punc" },

    { t: "    return", c: "kw" }, { t: " ", c: "" },
    { t: "'Hello World'", c: "str" }, { t: ";\n", c: "punc" },
    { t: "}\n\n", c: "punc" },

    { t: "console", c: "obj" }, { t: ".", c: "punc" },
    { t: "log", c: "fn" }, { t: "(", c: "punc" },
    { t: "bio", c: "fn" }, { t: "());", c: "punc" }
  ];

  function startCodeTyping() {
    let ti = 0;
    let ci = 0;

    function step() {
      if (ti >= codeTokens.length) {
        cursorEl.style.display = "none";
        setTimeout(() => {
          sceneCode.classList.add("hide");
          setTimeout(() => {
            sceneCode.style.display = "none";
            sceneCon.style.display  = "flex";
            startConsole();
          }, 600);
        }, 400);
        return;
      }

      const token = codeTokens[ti];
      const ch = token.t[ci];

      const span = document.createElement("span");
      if (token.c) span.className = token.c;
      span.textContent = ch;
      codeEl.appendChild(span);

      ci++;
      if (ci >= token.t.length) {
        ti++;
        ci = 0;
      }
      setTimeout(step, 22);
    }
    step();
  }

  function startConsole() {
    const cmd = "node main.js";
    let i = 0;
    const prompt = "user@kapkanov:~$ ";

    function typeCmd() {
      if (i < cmd.length) {
        consoleLine.textContent = prompt + cmd.slice(0, i + 1);
        i++;
        setTimeout(typeCmd, 90);
      } else {
        consoleCur.style.display = "none";
        setTimeout(() => {
          const ok = document.createElement("div");
          ok.className = "console-ok";
          ok.textContent = "Hello World";
          consoleLine.parentElement.appendChild(ok);
          setTimeout(finishPreloader, 900);
        }, 500);
      }
    }
    typeCmd();
  }

  function finishPreloader() {
    preloader.classList.add("fade-out");
    setTimeout(() => (preloader.style.display = "none"), 700);
  }
});