PLUGIN_DIR="${0:A:h}"

# Load helper functions
source "$PLUGIN_DIR/functions/build_ignore_dirs.zsh"
source "$PLUGIN_DIR/functions/choose_prefix.zsh"
source "$PLUGIN_DIR/functions/build_fd_excludes.zsh"
source "$PLUGIN_DIR/functions/build_rg_excludes.zsh"

# Load internal widgets
source "$PLUGIN_DIR/internal/file_picker.zsh"
source "$PLUGIN_DIR/internal/search_files.zsh"
source "$PLUGIN_DIR/internal/search_content.zsh"

# Register widgets
zle -N fzf_file_widget
zle -N fzf_search_files
zle -N fzf_search_content

# Keybindings
bindkey '\ef' fzf_file_widget         # Alt+f
bindkey '\eg' fzf_search_files        # Alt+g
bindkey '\es' fzf_search_content      # Alt+s

autoload -Uz add-zsh-hook
