/*=============== BATTERY ===============*/
const initBattery = () => {
  const batteryLiquid = document.querySelector(".battery__liquid");
  const batteryStatus = document.querySelector(".battery__status");
  const batteryPercentage = document.querySelector(".battery__percentage");
  const batteryCard = document.querySelector(".battery__card");
  const batteryError = document.querySelector(".battery__error");
  const iconCharging = document.querySelector(".icon-charging");
  const author = document.querySelector(".author");

  if (!navigator.getBattery) {
    batteryCard.style.display = "none";
    return;
  } else {
    batteryError.style.display = "none";
  }

  navigator.getBattery().then((batt) => {
    updateBattery = () => {
      /* 1. We update the number level of the battery */
      let level = Math.floor(batt.level * 100);
      batteryPercentage.innerHTML = level + "%";

      /* 2. We update the background level of the battery */
      batteryLiquid.style.height = `${level}%`;

      /* 3 We validate if the battery is charging */
      if (batt.charging && level < 100) {
        iconCharging.style.display = "block";
        batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-orange",
          "gradient-color-yellow"
        );
        batteryCard.style.setProperty(
          "--status-battery-color",
          "var(--gradient-color-green)"
        );
        batteryLiquid.style.animation = "animated-charging-battery 3s infinite";
        batteryLiquid.style.setProperty("--percentage-battery", `${level}%`);
        return;
      } else {
        batteryLiquid.style.animation = "none";
        iconCharging.style.display = "none";
      }

      if(batt.charging || level <= 20 || level == 100) {
        author.style.removeProperty("bottom");
        author.style.setProperty("top", "1rem");
      }
      else {
        author.style.removeProperty("top");
        author.style.setProperty("bottom", "1rem");
      }

      /* 4. We validate full battery, low battery */
      if (level == 100) {
        /* We validate if the battery is full */
        batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`;
        batteryLiquid.style.height = "103%"; /* To hide the ellipse */
      } else if ((level <= 20) & !batt.charging) {
        /* We validate if the battery is low */
        batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`;
      } else {
        /* If it's not loading, don't show anything. */
        batteryStatus.innerHTML = "";
      }

      /* 5. We change the colors of the battery and remove the other colors */
      if (level <= 20) {
        batteryLiquid.classList.add("gradient-color-red");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-yellow",
          "gradient-color-green"
        );
        batteryCard.style.setProperty(
          "--status-battery-color",
          "var(--gradient-color-red)"
        );
      } else if (level <= 40) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-yellow",
          "gradient-color-green"
        );
        batteryCard.style.setProperty(
          "--status-battery-color",
          "var(--gradient-color-orange)"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-orange",
          "gradient-color-green"
        );
        batteryCard.style.setProperty(
          "--status-battery-color",
          "var(--gradient-color-yellow)"
        );
      } else {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-orange",
          "gradient-color-yellow"
        );
        batteryCard.style.setProperty(
          "--status-battery-color",
          "var(--gradient-color-green)"
        );
      }
    };
    updateBattery();

    /* 6. Battery status events */
    batt.addEventListener("chargingchange", () => {
      updateBattery();
    });
    batt.addEventListener("levelchange", () => {
      updateBattery();
    });
  });
};

initBattery();

/*=============== DARK / LIGHT MODE ===============*/
const isLightTheme = window.matchMedia("(prefers-color-scheme: light)");

const iconTheme = document.querySelector(".icon-theme");

const lightTheme = () => {
  document.body.classList.add("light-mode");
  iconTheme.classList.remove("ri-moon-line");
  iconTheme.classList.add("ri-sun-line");
};

const darkTheme = () => {
  document.body.classList.remove("light-mode");
  iconTheme.classList.remove("ri-sun-line");
  iconTheme.classList.add("ri-moon-line");
};

const initTheme = () => {
  isLightTheme.matches ? lightTheme() : darkTheme();
};

isLightTheme.addEventListener("change", () => {
  initTheme();
});

initTheme();
iconTheme.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  iconTheme.classList.toggle("ri-sun-line");
  iconTheme.classList.toggle("ri-moon-line");
});
