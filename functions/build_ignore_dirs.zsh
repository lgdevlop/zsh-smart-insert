# Helper function to build a list of directories to ignore in search tools
# Supports user customization via the ZSH_SMART_INSERT_IGNOREDIRS environment variable
# Example:
#   export ZSH_SMART_INSERT_IGNOREDIRS=".git/*:node_modules/:dist/:.venv/"

build_ignore_dirs() {
    local default_dirs=(
        '.git/*'
        'node_modules/'
        'dist/'
        '.pyenv/'
        '.local/'
        '.cache/'
        '.config/'
        'python-envs/'
        '.vscode-server'
    )

    local ignore_dirs=()

    # If the user provided a custom list, use it
    if [[ -n "$ZSH_SMART_INSERT_IGNOREDIRS" ]]; then
        IFS=':' read -rA ignore_dirs <<< "$ZSH_SMART_INSERT_IGNOREDIRS"
    else
        ignore_dirs=(${default_dirs[@]})
    fi

    # Echo each path separated by space, so the consumer can use it as an array
    echo "${ignore_dirs[@]}"
}