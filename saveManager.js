/* ===========================================================
   Universal Save Manager
   Author: ChatGPT
   Version: 1.0
   -----------------------------------------------------------
   🧩 Features:
   - Works for multiple games on the same site
   - Saves and loads any kind of data (object, array, etc.)
   - Optional auto-save when player leaves the page
   - Simple, clean API:
        SaveManager.save(gameName, data)
        SaveManager.load(gameName)
        SaveManager.clear(gameName)
        SaveManager.auto(gameName, getDataFunction)
   =========================================================== */

const SaveManager = {
  // Save any JavaScript object or value
  save(gameName, data) {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(`save_${gameName}`, json);
      console.log(`[SaveManager] Saved data for "${gameName}".`);
    } catch (error) {
      console.error(`[SaveManager] Save failed for "${gameName}":`, error);
    }
  },

  // Load previously saved data (returns null if none found)
  load(gameName) {
    try {
      const saved = localStorage.getItem(`save_${gameName}`);
      if (!saved) {
        console.warn(`[SaveManager] No save found for "${gameName}".`);
        return null;
      }
      const data = JSON.parse(saved);
      console.log(`[SaveManager] Loaded data for "${gameName}".`);
      return data;
    } catch (error) {
      console.error(`[SaveManager] Load failed for "${gameName}":`, error);
      return null;
    }
  },

  // Delete the save for a specific game
  clear(gameName) {
    try {
      localStorage.removeItem(`save_${gameName}`);
      console.log(`[SaveManager] Cleared save for "${gameName}".`);
    } catch (error) {
      console.error(`[SaveManager] Clear failed for "${gameName}":`, error);
    }
  },

  // Automatically save data when the player leaves the page
  // getDataFn should be a function that returns the data to save
  auto(gameName, getDataFn) {
    if (typeof getDataFn !== "function") {
      console.error("[SaveManager] auto() requires a function that returns data to save.");
      return;
    }
    window.addEventListener("beforeunload", () => {
      try {
        const data = getDataFn();
        if (data) this.save(gameName, data);
      } catch (error) {
        console.error(`[SaveManager] Auto-save failed for "${gameName}":`, error);
      }
    });
    console.log(`[SaveManager] Auto-save enabled for "${gameName}".`);
  }
};
