// Utility functions

// Find and return the first item with the given tag
//
// Example: const item = findTaggedItem(WF.rootItem(), '#mytag');
function findTaggedItem(item, tag) {
    const myItemTags = WF.getItemTags(item).concat(
        WF.getItemNoteTags(item));
    const myTags = myItemTags.map(t => t.tag);
    if (myTags.includes(tag)) {
        // We found a matching item
        return item
    }
    const tagCounts = item.isMainDocumentRoot() ?
        getRootDescendantTagCounts() :
        item.getTagManager().descendantTagCounts;
    const tagList = tagCounts ? tagCounts.getTagList().map(t => t.tag) : [];
    if (!tagList.includes(tag)) {
        // We don't have a matching tag underneath us
        return null
    }
    for (const child of item.getChildren()) {
        const match = findTaggedItem(child, tag);
        if (match) {
            return match
        }
    }
    // No match
    return null
}

// Find and returns all items tagged with a given
//
// Example: const items = findTaggedItems(WF.rootItem(), '#mytag');
function findTaggedItems(item, tag) {
    let found = [];

    // Check the current item first
    const myTags = WF.getItemTags(item).concat(
        WF.getItemNoteTags(item)).map(t => t.tag);
    if (myTags.includes(tag)) {
        // We found a matching item
        found.push(item);
    }

    // Look at tag counts to quickly decide whether to descend into children
    const tagCounts = item.isMainDocumentRoot() ?
        getRootDescendantTagCounts() :
        item.getTagManager().descendantTagCounts;
    const tagList = tagCounts ? tagCounts.getTagList().map(t => t.tag) : [];

    if (tagList.includes(tag)) {
        // The tag counds say that we have some matching items, so go through
        // the chilren
        for (const child of item.getChildren()) {
            found.push(...findTaggedItems(child, tag));
        }
    }
    return found
}

// Find a child item matching the given name, or create it if one isn't found.
//
// Example: const newItem = findOrCreate(myItem, 'Some Title')
function findOrCreateItem(parent, name) {
    for (const candidateItem of parent.getChildren()) {
        if (candidateItem.getName() == name) {
            return candidateItem;
        }
    }
    const newItem = WF.createItem(parent);
    WF.setItemName(newItem, name);
    return newItem;
}

// Wait until the document has finished loading and the workflowy header
// is available
//
// Example: onHeaderAvailable((header) => { ... });
function onHeaderAvailable(callback) {
    setTimeout(() => {
        const header = document.querySelector('.header');
        if (header) {
            callback(header);
        } else {
            // Try again until header is available
            onHeaderAvailable(callback)
        }
    }, 500);
}

// Add a button to the left of the gear menu
//
// Example: addButton('X', doTheThing);
function addButton(icon, buttonCallback) {
    onHeaderAvailable((header) => {
        const button = document.createElement('div');
        button.innerHTML = icon

        // Style/Hover behavior like existing menu buttons
        button.className = 'extension_button';
        const buttonCss = `
        .extension_button:hover {
            background-color: rgb(236, 238, 240);
        }
        .extension_button {
            font-weight: bold;
            border-radius: 18px;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        `;

        // Add the style element, if it's not already there
        if (!document.querySelector("#extension_button_style")) {
            const style = document.createElement('style');
            style.id = 'extension_button_style';
            style.appendChild(document.createTextNode(buttonCss));
            header.insertBefore(style, header.querySelector('.gearMenu'));
        }

        button.addEventListener('click', buttonCallback);
        header.insertBefore(button, header.querySelector('.gearMenu'));
    });
}

// Get today's date in YYYY-MM-DD format
//
// Example: const todayStr = getTodayString(); // YYYY-MM-DD
function getTodayString() {
    const todayDate = new Date();
    const offset = todayDate.getTimezoneOffset();
    const offsetDate = new Date(todayDate.getTime() - (offset*60*1000));
    return offsetDate.toISOString().split('T')[0];
}

// Set multiple styles at once
function setStyle(elem, styles) {
    for (let style in styles) {
        elem.style[style] = styles[style]
    }
}

// Add a style element (to add actual CSS from JS)
function addStylesheet(stylesheet) {
    const element = document.createElement('style')
    element.innerHTML = stylesheet;
    document.head.insertBefore(element, null);
}
