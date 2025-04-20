# Widget: fzf_search_files
# Description: Search file names using ripgrep and insert selected path with optional prefix
fzf_search_files() {
  local rg_ignore_args=()

  # Optional: Define ignores for ripgrep
  if command -v build_rg_excludes >/dev/null 2>&1; then
    rg_ignore_args=($(build_rg_excludes plain))
  fi

  local selected_file
  selected_file=$(rg --files --hidden "${rg_ignore_args[@]}" 2>/dev/null | \
    fzf --height=100% \
        --layout=reverse \
        --border \
        --preview 'bat --style=numbers --color=always --line-range :500 {} || cat {}' \
        --preview-window=right:60% \
        --bind 'ctrl-/:toggle-preview')

  if [[ -n "$selected_file" ]]; then
    local prefix=$(choose_prefix)
    LBUFFER+="${prefix:+$prefix }$selected_file"
  fi

  # zle redisplay
}
