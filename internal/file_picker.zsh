# Widget: fzf_file_widget
# Description: Search for files using fd and insert selected file with optional prefix
fzf_file_widget() {
  local fd_exclude_args=()

  # Optional: Define excludes for fd
  if command -v build_fd_excludes >/dev/null 2>&1; then
    fd_exclude_args=($(build_fd_excludes))
  fi

  local selected_file
  selected_file=$(fd --type f --hidden --follow "${fd_exclude_args[@]}" 2>/dev/null | \
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
