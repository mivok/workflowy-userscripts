# Workflowy user scripts

This repository contains some user scripts I wrote to improve [Workflowy](https://workflowy.com).

## Installation

First, install a user script manager such as [Tampermonkey](https://tampermonkey.net/). Then, click on the install links below for the scripts you are interested in. Alternatively, you can browse the repository and click on the 'Raw' button to install the script.

## Scripts

### Workflowy quick create

[Install](https://github.com/mivok/workflowy-userscripts/raw/master/quickCreate.user.js)

This script adds a quick create button to your toolbar that will let you select from a list of items and add a new item undeneath the selected item.

When you select the parent item from the list, your new item is created at the top (similar to pressing the plus button on the workflowy sidebar), the title is pre-filled with today's date, and the new item is focused, ready for you to complete the title and begin editing the item.

To add an item to the quick create list, tag it with `#quickcreate`, and it will show up when you click the button.

There is also a keyboard shortcut you can use: CTRL+SHIFT+N.

### Workflowy journal

[Install](https://github.com/mivok/workflowy-userscripts/raw/master/journal.user.js)

This script adds a 'journal' button, which will take you to a journal entry for today, or create one if it doesn't exist. Journal entries are grouped by month, and each journal entry is titled with today's date.

To choose the top level item for your journal, tag it with `#journalroot`. Only one item should be tagged like this, and all of your journal entries will be created underneath.

There is also a keyboard shortcut you can use: CTRL+SHIFT+J.
