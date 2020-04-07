function quickCreate() {
    let parents = findTaggedItems(WF.rootItem(), '#quickcreate');
    if (parents.length == 0) {
        WF.showMessage("You need to tag some items with #quickcreate before using the quick create script.", true);
        return;
    }
    WF.showAlertDialog(`
        <div id="quick_create_menu"></div>
        <style>
            #quick_create_menu {
                margin-top: 1em;
            }

            #quick_create_menu div {
                padding-left: 1em;
                width: 100%;
            }

            #quick_create_menu div:hover {
                background: rgb(73, 186, 242);
                color: rgb(255, 255, 255);
            }
        </style>
        `,
        "Choose parent item");
    setTimeout(function() {
        const container = document.querySelector('#quick_create_menu');
        for (const parent of parents) {
            const item = document.createElement('div');
            item.innerText = parent.getName();
            item.addEventListener('click', function() {
                doQuickCreate(parent);
            })
            container.appendChild(item);
        }
    }, 100);
}

function doQuickCreate(parent) {
    WF.hideDialog();
    const todayStr = getTodayString(); // YYYY-MM-DD
    // Create child item
    WF.editGroup(function() {
        const newItem = WF.createItem(parent);
        // Prefix the title of each note with today's date
        WF.setItemName(newItem, `${todayStr} - `);
        // Select the item and put the cursor in the right place
        WF.zoomTo(newItem);
        WF.editItemName(newItem);
    });
}

// Add a button to trigger the quick create
// Fullwidth plus sign
addButton('&#65291;', quickCreate);

// Add keyboard shortcut
document.addEventListener("keydown", function (event) {
    if (!event.altKey && event.shiftKey &&
            event.ctrlKey && !event.metaKey && event.key === "N") {
        quickCreate();
        event.preventDefault();
    }
});
