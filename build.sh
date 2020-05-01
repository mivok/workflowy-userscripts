#!/usr/bin/env bash
SCRIPTS=(
    journal.user.js
    quickCreate.user.js
    tabs.user.js
)

for SCRIPT in "${SCRIPTS[@]}"; do
    {
        cat "src/$SCRIPT.header"
        echo
        echo '(function() {'
        echo "    'use strict';"
        sed -e '/^$/n' -e 's/^/    /' lib/util.js
        echo
        echo '    // Main script'
        echo
        sed -e '/^$/n' -e 's/^/    /' "src/$SCRIPT"
        echo '})();'
    } > "$SCRIPT"
done
