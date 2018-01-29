browser.commands.onCommand.addListener(command => {
  browser.tabs
    .query({
      currentWindow: true,
      pinned: true
    })
    .then(pinned => {
      const numPinned = pinned.length;
      if (numPinned < 1) {
        return;
      }
      const desiredIdx = parseInt(command) - 1;
      // If there are pinned tabs - select the tab with the desired index 
      // ignoring the pinned tabs.
      browser.tabs
        .query({
          currentWindow: true,
          index: numPinned + desiredIdx
        })
        .then(toSelect => {
          for (const tab of toSelect) {
            browser.tabs.update(tab.id, {
              active: true
            });
          }
        });
    });
});
