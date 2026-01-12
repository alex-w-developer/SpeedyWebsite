(() => {
    const STYLE_ID = "sm_style_v2";
    const UI_ID = "sm_ui_v2";
    const STATE_KEY = "sm_mode_v2";
    const SITE_KEY = STATE_KEY + ":" + location.hostname;
    const HOTKEY = {
        altKey: true,
        shiftKey: true,
        code: "KeyS"
    };
    const LISTENER_KEY = "__sm_hotkey_v2__";

    const existing = document.getElementById(STYLE_ID);
    const uiExisting = document.getElementById(UI_ID);
    const mode = localStorage.getItem(SITE_KEY) || localStorage.getItem(STATE_KEY) || "gentle";

    function removeHotkey() {
        const handler = window[LISTENER_KEY];
        if (!handler) return;
        window.removeEventListener("keydown", handler, true);
        delete window[LISTENER_KEY];
    }

    function removeAll() {
        document.getElementById(STYLE_ID)?.remove();
        document.getElementById(UI_ID)?.remove(); 
        removeHotkey();
    }

    function cssFor(m) {
        const gentle = `/* Smooth Mode v2 (Gentle) */
html{scroll-behavior:auto !important;}
/* Reduce heavy motion, but do not nuke all UI behavior */
@media (prefers-reduced-motion: no-preference){
	*{
		animation-duration:0.001ms !important;
		animation-iteration-count:1 !important;
		transition-duration:0.001ms !important;
		scroll-behavior:auto !important;
	}
}
/* Keep essential spinners and busy indicators more likely to still animate */
[aria-busy="true"], [role="progressbar"], .spinner, .loading, [class*="loading"], [class*="spinner"]{
	animation-duration:inherit !important;
	animation-iteration-count:inherit !important;
}
/* Reduce expensive visual effects that often cause jank */
*{
	text-rendering:optimizeLegibility;
}
img, video, canvas{
	image-rendering:auto;
}
*{
	backdrop-filter:none !important;
	filter:none !important;
}`;
		
        const aggressive = `/* Smooth Mode v2 (Aggressive) */
html{scroll-behavior:auto !important;}
*{animation:none !important;transition:none !important;scroll-behavior:auto !important;}
*{backdrop-filter:none !important;filter:none !important;}`;

		return m === "aggressive" ? aggressive : gentle;
	}

    function toggleMode() {
        const current = localStorage.getItem(SITE_KEY) || localStorage.getItem(STATE_KEY) || "gentle";
        const next = current === "gentle" ? "aggressive" : "gentle";
        
        localStorage.setItem(SITE_KEY, next);
        localStorage.setItem(STATE_KEY, next);
        
        apply(next);
    }

    function installHotkey() {
        if (window[LISTENER_KEY]) return;

        const handler = (e) => {
            const t = e.target;
            const tag = t && t.tagName ? t.tagName.toLowerCase() : "";
            const typing = tag === "input" || tag === "textarea" || tag === "select" || (t && t.isContentEditable);

            if (typing) return;

            const match = 
                e.ctrlKey === !!HOTKEY.ctrlKey &&
                e.shiftKey === !!HOTKEY.shiftKey &&
                e.altKey === !!HOTKEY.altKey &&
                e.metaKey === !!HOTKEY.metaKey &&
                e.code === HOTKEY.code;

            if (!match) return;

            e.preventDefault();
            e.stopPropagation();
            toggleMode();
        }

        window[LISTENER_KEY] = handler;
        window.addEventListener("keydown", handler, true);
    }

    function buildUI(currentMode) {
        const d = document.createElement("div");
        d.id = UI_ID;
		d.style.cssText =
			"position:fixed;bottom:16px;right:16px;z-index:2147483647;display:flex;gap:8px;align-items:center;padding:10px 12px;border-radius:999px;border:1px solid rgba(0,0,0,.15);background:rgba(255,255,255,.95);color:#111;font:13px system-ui;box-shadow:0 8px 24px rgba(0,0,0,.15);backdrop-filter:saturate(140%) blur(6px);";
        
        const label = document.createElement("span");
		label.textContent = `Smooth Mode: ${currentMode === "aggressive" ? "Aggressive" : "Gentle"}`;
		label.style.cssText = "font-weight:600;";

        const switchBtn = document.createElement("button");
        switchBtn.textContent = "Switch";
        switchBtn.style.cssText =
            "padding:6px 10px;border-radius:999px;border:1px solid rgba(0,0,0,.2);background:#fff;cursor:pointer;";
        switchBtn.onclick = () => toggleMode();

        const offBtn = document.createElement("button");
        offBtn.textContent = "Off";
        offBtn.style.cssText =
            "padding:6px 10px;border-radius:999px;border:1px solid rgba(0,0,0,.2);background:#fff;cursor:pointer;";
        offBtn.onclick = () => removeAll();

        d.appendChild(label);
        d.appendChild(switchBtn);
        d.appendChild(offBtn);
        return d;
    }

    function apply(m) {
        document.getElementById(STYLE_ID)?.remove();
        document.getElementById(UI_ID)?.remove();

        const s = document.createElement("style");
        s.id = STYLE_ID;
        s.textContent = cssFor(m);

        document.head.appendChild(s);
        document.body.appendChild(buildUI(m));

        installHotkey();
    }

    if (existing || uiExisting) {
        removeAll();
    } else {
        apply(mode);
    }
})();