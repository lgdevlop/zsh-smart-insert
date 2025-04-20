# Widget: fzf_search_content
# Description: Live search inside file content using ripgrep and insert selected file
fzf_search_content() {
  local rg_ignore_args=()

  # Optional: Define ignores for ripgrep
  if command -v build_rg_excludes >/dev/null 2>&1; then
    rg_ignore_args=($(build_rg_excludes quoted))
  fi

  local reload_cmd="rg --line-number --no-heading --color=always --hidden --smart-case"
  for arg in "${rg_ignore_args[@]}"; do
    reload_cmd+=" $arg"
  done
  reload_cmd+=' 2>/dev/null {q} || true'

  local selected
  selected=$(fzf --ansi \
    --height=100% \
    --layout=reverse \
    --bind "change:reload:$reload_cmd" \
    --delimiter : \
    --preview 'file=$(echo {1}); line=$(echo {2}); start=$((line > 10 ? line - 10 : 1)); end=$((line + 10)); bat --style=numbers --color=always --highlight-line $line --line-range $start:$end "$file"' \
    --preview-window=up:70%:wrap \
    --prompt="Search content: " \
    --phony)

  if [[ -n $selected ]]; then
    local prefix=$(choose_prefix)
    local cmd=""
    for line in ${(f)selected}; do
      local file=$(echo "$line" | cut -d':' -f1)
      cmd+="${prefix:+$prefix }$file"
    done
    LBUFFER+="$cmd"
  fi

  # zle redisplay
}
