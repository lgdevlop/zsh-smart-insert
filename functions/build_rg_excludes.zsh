# Helper: builds exclusion list for ripgrep, supports plain or quoted output
build_rg_excludes() {
  local mode="${1:-plain}"  # default is plain
  local ignore_dirs=($(build_ignore_dirs))
  local rg_args=()

  for dir in "${ignore_dirs[@]}"; do
    if [[ "$mode" == "quoted" ]]; then
      rg_args+=("-g" "'!$dir'")
    else
      rg_args+=("-g" "!$dir")
    fi
  done

  echo "${rg_args[@]}"
}
