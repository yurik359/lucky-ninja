// Replace # with your real, compliant destination URLs before publishing.
const destinations = {
  tappy: "#",
  pickaxe: "#",
  mines: "#",
  aviator: "#",
  tower: "#",
  wheel: "#",
};
document.querySelectorAll("[data-dest]").forEach((a) => {
  const url = destinations[a.dataset.dest];
  if (url && url !== "#") {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer sponsored";
  } else {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Add a destination in script.js before publishing.");
    });
  }
});
const overlay = document.getElementById("overlay");
const close = document.getElementById("close");
let bonusPopupWasOpened = false;
function openBonusPopup() {
  bonusPopupWasOpened = true;
  overlay.hidden = false;
  close.focus();
}
document.getElementById("promo").addEventListener("click", openBonusPopup);
setTimeout(() => {
  if (!bonusPopupWasOpened) openBonusPopup();
}, 10000);
close.addEventListener("click", () => (overlay.hidden = true));
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.hidden = true;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") overlay.hidden = true;
});
document.getElementById("copy").addEventListener("click", async (e) => {
  try {
    await navigator.clipboard.writeText("JACKPOTCLUB777");
    e.target.textContent = "Copied!";
    setTimeout(() => (e.target.textContent = "Copy"), 1500);
  } catch {
    e.target.textContent = "JACKPOTCLUB777";
  }
});
// Demo-only animated figures: these are simulated, not real player/win statistics.
const onlineCount = document.getElementById("online-count");
const recentWins = document.getElementById("recent-wins");
const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
let players = 2757;
let wins = 100;
function updateDemoCounters() {
  players = Math.max(2600, Math.min(3200, players + randomBetween(-27, 27)));
  wins = Math.max(95, Math.min(160, wins + randomBetween(-5, 5)));
  onlineCount.textContent = String(players);
  recentWins.textContent = `+${wins}`;
}
setInterval(updateDemoCounters, 3000);

// Demo countdown: starts at 02:55 each time the page loads and stops at zero.
// Connect it to a real offer deadline before using it as a promotion expiry.
const timerNode = document.getElementById("timer");
let secondsRemaining = 2 * 60 + 55;
function renderTimer() {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  timerNode.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
renderTimer();
const timerInterval = setInterval(() => {
  secondsRemaining = Math.max(0, secondsRemaining - 1);
  renderTimer();
  if (secondsRemaining === 0) clearInterval(timerInterval);
}, 1000);

// Bottom jackpot pop-up styling/content reference.
const jackpotFlag = document.getElementById("jackpot-flag");
const jackpotId = document.getElementById("jackpot-id");
const jackpotAmount = document.getElementById("jackpot-amount");
const jackpotSamples = [
  { flag: "🇬🇧", id: "309***", amount: "7,995" },
  { flag: "🇮🇹", id: "769***", amount: "8,689" },
  { flag: "🇺🇿", id: "822***", amount: "10,802" },
  { flag: "🇨🇱", id: "487***", amount: "9,461" },
  { flag: "🇪🇸", id: "514***", amount: "6,774" },
  { flag: "🇧🇷", id: "193***", amount: "11,256" },
];
let jackpotIndex = 0;
function renderJackpotToast() {
  const item = jackpotSamples[jackpotIndex % jackpotSamples.length];
  jackpotFlag.textContent = item.flag;
  jackpotId.textContent = `ID: ${item.id}`;
  jackpotAmount.textContent = `JACKPOT +$${item.amount}`;
  jackpotIndex += 1;
}
// The example notifications are clearly labeled as simulated in the UI.
// Show after 3s; each message is visible for 4s, then return 20–25s later.
const jackpotToast = document.getElementById("jackpot-toast");
const jackpotVisibleMs = 4000;
const jackpotNextMinMs = 20000;
const jackpotNextMaxMs = 25000;
function showJackpotToast() {
  renderJackpotToast();
  jackpotToast.classList.add("is-visible");
  setTimeout(() => {
    jackpotToast.classList.remove("is-visible");
    const nextDelay = randomBetween(jackpotNextMinMs, jackpotNextMaxMs);
    setTimeout(showJackpotToast, nextDelay);
  }, jackpotVisibleMs);
}
setTimeout(showJackpotToast, 3000);

// Best-effort mobile back-navigation offer. Chromium can skip history entries
// created before any real user interaction (anti-history-trapping behavior).
// Arm only after the first tap/click/key interaction, independently of the 10s popup.
let backOfferShown = false;
let backOfferArmed = false;
const leaveSite = document.getElementById("leave-site");
function armBackOffer() {
  if (backOfferArmed || backOfferShown) return;
  try {
    const state = history.state;
    history.pushState(
      {
        ...(state && typeof state === "object" ? state : {}),
        guruplayOfferStep: true,
      },
      "",
      location.href,
    );
    backOfferArmed = true;
  } catch (error) {
    console.debug("Back offer not supported in this browser.", error);
  }
}
// These handlers fire on actual user interaction, not a timer.
window.addEventListener("pointerdown", armBackOffer, {
  once: true,
  capture: true,
});
window.addEventListener("touchstart", armBackOffer, {
  once: true,
  capture: true,
  passive: true,
});
window.addEventListener("keydown", armBackOffer, { once: true, capture: true });
window.addEventListener("popstate", () => {
  if (!backOfferArmed || backOfferShown) return;
  backOfferShown = true;
  backOfferArmed = false;
  openBonusPopup();
  leaveSite.hidden = false;
  // Don't add another entry here; the next Back must navigate normally.
});
leaveSite.addEventListener("click", () => {
  overlay.hidden = true;
  history.back();
});
