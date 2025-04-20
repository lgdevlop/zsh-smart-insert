# Helper function to choose a command prefix before inserting a file path
# Example:
#   export ZSH_SMART_INSERT_PREFIXES="nvim:less:code"
choose_prefix() {
  local default_options=(cat vim less bat code '')
  local options=()

  if [[ -n "$ZSH_SMART_INSERT_PREFIXES" ]]; then
    IFS=':' read -rA options <<< "$ZSH_SMART_INSERT_PREFIXES"
  else
    options=("${default_options[@]}")
  fi

  local choice=$(printf "%s\n" "${options[@]}" | fzf --height=100% --border --prompt="Choose prefix: ")
  echo "$choice"
}
