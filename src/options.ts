import { getConfig } from "./methods/getConfig";
import "./style/options.sass";
import type { StorageSync } from "./types/storage";

window.onload = () => {
  const checkboxesSites = Array.from(
    document.getElementsByClassName(
      "checkbox-sites",
    ) as HTMLCollectionOf<HTMLInputElement>,
  );
  const checkboxesKeys = Array.from(
    document.getElementsByClassName(
      "checkbox-keys",
    ) as HTMLCollectionOf<HTMLInputElement>,
  );
  const speedSelectors = Array.from(
    document.getElementsByClassName(
      "speed-selector",
    ) as HTMLCollectionOf<HTMLSelectElement>,
  );

  // Load sites/keys config and apply it to the UI checkbox state
  const applySitesAndKeysConfig = async (dom: HTMLInputElement) => {
    const enabled = await getConfig(dom.id as keyof StorageSync);
    if (enabled === false) {
      dom.checked = false;
    }
  };
  void Promise.all(
    [...checkboxesSites, ...checkboxesKeys].map(applySitesAndKeysConfig),
  );

  // Save sites/keys config to chrome.storage when checkboxes are clicked
  const bindSitesAndKeysConfig = (dom: HTMLInputElement) => {
    const key = dom.id;
    dom.addEventListener("change", (event) => {
      if (event.target instanceof HTMLInputElement) {
        chrome.storage.sync.set({ [key]: event.target.checked });
      }
    });
  };
  for (const dom of [...checkboxesSites, ...checkboxesKeys]) {
    bindSitesAndKeysConfig(dom);
  }

  // Load default playback speeds config and apply it to the UI
  const applySpeedsConfig = async (dom: HTMLSelectElement) => {
    const speed = await getConfig(dom.id as keyof StorageSync);
    if (typeof speed === "number") {
      dom.value = String(speed);
    }
  };
  void Promise.all(speedSelectors.map(applySpeedsConfig));

  // Save default playback speeds config to chrome.storage when new value is selected
  const bindSpeedsConfig = (dom: HTMLSelectElement) => {
    const key = dom.id;
    dom.addEventListener("change", (event) => {
      if (event.target instanceof HTMLSelectElement) {
        chrome.storage.sync.set({ [key]: Number(event.target.value) });
      }
    });
  };
  for (const dom of speedSelectors) {
    bindSpeedsConfig(dom);
  }

  void (async () => {
    // Load seek-sec config and apply it to the UI input
    const seekSecInput = document.getElementById(
      "seek-sec",
    ) as HTMLInputElement;
    const seekSec = await getConfig("seek-sec");
    if (typeof seekSec === "number") {
      seekSecInput.value = String(seekSec);
    }

    // Save seek-sec config to chrome.storage when the user typed a new value
    seekSecInput.addEventListener("change", (event) => {
      if (event.target instanceof HTMLInputElement) {
        chrome.storage.sync.set({ "seek-sec": Number(event.target.value) });
      }
    });
  })();
};
