# Helper: builds exclusion list for fd command
build_fd_excludes() {
  local ignore_dirs=($(build_ignore_dirs))
  local fd_args=()
  for dir in "${ignore_dirs[@]}"; do
    fd_args+=(--exclude "${dir%%\*}")  # strip wildcard for fd
  done
  echo "${fd_args[@]}"
}
