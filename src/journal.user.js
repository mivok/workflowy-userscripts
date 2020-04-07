// The tag to look for as the root of the journal
const journalItemTag = '#journalroot';

function createJournalItem() {
    const journalItem = findTaggedItem(WF.rootItem(), journalItemTag);
    if (!journalItem) {
        WF.showMessage(`Unable to find journal root item`, true);
        return;
    }
    const todayStr = getTodayString(); // YYYY-MM-DD
    const monthStr = todayStr.slice(0,7); // YYYY-MM
    // Create child item
    WF.editGroup(function() {
        // Find the month item
        const monthItem = findOrCreateItem(journalItem, monthStr);
        const todayItem = findOrCreateItem(monthItem, todayStr);
        // Select the item and put the cursor in the right place
        WF.zoomTo(todayItem);
        WF.editItemName(todayItem);
    });
}

// Pencil symbol
addButton('&#9998;', createJournalItem);
// Add keyboard shortcut
document.addEventListener("keydown", function (event) {
    if (!event.altKey && event.shiftKey &&
            event.ctrlKey && !event.metaKey && event.key === "J") {
        createJournalItem();
        event.preventDefault();
    }
});
